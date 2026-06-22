"use client";

import { useEffect, type ReactNode } from "react";
import { useSession } from "next-auth/react";

/**
 * SonoPrep — ContentProtection
 *
 * Wraps ALL licensed educational content with layered client-side deterrents.
 *
 * What it does:
 *   - Blocks right-click context menu on protected content
 *   - Blocks Ctrl/Cmd+C (copy), Ctrl/Cmd+P (print), Ctrl/Cmd+S (save)
 *   - Blocks Ctrl+Shift+I (DevTools shortcut), Ctrl+U (view source)
 *   - Blocks PrintScreen key and attempts to clear clipboard
 *   - Blocks drag-select events on protected content
 *   - Blocks copy clipboard events within protected content
 *   - Overlays a repeating diagonal email watermark on all content
 *   - Shows a copyright badge in the bottom-right corner
 *
 * Important: These are deterrents, NOT absolute guarantees.
 * The REAL protection is server-side: content is only served to
 * authenticated users with an active purchase (checkContentAccess).
 * This component makes casual copying harder and creates a forensic
 * trail via the email watermark.
 *
 * NEVER remove the server-side purchase check in the API routes.
 * This component is the deterrent layer; the API route is the lock.
 */
export function ContentProtection({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  useEffect(() => {
    /* ── Block right-click on protected areas ── */
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
      }
    };

    /* ── Block key combinations ── */
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        // Block print (p), save (s) globally — these would print/save the page
        if (key === "p" || key === "s") {
          e.preventDefault();
          return;
        }
        // Block copy (c) and cut (x) only within protected content
        if (key === "c" || key === "x") {
          const active = document.activeElement as HTMLElement;
          if (active?.closest(".protected-content")) {
            e.preventDefault();
            return;
          }
        }
        // Block DevTools (Shift+I), view source (u), find in page (f on some browsers)
        if (e.shiftKey && key === "i") {
          e.preventDefault();
          return;
        }
        if (key === "u") {
          e.preventDefault();
          return;
        }
      }

      // Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Block PrintScreen — attempt to clear clipboard afterward
      if (e.key === "PrintScreen") {
        e.preventDefault();
        // Best-effort clipboard clear — may not work in all browsers
        try {
          navigator.clipboard?.writeText?.("").catch(() => {});
        } catch {}
      }
    };

    /* ── Block drag events on protected content ── */
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
      }
    };

    /* ── Block clipboard copy from protected content ── */
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
        // Write empty string — blocks any text lift
        try {
          e.clipboardData?.setData("text/plain", "");
        } catch {}
      }
    };

    /* ── Block clipboard cut from protected content ── */
    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
      }
    };

    /* ── Block selection on protected content ── */
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content.no-select")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu",  handleContextMenu);
    document.addEventListener("keydown",       handleKeyDown);
    document.addEventListener("dragstart",     handleDragStart);
    document.addEventListener("copy",          handleCopy);
    document.addEventListener("cut",           handleCut);
    document.addEventListener("selectstart",   handleSelectStart);

    return () => {
      document.removeEventListener("contextmenu",  handleContextMenu);
      document.removeEventListener("keydown",       handleKeyDown);
      document.removeEventListener("dragstart",     handleDragStart);
      document.removeEventListener("copy",          handleCopy);
      document.removeEventListener("cut",           handleCut);
      document.removeEventListener("selectstart",   handleSelectStart);
    };
  }, []);

  return (
    <div className="protected-content relative">
      {children}

      {/* ── Email watermark — diagonal, repeated across all content ── */}
      {userEmail && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
          aria-hidden="true"
          style={{ mixBlendMode: "soft-light" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='700' height='350'>
                  <text
                    x='50%' y='40%'
                    text-anchor='middle'
                    dominant-baseline='middle'
                    font-family='monospace'
                    font-size='13'
                    fill='rgba(232,228,223,0.055)'
                    transform='rotate(-28, 350, 175)'
                  >${userEmail}</text>
                  <text
                    x='50%' y='75%'
                    text-anchor='middle'
                    dominant-baseline='middle'
                    font-family='monospace'
                    font-size='10'
                    fill='rgba(232,228,223,0.04)'
                    transform='rotate(-28, 350, 175)'
                  >SonoPrep • Licensed Content</text>
                </svg>`
              )}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "700px 350px",
            }}
          />
        </div>
      )}

      {/* ── Copyright badge — bottom-right corner of content block ── */}
      <div
        className="pointer-events-none absolute bottom-2 right-3 z-20 select-none"
        aria-hidden="true"
      >
        <p
          className="font-mono"
          style={{ fontSize: "0.5rem", color: "rgba(232,228,223,0.12)", letterSpacing: "0.08em" }}
        >
          © {new Date().getFullYear()} SonoPrep — Licensed to {userEmail || "user"} — Unauthorized reproduction prohibited
        </p>
      </div>
    </div>
  );
}
