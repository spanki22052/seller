"use client";

import styled from "styled-components";

export const PageContainer = styled.div(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-sans)",
  overflow: "hidden",
}));

export const MainContent = styled.main(() => ({
  flex: 1,
  marginLeft: "64px",
  height: "100vh",
  overflowY: "auto",
  "@media (min-width: 768px)": {
    marginLeft: "80px",
  },
}));

export const ContentWrapper = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
  paddingTop: "96px", // Account for fixed navbar (16px top + 56px height + 24px spacing)
  paddingRight: "16px",
  paddingBottom: "32px",
  paddingLeft: "16px",
  "@media (min-width: 640px)": {
    paddingRight: "24px",
    paddingLeft: "24px",
  },
  "@media (min-width: 1024px)": {
    paddingRight: "32px",
    paddingBottom: "32px",
    paddingLeft: "32px",
  },
}));

