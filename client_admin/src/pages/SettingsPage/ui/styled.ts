import styled from "styled-components";
import { MEDIA_QUERIES, SPACING, CONTAINER_WIDTHS } from "@/shared/lib/responsive";

export const Container = styled.div({
  width: "100%",
  maxWidth: CONTAINER_WIDTHS.xl,
  margin: "0 auto",
  padding: SPACING.lg,
  [MEDIA_QUERIES.md]: {
    padding: SPACING.md,
    maxWidth: "100%",
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.sm,
  },
});

export const SettingsCard = styled.div({
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  padding: SPACING.xl,
  [MEDIA_QUERIES.md]: {
    padding: SPACING.lg,
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.md,
  },
  "& .ant-card": {
    borderRadius: 8,
    boxShadow: "none",
    border: "1px solid #f0f0f0",
  },
  "& .ant-form-item": {
    marginBottom: SPACING.lg,
    [MEDIA_QUERIES.xs]: {
      marginBottom: SPACING.md,
    },
  },
  "& .ant-form-item-label": {
    paddingBottom: SPACING.xs,
    "& > label": {
      fontSize: 14,
      fontWeight: 500,
      color: "#262626",
    },
  },
  "& .ant-input, & .ant-input-disabled": {
    borderRadius: 6,
  },
  "& .ant-btn": {
    borderRadius: 6,
  },
  "& video, & img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 8,
  },
});

