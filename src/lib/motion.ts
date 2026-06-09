import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language: editorial easing, short distances, no bounce.
 * Every consumer pairs these with `prefers-reduced-motion` guards.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = {
  duration: 0.7,
  ease: EASE_EDITORIAL,
};

/** Fade + small rise, revealed once on scroll. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition },
};

/** Parent that staggers its children into view. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Child line that clips up from below — used for display type on load. */
export const clipUp: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EDITORIAL },
  },
};
