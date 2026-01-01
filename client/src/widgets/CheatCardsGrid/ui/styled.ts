"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Grid = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px",
  marginTop: "16px",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const LoadMoreWrapper = styled(motion.div)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "32px",
}));

export const LoadMoreButton = styled(motion.button)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 24px",
  borderRadius: "8px",
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  color: "var(--text-primary)",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(38, 25, 51, 1)",
    borderColor: "rgba(54, 35, 72, 1)",
  },
  "&:hover": {
    backgroundColor: "var(--bg-section)",
    borderColor: "rgba(54, 35, 72, 1)",
  },
}));

export const LoadMoreIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "20px",
}));

