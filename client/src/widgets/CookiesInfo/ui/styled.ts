import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing.lg,
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  backgroundColor: theme.colors.bg.secondary,
  borderTop: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.lg,
  width: "100%",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
}));

export const Header = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
  flex: 1,
  textAlign: "left",
  "@media (max-width: 768px)": {
    textAlign: "center",
    alignItems: "center",
  },
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.3,
  color: theme.colors.text.primary,
  margin: 0,
  "@media (max-width: 768px)": {
    fontSize: 18,
    textAlign: "center",
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.5,
  color: theme.colors.text.secondary,
  margin: 0,
  "@media (max-width: 768px)": {
    fontSize: 14,
    textAlign: "center",
  },
}));

export const CookieSections = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const CookieSection = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
  padding: theme.spacing.sm,
  backgroundColor: theme.colors.bg.tertiary,
  borderRadius: theme.borderRadius.sm,
  border: `1px solid ${theme.colors.border.secondary}`,
}));

export const SectionIcon = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: theme.borderRadius.sm,
  backgroundColor: theme.colors.accent.purple,
  color: theme.colors.text.primary,
  fontSize: 12,
  fontWeight: 600,
  flexShrink: 0,
}));

export const SectionContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const SectionTitle = styled.h3(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.3,
  color: theme.colors.text.primary,
  margin: 0,
}));

export const SectionDescription = styled.p(({ theme }) => ({
  fontSize: 12,
  lineHeight: 1.4,
  color: theme.colors.text.secondary,
  margin: 0,
}));

export const Actions = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.sm,
  flexShrink: 0,
  "@media (max-width: 768px)": {
    justifyContent: "center",
    width: "100%",
  },
  "@media (max-width: 480px)": {
    flexDirection: "column",
    gap: theme.spacing.xs,
  },
}));

export const ActionButton = styled.button<{
  variant?: "primary" | "secondary";
}>(({ theme, variant = "primary" }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.sm,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  transition: `all ${theme.transitions.fast}`,
  border: "none",
  minWidth: 100,
  ...(variant === "primary" && {
    backgroundColor: theme.colors.accent.purple,
    color: theme.colors.text.primary,
    "&:hover": {
      backgroundColor: theme.colors.accent.purpleLight,
      opacity: 0.9,
    },
  }),
  ...(variant === "secondary" && {
    backgroundColor: "transparent",
    color: theme.colors.text.secondary,
    border: `1px solid ${theme.colors.border.secondary}`,
    "&:hover": {
      backgroundColor: theme.colors.bg.hover,
      borderColor: theme.colors.border.primary,
    },
  }),
  "&:active": {
    opacity: 0.8,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));
