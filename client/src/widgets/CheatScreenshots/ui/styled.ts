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

export const Grid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing.lg,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing.md,
  },

  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing.sm,
  },
}));

export const ScreenshotWrapper = styled.div({
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "40px", // 3x theme.borderRadius.md (8px * 3 = 24px)

  "@media (max-width: 768px)": {
    borderRadius: "20px", // 2 times less (40px / 2 = 20px)
  },
});

export const ImageContainer = styled.div(({ theme }) => {
  const baseRadius = parseInt(theme.borderRadius.md, 10);
  return {
    position: "relative",
    width: "100%",
    paddingBottom: "75%", // 4:3 aspect ratio
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    borderRadius: `${baseRadius * 3}px`, // 3x theme.borderRadius.md (8px * 3 = 24px)

    "@media (max-width: 768px)": {
      borderRadius: `${baseRadius * 1.5}px`, // 2 times less (baseRadius * 3 / 2)
    },

    "& img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  };
});

export const Watermark = styled.div(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: 48,
  fontWeight: 800,
  color: "rgba(139, 92, 246, 0.3)",
  textTransform: "uppercase",
  letterSpacing: 4,
  pointerEvents: "none",
  zIndex: 1,
  userSelect: "none",
}));
