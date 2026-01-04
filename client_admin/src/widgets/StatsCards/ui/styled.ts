import styled from "styled-components";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const Container = styled.div({
  marginBottom: SPACING.lg,
  [MEDIA_QUERIES.md]: {
    marginBottom: SPACING.md,
  },
});

export const Trend = styled.div({
  marginTop: SPACING.sm,
  fontSize: 12,
  color: "#8c8c8c",
  [MEDIA_QUERIES.xs]: {
    fontSize: 11,
  },
});

