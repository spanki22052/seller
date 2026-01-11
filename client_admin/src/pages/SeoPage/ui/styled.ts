import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  padding: theme.spacing?.lg || 24,
  minHeight: "100vh",
  backgroundColor: theme.colors?.bgPrimary || "#f5f5f5",
  maxWidth: 1400,
  margin: "0 auto",
}));

export const SeoCard = styled.div(({ theme }) => ({
  maxWidth: 1400,
  margin: "0 auto",
}));
