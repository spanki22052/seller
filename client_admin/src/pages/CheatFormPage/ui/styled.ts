import styled from "styled-components";
import { Card } from "antd";
import { MEDIA_QUERIES, SPACING, CONTAINER_WIDTHS } from "@/shared/lib/responsive";

export const Container = styled.div({
  padding: SPACING.lg,
  paddingBottom: 120, // Space for sticky footer
  maxWidth: 1400,
  margin: "0 auto",
  minHeight: "100vh",
  position: "relative",
  width: "100%",
  [MEDIA_QUERIES.md]: {
    padding: SPACING.md,
    paddingBottom: 100,
    maxWidth: 1400,
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.sm,
    paddingBottom: 90,
  },
});

export const Header = styled.div({
  marginBottom: SPACING.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: SPACING.md,
  [MEDIA_QUERIES.md]: {
    marginBottom: SPACING.md,
  },
  [MEDIA_QUERIES.xs]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export const Title = styled.h1({
  margin: 0,
  fontSize: 28,
  fontWeight: 600,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  lineHeight: 1.2,
  [MEDIA_QUERIES.md]: {
    fontSize: 24,
  },
  [MEDIA_QUERIES.xs]: {
    fontSize: 20,
  },
});

export const SectionTitle = styled.h3({
  marginBottom: SPACING.md,
  fontSize: 18,
  fontWeight: 600,
  color: "#262626",
  lineHeight: 1.3,
  [MEDIA_QUERIES.xs]: {
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
});

export const StyledCard = styled(Card)({
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  "& .ant-card-body": {
    padding: SPACING.xl,
    [MEDIA_QUERIES.md]: {
      padding: SPACING.lg,
    },
    [MEDIA_QUERIES.xs]: {
      padding: SPACING.md,
    },
  },
  "& .ant-form-item-label > label": {
    fontWeight: 500,
    fontSize: 14,
    [MEDIA_QUERIES.xs]: {
      fontSize: 13,
    },
  },
  "& .ant-input, & .ant-select-selector": {
    borderRadius: 6,
  },
  "& .ant-btn": {
    borderRadius: 6,
  },
  "& .ant-divider": {
    margin: `${SPACING.lg}px 0`,
    [MEDIA_QUERIES.xs]: {
      margin: `${SPACING.md}px 0`,
    },
  },
});

export const Footer = styled.div({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderTop: "1px solid #f0f0f0",
  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)",
  zIndex: 1000,
  padding: `${SPACING.md}px ${SPACING.lg}px`,
  [MEDIA_QUERIES.xs]: {
    padding: `${SPACING.sm}px ${SPACING.md}px`,
  },
});

export const FooterContent = styled.div({
  maxWidth: CONTAINER_WIDTHS.xl,
  margin: "0 auto",
  display: "flex",
  justifyContent: "flex-end",
  gap: SPACING.md,
  [MEDIA_QUERIES.xs]: {
    justifyContent: "stretch",
    "& .ant-btn": {
      flex: 1,
    },
  },
});

