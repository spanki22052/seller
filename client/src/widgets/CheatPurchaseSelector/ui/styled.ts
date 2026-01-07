import styled from "styled-components";
import { Select } from "antd";

// Container
export const Container = styled.div(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  padding: `${theme.spacing.xl} ${theme.spacing.md}`,

  "@media (max-width: 768px)": {
    maxWidth: "100%",
    padding: `${theme.spacing.lg} ${theme.spacing.md}`,
  },
}));

// Card
export const Card = styled.div(({ theme }) => ({
  background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    rgba(0, 0, 0, 0.8)`,
  border: `1px solid ${theme.colors.accent.purple}33`,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",

  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
}));

// Header
export const Header = styled.div({
  textAlign: "center",
  marginBottom: 32,
});

export const Title = styled.h2(({ theme }) => ({
  fontSize: 28,
  fontWeight: 800,
  color: theme.colors.text.primary,
  margin: 0,
  marginBottom: 8,
  textTransform: "uppercase",
  letterSpacing: 1,

  "@media (max-width: 768px)": {
    fontSize: 24,
  },
}));

export const Subtitle = styled.p(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  margin: 0,
  opacity: 0.8,
}));

// Content
export const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

// Select Wrapper
export const SelectWrapper = styled.div({
  position: "relative",
});

// Styled Select
export const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  height: 56,

  "& .ant-select-selector": {
    height: "56px !important",
    background: "rgba(0, 0, 0, 0.5) !important",
    border: `2px solid ${theme.colors.accent.purple}66 !important`,
    borderRadius: `${theme.borderRadius.md} !important`,
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",

    "&:hover": {
      borderColor: `${theme.colors.accent.purple} !important`,
    },

    "&.ant-select-focused": {
      borderColor: `${theme.colors.accent.purpleLight} !important`,
    },
  },

  "& .ant-select-selection-item": {
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "space-between !important",
    fontSize: "16px !important",
    fontWeight: "600 !important",
    color: `${theme.colors.text.primary} !important`,
    height: "100% !important",
  },

  "& .ant-select-arrow": {
    color: `${theme.colors.accent.purple} !important`,
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    height: "100% !important",
  },
}));

export const DropdownIcon = styled.span(({ theme }) => ({
  color: theme.colors.accent.purple,
  fontSize: 12,
  fontWeight: 700,
  transition: "transform 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  lineHeight: 1,
}));

// Option Content
export const OptionContent = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "8px 0",
});

export const OptionTitle = styled.span(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.text.primary,
}));

export const OptionPrice = styled.span(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.colors.accent.purple,
}));

// Plan Info
export const PlanInfo = styled.div(({ theme }) => ({
  background: "rgba(255, 0, 255, 0.05)",
  border: `1px solid ${theme.colors.accent.purple}33`,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.lg,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backdropFilter: "blur(10px)",

  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: theme.spacing.md,
    textAlign: "center",
  },
}));

export const PlanDetails = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const PlanDuration = styled.div(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  letterSpacing: 1,
}));

export const PlanPrice = styled.div(({ theme }) => ({
  fontSize: 24,
  fontWeight: 800,
  color: theme.colors.accent.purple,
}));

export const PlanDays = styled.div(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.text.secondary,
  opacity: 0.8,
}));

// Purchase Button
export const PurchaseButton = styled.button(({ theme, disabled }) => ({
  width: "100%",
  height: 56,
  backgroundColor: disabled
    ? "rgba(255, 255, 255, 0.1)"
    : theme.colors.accent.purple,
  color: theme.colors.text.primary,
  border: "none",
  borderRadius: theme.borderRadius.md,
  fontSize: 18,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1,
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.3s ease",
  boxShadow: disabled
    ? "0 4px 16px rgba(0, 0, 0, 0.2)"
    : "0 4px 16px rgba(0, 0, 0, 0.2)",

  "&:hover": disabled
    ? {}
    : {
        backgroundColor: theme.colors.accent.purpleLight,
      },

  "&:active": disabled
    ? {}
    : {
        transform: "translateY(1px)",
      },
}));

export const ButtonText = styled.span({
  position: "relative",
  zIndex: 2,
});

export const ButtonGlow = styled.div({
  display: "none", // Hide the glow effect completely
});

// Footer
export const Footer = styled.div({
  marginTop: 24,
  textAlign: "center",
});

export const FooterText = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  margin: 0,
  opacity: 0.7,
}));

// Loading Card
export const LoadingCard = styled.div(({ theme }) => ({
  height: 300,
  background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    rgba(0, 0, 0, 0.8)`,
  border: `1px solid ${theme.colors.accent.purple}33`,
  borderRadius: theme.borderRadius.lg,
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
}));
