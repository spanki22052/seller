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
  paddingTop: "80px",
  "@media (min-width: 768px)": {
    marginLeft: "80px",
    paddingTop: "0",
  },
}));

export const ContentWrapper = styled.div(() => ({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "32px 16px",
  "@media (min-width: 640px)": {
    padding: "32px 24px",
  },
  "@media (min-width: 1024px)": {
    padding: "32px",
  },
}));

