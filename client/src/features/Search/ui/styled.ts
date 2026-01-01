"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const SearchContainer = styled.div(() => ({
  position: "relative",
  width: "100%",
  maxWidth: "320px",
  zIndex: 50,
}));

export const SearchIcon = styled.span(() => ({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  fontFamily: "Material Icons",
  fontSize: "20px",
  color: "var(--text-secondary)",
  pointerEvents: "none",
  zIndex: 1,
}));

export const SearchInput = styled.input(() => ({
  width: "100%",
  backgroundColor: "var(--bg-input)",
  border: "1px solid var(--border-color)",
  borderRadius: "9999px",
  padding: "10px 16px 10px 40px",
  fontSize: "14px",
  color: "var(--text-primary)",
  outline: "none",
  transition: "all 0.3s ease",
  position: "relative",
  zIndex: 1,
  "&::placeholder": {
    color: "var(--text-placeholder)",
  },
  "&:focus": {
    borderColor: "var(--color-primary)",
    boxShadow: "0 0 0 3px rgba(217, 70, 239, 0.1)",
  },
}));

export const Dropdown = styled(motion.div)(() => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  width: "500px",
  backgroundColor: "var(--bg-primary)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  maxHeight: "400px",
  overflowY: "auto",
  zIndex: 100,
  "@media (min-width: 768px)": {
    width: "600px",
  },
  "@media (min-width: 1024px)": {
    width: "700px",
  },
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(28, 13, 41, 0.95)",
    backdropFilter: "blur(12px)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(217, 70, 239, 0.3)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(217, 70, 239, 0.5)",
    },
  },
}));

export const DropdownList = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "8px",
}));

export const DropdownItem = styled(motion.div)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(217, 70, 239, 0.1)",
  },
}));

export const ItemIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "24px",
  color: "var(--color-primary)",
  flexShrink: 0,
}));

export const ItemContent = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
  minWidth: 0,
}));

export const ItemTitle = styled.div(() => ({
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--text-primary)",
  lineHeight: 1.4,
}));

export const ItemSubtitle = styled.div(() => ({
  fontSize: "12px",
  color: "var(--text-secondary)",
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const GameGroup = styled(motion.div)(() => ({
  marginBottom: "8px",
  "&:last-child": {
    marginBottom: 0,
  },
}));

export const GameHeader = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  backgroundColor: "rgba(217, 70, 239, 0.05)",
  marginBottom: "4px",
  "&:hover": {
    backgroundColor: "rgba(217, 70, 239, 0.1)",
  },
}));

export const CheatsList = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "44px",
  gap: "2px",
}));

export const CheatItem = styled(motion.div)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(217, 70, 239, 0.08)",
  },
}));

export const CheatIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "20px",
  color: "var(--color-primary)",
  flexShrink: 0,
  opacity: 0.8,
}));

