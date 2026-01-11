// Animation constants for expandable sections
export const EXPANDABLE_ANIMATION_CONFIG = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: "auto",
    opacity: 1,
  },
  transition: {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  },
} as const;

export const ICON_ROTATION_CONFIG = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 90 },
  transition: {
    duration: 0.3,
  },
} as const;

export const STAGGER_ANIMATION_CONFIG = {
  staggerChildren: 0.05,
  delayChildren: 0.1,
} as const;

// Section IDs for tracking expanded states
export const SECTION_IDS = {
  DESCRIPTION: "description",
  FUNCTIONS: "functions",
} as const;
