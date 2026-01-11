import styled from "styled-components";
import { Card } from "antd";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const Container = styled.div({
  padding: SPACING.lg,
  backgroundColor: "#f0f2f5",
  minHeight: "100vh",
  width: "100%",
  maxWidth: 1400,
  [MEDIA_QUERIES.md]: {
    padding: SPACING.md,
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.sm,
  },
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: SPACING.lg,
  gap: SPACING.md,
  flexWrap: "wrap",
  [MEDIA_QUERIES.md]: {
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: SPACING.md,
  },
  "& > div": {
    flex: 1,
    minWidth: 0,
  },
});

export const Title = styled.h1({
  fontSize: 32,
  fontWeight: 700,
  marginBottom: SPACING.sm,
  color: "#262626",
  lineHeight: 1.2,
  [MEDIA_QUERIES.md]: {
    fontSize: 28,
  },
  [MEDIA_QUERIES.xs]: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
});

export const Subtitle = styled.p({
  fontSize: 16,
  color: "#8c8c8c",
  margin: 0,
  lineHeight: 1.5,
  [MEDIA_QUERIES.xs]: {
    fontSize: 14,
  },
});

export const FormCard = styled(Card)({
  marginBottom: SPACING.lg,
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  [MEDIA_QUERIES.md]: {
    marginBottom: SPACING.md,
  },
});

export const TableCard = styled(Card)({
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  overflow: "hidden",
  "& .ant-card-body": {
    padding: 0,
    [MEDIA_QUERIES.xs]: {
      padding: SPACING.sm,
    },
  },
});

export const TableWrapper = styled.div({
  overflowX: "auto",
  width: "100%",
  WebkitOverflowScrolling: "touch",
  "& .ant-table": {
    minWidth: 800,
    [MEDIA_QUERIES.md]: {
      minWidth: 600,
    },
    [MEDIA_QUERIES.xs]: {
      minWidth: 500,
    },
  },
  "& .ant-table-thead > tr > th": {
    whiteSpace: "nowrap",
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.xs}px ${SPACING.sm}px`,
      fontSize: 12,
    },
  },
  "& .ant-table-tbody > tr > td": {
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.xs}px ${SPACING.sm}px`,
      fontSize: 12,
    },
  },
  "& .ant-pagination": {
    padding: `${SPACING.lg}px ${SPACING.lg}px ${SPACING.lg}px ${SPACING.lg}px`,
    margin: 0,
    [MEDIA_QUERIES.md]: {
      padding: `${SPACING.md}px ${SPACING.md}px ${SPACING.md}px ${SPACING.md}px`,
    },
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.sm}px ${SPACING.sm}px ${SPACING.sm}px ${SPACING.sm}px`,
    },
  },
});

export const ColorCell = styled.div({
  display: "flex",
  alignItems: "center",
  gap: SPACING.sm,
  flexWrap: "wrap",
  [MEDIA_QUERIES.xs]: {
    gap: SPACING.xs,
  },
});

export const ColorSquare = styled.div<{ color: string }>(({ color }) => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  backgroundColor: color,
  border: "1px solid #d9d9d9",
  flexShrink: 0,
  [MEDIA_QUERIES.xs]: {
    width: 16,
    height: 16,
  },
}));

export const NoImagePlaceholder = styled.span({
  color: "#8c8c8c",
  fontStyle: "italic",
  fontSize: 12,
});

export const ClickableName = styled.span({
  color: "#1890ff",
  cursor: "pointer",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#40a9ff",
    textDecoration: "underline",
  },
  "&:active": {
    color: "#096dd9",
  },
});

export const FiltersCard = styled(Card)({
  marginBottom: SPACING.lg,
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  [MEDIA_QUERIES.md]: {
    marginBottom: SPACING.md,
  },
  "& .ant-card-body": {
    padding: SPACING.lg,
    [MEDIA_QUERIES.xs]: {
      padding: SPACING.md,
    },
  },
});

export const FiltersRow = styled.div({
  display: "flex",
  gap: SPACING.md,
  flexWrap: "wrap",
  alignItems: "flex-end",
  [MEDIA_QUERIES.md]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  "& > *": {
    flex: "1 1 200px",
    minWidth: 200,
    [MEDIA_QUERIES.md]: {
      minWidth: "100%",
    },
  },
});

