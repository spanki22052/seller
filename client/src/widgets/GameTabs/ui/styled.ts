import styled from "styled-components";

export const Container = styled.div({
  display: "flex",
  gap: "16px",
});

export const Tab = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.md,
  border: `1px solid ${$active ? "transparent" : theme.colors.border.secondary}`,
  backgroundColor: $active ? theme.colors.accent.purple : "transparent",
  color: theme.colors.text.primary,
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  transition: theme.transitions.normal,
  "&:hover": {
    borderColor: $active ? "transparent" : theme.colors.accent.purple,
    backgroundColor: $active ? theme.colors.accent.purpleLight : "transparent",
  },
}));

export const LoadingTab = styled.div(({ theme }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.md,
  border: `1px solid ${theme.colors.border.secondary}`,
  backgroundColor: "transparent",
  color: theme.colors.text.secondary,
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

