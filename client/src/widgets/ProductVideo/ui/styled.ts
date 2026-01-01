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
  textAlign: "center",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
  "@media (min-width: 1024px)": {
    fontSize: "48px",
  },
}));

export const VideoCard = styled(motion.div)(() => ({
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "24px",
  padding: "32px",
  position: "relative",
  overflow: "hidden",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(28, 13, 41, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "@media (min-width: 768px)": {
    padding: "48px",
  },
  "@media (min-width: 1024px)": {
    padding: "48px",
  },
}));

export const GradientOverlay = styled.div(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
  pointerEvents: "none",
  zIndex: 0,
}));

export const ContentWrapper = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "48px",
  alignItems: "center",
  position: "relative",
  zIndex: 10,
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
  },
}));

export const VideoContainer = styled(motion.div)(() => ({
  position: "relative",
  aspectRatio: "16 / 9",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "black",
  border: "1px solid rgba(107, 114, 128, 0.3)",
  cursor: "pointer",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
}));

export const VideoThumbnail = styled.img(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.8,
  transition: "opacity 0.3s ease",
  [`${VideoContainer}:hover &`]: {
    opacity: 1,
  },
}));

export const PlayButtonOverlay = styled.div(() => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  transition: "background-color 0.3s ease",
  [`${VideoContainer}:hover &`]: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

export const PlayButton = styled(motion.div)(() => ({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "rgba(217, 0, 230, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "4px",
  boxShadow: "0 0 20px rgba(217, 0, 230, 0.6)",
  cursor: "pointer",
  "& .material-icons": {
    fontFamily: "Material Icons",
    fontSize: "36px",
    color: "white",
  },
}));

export const TextSection = styled.div(() => ({
  display: "flex",
  gap: "24px",
  alignItems: "flex-start",
}));

export const AccentLine = styled.div(() => ({
  display: "none",
  width: "6px",
  minHeight: "150px",
  backgroundColor: "var(--color-primary)",
  borderRadius: "9999px",
  flexShrink: 0,
  "@media (min-width: 768px)": {
    display: "block",
  },
}));

export const TextContent = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
}));

export const HowToBuyTitle = styled.h3(() => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "white",
  marginBottom: "24px",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const Description = styled.div(() => ({
  fontSize: "18px",
  lineHeight: 1.75,
  color: "var(--text-secondary)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  "& p": {
    margin: 0,
  },
}));

