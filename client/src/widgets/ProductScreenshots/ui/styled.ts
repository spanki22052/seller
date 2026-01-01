"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Section = styled.section(() => ({
  marginBottom: "96px",
  paddingLeft: "16px",
  paddingRight: "16px",
  "@media (min-width: 640px)": {
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  "@media (min-width: 1024px)": {
    paddingLeft: "32px",
    paddingRight: "32px",
  },
}));

export const Container = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
}));

export const Title = styled(motion.h2)(() => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "32px",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const Grid = styled(motion.div)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

export const ScreenshotItem = styled(motion.div)(() => ({
  aspectRatio: "16 / 9",
  backgroundColor: "var(--bg-card)",
  borderRadius: "12px",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  "&:hover": {
    backgroundColor: "var(--bg-section)",
    borderColor: "var(--color-primary)",
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
}));

