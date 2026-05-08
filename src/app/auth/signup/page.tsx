"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validate = () => {
    if (!name.trim()) { setError("Name required"); return false; }
    if (!email.includes("@")) { setError("Valid email required"); return false; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) router.push("/auth/signin?registered=true");
    else setError(data.error || "Registration failed");
  };

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-md mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="depth-border p-8">
          <h1 className="display-display text-3xl text-[#f0ebe4] mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-[#1a212b] border border-white/10 text-white" required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-[#1a212b] border border-white/10 text-white" required />
            <input type="password" placeholder="Password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-[#1a212b] border border-white/10 text-white" required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-industrial w-full">Sign Up</button>
          </form>
          <p className="text-center text-[#6b6359] text-sm mt-4">Already have an account? <Link href="/auth/signin" className="text-[#c85b3a] hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
