"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

/* ── Password strength helper ──────────────────────────────────── */
function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score <= 4) return { label: "Fair", color: "bg-amber-500", width: "w-2/4" };
  if (score <= 5) return { label: "Good", color: "bg-teal-500", width: "w-3/4" };
  return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
}

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    if (!name.trim()) { setError("Name is required"); return false; }
    if (!email.includes("@")) { setError("Please enter a valid email address"); return false; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return false; }
    if (!/[A-Z]/.test(password)) { setError("Password must contain an uppercase letter"); return false; }
    if (!/[a-z]/.test(password)) { setError("Password must contain a lowercase letter"); return false; }
    if (!/[0-9]/.test(password)) { setError("Password must contain a number"); return false; }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) { setError("Password must contain a special character"); return false; }
    if (!acceptedTerms) { setError("You must accept the Terms of Service"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, acceptedTerms }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/auth/signin?registered=true");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-md mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">
          ← BACK TO HOME
        </Link>
        <div className="depth-border p-8">
          <h1 className="display-display text-3xl text-white mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block text-sm text-[#8a8279] mb-1">Full Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 bg-[#1a212b] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c85b3a] focus:border-transparent"
                required
                autoComplete="name"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm text-[#8a8279] mb-1">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 bg-[#1a212b] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c85b3a] focus:border-transparent"
                required
                autoComplete="email"
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm text-[#8a8279] mb-1">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, upper, lower, number, special"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-3 pr-12 bg-[#1a212b] border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c85b3a] focus:border-transparent"
                  required
                  autoComplete="new-password"
                  aria-required="true"
                  aria-describedby="password-strength"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8279] hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength meter */}
              {password.length > 0 && (
                <div id="password-strength" className="mt-2" aria-live="polite">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#8a8279]">Password strength</span>
                    <span className="text-[10px] text-[#8a8279]">{strength.label}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all duration-300`} />
                  </div>
                </div>
              )}
            </div>

            {/* Terms of Service checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={e => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#c85b3a] bg-[#1a212b] border border-white/10 rounded cursor-pointer"
                required
                aria-required="true"
              />
              <label htmlFor="accept-terms" className="text-sm text-[#8a8279] cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="text-[#c85b3a] hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="text-[#c85b3a] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Error display */}
            {error && (
              <div role="alert" className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-industrial w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-[#8a8279] text-sm mt-4">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#c85b3a] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
