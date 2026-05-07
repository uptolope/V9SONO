"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
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

/* ── Premium Magnetic Nav Link ─────────────────────────────────────── */
function MagneticNavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.4 });
    animate(y, 0, { duration: 0.4 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "font-mono text-[0.78rem] uppercase tracking-wider transition-colors duration-200 relative",
        isActive ? "text-teal" : "text-cream-dim hover:text-cream"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover glow background */}
      <motion.div
        className="absolute -inset-2 rounded-lg bg-teal/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Underline animation */}
      <motion.span
        className="relative inline-block"
        initial={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: "-2px",
          left: 0,
          height: "1px",
          background: "linear-gradient(90deg, #14b8a6, #0d9488)",
        }}
      />
      {children}
    </motion.a>
  );
}

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(winScroll / height);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Premium scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent z-[60]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        style={{ transformOrigin: "left" }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-obsidian/95 backdrop-blur-xl border-b border-teal/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        {/* Gradient overlay for scrolled state */}
        {isScrolled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-teal/[0.03] to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <nav aria-label="Primary navigation" className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo with premium animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/"
              className="group font-display text-xl font-bold text-cream transition-colors hover:text-teal-glow relative"
            >
              <span className="relative">Sono</span>
              <motion.span
                className="relative text-teal transition-all duration-300 group-hover:text-teal-glow"
                animate={{
                  color: ["#0d9488", "#14b8a6", "#0d9488"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Prep
              </motion.span>
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-2 rounded-lg bg-teal/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: -1 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Nav with magnetic effect */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <MagneticNavLink href={link.href} isActive={isActive}>
                    {link.label}
                  </MagneticNavLink>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA with premium styling */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" asChild className="relative overflow-hidden">
                    <Link href="/dashboard">
                      <span className="relative z-10">Dashboard</span>
                      <motion.div
                        className="absolute inset-0 bg-teal/5"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                <Button variant="ghost" size="sm" onClick={() => signOut()} aria-label="Sign out" className="hover:text-teal">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </Button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-teal to-teal-glow opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                  <Button size="sm" asChild className="relative btn-glow">
                    <Link href="/products">Get Access</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile toggle with premium animation */}
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-cream-dim transition-all hover:text-cream hover:border-teal/30 md:hidden relative overflow-hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </motion.div>
          </motion.button>
        </nav>

        {/* Mobile menu with premium animation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-b border-border bg-obsidian/98 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto max-w-7xl space-y-2 px-6 py-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 font-mono text-sm uppercase tracking-wider text-cream-dim hover:text-teal transition-colors border-b border-border/30"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="sep-line my-4" />
                <motion.div
                  className="flex flex-col gap-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
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
                      <Button size="sm" asChild className="btn-glow">
                        <Link href="/products">Get Access</Link>
                      </Button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
