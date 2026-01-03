import styled from "styled-components";
import Link from "next/link";

export const Container = styled.nav({
  width: "100%",
  backgroundColor: "none",
  zIndex: 100,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: `0 2px 10px rgba(0, 0, 0, 0.3)`,
  minHeight: 104,
  height: "auto",
});

export const NavContent = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${theme.spacing.xl}`,
  maxWidth: 1400,
  margin: "0 auto",
  width: "100%",
  minHeight: 104,
  height: "100%",

  "@media (max-width: 768px)": {
    padding: `0 ${theme.spacing.md}`,
    minHeight: 80,
  },
}));

export const LogoWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  marginRight: 32,
});

export const DesktopNav = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 32,
  flex: 1,

  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const NavLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `0 32px`,
  minHeight: 100,
  color: theme.colors.text.primary,
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 1,
  textDecoration: "none",
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  cursor: "pointer",
  transform: "translateZ(0)",
  willChange: "transform",
  borderTop: "2px solid transparent",

  "&:hover": {
    color: theme.colors.text.primary,
    textShadow: `0 0 10px ${theme.colors.accent.purple}`,
    borderTop: `2px solid ${theme.colors.accent.purple}`,
    background: `linear-gradient(180deg, rgba(255, 0, 255, 0.05) 0%, rgba(59, 130, 246, 0.03) 100%)`,
    boxShadow: `0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 0, 255, 0.1)`,
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}33`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));

export const MobileMenuButton = styled.button(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  padding: 0,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  transition: "background-color 0.3s ease",

  "@media (max-width: 768px)": {
    display: "flex",
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}33`,
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
    width: 24,
    height: 18,
    position: "relative",

    "& span": {
      display: "block",
      width: "100%",
      height: 2,
      backgroundColor: theme.colors.text.primary,
      borderRadius: 2,
      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      transformOrigin: "center",

      "&:nth-child(1)": {
        transform: $isOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
      },

      "&:nth-child(2)": {
        opacity: $isOpen ? 0 : 1,
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
  backgroundColor: theme.colors.bg.secondary,
  borderTop: `1px solid ${theme.colors.border.primary}`,
  padding: `${theme.spacing.md} 0`,
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`,

  "@media (min-width: 769px)": {
    display: "none",
  },
}));

export const MobileNav = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: `0 24px`,
});

export const MobileNavLink = styled(Link)(({ theme }) => ({
  display: "block",
  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  color: theme.colors.text.primary,
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: 1,
  textDecoration: "none",
  borderRadius: theme.borderRadius.md,
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  cursor: "pointer",
  transform: "translateZ(0)",
  willChange: "transform",
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
    color: theme.colors.text.primary,
    textShadow: `0 0 10px ${theme.colors.accent.purple}`,
    paddingLeft: theme.spacing.xl,
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.colors.accent.purple}33`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },
}));
