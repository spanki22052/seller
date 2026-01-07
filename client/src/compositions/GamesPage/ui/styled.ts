import styled from "styled-components";
import { Button } from "antd";
import { motion } from "framer-motion";

// Main container for the games page
export const Container = styled.div(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.colors.bg.primary,
  padding: theme.spacing.xl,
  paddingTop: "120px", // Account for header
}));

// Content wrapper with max width and centering
export const ContentWrapper = styled.div({
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
});

// Page header section
export const HeaderSection = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  textAlign: "center",
}));

export const PageTitle = styled.h1(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 700,
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.md,
  textTransform: "uppercase",
  letterSpacing: "2px",

  "@media (max-width: 768px)": {
    fontSize: "36px",
  },

  "@media (max-width: 600px)": {
    fontSize: "28px",
  },
}));

export const PageSubtitle = styled.p(({ theme }) => ({
  fontSize: "18px",
  color: theme.colors.text.secondary,
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.6,

  "@media (max-width: 768px)": {
    fontSize: "16px",
  },
}));

// Search section
export const SearchSection = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.lg,
  maxWidth: "600px",
  margin: "0 auto",
}));

// Categories section
export const CategoriesSection = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.xl,
  marginTop: theme.spacing.lg,
  padding: `0 ${theme.spacing.md}`,

  "@media (max-width: 768px)": {
    gap: theme.spacing.sm,
    padding: `0 ${theme.spacing.sm}`,
    marginTop: theme.spacing.md,
  },
}));

export const CategoryButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.borderRadius.md,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: theme.transitions.normal,

  "&.ant-btn-primary": {
    backgroundColor: theme.colors.accent.purple,
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 4px 12px rgba(255, 0, 255, 0.2)`,

    "&:hover": {
      backgroundColor: theme.colors.accent.purple,
      borderColor: theme.colors.accent.purple,
      boxShadow: `0 6px 16px rgba(255, 0, 255, 0.3)`,
      transform: "translateY(-2px)",
    },
  },

  "&:not(.ant-btn-primary)": {
    backgroundColor: theme.colors.bg.card,
    borderColor: theme.colors.border.primary,
    color: theme.colors.text.primary,

    "&:hover": {
      borderColor: theme.colors.accent.purple,
      color: theme.colors.accent.purple,
      transform: "translateY(-2px)",
    },
  },
}));

// Games grid container
export const GamesGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing.lg,
  marginTop: theme.spacing.xl,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: theme.spacing.md,
  },

  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: theme.spacing.md,
  },

  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: theme.spacing.md,
  },
}));

// Individual game card (reusing GameGrid styles but as a grid item)
export const GameCard = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.borderRadius.lg,
  overflow: "hidden",
  transition: theme.transitions.normal,
  aspectRatio: "1 / 1.33",
  backgroundColor: "#000000",
  border: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.sm,

  "&:hover": {
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 8px 25px rgba(255, 0, 255, 0.15)`,
    transform: "translateY(-4px)",
  },
}));

// Motion wrapper for game cards with layout animation
export const MotionGameCard = styled(motion.div)({
  // Layout animations are handled by motion.div wrapper
});

export const GameImageWrapper = styled.div<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: $backgroundColor,
    zIndex: 0,
  })
);

export const GameImage = styled.img({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

// Gradient overlay for text readability
export const GradientOverlay = styled.div({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "50%",
  background: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)`,
  pointerEvents: "none",
  zIndex: 1,
});

// Bottom content container
export const GameContent = styled.div(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing.md,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const GameName = styled.div(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  lineHeight: 1.2,
  textShadow: `0 2px 8px rgba(0, 0, 0, 0.8)`,

  "@media (max-width: 768px)": {
    fontSize: "18px",
  },

  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const PriceContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
  flexWrap: "wrap",
}));

export const PriceBadge = styled.div(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: theme.colors.bg.secondary,
  borderRadius: theme.borderRadius.md,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  fontSize: "14px",
  fontWeight: 500,
  color: theme.colors.text.primary,
  border: `1px solid ${theme.colors.border.primary}`,

  "@media (max-width: 600px)": {
    fontSize: "12px",
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
  },
}));

export const PriceAmount = styled.span(({ theme }) => ({
  color: theme.colors.accent.purple,
  fontWeight: 600,
  paddingLeft: 4,
}));

export const OffersCount = styled.span(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 400,
  color: theme.colors.text.secondary,
  whiteSpace: "nowrap",

  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

// Empty state
export const EmptyState = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing.xl,
  textAlign: "center",
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.primary}`,
  marginTop: theme.spacing.xl,
}));

export const EmptyIcon = styled.div(({ theme }) => ({
  fontSize: "64px",
  marginBottom: theme.spacing.md,
  opacity: 0.5,
}));

export const EmptyText = styled.div(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: theme.colors.text.secondary,
  marginBottom: theme.spacing.sm,
}));

export const EmptySubtext = styled.div(({ theme }) => ({
  fontSize: "14px",
  color: theme.colors.text.tertiary,
  maxWidth: "400px",
}));

// Loading skeleton
export const LoadingSkeleton = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg.secondary,
  borderRadius: theme.borderRadius.lg,
  overflow: "hidden",
  aspectRatio: "1 / 1.33",
  border: `1px solid ${theme.colors.border.primary}`,
}));

export const SkeletonWrapper = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing.lg,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: theme.spacing.md,
  },

  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: theme.spacing.md,
  },

  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: theme.spacing.md,
  },
}));

// Stats section
export const StatsSection = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing.xl,
  marginBottom: theme.spacing.xl,
  flexWrap: "wrap",

  "@media (max-width: 768px)": {
    gap: theme.spacing.md,
  },
}));

export const StatCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.lg,
  border: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.sm,
  textAlign: "center",
  minWidth: "120px",

  "@media (max-width: 768px)": {
    padding: theme.spacing.md,
    minWidth: "100px",
  },
}));

export const StatValue = styled.div(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: theme.colors.accent.purple,
  marginBottom: theme.spacing.xs,

  "@media (max-width: 768px)": {
    fontSize: "28px",
  },
}));

export const StatLabel = styled.div(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.colors.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));
