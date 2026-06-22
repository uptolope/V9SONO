"use client";

import { useState } from "react";

export function WaitlistForm({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          signup_source: `waitlist_${productSlug}`,
        }),
      });
      setSubmitted(true);
    } catch {
      // Ghost mode — always show success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="p-4 border border-green-500/20 bg-green-500/5 rounded">
        <p className="text-sm text-green-300">
          ✓ You&apos;re on the {productName} waitlist. We&apos;ll email you at launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-grow px-4 py-3 bg-[#0B0D10] border border-white/8 text-white placeholder:text-[#3a3530] text-sm rounded focus:outline-none focus:border-[#c85b3a]/40"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-industrial px-5 py-3 text-[10px] shrink-0 disabled:opacity-50"
      >
        {loading ? "..." : "NOTIFY ME"}
      </button>
    </form>
  );
}
