"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { revealUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Render the staggering parent variant instead of a single reveal. */
  group?: boolean;
};

/**
 * Scroll-triggered reveal. Honors reduced-motion by rendering statically.
 *
 * Uses a dedicated IntersectionObserver rather than framer's `whileInView`:
 *  - If the element is already in view on mount (hash-navigation like `/#contact`,
 *    or a direct project URL loaded scrolled-in), it reveals immediately.
 *  - Otherwise it observes and reveals the first time it enters the viewport.
 * A real IO fires reliably even for instant hash jumps (clicking "Contact"),
 * where `whileInView` could leave a section transiently — or stubbornly — blank.
 */
export function Reveal({ children, className, group = false, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={reduce ? undefined : group ? stagger : revealUp}
      initial={reduce ? false : "hidden"}
      // Reduced motion: force fully-visible explicitly. The server renders
      // `initial="hidden"` (it can't read the motion preference), so an explicit
      // value is needed to clear that inline opacity:0 on the client.
      animate={reduce ? { opacity: 1, y: 0 } : revealed ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** A reveal child for use inside a `group` Reveal — inherits the parent's stagger. */
export function RevealItem({ children, className, ...props }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={reduce ? undefined : revealUp}
      // Under reduced motion, clear any inherited hidden state explicitly;
      // otherwise inherit the parent group's staggered reveal.
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
