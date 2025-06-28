// Global animation variants for Framer Motion components
// ------------------------------------------------------
// All easing arrays are asserted as a strict 4‑number tuple so that
// they satisfy Framer Motion’s `Easing` type and prevent the
// “not assignable to type 'Variants'” TypeScript error.

import type { Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Easing helpers                                                     */
/* ------------------------------------------------------------------ */

// Cubic‑bezier used for almost every “enter” animation
export const easeBezier: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

// Unified exit curve
export const easeExit: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ------------------------------------------------------------------ */
/*  Menu button (hamburger → close icon)                              */
/* ------------------------------------------------------------------ */

export const menu: Variants = {
  open: {
    width: "var(--menu-animate-width)",
    height: "var(--menu-animate-height)",
    top: "var(--menu-open-padding)",
    right: "var(--menu-open-padding)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: easeExit,
    },
  },
  closed: {
    width: "5vw",
    height: "5vw",
    top: "0",
    right: "0",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: easeExit,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Perspective nav links                                             */
/* ------------------------------------------------------------------ */

export const perspective: Variants = {
  initial: {
    opacity: 0,
    rotateX: 90,
    y: 80,
    x: -20,
  },
  // `custom` is the index of the link → stagger based on index
  enter: (custom: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + custom * 0.15,
      ease: easeBezier,
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: easeExit,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Slide‑in list items                                               */
/* ------------------------------------------------------------------ */

export const slideIn: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: easeBezier,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Box animations (utility)                                          */
/* ------------------------------------------------------------------ */

export const slideUp: Variants = {
  hidden: { opacity: 0, scale: 0.5, x: -20, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, type: "tween", ease: easeExit },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, scale: 0.5, x: -100, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, type: "tween", ease: easeExit },
  },
};

export const opacity: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ------------------------------------------------------------------ */
/*  Perspective right (used for hero / large copy)                    */
/* ------------------------------------------------------------------ */

export const perspectiveRight: Variants = {
  hidden: {
    opacity: 0,
    transform: "rotateX(-90deg) translateX(-100px) translateY(-50px)",
    transition: { duration: 1, type: "linear", ease: easeExit },
  },
  visible: (custom: number) => ({
    opacity: 1,
    transform: "rotateY(0deg) translateX(0) translateY(0)",
    transition: {
      duration: 2,
      delay: 2 + custom * 0.3,
      ease: easeBezier,
      opacity: { duration: 0.35 },
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Modal scale‑in / out                                              */
/* ------------------------------------------------------------------ */

export const modalScale: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: easeExit },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
};

/* ------------------------------------------------------------------ */
/*  Work‑layout gallery                                               */
/* ------------------------------------------------------------------ */

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.2 },
  },
};

export const imageVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const contentVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};
