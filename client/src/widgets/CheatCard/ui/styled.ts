"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Card = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  overflow: "hidden",
  height: "100%",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(38, 25, 51, 1)",
    borderColor: "rgba(54, 35, 72, 1)",
  },
  "&:hover": {
    borderColor: "rgba(127, 19, 236, 0.5)",
    boxShadow: "0 0 20px rgba(127, 19, 236, 0.15)",
  },
}));

export const ImageContainer = styled.div(() => ({
  position: "relative",
  height: "192px",
  width: "100%",
  overflow: "hidden",
}));

export const BadgesContainer = styled.div(() => ({
  position: "absolute",
  top: "12px",
  left: "12px",
  zIndex: 10,
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
}));

export const StatusBadge = styled.div<{
  $bgColor: string;
  $textColor: string;
  $borderColor: string;
}>(({ $bgColor, $textColor, $borderColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 700,
  backgroundColor: $bgColor,
  color: $textColor,
  border: `1px solid ${$borderColor}`,
  backdropFilter: "blur(4px)",
}));

export const StatusDot = styled.span<{ $color: string }>(({ $color }) => ({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: $color,
  marginRight: "6px",
}));

export const NewBadge = styled.div(() => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 700,
  backgroundColor: "rgba(127, 19, 236, 0.1)",
  color: "var(--color-primary)",
  border: "1px solid rgba(127, 19, 236, 0.2)",
  backdropFilter: "blur(4px)",
}));

export const ImageWrapper = styled.div(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transition: "transform 0.7s ease",
  [`${Card}:hover &`]: {
    transform: "scale(1.1)",
  },
}));

export const ImageOverlay = styled.div(() => ({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(38, 25, 51, 0.9), transparent)",
  opacity: 0.9,
}));

export const Content = styled.div(() => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));

export const Header = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "8px",
}));

export const Title = styled.h3(() => ({
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "var(--text-primary)",
  transition: "color 0.3s ease",
  [`${Card}:hover &`]: {
    color: "var(--color-primary)",
  },
}));

export const Version = styled.span(() => ({
  fontSize: "12px",
  fontFamily: "monospace",
  color: "var(--text-tertiary)",
  backgroundColor: "var(--bg-section)",
  padding: "4px 8px",
  borderRadius: "4px",
  border: "1px solid var(--border-color)",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(26, 17, 34, 1)",
    borderColor: "rgba(54, 35, 72, 1)",
  },
}));

export const Description = styled.p(() => ({
  fontSize: "14px",
  lineHeight: 1.75,
  color: "var(--text-secondary)",
  marginBottom: "16px",
  flex: 1,
}));

export const Footer = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "16px",
  borderTop: "1px solid var(--border-color)",
  "@media (prefers-color-scheme: dark)": {
    borderColor: "rgba(54, 35, 72, 0.5)",
  },
}));

export const UpdatedInfo = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "12px",
  color: "var(--text-tertiary)",
}));

export const UpdateIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "16px",
}));

export const ViewButton = styled(motion.button)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 700,
  color: "white",
  backgroundColor: "var(--color-primary)",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(127, 19, 236, 0.9)",
  },
}));

export const ArrowIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "18px",
}));

export const UnsafeButton = styled.button(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 700,
  color: "white",
  backgroundColor: "rgba(127, 19, 236, 0.2)",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "not-allowed",
  opacity: 0.5,
}));

export const WarningIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "18px",
}));

