import styled from "styled-components";

export const Container = styled.div({
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE/Edge
  padding: "0 20px",

  "&::-webkit-scrollbar": {
    display: "none", // Chrome/Safari
  },
  "@media (max-width: 768px)": {
    gap: "12px",
    paddingBottom: 0,
  },
  "@media (max-width: 480px)": {
    gap: "8px",
    paddingBottom: 0,
  },
});

export const Tab = styled.button<{ $active: boolean }>(
  ({ theme, $active }) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${
      $active ? "transparent" : theme.colors.border.secondary
    }`,
    backgroundColor: $active ? theme.colors.accent.purple : "transparent",
    color: theme.colors.text.primary,
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: theme.transitions.normal,
    whiteSpace: "nowrap",
    flexShrink: 0,
    "&:hover": {
      borderColor: $active ? "transparent" : theme.colors.accent.purple,
      backgroundColor: $active
        ? theme.colors.accent.purpleLight
        : "transparent",
    },
    "@media (max-width: 768px)": {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: "14px",
    },
    "@media (max-width: 480px)": {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: "13px",
      fontWeight: 500,
    },
  })
);

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
  whiteSpace: "nowrap",
  flexShrink: 0,
  "@media (max-width: 768px)": {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontSize: "14px",
  },
  "@media (max-width: 480px)": {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: "13px",
    fontWeight: 500,
  },
}));
