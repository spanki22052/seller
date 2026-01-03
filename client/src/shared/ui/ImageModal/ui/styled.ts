import styled from "styled-components";

export const Backdrop = styled.div(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  zIndex: 9998,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing.lg,
  cursor: "pointer",
}));

export const ImageWrapper = styled.div(({ theme }) => ({
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "90vh",
  width: "100%",
  height: "100%",
  minWidth: 300,
  minHeight: 200,
  cursor: "default",
  borderRadius: theme.borderRadius.md,
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
}));

export const CloseButton = styled.button(({ theme }) => ({
  position: "fixed",
  top: theme.spacing.lg,
  right: theme.spacing.lg,
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "none",
  color: theme.colors.text.primary,
  backgroundColor: "unset",
  fontSize: 24,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  backdropFilter: "blur(10px)",
  transition: "background-color 0.2s ease",
  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${theme.colors.accent.purple}40`,
  },
  "@media (max-width: 768px)": {
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 40,
    height: 40,
    fontSize: 20,
  },
}));
