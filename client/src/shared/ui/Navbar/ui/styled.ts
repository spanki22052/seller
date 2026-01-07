import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

export const Container = styled.nav({
  width: "calc(100% - 32px)",
  maxWidth: 1400,
  margin: "16px auto 0",
  background: "rgba(10, 10, 10, 0.8)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 16,
  zIndex: 100,
  minHeight: 64,
  height: "auto",
  position: "sticky",
  top: 16,
  boxShadow:
    "0 0 20px rgba(255, 0, 255, 0.08), 0 0 40px rgba(59, 130, 246, 0.05), inset 0 0 20px rgba(255, 0, 255, 0.02)",

  "&::before": {},
});

export const NavContent = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${theme.spacing.xl}`,
  width: "100%",
  minHeight: 64,
  height: "100%",
  position: "relative",
  zIndex: 1,

  "@media (max-width: 768px)": {
    padding: `0 ${theme.spacing.lg}`,
    minHeight: 56,
  },
}));

export const LogoWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  marginRight: 40,
  position: "relative",

  "&::after": {
    content: '""',
    position: "absolute",
    right: -20,
    top: "50%",
    transform: "translateY(-50%)",
    width: 1,
    height: 24,
    background:
      "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
  },
});

export const DesktopNav = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  flex: 1,

  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const NavActions = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginLeft: "auto",
});

export const NavLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `12px 20px`,
  minHeight: 40,
  color: theme.colors.text.secondary,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.5,
  textDecoration: "none",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  cursor: "pointer",
  transform: "translateZ(0)",
  willChange: "transform",
  borderRadius: theme.borderRadius.md,
  backdropFilter: "blur(10px)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    borderRadius: theme.borderRadius.md,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  "&:hover": {
    color: theme.colors.text.primary,
    transform: "translateY(-1px)",
    textShadow: `0 0 8px ${theme.colors.accent.purple}80`,

    "&::before": {
      opacity: 1,
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}40`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const NavLinkExternal = styled.a(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `12px 20px`,
  minHeight: 40,
  color: theme.colors.text.secondary,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.5,
  textDecoration: "none",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  cursor: "pointer",
  transform: "translateZ(0)",
  willChange: "transform",
  borderRadius: theme.borderRadius.md,
  backdropFilter: "blur(10px)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    borderRadius: theme.borderRadius.md,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  "&:hover": {
    color: theme.colors.text.primary,
    transform: "translateY(-1px)",
    textShadow: `0 0 8px ${theme.colors.accent.purple}80`,

    "&::before": {
      opacity: 1,
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}40`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const SidebarBurgerButton = styled.button(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  padding: 0,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  marginRight: theme.spacing.md,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    borderRadius: theme.borderRadius.md,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  "&:hover": {
    borderColor: theme.colors.accent.purple,
    backgroundColor: theme.colors.bg.hover,
    transform: "translateY(-1px)",
    boxShadow: `0 4px 12px rgba(255, 0, 255, 0.15)`,

    "&::before": {
      opacity: 1,
    },
  },

  "&:active": {
    transform: "translateY(0) scale(0.98)",
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${theme.colors.accent.purple}30`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },

  "@media (max-width: 768px)": {
    display: "none",
  },
}));

export const SidebarHamburgerLine = styled.span({
  width: 24,
  height: 2,
  backgroundColor: "#00f5ff",
  borderRadius: 1,
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  boxShadow: "0 0 8px rgba(0, 245, 255, 0.6)",
  margin: "2px 0",
});

