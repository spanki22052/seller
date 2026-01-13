import { Variants } from "framer-motion";

export const createTextVariants = (prefersReducedMotion: boolean): Variants => ({
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: prefersReducedMotion ? 0 : 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const createImageVariants = (prefersReducedMotion: boolean): Variants => ({
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: prefersReducedMotion ? 0 : 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      delay: prefersReducedMotion ? 0 : 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});
