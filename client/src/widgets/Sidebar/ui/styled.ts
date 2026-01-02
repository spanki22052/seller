import styled from "styled-components";
import { motion } from "framer-motion";

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
  zIndex: 1001,
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
  "& img": {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
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
    background: "rgba(139, 92, 246, 0.3)",
    borderRadius: 3,
    "&:hover": {
      background: "rgba(139, 92, 246, 0.5)",
    },
  },
});

export const MenuItem = styled(motion.li)(({ theme }) => ({
  marginBottom: theme.spacing.xs,
}));

export const MenuItemButton = styled.button<{ $isCategory?: boolean; $isOpen?: boolean }>(
  ({ theme, $isCategory, $isOpen }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    color: $isCategory ? theme.colors.text.primary : theme.colors.text.secondary,
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: $isCategory ? "16px" : "14px",
    fontWeight: $isCategory ? 700 : 500,
    borderRadius: theme.borderRadius.sm,
    transition: theme.transitions.fast,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.bg.hover,
      color: theme.colors.text.primary,
    },
  })
);

export const MenuItemLink = styled.a<{ $isCategory?: boolean }>(({ theme, $isCategory }) => ({
  display: "block",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  color: $isCategory ? theme.colors.text.primary : theme.colors.text.secondary,
  textDecoration: "none",
  fontSize: $isCategory ? "16px" : "14px",
  fontWeight: $isCategory ? 700 : 500,
  borderRadius: theme.borderRadius.sm,
  transition: theme.transitions.fast,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
    color: theme.colors.text.primary,
  },
}));

export const DropdownIcon = styled.span<{ $isOpen: boolean }>(({ theme, $isOpen }) => ({
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
}));

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
    fontSize: "14px",
    fontWeight: 400,
    borderRadius: theme.borderRadius.sm,
    transition: theme.transitions.fast,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.bg.hover,
      color: theme.colors.accent.purpleLight,
    },
  },
}));

