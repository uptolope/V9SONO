"use client";

import { useEffect, useState } from "react";
import { ParticleBackground } from "./particle-background";

interface PremiumLayoutProps {
  children: React.ReactNode;
}

export function PremiumLayout({ children }: PremiumLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <ParticleBackground />
      <div className="grain-overlay" aria-hidden="true" />
      {children}
    </>
  );
}