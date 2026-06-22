// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Decision-Grade GA4 Analytics
// Tracks: signup, checkout_started, purchase — with full attribution
// Uses gtag loaded externally (G-SD4LQYV442)
// ═══════════════════════════════════════════════════════════════════

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* ── Context helpers ──────────────────────────────────────────────── */

function getDevice(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getReferrer(): string {
  if (typeof document === "undefined") return "direct";
  const ref = document.referrer;
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname;
    if (host.includes("google")) return "google";
    if (host.includes("twitter") || host.includes("x.com")) return "twitter";
    if (host.includes("facebook") || host.includes("fb.com")) return "facebook";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("reddit")) return "reddit";
    if (host.includes("sonoprep")) return "internal";
    return host;
  } catch {
    return "unknown";
  }
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "origin"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

/* ── Session attribution ──────────────────────────────────────────── */

const ATTR_KEY = "sp_attribution";

interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  origin: string;
  referrer: string;
  device: string;
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(ATTR_KEY)) return;

  const utm = getUtmParams();
  const attr: Attribution = {
    source: utm.utm_source || getReferrer(),
    medium: utm.utm_medium || "organic",
    campaign: utm.utm_campaign || "none",
    origin: utm.origin || "direct",
    referrer: getReferrer(),
    device: getDevice(),
  };
  sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
}

function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { source: "unknown", medium: "unknown", campaign: "none", origin: "direct", referrer: "unknown", device: "unknown" };
  }
  try {
    const stored = sessionStorage.getItem(ATTR_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* fall through */ }
  return {
    source: getReferrer(),
    medium: "organic",
    campaign: "none",
    origin: "direct",
    referrer: getReferrer(),
    device: getDevice(),
  };
}

/* ── Core tracker ─────────────────────────────────────────────────── */

function track(action: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  const attr = getAttribution();
  window.gtag("event", action, {
    ...params,
    traffic_source: attr.source,
    traffic_medium: attr.medium,
    traffic_campaign: attr.campaign,
    traffic_origin: attr.origin,
    device_type: attr.device,
  });
}

/* ── Public events ────────────────────────────────────────────────── */

export function trackSignup(source: "landing_page" | "demo_page") {
  track("signup", {
    event_category: "email_capture",
    event_label: source,
    signup_source: source,
  });
}

export function trackCheckoutStarted(productKey: string, price: number) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("sp_last_checkout", JSON.stringify({ productKey, price }));
  }
  track("checkout_started", {
    event_category: "purchase",
    event_label: productKey,
    value: price,
    currency: "USD",
  });
}

export function trackPurchase() {
  if (typeof window === "undefined") return;
  try {
    const stored = sessionStorage.getItem("sp_last_checkout");
    if (!stored) return;
    const { productKey, price } = JSON.parse(stored);
    track("purchase", {
      event_category: "revenue",
      event_label: productKey,
      value: price,
      currency: "USD",
    });
    sessionStorage.removeItem("sp_last_checkout");
  } catch { /* silent */ }
}

export function trackProductClick(productKey: string) {
  track("product_click", {
    event_category: "engagement",
    event_label: productKey,
  });
}
