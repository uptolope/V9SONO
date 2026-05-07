"use client";

import { useEffect, type ReactNode } from "react";
import { useSession } from "next-auth/react";

/**
 * Wraps licensed educational content with client-side protection.
 * Prevents: copy, print, right-click, drag, screenshot (best-effort).
 * Adds: diagonal email watermark across all content.
 *
 * NOTE: Server-side access control is the real security layer.
 * These client protections are deterrents, not guarantees.
 */
export function ContentProtection({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl/Cmd+P (print), Ctrl/Cmd+S (save), Ctrl/Cmd+C (copy)
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (["p", "s", "c"].includes(key)) {
          const active = document.activeElement as HTMLElement;
          if (active?.closest(".protected-content") || key === "p") {
            e.preventDefault();
          }
        }
        // Block Ctrl+Shift+I (DevTools), Ctrl+U (view source)
        if (
          (e.shiftKey && key === "i") ||
          key === "u"
        ) {
          e.preventDefault();
        }
      }
      // Block PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        // Blank the clipboard
        navigator.clipboard?.writeText?.("").catch(() => {});
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
      }
    };

    // Block copy event within protected content
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".protected-content")) {
        e.preventDefault();
        e.clipboardData?.setData("text/plain", "");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div className="protected-content relative">
      {children}
      {/* Email watermark overlay — repeated diagonally across content */}
      {userEmail && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden="true"
          style={{ mixBlendMode: "soft-light" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'>
                  <text
                    x='50%' y='50%'
                    text-anchor='middle'
                    dominant-baseline='middle'
                    font-family='monospace'
                    font-size='14'
                    fill='rgba(232,228,223,0.06)'
                    transform='rotate(-30, 300, 150)'
                  >${userEmail}</text>
                </svg>`
              )}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "600px 300px",
            }}
          />
        </div>
      )}
    </div>
  );
}
