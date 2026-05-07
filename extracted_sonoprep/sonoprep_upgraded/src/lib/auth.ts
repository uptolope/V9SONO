import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/validations";

/* ── Rate-limiting helpers ────────────────────────────────────────── */

const LOGIN_MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

async function checkRateLimit(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { failedLoginAttempts: true, lockedUntil: true },
  });
  if (!user) return true; // Don't reveal whether user exists
  if (user.lockedUntil && user.lockedUntil > new Date()) return false;
  if (
    user.lockedUntil &&
    user.lockedUntil <= new Date()
  ) {
    // Reset after lock expires
    await prisma.user.update({
      where: { email },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
  }
  return true;
}

async function recordFailedLogin(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { failedLoginAttempts: true },
  });
  if (!user) return;
  const attempts = (user.failedLoginAttempts ?? 0) + 1;
  await prisma.user.update({
    where: { email },
    data: {
      failedLoginAttempts: attempts,
      lockedUntil:
        attempts >= LOGIN_MAX_ATTEMPTS
          ? new Date(Date.now() + LOCK_DURATION_MS)
          : null,
    },
  });
}

async function clearFailedLogins(email: string): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
  });
}

/* ── NextAuth Configuration ───────────────────────────────────────── */

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/signin",
    newUser: "/dashboard",
    error: "/auth/signin",
  },

  providers: [
    /* Email + Password */
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Rate-limit check
        const allowed = await checkRateLimit(email);
        if (!allowed) {
          throw new Error("Account temporarily locked. Try again in 15 minutes.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            image: true,
          },
        });

        if (!user || !user.password) {
          // Constant-time comparison to prevent timing attacks
          await bcrypt.compare(password, "$2a$12$invalid.hash.placeholder...");
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          await recordFailedLogin(email);
          return null;
        }

        await clearFailedLogins(email);

        // Generate a unique session ID and store it on the user record.
        // Only one session can be active at a time — last login wins.
        const sessionId = crypto.randomUUID();
        await prisma.user.update({
          where: { id: user.id },
          data: { activeSessionId: sessionId },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          sessionId,
        };
      },
    }),

    /* Google OAuth (optional) */
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "STUDENT";

        // For credentials login, sessionId is already set in authorize().
        // For OAuth (Google), generate one now.
        let sessionId = (user as { sessionId?: string }).sessionId ?? "";
        if (!sessionId && account?.provider !== "credentials") {
          sessionId = crypto.randomUUID();
          await prisma.user.update({
            where: { id: user.id },
            data: { activeSessionId: sessionId },
          });
        }
        token.sessionId = sessionId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.sessionId = token.sessionId as string;
      }
      return session;
    },
  },
};
