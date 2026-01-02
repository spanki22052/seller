import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing.xxl,
  width: "100%",
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing.md,
  },
}));

export const GameTile = styled.div(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  overflow: "hidden",
  transition: theme.transitions.normal,
  "&:hover": {
    boxShadow: `0 8px 24px rgba(139, 92, 246, 0.3)`,
  },
}));

export const GameImageWrapper = styled.div<{ $backgroundColor: string }>(
  ({ $backgroundColor, theme }) => ({
    position: "relative",
    width: "100%",
    paddingBottom: "133.33%", // 3:4 aspect ratio
    overflow: "hidden",
    borderRadius: theme.borderRadius.md,
    backgroundColor: $backgroundColor,
  })
);

export const GameName = styled.div(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing.sm,
  left: theme.spacing.sm,
  fontSize: "14px",
  fontWeight: 600,
  color: theme.colors.text.primary,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  zIndex: 2,
}));
