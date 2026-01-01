"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "16px",
  "@media (min-width: 1024px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const SearchWrapper = styled.div(() => ({
  position: "relative",
  width: "100%",
  "@media (min-width: 1024px)": {
    maxWidth: "384px",
  },
}));

export const SearchIcon = styled.span(() => ({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  fontFamily: "Material Icons",
  fontSize: "20px",
  color: "var(--color-primary)",
  pointerEvents: "none",
  zIndex: 1,
}));

export const SearchInput = styled.input(() => ({
  width: "100%",
  padding: "12px 16px 12px 40px",
  backgroundColor: "var(--bg-card)",
  border: "none",
  borderRadius: "8px",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.3s ease",
  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(38, 25, 51, 1)",
  },
  "&::placeholder": {
    color: "var(--text-placeholder)",
  },
  "&:focus": {
    boxShadow: "0 0 0 2px var(--color-primary), inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));

export const FiltersWrapper = styled.div(() => ({
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  paddingBottom: "8px",
  "@media (min-width: 1024px)": {
    paddingBottom: 0,
  },
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(217, 70, 239, 0.3)",
    borderRadius: "2px",
  },
}));

export const FilterButton = styled(motion.button)<{ $active?: boolean }>(({ $active }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  flexShrink: 0,
  transition: "all 0.3s ease",
  backgroundColor: $active ? "var(--color-primary)" : "var(--bg-card)",
  color: $active ? "white" : "var(--text-secondary)",
  borderColor: $active ? "var(--color-primary)" : "var(--border-color)",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: $active ? "var(--color-primary)" : "rgba(38, 25, 51, 1)",
    border: `1px solid ${$active ? "var(--color-primary)" : "rgba(54, 35, 72, 1)"}`,
  },
  "&:hover": {
    borderColor: "var(--color-primary)",
    color: $active ? "white" : "var(--text-primary)",
    backgroundColor: $active ? "rgba(127, 19, 236, 0.9)" : "var(--bg-section)",
  },
}));

export const FilterIcon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "16px",
  color: "var(--text-tertiary)",
  transition: "color 0.3s ease",
  [`${FilterButton}:hover &`]: {
    color: "var(--color-primary)",
  },
}));

