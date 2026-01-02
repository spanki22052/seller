import styled from "styled-components";

export const Container = styled.div({
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
});

export const MainContent = styled.div({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: 32,
  width: "100%",
});
