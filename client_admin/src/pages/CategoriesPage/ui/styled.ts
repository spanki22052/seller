import styled from "styled-components";

export const Container = styled.div({
  padding: "24px",
  background: "#f0f2f5",
  minHeight: "100vh",
  maxWidth: 1400,
  margin: "0 auto",
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

export const Title = styled.h1({
  margin: 0,
  color: "#262626",
  fontSize: "24px",
  fontWeight: 600,
});

export const Filters = styled.div({
  display: "flex",
  gap: "16px",
  marginBottom: "24px",
  alignItems: "center",
});

export const TableContainer = styled.div({
  background: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const NameCell = styled.span({
  fontWeight: 500,
  color: "#262626",
});

export const ActionsCell = styled.div({
  display: "flex",
  gap: "8px",
});
