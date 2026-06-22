"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";

/** Captures UTM / referrer attribution on first page load */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureAttribution();
  }, []);
  return <>{children}</>;
}
