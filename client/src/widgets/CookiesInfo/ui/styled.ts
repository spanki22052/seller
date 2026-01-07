import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,
  padding: theme.spacing.xl,
  backgroundColor: theme.colors.bg.secondary,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.primary}`,
  overflow: "hidden",
  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
}));

export const Header = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  textAlign: "center",
  "@media (max-width: 768px)": {
    textAlign: "left",
  },
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors.text.primary,
  margin: 0,
  background: theme.colors.gradient.purpleBlue,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  "@media (max-width: 768px)": {
    fontSize: 28,
  },
  "@media (max-width: 480px)": {
    fontSize: 24,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
  margin: 0,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  "@media (max-width: 768px)": {
    marginLeft: 0,
    marginRight: 0,
  },
}));

export const CookieSections = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: theme.spacing.lg,
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
}));

export const CookieSection = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  padding: theme.spacing.lg,
  backgroundColor: theme.colors.bg.tertiary,
  borderRadius: theme.borderRadius.md,
  border: `1px solid ${theme.colors.border.secondary}`,
  transition: `all ${theme.transitions.fast}`,
  "&:hover": {
    borderColor: theme.colors.border.accent,
    boxShadow: theme.shadows.sm,
  },
}));

export const SectionIcon = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: theme.borderRadius.full,
  backgroundColor: theme.colors.accent.purple,
  color: theme.colors.text.primary,
  fontSize: 20,
  fontWeight: 600,
  flexShrink: 0,
}));

export const SectionContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const SectionTitle = styled.h3(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.3,
  color: theme.colors.text.primary,
  margin: 0,
}));

export const SectionDescription = styled.p(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.text.secondary,
  margin: 0,
}));

export const Actions = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.md,
  justifyContent: "center",
  flexWrap: "wrap",
  "@media (max-width: 480px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ActionButton = styled.button<{ variant?: "primary" | "secondary" }>(({ theme, variant = "primary" }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.md,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  transition: `all ${theme.transitions.fast}`,
  border: "none",
  minWidth: 120,
  ...(variant === "primary" && {
    backgroundColor: theme.colors.accent.purple,
    color: theme.colors.text.primary,
    "&:hover": {
      backgroundColor: theme.colors.accent.purpleLight,
      transform: "translateY(-1px)",
      boxShadow: theme.shadows.sm,
    },
  }),
  ...(variant === "secondary" && {
    backgroundColor: "transparent",
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.primary}`,
    "&:hover": {
      backgroundColor: theme.colors.bg.hover,
      borderColor: theme.colors.border.accent,
    },
  }),
  "&:active": {
    transform: "translateY(0)",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
}));

export const CookieIcon = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.lg,
  right: theme.spacing.lg,
  width: 24,
  height: 24,
  opacity: 0.1,
  color: theme.colors.accent.purple,
  fontSize: 24,
  pointerEvents: "none",
  "@media (max-width: 768px)": {
    display: "none",
  },
}));
