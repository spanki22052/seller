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

