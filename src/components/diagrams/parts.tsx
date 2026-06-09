"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------
   Shared building blocks for the bespoke architecture diagrams.
   Lines draw in (pathLength); nodes fade up. All one-shot, on view.
   ---------------------------------------------------------------- */

export const diagramContainer: Variants = {
  hidden: {},
  // Tight stagger so even the dense nine-agent diagram resolves in ~2s, not ~5s.
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

export const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const edgeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type FrameProps = {
  label: string;
  fig: string;
  viewBox: string;
  children: React.ReactNode;
  /** Plain-language architecture summary for screen readers. */
  desc: string;
  /** Mobile min-width before it fits; denser diagrams need more to stay legible. */
  minWidth?: string;
  reduce?: boolean | null;
  className?: string;
};

/** Bordered diagram panel with a mono header — the "figure" chrome. */
export function DiagramFrame({ label, fig, viewBox, children, desc, minWidth = "34rem", reduce, className }: FrameProps) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line bg-surface", className)}>
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="label text-faint">{label}</span>
        <span className="font-mono text-[0.62rem] text-accent-strong">{fig}</span>
      </figcaption>

      {/* Horizontal scroll on small screens keeps labels legible instead of shrinking to nothing. */}
      <div className="overflow-x-auto bg-canvas p-4 sm:p-6">
        <div className="min-w-[var(--dgm-min)] sm:min-w-0" style={{ "--dgm-min": minWidth } as React.CSSProperties}>
          <motion.svg
            viewBox={viewBox}
            className="h-auto w-full"
            role="img"
            aria-label={`${label}. ${desc}`}
            variants={diagramContainer}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            animate={reduce ? "visible" : undefined}
            viewport={{ once: true, amount: 0.4 }}
          >
            {children}
          </motion.svg>
        </div>
      </div>

      <p className="border-t border-line px-4 py-2 text-[0.7rem] text-faint sm:hidden">Scroll the diagram horizontally to explore →</p>
    </figure>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  tone?: "default" | "accent" | "soft";
};

/** A labelled node box, theme-aware via Tailwind fill/stroke utilities. */
export function Box({ x, y, w, h, title, sub, tone = "default" }: BoxProps) {
  const cx = x + w / 2;
  return (
    <motion.g variants={nodeVariants}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        className={cn(
          "fill-surface",
          tone === "accent" ? "stroke-accent" : "stroke-line",
          tone === "soft" && "fill-inset",
        )}
        strokeWidth={1.25}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 7 : y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn("fill-ink font-sans", tone === "accent" && "fill-accent-strong")}
        style={{ fontSize: 13.5, fontWeight: 500 }}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 11}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-faint font-mono"
          style={{ fontSize: 10, letterSpacing: "0.03em" }}
        >
          {sub}
        </text>
      ) : null}
    </motion.g>
  );
}

/** A connector path. `accent` marks the primary flow. */
export function Edge({ d, accent = false, dashed = false }: { d: string; accent?: boolean; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      variants={edgeVariants}
      className={accent ? "stroke-accent" : "stroke-line"}
      strokeWidth={accent ? 1.6 : 1.25}
      strokeLinecap="round"
      strokeDasharray={dashed ? "3 4" : undefined}
    />
  );
}

/** Small endpoint marker that reads as a port/connection. */
export function Port({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) {
  return (
    <motion.circle
      variants={nodeVariants}
      cx={x}
      cy={y}
      r={2.6}
      className={accent ? "fill-accent" : "fill-faint"}
    />
  );
}

/** Free-floating mono annotation, like a hand note on a drawing. */
export function Note({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <motion.text
      variants={nodeVariants}
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-faint font-mono uppercase"
      style={{ fontSize: 9.5, letterSpacing: "0.1em" }}
    >
      {children}
    </motion.text>
  );
}
