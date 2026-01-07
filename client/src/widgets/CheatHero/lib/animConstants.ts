/**
 * Animation constants for CheatHero component
 * Minimal animations for professional feel
 */

export const buttonAnimations = {
  // Entrance animation
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  // Minimal hover animation
  hover: {
    opacity: 0.9,
    transition: {
      duration: 0.2,
    },
  },

  // Minimal tap animation
  tap: {
    opacity: 0.8,
    transition: {
      duration: 0.1,
    },
  },

  // Reduced motion variants
  reducedMotion: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    hover: {},
    tap: {},
  },
} as const;

