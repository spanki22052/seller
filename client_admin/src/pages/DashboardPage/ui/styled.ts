import styled from "styled-components";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const Container = styled.div({
  padding: SPACING.lg,
  backgroundColor: "#f0f2f5",
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100%",
  [MEDIA_QUERIES.md]: {
    padding: SPACING.md,
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.sm,
  },
});

export const Header = styled.div({
  marginBottom: SPACING.lg,
  [MEDIA_QUERIES.md]: {
    marginBottom: SPACING.md,
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

