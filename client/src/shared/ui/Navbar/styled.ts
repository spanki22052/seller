"use client";

import styled from "styled-components";

export const Header = styled.div(() => ({
  position: "fixed",
  top: "16px",
  // Mobile-first: full width with side padding
  left: "12px",
  right: "12px",
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  backgroundColor: "rgba(26, 11, 46, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "12px",
  padding: "10px 16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  // Small mobile (375px+)
  "@media (min-width: 375px)": {
    left: "16px",
    right: "16px",
    padding: "12px 16px",
  },
  // Small tablets (640px+) - sidebar appears
  "@media (min-width: 640px)": {
    left: "80px", // 64px sidebar + 16px spacing
    right: "20px",
    padding: "12px 18px",
    gap: "16px",
  },
  // Tablets (768px+)
  "@media (min-width: 768px)": {
    left: "96px", // 80px sidebar + 16px spacing
    right: "24px",
    padding: "12px 20px",
  },
  // Desktop (1024px+)
  "@media (min-width: 1024px)": {
    left: "96px",
    right: "32px",
  },
  // Large desktop (1280px+)
  "@media (min-width: 1280px)": {
    left: "96px",
    right: "48px",
  },
  // Landscape mobile optimization
  "@media (max-height: 500px) and (orientation: landscape)": {
    top: "8px",
    padding: "8px 16px",
    "@media (min-width: 640px)": {
      padding: "10px 18px",
    },
  },
  // Reduced motion support
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
  },
}));

export const LogoWrapper = styled.div(() => ({
  display: "none",
  marginLeft: "auto",
  height: "32px",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "@media (min-width: 1024px)": {
    display: "flex",
    alignItems: "center",
  },
  "& img": {
    height: "100%",
    width: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 8px rgba(217, 70, 239, 0.3))",
    transition: "filter 0.3s ease",
  },
  "&:hover img": {
    filter: "drop-shadow(0 2px 12px rgba(217, 70, 239, 0.5))",
  },
}));

