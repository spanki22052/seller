"use client";

import styled from "styled-components";

export const ToggleButton = styled.button(() => ({
  backgroundColor: "var(--bg-card)",
  padding: "8px",
  borderRadius: "50%",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const Icon = styled.span(() => ({
  fontFamily: "Material Icons",
  fontSize: "20px",
  color: "var(--icon-color)",
}));

