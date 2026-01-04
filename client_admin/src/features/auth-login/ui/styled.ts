import styled from "styled-components";

export const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
});

export const FormWrapper = styled.div({
  width: 400,
  padding: 40,
  backgroundColor: "#ffffff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const Title = styled.h1({
  marginBottom: 32,
  fontSize: 24,
  fontWeight: 600,
  textAlign: "center",
  color: "#262626",
});

