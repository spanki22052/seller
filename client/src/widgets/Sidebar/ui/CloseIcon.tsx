"use client";

import React, { useId } from "react";
import styled from "styled-components";

const CloseButton = styled.button(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.lg,
  right: theme.spacing.lg,
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  zIndex: 10,
  transition: theme.transitions.fast,
  "&:hover": {
    opacity: 0.8,
  },
  "&:active": {
    opacity: 0.6,
  },
}));

const IconSvg = styled.svg({
  width: "100%",
  height: "100%",
});

export function CloseIcon({ onClick }: { onClick: () => void }) {
  const gradientId = useId();
  const pathStyle = {
    fill: "none",
    stroke: `url(#${gradientId})`,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  
  return (
    <CloseButton onClick={onClick} aria-label="Close sidebar">
      <IconSvg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path style={pathStyle} d="M18 6L6 18" />
        <path style={pathStyle} d="M6 6l12 12" />
      </IconSvg>
    </CloseButton>
  );
}

