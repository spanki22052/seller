import { useTheme as useStyledTheme } from "styled-components";
import { Theme } from "./index";

/**
 * Hook to access theme in styled-components
 * Provides type-safe access to theme colors and tokens
 */
export function useTheme(): Theme {
  return useStyledTheme() as Theme;
}

