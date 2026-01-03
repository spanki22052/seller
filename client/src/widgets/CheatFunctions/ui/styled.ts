import styled from "styled-components";

interface HeaderProps {
  $isExpanded: boolean;
}

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,
  width: "100%",
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 36,
  fontWeight: 800,
  color: theme.colors.text.primary,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 1,

  "@media (max-width: 768px)": {
    fontSize: 28,
  },
}));

export const List = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

export const Item = styled.div(({ theme }) => ({
  borderTop: `1px solid ${theme.colors.border.primary}`,
  borderBottom: `1px solid ${theme.colors.border.primary}`,
  marginTop: -1,
  overflow: "hidden",
}));

export const Icon = styled.div(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  fontWeight: 300,
  color: theme.colors.text.tertiary,
  lineHeight: 1,
  flexShrink: 0,
  position: "relative",
  backgroundColor: "transparent",
  transition: "background-color 0.3s ease, color 0.3s ease",

  "&::before": {
    content: '"+"',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-55%, -60%)",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
  },

  [`${Item}:hover &`]: {
    backgroundColor: theme.colors.text.primary,

    "&::before": {
      color: theme.colors.bg.primary,
    },
  },
}));

export const Header = styled.div<HeaderProps>(({ theme, $isExpanded }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  cursor: "pointer",
  backgroundColor: $isExpanded ? theme.colors.bg.secondary : "transparent",
  transition: "background-color 0.3s ease",
}));

export const CategoryName = styled.div(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  color: theme.colors.accent.purple,
  textTransform: "uppercase",
  letterSpacing: 1,
}));

export const Content = styled.div({
  overflow: "hidden",
});

export const FeaturesList = styled.ul(({ theme }) => ({
  listStyle: "none",
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const Feature = styled.li(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  paddingLeft: theme.spacing.md,
  position: "relative",

  "&::before": {
    content: '"-"',
    position: "absolute",
    left: 0,
    color: theme.colors.accent.purple,
    fontWeight: 700,
  },
}));
