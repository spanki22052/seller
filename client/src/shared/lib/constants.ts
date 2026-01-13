// Animation constants
export const ANIMATION_CONFIG = {
  easing: [0.22, 1, 0.36, 1] as const,
  containerDuration: 0.6,
  itemDuration: 0.5,
  expandDuration: 0.3,
  staggerDelay: 0.1,
} as const;

// Keyboard constants
export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
} as const;

// Loading constants
export const LOADING_CONFIG = {
  skeletonItemsCount: 5,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FAQ_LOAD_FAILED: "Произошла ошибка при загрузке FAQ. Пожалуйста, попробуйте позже.",
} as const;

