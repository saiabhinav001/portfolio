"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn(
        "group relative grid h-11 w-11 place-items-center rounded-full border border-line text-muted",
        "transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:text-accent",
        className,
      )}
    >
      <span className="relative h-[18px] w-[18px]">
        {mounted ? (
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={reduce ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              {isDark ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
            </motion.span>
          </AnimatePresence>
        ) : null}
      </span>
    </button>
  );
}
