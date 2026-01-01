"use client";

import styled from "styled-components";

export const FeaturesContainer = styled.div(() => ({
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
  paddingTop: "32px",
  paddingBottom: "40px",
  borderTop: "1px solid var(--border-color)",
}));

export const Title = styled.h3(() => ({
  fontSize: "20px",
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  color: "var(--text-primary)",
  marginBottom: "32px",
  opacity: 0.5,
  "@media (min-width: 768px)": {
    fontSize: "24px",
  },
}));

export const Grid = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "32px",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "32px",
  },
}));

export const FeatureCard = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "12px",
}));

export const Icon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "32px",
  color: "var(--color-primary)",
}));

export const FeatureTitle = styled.span(() => ({
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--text-primary)",
}));

export const FeatureDesc = styled.span(() => ({
  fontSize: "12px",
  color: "var(--text-secondary)",
}));

