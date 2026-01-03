import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,
  width: "100%",
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 36,
  fontWeight: 800,
  color: theme.colors.text.primary,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 1,

  "@media (max-width: 768px)": {
    fontSize: 28,
  },
}));

export const ContentWrapper = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing.xl,
  padding: theme.spacing.xl,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.accent}`,
  background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)`,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
  },

  "@media (max-width: 768px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
}));

export const LeftSection = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const VideoThumbnail = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 500,
  aspectRatio: "16 / 9",
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.bg.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: `2px solid ${theme.colors.border.accent}`,
}));

export const PlayButton = styled.div(({ theme }) => ({
  position: "absolute",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.colors.accent.purple,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 32,
  color: theme.colors.text.primary,
  cursor: "pointer",
  zIndex: 2,
  boxShadow: `0 4px 20px rgba(255, 0, 255, 0.5)`,
  transition: "all 0.3s ease",

  "@media (max-width: 768px)": {
    width: 64,
    height: 64,
    fontSize: 24,
  },

  "@media (max-width: 480px)": {
    width: 56,
    height: 56,
    fontSize: 20,
  },

  "&:hover": {
    backgroundColor: theme.colors.accent.purpleLight,
    boxShadow: `0 6px 30px rgba(255, 0, 255, 0.7)`,
  },
}));

export const OverlayText = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.lg,
  left: theme.spacing.lg,
  fontSize: 32,
  fontWeight: 800,
  color: theme.colors.accent.pink,
  textTransform: "uppercase",
  letterSpacing: 2,
  zIndex: 1,

  "@media (max-width: 768px)": {
    fontSize: 24,
    top: theme.spacing.md,
    left: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    fontSize: 20,
    top: theme.spacing.sm,
    left: theme.spacing.sm,
  },
}));

export const OverlaySubtext = styled.div(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing.lg,
  left: theme.spacing.lg,
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.accent.pink,
  textTransform: "uppercase",
  letterSpacing: 1,
  zIndex: 1,

  "@media (max-width: 768px)": {
    fontSize: 14,
    bottom: theme.spacing.md,
    left: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    fontSize: 12,
    bottom: theme.spacing.sm,
    left: theme.spacing.sm,
  },
}));

export const RightSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  justifyContent: "center",
});

export const QuestionTitle = styled.h3(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  color: theme.colors.text.primary,
  margin: 0,

  "@media (max-width: 768px)": {
    fontSize: 24,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  lineHeight: 1.8,
  margin: 0,

  "@media (max-width: 768px)": {
    fontSize: 14,
  },

  "@media (max-width: 480px)": {
    fontSize: 13,
  },
}));

