import styled from "styled-components";
import { MEDIA_QUERIES } from "@/shared/lib/responsive";

export const SiderWrapper = styled.div({
  minHeight: "100vh",
  backgroundColor: "#fff",
  [MEDIA_QUERIES.md]: {
    zIndex: 1000,
  },
});

export const LogoContainer = styled.div({
  position: "relative",
  padding: "20px 16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  minHeight: 80,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
});

export const Logo = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  justifyContent: "flex-start",
  paddingLeft: 8,
});

export const LogoCollapsed = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const LogoIcon = styled.span({
  fontSize: 28,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
});

export const LogoImage = styled.img({
  borderRadius: 8,
  objectFit: "contain",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
});

export const LogoText = styled.span({
  fontSize: 18,
  fontWeight: 700,
  color: "#ffffff",
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
});

export const CollapseButton = styled.button<{ $collapsed: boolean }>(({ $collapsed }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: 8,
  width: $collapsed ? 40 : "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#ffffff",
  fontSize: 16,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(102, 126, 234, 0.3)",
  },
}));

export const MenuContainer = styled.div({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  paddingTop: 8,
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: 3,
    "&:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
  "& .ant-menu-item": {
    margin: "4px 8px",
    borderRadius: 8,
    height: 48,
    lineHeight: "48px",
    padding: "0 16px !important",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      transform: "scaleY(0)",
      transition: "transform 0.3s ease",
    },
    "&:hover": {
      background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
      transform: "translateX(4px)",
      "&::before": {
        transform: "scaleY(1)",
      },
      "& .anticon": {
        transform: "scale(1.1)",
        color: "#667eea",
      },
    },
    "&.ant-menu-item-selected": {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      fontWeight: 600,
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
      transform: "translateX(4px)",
      "&::before": {
        transform: "scaleY(1)",
      },
      "&::after": {
        display: "none",
      },
      "& .anticon": {
        color: "#ffffff",
        transform: "scale(1.15)",
      },
    },
    "& .anticon": {
      fontSize: 18,
      transition: "all 0.3s ease",
      marginRight: 12,
      minWidth: 20,
    },
  },
  "& .ant-menu-item-selected": {
    "& .anticon": {
      transform: "scale(1.15)",
    },
  },
});

export const Footer = styled.div({
  padding: "16px",
  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
  background: "#fafafa",
});

export const FooterContent = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
});

export const FooterText = styled.div<{ $collapsed: boolean }>(({ $collapsed }) => ({
  fontSize: 12,
  color: "#8c8c8c",
  textAlign: "center",
  transition: "opacity 0.3s ease",
  opacity: $collapsed ? 0 : 1,
  width: "100%",
  fontWeight: 500,
  paddingBottom: 4,
}));

export const LogoutButton = styled.button<{ $collapsed: boolean }>(({ $collapsed }) => ({
  background: "#ff4d4f",
  border: "none",
  borderRadius: 8,
  width: $collapsed ? 40 : "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 2px 8px rgba(255, 77, 79, 0.3)",
  "&:hover": {
    background: "#ff7875",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(255, 77, 79, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(255, 77, 79, 0.3)",
  },
  "& span": {
    display: $collapsed ? "none" : "inline",
  },
}));

