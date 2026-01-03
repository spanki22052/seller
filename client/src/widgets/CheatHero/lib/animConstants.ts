/**
 * Animation constants for CheatHero component
 * Following Disney-inspired animation principles with 300ms sweet spot
 */

export const buttonAnimations = {
  // Entrance animation
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1], // Custom easing for natural feel
    },
  },
  
  // Hover animation - subtle scale with anticipation
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  
  // Tap animation - follow through effect
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: [0.22, 1, 0.36, 1],
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

