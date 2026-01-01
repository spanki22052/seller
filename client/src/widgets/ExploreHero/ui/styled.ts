"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroSection = styled(motion.section)(() => ({
  paddingBottom: "16px",
  borderBottom: "1px solid var(--border-color)",
  marginBottom: "24px",
  "@media (prefers-color-scheme: dark)": {
    borderColor: "rgba(54, 35, 72, 1)",
  },
}));

export const ContentWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  "@media (min-width: 768px)": {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
}));

export const TextSection = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const Title = styled.h1(() => ({
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "var(--text-primary)",
  letterSpacing: "-0.02em",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const Description = styled.p(() => ({
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  maxWidth: "512px",
  marginTop: "8px",
  "@media (min-width: 768px)": {
    fontSize: "16px",
  },
}));

export const StatsSection = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
  "@media (min-width: 768px)": {
    alignItems: "flex-end",
  },
}));

export const StatNumber = styled.span(() => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "var(--color-primary)",
  lineHeight: 1,
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const StatLabel = styled.span(() => ({
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  "@media (min-width: 768px)": {
    fontSize: "14px",
  },
}));

