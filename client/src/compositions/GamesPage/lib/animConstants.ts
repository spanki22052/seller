/**
 * Animation constants for GamesPage component
 * Light, subtle animations for category switching following best UX practices
 */

export const gamesPageAnimations = {
  // Container animation for games grid - fade transition with subtle movement
  gamesGridContainer: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.08,
        ease: [0.25, 0.46, 0.45, 0.94], // Ease out for smooth feel
        staggerChildren: prefersReducedMotion ? 0 : 0.01, // Subtle stagger for grid items
        delayChildren: prefersReducedMotion ? 0 : 0.02,
      },
    },
    exit: {
      opacity: prefersReducedMotion ? 0 : 0,
      y: prefersReducedMotion ? 0 : -5,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }),

  // Individual game card animation - subtle scale and fade
  gameCard: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.95, y: 8 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }),

  // Empty state animation - gentle fade in
  emptyState: (prefersReducedMotion: boolean) => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: prefersReducedMotion ? 0 : 0.03,
      },
    },
  }),
} as const;
