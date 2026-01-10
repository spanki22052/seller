export const COOKIE_INFO_FADE_IN_DURATION = 0.6;
export const COOKIE_INFO_FADE_IN_DELAY = 0.2;
export const COOKIE_INFO_STAGGER_DELAY = 0.1;

// Cookie policy sections - simplified for compact widget
export const COOKIE_SECTIONS = ["essential"] as const;

export type CookieSection = (typeof COOKIE_SECTIONS)[number];

// Animation variants for cookie sections
export const getCookieSectionVariants = (prefersReducedMotion: boolean) => ({
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: prefersReducedMotion ? 0 : 0,
    transition: {
      duration: prefersReducedMotion ? 0 : COOKIE_INFO_FADE_IN_DURATION,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

// Container animation variants
export const getContainerVariants = (prefersReducedMotion: boolean) => ({
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: prefersReducedMotion ? 0 : 0,
    transition: {
      duration: prefersReducedMotion ? 0 : COOKIE_INFO_FADE_IN_DURATION,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: prefersReducedMotion ? 0 : COOKIE_INFO_STAGGER_DELAY,
    },
  },
});

// Cookie translations (following project pattern of hardcoded text)
export const COOKIE_TRANSLATIONS = {
  title: "Файлы cookie",
  description:
    "Мы используем cookie для улучшения работы сайта. Они помогают сделать ваш опыт лучше.",
  essential: {
    title: "Необходимые cookie",
    description: "Обязательные файлы для работы сайта.",
  },
  manage: "Настроить",
  accept: "Принять",
  reject: "Отклонить",
};
