"use client";

import { useState, useEffect, useCallback } from "react";

interface UseContentOptions {
  /** API endpoint path, e.g. "/api/content/flashcards" */
  endpoint: string;
  /** Query params */
  params?: Record<string, string>;
  /** Auto-fetch on mount (default true) */
  autoFetch?: boolean;
}

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  accessDenied: boolean;
  purchaseUrl: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching protected content from API routes.
 * Handles auth errors, access denied, and loading states.
 */
export function useContent<T = unknown>({
  endpoint,
  params,
  autoFetch = true,
}: UseContentOptions): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAccessDenied(false);

    try {
      const url = new URL(endpoint, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      }

      const res = await fetch(url.toString());
      const json = await res.json();

      if (res.status === 401) {
        setError("Please sign in to access this content.");
        setAccessDenied(true);
        return;
      }

      if (res.status === 403) {
        setError(json.error || "Access required. Please purchase this product.");
        setAccessDenied(true);
        setPurchaseUrl(json.purchaseUrl || "/billing");
        return;
      }

      if (!res.ok) {
        setError(json.error || "Failed to load content.");
        return;
      }

      setData(json as T);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchContent();
    }
  }, [autoFetch, fetchContent]);

  return { data, loading, error, accessDenied, purchaseUrl, refetch: fetchContent };
}
