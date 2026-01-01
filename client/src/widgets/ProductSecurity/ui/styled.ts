"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Section = styled.section(() => ({
  marginBottom: "48px",
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
  marginBottom: "48px",
  textAlign: "left",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "48px",
  },
}));

export const Grid = styled(motion.div)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

export const Card = styled(motion.div)(() => ({
  backgroundColor: "var(--bg-primary)",
  border: "1px solid var(--border-color)",
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(28, 13, 41, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  "&:hover": {
    borderColor: "var(--color-primary)",
    "@media (prefers-color-scheme: dark)": {
      borderColor: "rgba(217, 0, 230, 0.5)",
    },
  },
}));

export const IconContainer = styled.div(() => ({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: "rgba(217, 0, 230, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-primary)",
  "& .material-icons": {
    fontFamily: "Material Icons",
    fontSize: "24px",
  },
}));

export const CardTitle = styled.h3(() => ({
  fontSize: "20px",
  fontWeight: 700,
  color: "var(--text-primary)",
  margin: 0,
}));

export const CardDescription = styled.p(() => ({
  fontSize: "14px",
  color: "var(--text-secondary)",
  margin: 0,
  lineHeight: 1.5,
}));

