import styled from "styled-components";
import { Input } from "antd";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  paddingTop: theme.spacing.xl,
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  gap: 74,

  "@media (max-width: 1400px)": {
    gap: theme.spacing.xxl,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
  },

  "@media (max-width: 1024px)": {
    gap: theme.spacing.xxl,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
  },

  "@media (max-width: 768px)": {
    gap: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },
}));

export const MainContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: theme.spacing.xl,
  width: "100%",

  "@media (max-width: 1024px)": {
    gap: theme.spacing.xl,
  },

  "@media (max-width: 768px)": {
    gap: theme.spacing.lg,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.md,
  },
}));

export const SearchWrapper = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginBottom: theme.spacing.lg,

  "@media (max-width: 768px)": {
    marginBottom: theme.spacing.md,
  },
}));

export const SearchInput = styled(Input)(({ theme }) => ({
  maxWidth: 400,

  "&.ant-input-affix-wrapper": {
    "&:focus, &:focus-within": {
      borderColor: theme.colors.text.secondary,
      boxShadow: "none",
    },

    "&:hover": {
      borderColor: theme.colors.text.secondary,
    },
  },

  "& .ant-input": {
    "&:focus": {
      borderColor: "transparent",
      boxShadow: "none",
    },
  },
}));

export const StatusesWrapper = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.md,
  flexWrap: "wrap",
  marginBottom: theme.spacing.lg,
  width: "100%",

  "@media (max-width: 768px)": {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    flexDirection: "column",
    gap: theme.spacing.xs,
  },
}));

export const StatusCard = styled.div<{
  $bgColor: string;
  $borderColor: string;
  $glowColor?: string;
}>(({ theme, $bgColor, $borderColor, $glowColor }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  background: $bgColor,
  border: `1px solid ${$borderColor}`,
  borderRadius: theme.borderRadius.lg,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  flex: "1 1 auto",
  minWidth: 180,
  maxWidth: 250,

  "@media (max-width: 1024px)": {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    minWidth: 160,
  },

  "@media (max-width: 768px)": {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    minWidth: 140,
    gap: theme.spacing.sm,
  },

  "@media (max-width: 480px)": {
    minWidth: "auto",
    maxWidth: "none",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  },
}));

export const StatusIcon = styled.div<{ $color: string }>(({ $color }) => ({
  fontSize: 28,
  color: $color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${$color}20`,
  transition: "all 0.3s ease",

  "@media (max-width: 768px)": {
    fontSize: 24,
    width: 40,
    height: 40,
  },
}));

export const StatusContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const StatusCount = styled.div<{ $color: string }>(({ $color }) => ({
  fontSize: 32,
  fontWeight: 800,
  color: $color,
  lineHeight: 1,
  textShadow: `0 0 10px ${$color}40`,
  letterSpacing: "-0.02em",

  "@media (max-width: 768px)": {
    fontSize: 28,
  },

  "@media (max-width: 480px)": {
    fontSize: 24,
  },
}));

export const StatusLabel = styled.div(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
  fontWeight: 600,
  lineHeight: 1.3,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  opacity: 0.9,

  "@media (max-width: 768px)": {
    fontSize: 12,
  },

  "@media (max-width: 480px)": {
    fontSize: 11,
  },
}));
