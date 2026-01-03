import styled from "styled-components";

export const SearchBarContainer = styled.div(({ theme }) => ({
  marginTop: 64,
  marginBottom: theme.spacing.md,
  width: 300,
  position: "relative",
  zIndex: 1000,
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

export const Dropdown = styled.div(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: 600,
  marginTop: 12,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.lg,
  boxShadow: `${theme.shadows.lg}, 0 0 40px ${theme.colors.accent.purple}33`,
  overflow: "hidden",
  zIndex: 1001,
  maxHeight: 600,
  overflowY: "auto",
  backdropFilter: "blur(10px)",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.colors.bg.secondary,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.colors.border.secondary,
    borderRadius: 4,
    "&:hover": {
      backgroundColor: theme.colors.accent.purple,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "@media (max-width: 768px)": {
    width: "100%",
    maxWidth: "calc(100vw - 32px)",
  },
}));

export const DropdownContent = styled.div(({ theme }) => ({
  padding: "16px 0",
  background: `linear-gradient(180deg, ${theme.colors.bg.card} 0%, ${theme.colors.bg.secondary} 100%)`,
}));

export const DropdownItem = styled.div({
  padding: 0,
});

export const GameItem = styled.div(({ theme }) => ({
  padding: "16px 24px",
  borderBottom: `1px solid ${theme.colors.border.primary}`,
  position: "relative",
  transition: theme.transitions.normal,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
    "&::after": {
      opacity: 1,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.colors.gradient.purpleBlueVertical,
    opacity: 0,
    transition: theme.transitions.normal,
  },
}));

export const GameName = styled.div(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: theme.colors.text.primary,
  marginBottom: 12,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  background: theme.colors.gradient.purpleBlue,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

export const CheatsList = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginTop: 12,
  paddingLeft: 20,
  borderLeft: `2px solid ${theme.colors.border.secondary}`,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: -2,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.colors.gradient.purpleBlueVertical,
    opacity: 0.5,
  },
}));

export const CheatItem = styled.div({});

interface CheatLinkProps {
  $isHighlighted?: boolean;
}

export const CheatLink = styled.a<CheatLinkProps>(
  ({ theme, $isHighlighted }) => ({
    display: "block",
    fontSize: 15,
    color: $isHighlighted
      ? theme.colors.text.primary
      : theme.colors.text.secondary,
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: theme.borderRadius.md,
    transition: theme.transitions.normal,
    position: "relative",
    fontWeight: $isHighlighted ? 600 : 400,
    backgroundColor: $isHighlighted
      ? `${theme.colors.accent.purple}22`
      : "transparent",
    border: $isHighlighted
      ? `1px solid ${theme.colors.accent.purple}66`
      : "1px solid transparent",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: $isHighlighted
        ? theme.colors.gradient.purpleBlueVertical
        : "transparent",
      borderRadius: `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}`,
      transition: theme.transitions.normal,
    },
    "&:hover": {
      color: theme.colors.text.primary,
      backgroundColor: $isHighlighted
        ? `${theme.colors.accent.purple}33`
        : theme.colors.bg.tertiary,
      transform: "translateX(6px)",
      borderColor: theme.colors.accent.purple,
      boxShadow: $isHighlighted
        ? `0 0 12px ${theme.colors.accent.purple}44`
        : "none",
      "&::before": {
        background: theme.colors.gradient.purpleBlueVertical,
      },
    },
  })
);

