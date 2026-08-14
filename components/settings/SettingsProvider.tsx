"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard.store";
import { useAuthStore } from "@/stores/auth.store";
import { Lock } from "lucide-react";

/**
 * SettingsProvider
 *
 * Mounts once at the app shell level and reactively applies every
 * setting to the DOM whenever the store changes. Also handles auto-lock
 * when configured.
 */
export function SettingsProvider() {
  const settings = useDashboardStore((s) => s.settings);
  const [isLocked, setIsLocked] = useState(false);

  // ─── Initialize Auth Listener ──────────────────────────────────────
  useEffect(() => {
    const unsub = useAuthStore.getState().initAuthListener();
    return () => unsub();
  }, []);

  // ─── Theme (dark / light / auto) ───────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;

    function apply(dark: boolean) {
      if (dark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      }
    }

    if (settings.theme === "auto") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches);
      const handler = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      apply(settings.theme === "dark");
    }
  }, [settings.theme]);

  // ─── Accent Color ──────────────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.accentColor);

    // Parse RGB components
    const hex = settings.accentColor.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Set RGB triplet for use in rgba() CSS expressions
    root.style.setProperty("--primary-rgb", `${r},${g},${b}`);

    // Derive hover variant (slightly darker)
    root.style.setProperty("--primary-hover", `rgba(${r},${g},${b},0.85)`);

    // Derive glow + glass
    root.style.setProperty("--primary-glow", `rgba(${r},${g},${b},0.35)`);
    root.style.setProperty("--shadow-glow", `0 0 30px rgba(${r},${g},${b},0.18)`);
    root.style.setProperty("--glass", `rgba(${r},${g},${b},0.05)`);
    root.style.setProperty("--glass-strong", `rgba(${r},${g},${b},0.10)`);
  }, [settings.accentColor]);

  // ─── Font Size ─────────────────────────────────────────────────────
  useEffect(() => {
    const map = { small: "14px", medium: "16px", large: "18px" } as const;
    document.documentElement.style.fontSize = map[settings.fontSize];
  }, [settings.fontSize]);

  // ─── Reduced Motion ────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-reduced-motion",
      settings.reducedMotion ? "true" : "false"
    );
  }, [settings.reducedMotion]);

  // ─── Contrast Mode ─────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-contrast",
      settings.contrastMode
    );
  }, [settings.contrastMode]);

  // ─── Auto-Lock ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!settings.autoLockTime || settings.autoLockTime <= 0) {
      setIsLocked(false);
      return;
    }

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsLocked(true);
      }, settings.autoLockTime * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [settings.autoLockTime]);

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]/95 backdrop-blur-3xl p-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 mb-6 shadow-2xl">
          <Lock size={36} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Atlas is Locked</h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-sm">
          Locked due to inactivity ({settings.autoLockTime} minute timeout).
        </p>
        <button
          onClick={() => setIsLocked(false)}
          className="rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-8 py-3.5 font-medium transition-all shadow-lg shadow-[var(--primary-glow)]"
        >
          Unlock Session
        </button>
      </div>
    );
  }

  return null;
}

