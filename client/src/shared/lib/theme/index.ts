import { colors } from "./colors";

export const theme = {
  colors,
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.4)",
    glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    glowBlue: "0 0 20px rgba(59, 130, 246, 0.3)",
  },
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
  },
} as const;

export type Theme = typeof theme;

// Default export for styled-components theme
export default theme;

