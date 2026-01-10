export const TESTIMONIALS_CONFIG = {
  SLIDES_PER_VIEW: 1,
  SPACE_BETWEEN: 20,
  AUTOPLAY_DELAY: 5000,
  BREAKPOINTS: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
} as const;

export const STAR_RATING = {
  MAX_STARS: 5,
  FILLED_STAR: "★",
  EMPTY_STAR: "☆",
} as const;
