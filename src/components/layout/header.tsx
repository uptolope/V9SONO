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
    { href: "/blog", label: "Writing" },
    { href: "/about", label: "Studio" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#03050a]/80 border-b border-white/5" : "bg-transparent"
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="group relative">
            <span className="text-xl font-bold tracking-tighter text-white">
              Sono<span className="text-[#ff6b4a]">Prep</span>
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff6b4a] group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? "text-white after:w-full" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="nav-link text-sm">Dashboard</Link>
                <button onClick={() => signOut()} className="nav-link text-sm">Exit</button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="nav-link text-sm">Sign in</Link>
                <Link href="/products" className="btn-industrial">Start →</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center border border-white/10">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#03050a] pt-24 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-2xl font-light tracking-tight text-white/70 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              {!session && (
                <>
                  <Link href="/auth/signin" className="text-white/70">Sign in</Link>
                  <Link href="/products" className="btn-industrial text-center">Start →</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
