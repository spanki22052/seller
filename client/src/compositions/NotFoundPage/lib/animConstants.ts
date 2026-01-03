/**
 * Animation constants for NotFoundPage component
 * Following Disney-inspired animation principles with 300ms sweet spot
 */

export const pageAnimations = {
  // Container entrance - staggered children
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },

  // 404 number animation - dramatic entrance
  number404: {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Error label animation - fade in from left
  errorText: {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  },

  // Garbled text animation - fade in with glitch
  garbledText: {
    hidden: { 
      opacity: 0, 
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  },

  // Button animation - entrance with anticipation
  button: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
      },
    },
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
  },

  // Reduced motion variants
  reducedMotion: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0,
          delayChildren: 0,
        },
      },
    },
    number404: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0,
        },
      },
    },
    errorText: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0,
        },
      },
    },
    garbledText: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0,
        },
      },
    },
    button: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0,
        },
      },
      hover: {},
      tap: {},
    },
  },
} as const;

