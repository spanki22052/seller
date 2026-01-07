export const COOKIE_INFO_FADE_IN_DURATION = 0.6;
export const COOKIE_INFO_FADE_IN_DELAY = 0.2;
export const COOKIE_INFO_STAGGER_DELAY = 0.1;

// Cookie policy sections
export const COOKIE_SECTIONS = [
  "essential",
  "analytics",
  "marketing",
  "preferences"
] as const;

export type CookieSection = typeof COOKIE_SECTIONS[number];

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
  title: "Cookie Policy",
  description: "We use cookies to enhance your experience on our website. Learn more about how we use cookies and your privacy rights.",
  essential: {
    title: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly and cannot be disabled."
  },
  analytics: {
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
  },
  marketing: {
    title: "Marketing Cookies",
    description: "These cookies are used to track visitors across websites to display relevant advertisements."
  },
  preferences: {
    title: "Preference Cookies",
    description: "These cookies enable the website to remember choices you make and provide enhanced features."
  },
  manage: "Manage Cookies",
  accept: "Accept All",
  reject: "Reject Non-Essential",
  learnMore: "Learn More"
};
