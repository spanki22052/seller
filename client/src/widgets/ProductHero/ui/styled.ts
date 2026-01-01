"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroSection = styled.section(() => ({
  position: "relative",
  paddingTop: "80px",
  minHeight: "100vh",
  overflow: "hidden",
  background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%), radial-gradient(circle at 90% 20%, rgba(217, 0, 219, 0.1), transparent 50%)",
  "@media (prefers-color-scheme: dark)": {
    background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%), radial-gradient(circle at 90% 20%, rgba(217, 0, 219, 0.1), transparent 50%)",
  },
}));

export const BackgroundGlow1 = styled.div(() => ({
  position: "absolute",
  top: "80px",
  right: 0,
  width: "500px",
  height: "500px",
  backgroundColor: "rgba(139, 92, 246, 0.2)",
  borderRadius: "50%",
  filter: "blur(100px)",
  pointerEvents: "none",
  "@media (max-width: 768px)": {
    width: "300px",
    height: "300px",
  },
}));

export const BackgroundGlow2 = styled.div(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "600px",
  height: "600px",
  backgroundColor: "rgba(59, 130, 246, 0.1)",
  borderRadius: "50%",
  filter: "blur(120px)",
  pointerEvents: "none",
  "@media (max-width: 768px)": {
    width: "400px",
    height: "400px",
  },
}));

export const Container = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "48px 16px",
  position: "relative",
  zIndex: 10,
  "@media (min-width: 640px)": {
    padding: "48px 24px",
  },
  "@media (min-width: 1024px)": {
    padding: "48px 32px",
  },
}));

export const ContentWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  alignItems: "flex-start",
  marginBottom: "96px",
}));

export const TextSection = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
}));

export const BrandLabel = styled.span(() => ({
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
}));

export const Title = styled.h1(() => ({
  fontSize: "36px",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "var(--text-primary)",
  "@media (min-width: 768px)": {
    fontSize: "48px",
  },
}));

export const Subtitle = styled.span(() => ({
  display: "block",
  marginTop: "16px",
  fontSize: "24px",
  fontWeight: 400,
  color: "var(--text-secondary)",
  "@media (min-width: 768px)": {
    fontSize: "32px",
  },
}));

export const ButtonGroup = styled(motion.div)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
}));

export const PrimaryButton = styled(motion.button)(() => ({
  padding: "12px 32px",
  borderRadius: "9999px",
  backgroundColor: "var(--color-primary)",
  color: "white",
  fontWeight: 600,
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 0 15px rgba(217, 0, 219, 0.5)",
  "&:hover": {
    backgroundColor: "#c200d1",
    boxShadow: "0 0 20px rgba(217, 0, 219, 0.7)",
  },
}));

export const SecondaryButton = styled(motion.button)(() => ({
  padding: "12px 32px",
  borderRadius: "9999px",
  backgroundColor: "transparent",
  color: "var(--text-primary)",
  fontWeight: 500,
  fontSize: "16px",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
  },
}));

export const TelegramNote = styled.p(() => ({
  fontSize: "16px",
  color: "var(--text-secondary)",
  maxWidth: "512px",
  lineHeight: 1.6,
}));

export const InfoSection = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  width: "100%",
  marginTop: "16px",
  "@media (min-width: 768px)": {
    alignItems: "flex-start",
  },
}));

export const InfoTitle = styled.h2(() => ({
  fontSize: "28px",
  fontWeight: 700,
  color: "var(--text-primary)",
  textAlign: "left",
  "@media (min-width: 768px)": {
    fontSize: "36px",
  },
}));

export const InfoList = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "18px",
}));

export const InfoItem = styled.div(() => ({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
  color: "var(--text-secondary)",
}));

export const InfoLabel = styled.span(() => ({
  color: "var(--color-primary)",
  fontWeight: 500,
}));

export const InfoText = styled.span(() => ({
  color: "var(--text-secondary)",
}));

export const InfoValue = styled.span(() => ({
  color: "var(--text-primary)",
}));

export const ReviewsButton = styled(motion.button)(() => ({
  marginTop: "16px",
  padding: "12px 40px",
  borderRadius: "9999px",
  backgroundColor: "transparent",
  color: "var(--text-primary)",
  fontWeight: 500,
  fontSize: "14px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
    backgroundColor: "rgba(217, 70, 239, 0.05)",
  },
}));

