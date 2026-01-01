"use client";

import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
};

// Initialize i18next synchronously at module level
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Ensure i18next is initialized (fallback for edge cases)
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.use(initReactI18next).init({
        resources,
        lng: "ru",
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });
    }
  }, []);

  return <>{children}</>;
}

