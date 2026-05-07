"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, AlertCircle, BookOpen, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ── Decorative side panel for split layout ───────────────────────── */
function DecorativePanel() {
  return (
    <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-charcoal to-slate overflow-hidden items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-teal/[0.04] blur-[80px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-cobalt/[0.06] blur-[60px]"
        animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-sm px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
            <Sparkles className="h-8 w-8 text-teal" />
          </div>
          <h2 className="font-display text-2xl font-bold text-cream">
            Welcome Back
          </h2>
          <p className="mt-3 text-sm text-cream-dim leading-relaxed">
            Continue your SPI exam preparation journey. Your study materials
            and progress are waiting for you.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="mt-10 space-y-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            { icon: BookOpen, text: "200+ Flashcards" },
            { icon: Brain, text: "Spaced Repetition" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 rounded border border-border/50 bg-obsidian/30 px-4 py-2.5"
            >
              <item.icon className="h-4 w-4 text-teal" />
              <span className="font-mono text-xs text-cream-dim">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState(
    error === "CredentialsSignin" ? "Invalid email or password." : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setErrorMsg(
        result.error.includes("locked")
          ? result.error
          : "Invalid email or password. Please try again."
      );
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex min-h-screen bg-obsidian">
      {/* Decorative side panel */}
      <DecorativePanel />

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-cream"
            >
              Sono<span className="text-teal">Prep</span>
            </Link>
          </div>

          <Card className="relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

            <CardHeader className="text-center">
              <CardTitle>Sign In</CardTitle>
              <p className="mt-1 text-sm text-cream-dim">
                Welcome back. Sign in to access your study materials.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error */}
                <AnimateError message={errorMsg} />

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div
                    className={`relative transition-all duration-300 rounded ${
                      focusedField === "email"
                        ? "ring-2 ring-teal/30"
                        : ""
                    }`}
                  >
                    <Mail
                      className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "email"
                          ? "text-teal"
                          : "text-cream-dim"
                      }`}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@hospital.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div
                    className={`relative transition-all duration-300 rounded ${
                      focusedField === "password"
                        ? "ring-2 ring-teal/30"
                        : ""
                    }`}
                  >
                    <Lock
                      className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "password"
                          ? "text-teal"
                          : "text-cream-dim"
                      }`}
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-cream-dim">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <p className="text-center text-sm text-cream-dim">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-teal hover:text-teal-glow transition-colors"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Animated error message ───────────────────────────────────────── */
function AnimateError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center gap-2 rounded border border-error/50 bg-error/10 p-3 text-sm text-error"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </motion.div>
  );
}
