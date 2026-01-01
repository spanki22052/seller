"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroSection = styled.section(() => ({
  position: "relative",
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  paddingTop: "32px",
  paddingLeft: "32px",
  paddingRight: "32px",
  paddingBottom: "32px",
  background: "radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(5, 5, 5, 0) 60%)",
  "@media (min-width: 768px)": {
    paddingLeft: "64px",
    paddingRight: "64px",
  },
}));

export const HeroContent = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
  flex: 1,
  "@media (min-width: 1024px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "48px",
  },
}));

export const HeroTextWrapper = styled.div(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  "@media (min-width: 1024px)": {
    width: "45%",
  },
}));

export const HeroText = styled(motion.p)(() => ({
  fontSize: "16px",
  lineHeight: "1.75",
  color: "var(--text-secondary)",
  maxWidth: "576px",
  width: "100%",
  "@media (min-width: 768px)": {
    fontSize: "18px",
  },
}));

export const DiscountText = styled.span(() => ({
  display: "block",
  marginTop: "16px",
  color: "var(--color-primary)",
  fontWeight: 500,
}));

export const ButtonGroup = styled(motion.div)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  paddingTop: "16px",
}));

export const LinkButton = styled.button(() => ({
  fontSize: "18px",
  fontWeight: 500,
  color: "var(--text-primary)",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "color 0.3s",
  "&:hover": {
    color: "var(--color-primary)",
  },
}));

export const PrimaryButton = styled.button(() => ({
  padding: "12px 32px",
  borderRadius: "9999px",
  border: "1px solid var(--border-color)",
  color: "var(--text-primary)",
  backgroundColor: "transparent",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "var(--color-primary)",
  },
}));

export const HeroImage = styled.div(() => ({
  width: "100%",
  position: "relative",
  height: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "40px",
  "@media (min-width: 768px)": {
    height: "700px",
  },
  "@media (min-width: 1024px)": {
    width: "55%",
    height: "80vh",
    minHeight: "700px",
    flexShrink: 0,
    marginTop: 0,
  },
}));

export const GlowEffect = styled.div(() => ({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(217, 70, 239, 0.2)",
  filter: "blur(100px)",
  borderRadius: "50%",
  pointerEvents: "none",
}));

export const ImageContainer = styled(motion.div)(() => ({
  position: "relative",
  zIndex: 10,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const HeroImgWrapper = styled.div(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  maxHeight: "none",
  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
  opacity: 0.9,
  "@media (min-width: 768px)": {
    width: "100%",
    height: "100%",
  },
  "@media (min-width: 1024px)": {
    width: "100%",
    height: "100%",
  },
  "@media (prefers-color-scheme: dark)": {
    mixBlendMode: "lighten",
    filter: "grayscale(30%) contrast(125%) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
  },
  "& img": {
    objectFit: "contain",
  },
}));

export const TeaserButton = styled(motion.button)(() => ({
  position: "absolute",
  bottom: "40px",
  right: "40px",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: "2px solid rgba(217, 70, 239, 0.5)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 20,
  transition: "all 0.3s",
  "@media (min-width: 1024px)": {
    right: 0,
    bottom: "80px",
    width: "96px",
    height: "96px",
  },
  "&:hover": {
    borderColor: "var(--color-primary)",
  },
}));

export const TeaserText = styled.span(() => ({
  fontSize: "10px",
  fontWeight: 700,
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "4px",
  transition: "color 0.3s",
  "@media (min-width: 768px)": {
    fontSize: "12px",
  },
  [`${TeaserButton}:hover &`]: {
    color: "var(--color-primary)",
  },
}));

export const TeaserLine = styled.div(() => ({
  width: "40px",
  height: "1px",
  backgroundColor: "rgba(217, 70, 239, 0.5)",
  transition: "all 0.3s",
  [`${TeaserButton}:hover &`]: {
    width: "48px",
    backgroundColor: "var(--color-primary)",
  },
}));

