"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Section = styled.section(() => ({
  marginBottom: "96px",
  position: "relative",
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
  position: "relative",
}));

export const Title = styled(motion.h2)(() => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "48px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const FeaturesCard = styled(motion.div)(() => ({
  backgroundColor: "var(--bg-primary)",
  borderTop: "1px solid var(--border-color)",
  borderBottom: "1px solid var(--border-color)",
  padding: "32px",
  position: "relative",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(28, 13, 41, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "@media (min-width: 768px)": {
    padding: "32px 48px",
  },
}));

export const Header = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "24px",
}));

export const FunctionalityTitle = styled.h3(() => ({
  fontSize: "20px",
  fontWeight: 700,
  color: "var(--color-primary)",
  textTransform: "uppercase",
  "@media (min-width: 768px)": {
    fontSize: "24px",
  },
}));

export const ExpandButton = styled(motion.button)(() => ({
  backgroundColor: "transparent",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "var(--color-primary)",
  },
  "& .material-icons": {
    fontFamily: "Material Icons",
    fontSize: "28px",
  },
}));

export const Content = styled(motion.div)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "32px",
  color: "var(--text-secondary)",
  fontSize: "14px",
  lineHeight: 1.75,
  overflow: "hidden",
  maxHeight: "400px",
  overflowY: "auto",
  paddingRight: "8px",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    maxHeight: "500px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(217, 70, 239, 0.3)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(217, 70, 239, 0.5)",
    },
  },
}));

export const LeftColumn = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const RightColumn = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const OpenMenuText = styled.p(() => ({
  marginBottom: "16px",
  color: "var(--text-secondary)",
}));

export const CategoryTitle = styled.h4(() => ({
  fontSize: "16px",
  fontWeight: 500,
  color: "white",
  marginTop: "16px",
  marginBottom: "8px",
  "@media (min-width: 768px)": {
    fontSize: "18px",
  },
}));

export const FeatureList = styled.ul(() => ({
  listStyle: "disc",
  paddingLeft: "20px",
  color: "var(--text-tertiary)",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  "& li": {
    fontSize: "14px",
    lineHeight: 1.5,
  },
}));

