/**
 * Animation constants for ImageModal component
 * Following Disney-inspired animation principles with 300ms sweet spot
 */

export const imageModalAnimations = {
  backdrop: (prefersReducedMotion: boolean) => ({
    hidden: {
      opacity: prefersReducedMotion ? 0 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }),

  image: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.1,
      },
    },
    exit: {
      opacity: prefersReducedMotion ? 0 : 0,
      scale: prefersReducedMotion ? 1 : 0.8,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }),

  closeButton: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.8,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: prefersReducedMotion
      ? {}
      : {
          scale: 1.1,
          transition: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          },
        },
    tap: prefersReducedMotion
      ? {}
      : {
          scale: 0.9,
          transition: {
            duration: 0.1,
            ease: [0.22, 1, 0.36, 1],
          },
        },
  }),
} as const;

