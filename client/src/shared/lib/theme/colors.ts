/**
 * Theme color tokens based on design system
 * Colors extracted from screenshot: dark space-like background with purple/blue gradients
 */

export const colors = {
  // Background colors
  bg: {
    primary: "#0a0a0a", // Deep black space background
    secondary: "#1a1a1a", // Dark grey cards
    tertiary: "#252525", // Slightly lighter grey for elevated surfaces
    input: "#1a1a1a", // Input backgrounds
    card: "#1a1a1a", // Card backgrounds
    hover: "#2a2a2a", // Hover states
  },

  // Text colors
  text: {
    primary: "#ffffff", // White text
    secondary: "#b0b0b0", // Light grey text
    tertiary: "#808080", // Medium grey text
    disabled: "#505050", // Disabled text
  },

  // Accent colors (purple/blue gradients)
  accent: {
    purple: "#8b5cf6", // Primary purple
    purpleLight: "#a78bfa", // Lighter purple
    purpleDark: "#6d28d9", // Darker purple
    blue: "#3b82f6", // Blue accent
    blueLight: "#60a5fa", // Lighter blue
    pink: "#ec4899", // Pink accent (for teaser buttons)
    pinkLight: "#f472b6", // Lighter pink
  },

  // Gradient colors
  gradient: {
    purpleBlue: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
    purpleBlueVertical: "linear-gradient(180deg, #8b5cf6 0%, #3b82f6 100%)",
    purplePink: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    glowPurple:
      "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
    glowBlue:
      "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
  },

  // Border colors
  border: {
    primary: "#2a2a2a",
    secondary: "#3a3a3a",
    accent: "#8b5cf6",
  },

  // Status colors
  status: {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },

  // Star field effect (for background dots)
  stars: {
    color: "#ffffff",
    opacity: 0.6,
  },
} as const;

export type Colors = typeof colors;