export const MobileMenuButton = styled.button(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  padding: 0,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  marginRight: theme.spacing.md,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    borderRadius: theme.borderRadius.md,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  "@media (max-width: 768px)": {
    display: "flex",
  },

  "&:hover": {
    borderColor: theme.colors.accent.purple,
    backgroundColor: theme.colors.bg.hover,
    transform: "translateY(-1px)",
    boxShadow: `0 4px 12px rgba(255, 0, 255, 0.15)`,

    "&::before": {
      opacity: 1,
    },
  },

  "&:active": {
    transform: "translateY(0) scale(0.98)",
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${theme.colors.accent.purple}30`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const HamburgerIcon = styled.div<{ $isOpen: boolean }>(
  ({ theme, $isOpen }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 22,
    height: 18,
    position: "relative",

    "& span": {
      display: "block",
      width: "100%",
      height: 2,
      backgroundColor: $isOpen
        ? theme.colors.accent.purple
        : theme.colors.text.primary,
      borderRadius: 1,
      transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      transformOrigin: "center",
      boxShadow: $isOpen ? `0 0 8px ${theme.colors.accent.purple}80` : "none",

      "&:nth-child(1)": {
        transform: $isOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
      },

      "&:nth-child(2)": {
        opacity: $isOpen ? 0 : 1,
        transform: $isOpen ? "translateX(20px)" : "none",
      },

      "&:nth-child(3)": {
        transform: $isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
      },
    },
  })
);

export const MobileMenu = styled.div(({ theme }) => ({
  display: "block",
  width: "100%",
  background: "rgba(26, 26, 26, 0.95)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  padding: `${theme.spacing.lg} 0`,
  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5)`,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(255, 0, 255, 0.02) 0%, transparent 100%)",
    pointerEvents: "none",
  },

  "@media (min-width: 769px)": {
    display: "none",
  },
}));

export const MobileNav = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: `0 ${theme.spacing.lg}`,
  position: "relative",
  zIndex: 1,
}));

export const MobileNavLink = styled(Link)(({ theme }) => ({
  display: "block",
  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  color: theme.colors.text.secondary,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.5,
  textDecoration: "none",
  borderRadius: theme.borderRadius.md,
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  cursor: "pointer",
  transform: "translateZ(0)",
  willChange: "transform",
  backgroundColor: "transparent",
  position: "relative",
  border: "1px solid transparent",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    borderRadius: theme.borderRadius.md,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  "&:hover": {
    color: theme.colors.text.primary,
    transform: "translateX(8px)",
    textShadow: `0 0 8px ${theme.colors.accent.purple}80`,
    borderColor: "rgba(255, 0, 255, 0.3)",

    "&::before": {
      opacity: 1,
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}40`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const SearchBarContainer = styled.div({
  position: "relative",
  flex: 1,
  maxWidth: 400,
  margin: "0 24px",

  "@media (max-width: 768px)": {
    maxWidth: "none",
    margin: "0 12px",
  },
});

export const SearchInputWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const SearchIcon = styled.div(({ theme }) => ({
  position: "absolute",
  left: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.text.secondary,
  pointerEvents: "none",
  zIndex: 1,
}));

export const SearchInput = styled.input(({ theme }) => ({
  width: "100%",
  height: 40,
  padding: `0 16px 0 44px`,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.md,
  color: theme.colors.text.primary,
  fontSize: 14,
  fontWeight: 400,
  outline: "none",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",

  "&::placeholder": {
    color: theme.colors.text.secondary,
  },

  "&:focus": {
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 0 0 3px ${theme.colors.accent.purple}20`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const Dropdown = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  right: 0,
  maxHeight: 400,
  overflowY: "auto",
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.md,
  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5)`,
  zIndex: 1000,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",

  "&::-webkit-scrollbar": {
    width: 6,
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    background: theme.colors.border.primary,
    borderRadius: 3,

    "&:hover": {
      background: theme.colors.accent.purple,
    },
  },
}));

export const DropdownItem = styled(motion.div)<{
  $isGame: boolean;
  $isFocused: boolean;
}>(({ theme, $isGame, $isFocused }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  cursor: "pointer",
  backgroundColor: $isFocused ? theme.colors.bg.hover : "transparent",
  borderBottom: `1px solid ${theme.colors.border.primary}20`,
  transition: "all 0.2s ease",
  position: "relative",

  "&:last-child": {
    borderBottom: "none",
  },

  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
  },

  ...($isGame && {
    borderLeft: `3px solid ${theme.colors.accent.purple}`,
    fontWeight: 600,
  }),
}));

export const ItemIcon = styled.div<{ $isGame: boolean }>(({ $isGame }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  fontSize: $isGame ? 18 : 16,
  flexShrink: 0,
}));

export const ItemContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
  minWidth: 0,
});

export const ItemTitle = styled.div(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const ItemSubtitle = styled.div(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));
