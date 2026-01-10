"use client";

import { useState } from "react";

export type CookieConsent = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "cookie_consent";

export const useCookies = () => {
  // Проверяем localStorage сразу при инициализации
  const getInitialConsent = () => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem(COOKIE_CONSENT_KEY)
          : null;
      return stored === "accepted" || stored === "rejected" ? stored : null;
    } catch {
      return null;
    }
  };

  const [consent, setConsent] = useState<CookieConsent>(getInitialConsent);

  const acceptCookies = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      setConsent("accepted");
    } catch (error) {
      console.warn("Failed to save cookie consent to localStorage:", error);
    }
  };

  const rejectCookies = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
      setConsent("rejected");
    } catch (error) {
      console.warn("Failed to save cookie consent to localStorage:", error);
    }
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsent(null);
    } catch (error) {
      console.warn("Failed to reset cookie consent in localStorage:", error);
    }
  };

  // Показывать виджет только если согласие не было дано
  const shouldShowWidget = consent === null;

  return {
    consent,
    shouldShowWidget,
    acceptCookies,
    rejectCookies,
    resetConsent,
  };
};
