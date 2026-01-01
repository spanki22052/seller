"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Section = styled.section(() => ({
  paddingTop: "64px",
  paddingBottom: "64px",
  paddingLeft: "32px",
  paddingRight: "32px",
  backgroundColor: "var(--bg-primary)",
  "@media (min-width: 768px)": {
    paddingLeft: "64px",
    paddingRight: "64px",
  },
}));

export const Container = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  "@media (min-width: 768px)": {
    gap: "48px",
  },
}));

export const Banner = styled.div(() => ({
  width: "100%",
  height: "192px",
  borderRadius: "16px",
  backgroundColor: "var(--bg-dark)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--border-color)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "@media (min-width: 768px)": {
    height: "256px",
  },
}));

export const BannerImage = styled.img(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.4,
}));

export const BannerOverlay = styled.div(() => ({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))",
}));

export const BannerTitle = styled.h2(() => ({
  position: "relative",
  zIndex: 10,
  fontSize: "24px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  color: "white",
  letterSpacing: "0.1em",
  textAlign: "center",
  padding: "0 16px",
  textTransform: "uppercase",
  "@media (min-width: 768px)": {
    fontSize: "36px",
  },
}));

export const Content = styled.div(() => ({
  maxWidth: "768px",
}));

export const Title = styled.h3(() => ({
  fontSize: "20px",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "24px",
  "@media (min-width: 768px)": {
    fontSize: "24px",
  },
}));

export const Description = styled.p(() => ({
  fontSize: "16px",
  lineHeight: "1.75",
  color: "var(--text-secondary)",
  marginBottom: "32px",
}));

export const Button = styled(motion.button)(() => ({
  background: "linear-gradient(to right, rgb(126, 34, 206), rgb(219, 39, 119))",
  color: "white",
  fontWeight: 500,
  padding: "12px 40px",
  borderRadius: "9999px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 15px -3px rgba(168, 85, 247, 0.5)",
  transition: "all 0.3s",
  "&:hover": {
    background: "linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))",
  },
}));

export const FooterText = styled.p(() => ({
  marginTop: "16px",
  fontSize: "12px",
  color: "var(--text-tertiary)",
}));

