import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.lg,
  padding: `${theme.spacing.xl} 0`,
  width: "100%",
  position: "relative",
  zIndex: 1,
}));

export const LinksContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xl,
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    gap: theme.spacing.lg,
  },
}));

export const Link = styled.a(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.5,
  color: theme.colors.text.primary,
  textDecoration: "none",
  transition: theme.transitions.fast,
  cursor: "pointer",
  "&:hover": {
    color: theme.colors.accent.purple,
    textDecoration: "underline",
  },
  "@media (max-width: 768px)": {
    fontSize: 14,
  },
}));

export const EmailInfoContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xs,
}));

export const CopyrightText = styled.div(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.text.secondary,
  textAlign: "center",
  "@media (max-width: 768px)": {
    fontSize: 12,
  },
}));

export const EmailLink = styled.a(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.text.secondary,
  textDecoration: "none",
  transition: theme.transitions.fast,
  textAlign: "center",
  "&:hover": {
    color: theme.colors.accent.purple,
    textDecoration: "underline",
  },
  "@media (max-width: 768px)": {
    fontSize: 12,
  },
}));

export const Divider = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 600,
  height: 2,
  margin: `${theme.spacing.lg} 0`,
  overflow: "visible",
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "100%",
    height: 1,
    background: theme.colors.gradient.purpleBlue,
    opacity: 0.8,
    boxShadow: `
      0 0 8px rgba(255, 0, 255, 0.533),
      0 0 16px rgba(255, 0, 255, 0.4),
      0 0 24px rgba(255, 0, 255, 0.267),
      0 0 32px rgba(59, 130, 246, 0.2)
    `,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: 3,
    background: `radial-gradient(ellipse 50% 100% at center, ${theme.colors.accent.purpleLight} 0%, ${theme.colors.accent.purple} 40%, ${theme.colors.accent.blue} 60%, transparent 80%)`,
    boxShadow: `
      0 0 12px rgba(255, 0, 255, 0.667),
      0 0 24px rgba(255, 0, 255, 0.533),
      0 0 36px rgba(255, 0, 255, 0.4),
      0 0 48px rgba(59, 130, 246, 0.267),
      inset 0 0 8px rgba(255, 102, 255, 0.2)
    `,
    filter: "blur(1.5px)",
    borderRadius: "50%",
  },
  "@media (max-width: 768px)": {
    maxWidth: "90%",
    margin: `${theme.spacing.md} 0`,
  },
}));

export const NeonGlow = styled.div(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  width: "80%",
  height: 4,
  background: `radial-gradient(ellipse 50% 100% at center, ${theme.colors.accent.purpleLight} 0%, transparent 70%)`,
  borderRadius: "50%",
  filter: "blur(3px)",
  pointerEvents: "none",
  zIndex: -1,
  willChange: "opacity",
  backfaceVisibility: "hidden",
}));

export const NeonDots = styled.div(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translate3d(0, -50%, 0)",
  width: "100%",
  height: 2,
  pointerEvents: "none",
  willChange: "opacity",
  backfaceVisibility: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "15%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: theme.colors.accent.purple,
    boxShadow: `
      0 0 8px ${theme.colors.accent.purple},
      0 0 16px rgba(255, 0, 255, 0.667),
      0 0 24px rgba(255, 0, 255, 0.533)
    `,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: "15%",
    top: "50%",
    transform: "translate(50%, -50%)",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: theme.colors.accent.blue,
    boxShadow: `
      0 0 8px ${theme.colors.accent.blue},
      0 0 16px ${theme.colors.accent.blue}aa,
      0 0 24px ${theme.colors.accent.blue}88
    `,
  },
}));
