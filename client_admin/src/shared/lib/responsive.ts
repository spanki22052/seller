// Responsive breakpoints and utilities
export const BREAKPOINTS = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export const MEDIA_QUERIES = {
  xs: `@media (max-width: ${BREAKPOINTS.xs}px)`,
  sm: `@media (max-width: ${BREAKPOINTS.sm}px)`,
  md: `@media (max-width: ${BREAKPOINTS.md}px)`,
  lg: `@media (max-width: ${BREAKPOINTS.lg}px)`,
  xl: `@media (max-width: ${BREAKPOINTS.xl}px)`,
  minSm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  minMd: `@media (min-width: ${BREAKPOINTS.md}px)`,
  minLg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  minXl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
} as const;

// Spacing constants for consistent padding/margins
export const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Container max widths
export const CONTAINER_WIDTHS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

