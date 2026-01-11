import styled from "styled-components";

export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "transparent", // Background handled by globals.css
  position: "relative",
  zIndex: 1,
});

export const MainContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "24px",
  paddingBottom: theme.spacing.xxl,
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  "@media (max-width: 1400px)": {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  "@media (max-width: 768px)": {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  "@media (max-width: 480px)": {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },
}));

export const GamesSection = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
