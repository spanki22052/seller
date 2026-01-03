import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  gap: 74,
  paddingLeft: theme.spacing.xl,
  paddingRight: theme.spacing.xl,

  "@media (max-width: 1024px)": {
    gap: theme.spacing.xxl,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
  },

  "@media (max-width: 768px)": {
    gap: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },
}));

export const MainContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: theme.spacing.xl,
  width: "100%",

  "@media (max-width: 1024px)": {
    gap: theme.spacing.xl,
  },

  "@media (max-width: 768px)": {
    gap: theme.spacing.lg,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.md,
  },
}));
