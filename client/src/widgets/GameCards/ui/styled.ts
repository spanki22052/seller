"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Section = styled.section(() => ({
  paddingTop: "48px",
  paddingBottom: "48px",
  paddingLeft: "32px",
  paddingRight: "32px",
  backgroundColor: "var(--bg-section)",
  borderTop: "1px solid var(--border-color)",
  "@media (min-width: 768px)": {
    paddingLeft: "64px",
    paddingRight: "64px",
  },
}));

export const Container = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
}));

export const Filters = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px",
  marginBottom: "40px",
  overflowX: "auto",
  paddingBottom: "16px",
}));

export const FilterLabel = styled.span(() => ({
  color: "var(--text-secondary)",
  fontWeight: 500,
  marginRight: "16px",
  flexShrink: 0,
}));

export const FilterButton = styled.button<{ $active?: boolean }>(({ $active }) => ({
  padding: "6px 20px",
  borderRadius: "9999px",
  border: `1px solid ${$active ? "var(--color-primary)" : "var(--border-color)"}`,
  backgroundColor: $active ? "rgba(217, 70, 239, 0.1)" : "transparent",
  color: $active ? "var(--color-primary)" : "var(--text-primary)",
  fontSize: "14px",
  fontWeight: $active ? 500 : 400,
  cursor: "pointer",
  transition: "all 0.3s",
  flexShrink: 0,
  "&:hover": {
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
  },
}));

export const FeaturedGame = styled(motion.div)(() => ({
  width: "100%",
  height: "256px",
  borderRadius: "16px",
  backgroundColor: "var(--bg-card)",
  position: "relative",
  overflow: "hidden",
  marginBottom: "32px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  "@media (min-width: 768px)": {
    height: "320px",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
  "&:hover h2": {
    color: "var(--color-primary)",
  },
}));

export const FeaturedImage = styled.img(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.8,
  transition: "transform 0.7s",
}));

export const FeaturedOverlay = styled.div(() => ({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent)",
}));

export const FeaturedTitle = styled.h2(() => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  color: "white",
  letterSpacing: "0.05em",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  transition: "color 0.3s",
  zIndex: 10,
  "@media (min-width: 768px)": {
    fontSize: "48px",
  },
}));

export const Grid = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "24px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

export const GameCard = styled(motion.div)(() => ({
  position: "relative",
  height: "240px",
  borderRadius: "16px",
  backgroundColor: "var(--bg-card)",
  overflow: "hidden",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    borderColor: "rgba(217, 70, 239, 0.5)",
  },
}));

export const GameImage = styled.img(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.6,
  transition: "opacity 0.3s",
  [`${GameCard}:hover &`]: {
    opacity: 0.4,
  },
}));

export const GameOverlay = styled.div(() => ({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
}));

export const GameTitle = styled.h3(() => ({
  position: "absolute",
  bottom: "24px",
  left: 0,
  right: 0,
  textAlign: "center",
  fontSize: "20px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  color: "white",
  letterSpacing: "0.05em",
  transition: "color 0.3s",
  [`${GameCard}:hover &`]: {
    color: "var(--color-primary)",
  },
}));

