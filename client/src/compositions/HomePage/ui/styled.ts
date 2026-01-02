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
  paddingLeft: theme.spacing.xl,
  paddingRight: theme.spacing.xl,
}));

export const GamesSection = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
