import styled from "styled-components";
import { Layout } from "antd";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const LayoutWrapper = styled.div({
  minHeight: "100vh",
});

export const MainLayout = styled(Layout)<{
  $sidebarWidth: number;
  $isCollapsed: boolean;
}>(({ $sidebarWidth, $isCollapsed }) => ({
  marginLeft: $sidebarWidth,
  transition: "margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  minHeight: "100vh",
  [MEDIA_QUERIES.md]: {
    marginLeft: $isCollapsed ? 0 : $sidebarWidth,
  },
  "& .ant-layout-content": {
    padding: SPACING.lg,
    background: "#f0f2f5",
    minHeight: "100vh",
    maxWidth: 1400,
    margin: "0 auto",
    [MEDIA_QUERIES.md]: {
      padding: SPACING.md,
    },
    [MEDIA_QUERIES.xs]: {
      padding: SPACING.sm,
    },
  },
}));

