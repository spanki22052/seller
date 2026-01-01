"use client";

import styled from "styled-components";

export const PageContainer = styled.div(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-sans)",
  overflow: "hidden",
  width: "100%",
  position: "relative",
  // Reduced motion support
  "@media (prefers-reduced-motion: reduce)": {
    "*": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
    },
  },
}));

export const MainContent = styled.main(() => ({
  flex: 1,
  width: "100%",
  minHeight: "100vh",
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: "var(--bg-primary)",
  // Mobile: full width, padding for navbar
  marginLeft: 0,
  paddingTop: "88px", // Account for fixed navbar
  paddingRight: "12px",
  paddingBottom: "24px",
  paddingLeft: "12px",
  // Smooth scrolling
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
  // Small mobile (320px+)
  "@media (min-width: 375px)": {
    paddingRight: "16px",
    paddingLeft: "16px",
  },
  // Small tablets (640px+) - sidebar appears
  "@media (min-width: 640px)": {
    marginLeft: "64px",
    paddingTop: "88px",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  // Tablets (768px+)
  "@media (min-width: 768px)": {
    marginLeft: "80px",
    paddingTop: "96px", // Navbar spacing adjustment
    paddingRight: "24px",
    paddingLeft: "24px",
    paddingBottom: "32px",
  },
  // Desktop (1024px+)
  "@media (min-width: 1024px)": {
    paddingTop: "96px",
    paddingRight: "32px",
    paddingLeft: "32px",
    paddingBottom: "40px",
  },
  // Large desktop (1280px+)
  "@media (min-width: 1280px)": {
    maxWidth: "1400px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingRight: "48px",
    paddingLeft: "48px",
    paddingBottom: "48px",
  },
  // Extra large screens (1536px+)
  "@media (min-width: 1536px)": {
    paddingRight: "64px",
    paddingLeft: "64px",
    paddingBottom: "64px",
  },
  // Landscape mobile optimization
  "@media (max-height: 500px) and (orientation: landscape)": {
    paddingTop: "72px",
    "@media (min-width: 768px)": {
      paddingTop: "80px",
    },
  },
}));

