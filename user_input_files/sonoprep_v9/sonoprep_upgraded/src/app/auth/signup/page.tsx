"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  GraduationCap,
  Sparkles,
  BookOpen,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ── Decorative side panel ────────────────────────────────────────── */
function DecorativePanel() {
  return (
    <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-charcoal to-slate overflow-hidden items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-teal/[0.04] blur-[80px]"
        animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 h-48 w-48 rounded-full bg-amber/[0.03] blur-[60px]"
        animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-sm px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
            <GraduationCap className="h-8 w-8 text-teal" />
          </div>
          <h2 className="font-display text-2xl font-bold text-cream">
            Start Your Journey
          </h2>
          <p className="mt-3 text-sm text-cream-dim leading-relaxed">
            Join hundreds of sonography students who passed their SPI exam
            with SonoPrep. Your success starts here.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-10 space-y-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            { icon: Shield, text: "30-Day Money-Back Guarantee" },
            { icon: BookOpen, text: "ARDMS-Aligned Content" },
            { icon: Brain, text: "Adaptive Learning System" },
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

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const product = searchParams.get("product");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  /* ── Password strength ─────────────────────────────────────────── */
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const allPassed = Object.values(checks).every(Boolean);
  const passedCount = Object.values(checks).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allPassed) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Registration failed.");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        // Redirect to checkout if a product was selected
        if (product) {
          window.location.href = `/billing?product=${product}`;
        } else {
          window.location.href = redirect;
        }
      } else {
        // Sign-in failed but account was created
        window.location.href = "/auth/signin";
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-obsidian">
      {/* Decorative side panel */}
      <DecorativePanel />

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
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
              <CardTitle>Create Account</CardTitle>
              <p className="mt-1 text-sm text-cream-dim">
                Get started with your SPI exam preparation.
              </p>
            </CardHeader>
            <CardContent>
              {/* Product badge */}
              {product && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 rounded border border-teal/50 bg-teal/5 p-3 text-sm text-teal-glow"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Purchasing: {product.replace(/_/g, " ")}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 rounded border border-error/50 bg-error/10 p-3 text-sm text-error"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </motion.div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div
                    className={`relative transition-all duration-300 rounded ${
                      focusedField === "name" ? "ring-2 ring-teal/30" : ""
                    }`}
                  >
                    <User
                      className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "name" ? "text-teal" : "text-cream-dim"
                      }`}
                    />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div
                    className={`relative transition-all duration-300 rounded ${
                      focusedField === "email" ? "ring-2 ring-teal/30" : ""
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
                      focusedField === "password" ? "ring-2 ring-teal/30" : ""
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
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Strength indicators — visual bar + checks */}
                  {password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      {/* Strength bar */}
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              i < passedCount
                                ? passedCount <= 2
                                  ? "bg-amber"
                                  : "bg-success"
                                : "bg-border"
                            }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: i < passedCount ? 1 : 0.3 }}
                            transition={{ delay: i * 0.05 }}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[0.65rem]">
                        {[
                          { key: "length", label: "8+ characters" },
                          { key: "upper", label: "Uppercase letter" },
                          { key: "lower", label: "Lowercase letter" },
                          { key: "number", label: "Number" },
                        ].map((c) => (
                          <motion.span
                            key={c.key}
                            className={`flex items-center gap-1 transition-colors duration-300 ${
                              checks[c.key as keyof typeof checks]
                                ? "text-success"
                                : "text-cream-dim"
                            }`}
                            animate={{
                              scale: checks[c.key as keyof typeof checks]
                                ? [1, 1.05, 1]
                                : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {checks[c.key as keyof typeof checks] ? (
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            ) : (
                              <span className="h-2.5 w-2.5 text-center">○</span>
                            )}
                            {c.label}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !allPassed}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-cream-dim">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <p className="text-center text-sm text-cream-dim">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-teal hover:text-teal-glow transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
