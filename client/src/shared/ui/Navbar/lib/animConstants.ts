/**
 * Animation constants for Navbar component
 * Following Disney-inspired animation principles with 300ms sweet spot
 */

export const navbarAnimations = {
  container: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }),

  link: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -8 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }),

  mobileMenu: (prefersReducedMotion: boolean) => ({
    closed: {
      opacity: prefersReducedMotion ? 0 : 0,
      height: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  }),

  mobileLink: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0, x: 0 }
      : { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }),

  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },

  tap: {
    scale: 0.96,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
} as const;


