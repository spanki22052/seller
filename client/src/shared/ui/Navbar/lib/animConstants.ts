/**
 * Animation constants for Navbar component
 * Following Disney-inspired animation principles with 300ms sweet spot
 */

export const navbarAnimations = {
  container: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }),

  link: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -10 },
    visible: (index: number) => ({
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }),

  mobileMenu: (prefersReducedMotion: boolean) => ({
    closed: {
      opacity: prefersReducedMotion ? 0 : 0,
      height: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }),

  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  tap: {
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

