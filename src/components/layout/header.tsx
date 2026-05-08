"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/demo", label: "Demo" },
    { href: "/products", label: "Pricing" },
    { href: "/blog", label: "Journal" },
    { href: "/about", label: "Studio" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#0a0c10]/90 border-b border-[#c85b3a]/20" : "bg-transparent"
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="group relative">
            <span className="display-serif text-2xl font-semibold tracking-tight text-[#f0ebe4]">
              Sono<span className="text-[#c85b3a]">Prep</span>
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c85b3a] group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`body-small tracking-wider ${pathname === link.href ? "text-[#c85b3a]" : "text-[#b8b0a4] hover:text-[#f0ebe4]"}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="body-small text-[#b8b0a4] hover:text-[#f0ebe4]">Dashboard</Link>
                <button onClick={() => signOut()} className="body-small text-[#b8b0a4] hover:text-[#f0ebe4]">Exit</button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="body-small text-[#b8b0a4] hover:text-[#f0ebe4]">Sign in</Link>
                <Link href="/products" className="tactile-button px-6 py-2.5 border border-[#c85b3a]/50 text-[#f0ebe4] hover:bg-[#c85b3a] hover:border-[#c85b3a] transition-all duration-300">Start →</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center border border-[#f0ebe4]/10">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#0a0c10] pt-24 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="display-serif text-3xl text-[#f0ebe4] hover:text-[#c85b3a] transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              {!session && (
                <>
                  <Link href="/auth/signin" className="body-readable text-[#b8b0a4]">Sign in</Link>
                  <Link href="/products" className="tactile-button text-center px-6 py-3 border border-[#c85b3a]/50 text-[#f0ebe4]">Start →</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
