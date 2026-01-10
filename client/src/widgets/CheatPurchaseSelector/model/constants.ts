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

/**
 * Возвращает правильно склоненное слово "день/дня/дней" в зависимости от числа
 */
export const getDaysText = (days: number): string => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${days} дней`;
  }

  if (lastDigit === 1) {
    return `${days} день`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${days} дня`;
  }

  return `${days} дней`;
};
