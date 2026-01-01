"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const SidebarContainer = styled.aside(() => ({
  position: "fixed",
  left: 0,
  top: 0,
  width: "64px",
  height: "100vh",
  backgroundColor: "var(--bg-sidebar)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "24px",
  paddingBottom: "24px",
  zIndex: 50,
  borderRight: "1px solid rgba(255, 255, 255, 0.05)",
  "@media (min-width: 768px)": {
    width: "80px",
  },
}));

export const MenuButton = styled.button(() => ({
  backgroundColor: "transparent",
  border: "none",
  color: "#00f5ff",
  cursor: "pointer",
  padding: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#00f5ff",
    filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.8))",
  },
}));

export const MenuIcon = styled.svg(() => ({
  width: "32px",
  height: "32px",
  display: "block",
  color: "#00f5ff",
  filter: "drop-shadow(0 0 4px rgba(0, 245, 255, 0.6))",
  "& path": {
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    fill: "none",
  },
}));

export const PlayButton = styled.button(() => ({
  marginTop: "auto",
  marginBottom: "32px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "2px solid var(--color-primary)",
  backgroundColor: "transparent",
  color: "var(--color-primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "var(--color-primary)",
    color: "white",
  },
}));

export const PlayIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "16px",
}));

export const AccentBar = styled.div(() => ({
  position: "absolute",
  left: 0,
  top: "32px",
  height: "32px",
  width: "3px",
  backgroundColor: "var(--color-primary)",
  borderRadius: "0 3px 3px 0",
}));

export const MenuOverlay = styled(motion.div)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100,
  backdropFilter: "blur(4px)",
}));

export const MenuPanel = styled(motion.div)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "320px",
  maxWidth: "80vw",
  height: "100vh",
  backgroundColor: "var(--bg-sidebar)",
  boxShadow: "4px 0 24px rgba(0, 0, 0, 0.3)",
  zIndex: 101,
}));

export const MenuContent = styled.div(() => ({
  padding: "24px",
  height: "100%",
  overflowY: "auto",
}));

export const MenuTitle = styled.h2(() => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "24px",
  fontFamily: "var(--font-display)",
  letterSpacing: "0.05em",
}));

export const MenuList = styled.ul(() => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
}));

export const MenuItem = styled.li(() => ({
  marginBottom: "12px",
}));

export const MenuLink = styled.a(() => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  color: "var(--text-primary)",
  textDecoration: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-primary)",
  },
}));

export const AnimatedMenuLink = styled(motion.div)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  color: "var(--text-primary)",
  textDecoration: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-primary)",
  },
}));

export const MenuIconWrapper = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "20px",
  marginRight: "12px",
  display: "flex",
  alignItems: "center",
}));

export const MenuText = styled.span(() => ({
  fontSize: "16px",
  fontWeight: 500,
}));

export const LanguageSelectorWrapper = styled.div(() => ({
  marginTop: "24px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
}));

export const LanguageButton = styled(motion.button)(() => ({
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "var(--text-primary)",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
  },
  "@media (min-width: 768px)": {
    width: "48px",
    height: "48px",
    fontSize: "14px",
  },
}));

export const LanguageDropdown = styled(motion.div)(() => ({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  marginTop: "8px",
  backgroundColor: "var(--bg-sidebar)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  zIndex: 60,
  minWidth: "80px",
}));

export const LanguageOption = styled(motion.button)<{ $active?: boolean }>(({ $active }) => ({
  width: "100%",
  padding: "10px 16px",
  backgroundColor: $active ? "rgba(217, 70, 239, 0.1)" : "transparent",
  color: $active ? "var(--color-primary)" : "var(--text-primary)",
  border: "none",
  fontSize: "12px",
  fontWeight: $active ? 600 : 500,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  transition: "all 0.2s ease",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "var(--color-primary)",
  },
  "&:not(:last-child)": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
}));

export const LanguageSelectorContainer = styled.div(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const GamesDropdown = styled(motion.div)(() => ({
  marginTop: "8px",
  backgroundColor: "var(--bg-sidebar)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  maxHeight: "400px",
  display: "flex",
  flexDirection: "column",
  transformOrigin: "top",
}));

export const GamesSearchWrapper = styled.div(() => ({
  padding: "12px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

export const GamesSearchInput = styled.input(() => ({
  width: "100%",
  padding: "8px 12px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "6px",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.3s ease",
  "&::placeholder": {
    color: "var(--text-placeholder)",
  },
  "&:focus": {
    borderColor: "var(--color-primary)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
}));

export const GamesList = styled.div(() => ({
  maxHeight: "320px",
  overflowY: "auto",
  padding: "8px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "3px",
    "&:hover": {
      background: "var(--color-primary)",
    },
  },
}));

export const GameItem = styled(motion.button)(() => ({
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "transparent",
  border: "none",
  color: "var(--text-primary)",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  borderRadius: "6px",
  textAlign: "left",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "var(--color-primary)",
  },
}));

export const GameItemIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
}));

export const GameItemContent = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

export const GameItemText = styled.span(() => ({
  flex: 1,
}));

export const GameItemArrow = styled(motion.span)(() => ({
  fontFamily: "Material Icons",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  transition: "transform 0.3s ease",
}));

export const CheatsDropdown = styled(motion.div)(() => ({
  marginTop: "4px",
  marginLeft: "24px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "6px",
  overflow: "hidden",
  transformOrigin: "top",
}));

export const CheatsList = styled.div(() => ({
  padding: "4px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

export const CheatItem = styled(motion.button)(() => ({
  width: "100%",
  padding: "8px 12px",
  backgroundColor: "transparent",
  border: "none",
  color: "var(--text-secondary)",
  fontSize: "13px",
  fontWeight: 400,
  cursor: "pointer",
  borderRadius: "4px",
  textAlign: "left",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  "&:hover": {
    backgroundColor: "rgba(217, 70, 239, 0.1)",
    color: "var(--color-primary)",
  },
}));

export const CheatName = styled.span(() => ({
  fontWeight: 500,
  color: "var(--text-primary)",
}));

export const CheatDescription = styled.span(() => ({
  fontSize: "11px",
  color: "var(--text-secondary)",
  opacity: 0.8,
}));

export const MenuItemWithDropdown = styled.li(() => ({
  marginBottom: "12px",
  position: "relative",
}));

export const MenuItemButton = styled(motion.button)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  color: "var(--text-primary)",
  textDecoration: "none",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-primary)",
  },
}));

export const DropdownArrow = styled(motion.span)(() => ({
  fontFamily: "Material Icons",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  transition: "transform 0.3s ease",
}));

