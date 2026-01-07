import styled from "styled-components";
import { motion } from "framer-motion";

// Единый стиль шрифта для всех ссылок в sidebar
const LINK_FONT_STYLE = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0.025em",
  lineHeight: 1.4,
} as const;

export const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: 1000,
  backgroundColor: "rgba(26, 26, 26, 0.98)",
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows.lg,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const Overlay = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  backdropFilter: "blur(4px)",
});

export const HamburgerButton = styled.button(({ theme }) => ({
  position: "fixed",
  top: theme.spacing.lg,
  left: theme.spacing.lg,
  width: 48,
  height: 48,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.md,
  cursor: "pointer",
  padding: 0,
  zIndex: 99,
  transition: theme.transitions.normal,
  "&:hover": {
    borderColor: theme.colors.accent.purple,
    backgroundColor: theme.colors.bg.hover,
  },
  "&:active": {
    transform: "scale(0.98)",
  },
}));

export const HamburgerLine = styled.span(({ theme }) => ({
  width: 24,
  height: 2,
  backgroundColor: "#00f5ff",
  borderRadius: 2,
  transition: theme.transitions.fast,
  boxShadow: "0 0 8px rgba(0, 245, 255, 0.6)",
}));

export const SidebarContent = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  paddingTop: 80,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 24,
});

export const LogoWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: theme.transitions.fast,
  "& img": {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    transition: theme.transitions.fast,
  },
  "&:hover": {
    opacity: 0.8,
  },
}));

export const SearchWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xl,
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

export const MenuList = styled(motion.ul)({
  listStyle: "none",
  padding: 0,
  margin: 0,
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 0, 255, 0.3)",
    borderRadius: 3,
    "&:hover": {
      background: "rgba(255, 0, 255, 0.5)",
    },
  },
});

export const MenuItem = styled(motion.li)(({ theme }) => ({
  marginBottom: theme.spacing.xs,
}));

export const MenuItemButton = styled.button<{
  $isCategory?: boolean;
  $isOpen?: boolean;
}>(({ theme, $isCategory, $isOpen }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  color: $isCategory ? theme.colors.text.primary : theme.colors.text.secondary,
  backgroundColor: "transparent",
  border: "none",
  textAlign: "left",
  ...LINK_FONT_STYLE,
  fontWeight: $isCategory ? 600 : LINK_FONT_STYLE.fontWeight,
  borderRadius: theme.borderRadius.sm,
  transition: theme.transitions.fast,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
    color: theme.colors.text.primary,
  },
}));

export const MenuItemLink = styled.a<{
  $isCategory?: boolean;
  $isClickable?: boolean;
}>(({ theme, $isCategory, $isClickable = false }) => ({
  display: "block",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  color: $isCategory ? theme.colors.text.primary : theme.colors.text.secondary,
  textDecoration: "none",
  ...LINK_FONT_STYLE,
  fontWeight: $isCategory ? 600 : LINK_FONT_STYLE.fontWeight,
  borderRadius: theme.borderRadius.sm,
  transition: theme.transitions.fast,
  cursor: $isClickable ? "pointer" : "default",
  "&:hover": {
    backgroundColor: $isClickable ? theme.colors.bg.hover : "transparent",
    color: $isClickable ? theme.colors.text.primary : undefined,
  },
}));

export const DropdownIcon = styled.span<{ $isOpen: boolean }>(
  ({ theme, $isOpen }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    transition: theme.transitions.fast,
    transform: $isOpen ? "rotate(180deg)" : "rotate(0deg)",
    color: theme.colors.text.secondary,
    "&::before": {
      content: '"▼"',
      fontSize: "10px",
    },
  })
);

export const DropdownList = styled(motion.ul)({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflow: "hidden",
  marginTop: 4,
});

export const DropdownItem = styled(motion.li)(({ theme }) => ({
  paddingLeft: theme.spacing.xl,
  "& a": {
    display: "block",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    color: theme.colors.text.primary,
    textDecoration: "none",
    ...LINK_FONT_STYLE,
    borderRadius: theme.borderRadius.sm,
    transition: theme.transitions.fast,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.bg.hover,
      color: theme.colors.accent.purpleLight,
    },
  },
}));
