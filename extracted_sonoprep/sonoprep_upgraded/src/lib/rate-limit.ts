/**
 * In-memory rate limiter for API routes.
 *
 * Uses a sliding-window counter per key (typically IP or userId).
 * Suitable for single-instance deployments. For multi-instance,
 * replace with Redis-backed implementation.
 *
 * SECURITY NOTES:
 * - Automatically evicts stale entries to prevent memory exhaustion
 * - Supports configurable window size and max requests
 * - Returns remaining quota and retry-after headers
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  retryAfterMs: number;
}

interface RateLimiterOptions {
  /** Maximum number of requests per window */
  maxRequests: number;
  /** Window size in milliseconds */
  windowMs: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

// Periodic cleanup to prevent memory leaks — runs every 60 seconds
const CLEANUP_INTERVAL_MS = 60_000;
const MAX_ENTRIES_PER_STORE = 10_000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [, store] of stores) {
      for (const [key, entry] of store) {
        if (entry.resetAt <= now) {
          store.delete(key);
        }
      }
    }
  }, CLEANUP_INTERVAL_MS);
  // Don't block process exit
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Creates a named rate limiter instance.
 *
 * Usage:
 *   const limiter = createRateLimiter("api_signup", { maxRequests: 5, windowMs: 60_000 });
 *   const result = limiter.check(clientIp);
 *   if (!result.success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */
export function createRateLimiter(name: string, options: RateLimiterOptions) {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }
  const store = stores.get(name)!;
  ensureCleanup();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const entry = store.get(key);

      // No existing entry or window expired → fresh window
      if (!entry || entry.resetAt <= now) {
        // Enforce max entries to prevent memory exhaustion from spoofed keys
        if (store.size >= MAX_ENTRIES_PER_STORE) {
          // Evict expired entries first
          for (const [k, e] of store) {
            if (e.resetAt <= now) store.delete(k);
          }
          // If still over limit, reject (fail closed for safety)
          if (store.size >= MAX_ENTRIES_PER_STORE) {
            return {
              success: false,
              limit: options.maxRequests,
              remaining: 0,
              retryAfterMs: options.windowMs,
            };
          }
        }

        store.set(key, { count: 1, resetAt: now + options.windowMs });
        return {
          success: true,
          limit: options.maxRequests,
          remaining: options.maxRequests - 1,
          retryAfterMs: 0,
        };
      }

      // Window still active
      entry.count += 1;
      const remaining = Math.max(0, options.maxRequests - entry.count);
      const retryAfterMs = entry.count > options.maxRequests ? entry.resetAt - now : 0;

      return {
        success: entry.count <= options.maxRequests,
        limit: options.maxRequests,
        remaining,
        retryAfterMs,
      };
    },

    /** Reset a specific key (e.g., after successful auth) */
    reset(key: string): void {
      store.delete(key);
    },

    /** Get current count for a key (for monitoring) */
    getCount(key: string): number {
      const entry = store.get(key);
      if (!entry || entry.resetAt <= Date.now()) return 0;
      return entry.count;
    },
  };
}

/**
 * Extract client IP from request headers.
 * Prefers X-Forwarded-For (set by reverse proxies / Vercel) over
 * direct connection IP. Returns "unknown" if neither is available.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take only the first IP (client IP), ignore proxy chain
    const clientIp = forwarded.split(",")[0]?.trim();
    if (clientIp) return clientIp;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/**
 * Helper: build a 429 response with standard rate-limit headers.
 */
export function rateLimitResponse(result: RateLimitResult) {
  const retryAfterSecs = Math.ceil(result.retryAfterMs / 1000);
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSecs),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
      },
    }
  );
}
