import styled from "styled-components";
import { Card } from "antd";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const NameCell = styled.span({
  fontWeight: 600,
  color: "#1890ff",
});

export const CountCell = styled.span({
  fontWeight: 500,
});

export const SalesCell = styled.span({
  fontWeight: 500,
  color: "#52c41a",
});

export const RatingCell = styled.span({
  fontWeight: 500,
});

export const Link = styled.a({
  fontSize: 14,
});

export const StyledCard = styled(Card)({
  "& .ant-card-body": {
    padding: SPACING.lg,
    [MEDIA_QUERIES.md]: {
      padding: SPACING.md,
    },
    [MEDIA_QUERIES.xs]: {
      padding: SPACING.sm,
    },
  },
  "& .ant-pagination": {
    margin: 0,
    paddingTop: SPACING.md,
    [MEDIA_QUERIES.xs]: {
      paddingTop: SPACING.sm,
    },
  },
});

