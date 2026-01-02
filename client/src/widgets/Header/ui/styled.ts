import styled from "styled-components";

export const Container = styled.header(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  position: "relative",
  zIndex: 10,
}));

export const SearchWrapper = styled.div(({ theme }) => ({
  flex: "0 0 auto",
  "& .ant-input": {
    backgroundColor: theme.colors.bg.input,
    borderColor: theme.colors.border.primary,
    color: theme.colors.text.primary,
    borderRadius: theme.borderRadius.md,
    "&::placeholder": {
      color: theme.colors.text.tertiary,
    },
    "&:hover": {
      borderColor: theme.colors.accent.purple,
    },
    "&:focus": {
      borderColor: theme.colors.accent.purple,
      boxShadow: `0 0 0 2px ${theme.colors.accent.purple}33`,
    },
  },
  "& .anticon": {
    color: theme.colors.text.secondary,
  },
}));


