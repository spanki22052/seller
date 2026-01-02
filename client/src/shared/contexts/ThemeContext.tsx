"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "@/shared/lib/theme";

type ThemeMode = "light" | "dark";

interface ThemeStateContextValue {
  mode: ThemeMode;
}

interface ThemeActionsContextValue {
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeStateContext = createContext<ThemeStateContextValue | undefined>(
  undefined
);
const ThemeActionsContext = createContext<ThemeActionsContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Suppress Ant Design React 19 compatibility warning
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalWarn = console.warn;
      console.warn = (...args: unknown[]) => {
        const message = typeof args[0] === "string" ? args[0] : "";
        // Suppress Ant Design React 19 compatibility warning
        if (
          message.includes("[antd: compatible]") ||
          message.includes("antd v5 support React is 16 ~ 18")
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };

      return () => {
        console.warn = originalWarn;
      };
    }
  }, []);

  // Initialize with dark theme immediately to prevent flash
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Only access localStorage on client side after mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        return savedTheme;
      }
    }
    return "dark";
  });

  useEffect(() => {
    // Sync with localStorage changes
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark") && savedTheme !== mode) {
      setMode(savedTheme);
    }
  }, [mode]);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const stateValue = useMemo(() => ({ mode }), [mode]);
  const actionsValue = useMemo(() => ({ toggleTheme, setTheme }), []);

  // Ant Design theme configuration matching screenshot colors
  // Memoized with stable reference to prevent re-renders
  const antdThemeConfig = useMemo(
    () => ({
      algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: theme.colors.accent.purple,
        colorSuccess: theme.colors.status.success,
        colorWarning: theme.colors.status.warning,
        colorError: theme.colors.status.error,
        colorInfo: theme.colors.status.info,
        colorBgContainer: theme.colors.bg.card,
        colorBgElevated: theme.colors.bg.secondary,
        colorBgLayout: theme.colors.bg.primary,
        colorText: theme.colors.text.primary,
        colorTextSecondary: theme.colors.text.secondary,
        colorTextTertiary: theme.colors.text.tertiary,
        colorBorder: theme.colors.border.primary,
        colorBorderSecondary: theme.colors.border.secondary,
        borderRadius: 8,
        fontFamily: "var(--font-jakarta), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        wireframe: false,
      },
      components: {
        Input: {
          colorBgContainer: theme.colors.bg.input,
          colorText: theme.colors.text.primary,
          colorBorder: theme.colors.border.primary,
          hoverBorderColor: theme.colors.accent.purple,
          activeBorderColor: theme.colors.accent.purple,
        },
        Button: {
          primaryColor: theme.colors.text.primary,
          colorPrimary: theme.colors.accent.purple,
          borderRadius: 8,
          colorBorder: theme.colors.border.secondary,
        },
        Card: {
          colorBgContainer: theme.colors.bg.card,
          borderRadius: 16,
        },
      },
    }),
    [mode]
  );

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeActionsContext.Provider value={actionsValue}>
        <StyleProvider hashPriority="high">
          <StyledThemeProvider theme={theme}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
          </StyledThemeProvider>
        </StyleProvider>
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

