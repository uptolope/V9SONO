"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/demo", label: "Free Demo" },
  { href: "/products", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group font-display text-xl font-bold text-cream transition-colors hover:text-teal-glow">
          <span>Sono</span>
          <span className="text-teal transition-all duration-300 group-hover:text-teal-glow">Prep</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-mono text-[0.78rem] uppercase tracking-wider transition-colors duration-200",
                    isActive ? "text-teal" : "text-cream-dim hover:text-cream"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => signOut()} aria-label="Sign out">
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/products">Get Access</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded border border-border text-cream-dim transition-colors hover:text-cream md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-obsidian/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2.5 font-mono text-sm uppercase tracking-wider text-cream-dim hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="sep-line my-3" />
              <div className="flex flex-col gap-2 pt-1">
                {session ? (
                  <>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => signOut()} className="justify-start">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/products">Get Access</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
