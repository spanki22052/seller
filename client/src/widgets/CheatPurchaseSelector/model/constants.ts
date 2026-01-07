export const SELECTOR_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const SELECTOR_ANIMATION_REDUCED = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0 },
  },
};
