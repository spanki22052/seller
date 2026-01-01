"use client";

import styled from "styled-components";

export const Header = styled.div(() => ({
  position: "fixed",
  top: "16px",
  left: "80px",
  right: "16px",
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  backgroundColor: "rgba(26, 11, 46, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "12px",
  padding: "12px 20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "@media (min-width: 768px)": {
    left: "96px",
    right: "32px",
  },
  "@media (min-width: 1024px)": {
    left: "96px",
    right: "32px",
  },
}));

export const LogoWrapper = styled.div(() => ({
  display: "none",
  marginLeft: "auto",
  height: "32px",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "@media (min-width: 1024px)": {
    display: "flex",
    alignItems: "center",
  },
  "& img": {
    height: "100%",
    width: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 8px rgba(217, 70, 239, 0.3))",
    transition: "filter 0.3s ease",
  },
  "&:hover img": {
    filter: "drop-shadow(0 2px 12px rgba(217, 70, 239, 0.5))",
  },
}));

