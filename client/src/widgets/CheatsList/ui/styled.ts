import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing.lg,
  width: "100%",

  "@media (max-width: 1280px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing.md,
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing.md,
    padding: `${theme.spacing.lg} ${theme.spacing.md}`,
  },
  "@media (max-width: 480px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.sm}`,
  },
}));

export const CheatCard = styled.div(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  overflow: "visible",
  backgroundColor: theme.colors.bg.card,
  transition: theme.transitions.normal,
  "&:hover": {
    transform: "translateY(-4px)",
  },
  "&:hover [data-neon-line]": {
    opacity: 1,
    transform: "translateX(-50%) scaleX(1)",
  },
}));

export const ImageWrapper = styled.div({
  position: "relative",
  width: "100%",
  paddingBottom: "133.33%", // 3:4 aspect ratio
  overflow: "hidden",
  borderRadius: "inherit",
});

export const CheatImage = styled.img({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const ChitarenaOverlay = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: theme.spacing.md,
  pointerEvents: "none",
  zIndex: 1,
  "&::before": {
    content: '"CHITARENA"',
    fontSize: 48,
    fontWeight: 800,
    color: "rgba(255, 255, 255, 0.15)",
    textTransform: "uppercase",
    letterSpacing: 2,
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    transform: "rotate(180deg)",
  },
}));

export const NewBadge = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.sm,
  right: theme.spacing.sm,
  backgroundColor: "#ef4444",
  color: theme.colors.text.primary,
  fontSize: 12,
  fontWeight: 700,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.borderRadius.sm,
  textTransform: "uppercase",
  zIndex: 2,
  boxShadow: `0 2px 8px rgba(239, 68, 68, 0.5)`,
}));

export const CardContent = styled.div(({ theme }) => ({
  padding: theme.spacing.md,
  backgroundColor: theme.colors.bg.card,
  borderRadius: "inherit",
  overflow: "hidden",
}));

export const CheatName = styled.div(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.xs,
  textTransform: "uppercase",
  letterSpacing: 0.5,
}));

export const Price = styled.div(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.accent.purple,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

export const PriceAmount = styled.span({
  fontSize: 16,
});

export const PriceCurrency = styled.span(({ theme }) => ({
  fontSize: 12,
  color: theme.colors.text.secondary,
}));

export const ComingSoonBadge = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.sm,
  left: theme.spacing.sm,
  backgroundColor: "rgba(139, 92, 246, 0.9)",
  color: theme.colors.text.primary,
  fontSize: 12,
  fontWeight: 700,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.borderRadius.sm,
  textTransform: "uppercase",
  zIndex: 2,
  boxShadow: `0 2px 8px rgba(139, 92, 246, 0.5)`,
}));
