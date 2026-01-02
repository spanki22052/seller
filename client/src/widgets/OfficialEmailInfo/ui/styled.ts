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

