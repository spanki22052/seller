"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

interface ThemeState {
  isDark: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
}

const ThemeStateContext = createContext<ThemeState | undefined>(undefined);
const ThemeActionsContext = createContext<ThemeActions | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem("color-theme", newValue ? "dark" : "light");
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };

  const state = useMemo(() => ({ isDark }), [isDark]);
  const actions = useMemo(() => ({ toggleTheme }), []);

  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  );
}

export function useThemeState() {
  const context = useContext(ThemeStateContext);
  if (!context) {
    throw new Error("useThemeState must be used within ThemeProvider");
  }
  return context;
}

export function useThemeActions() {
  const context = useContext(ThemeActionsContext);
  if (!context) {
    throw new Error("useThemeActions must be used within ThemeProvider");
  }
  return context;
}
