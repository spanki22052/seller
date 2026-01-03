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
  display: "flex",
  flexDirection: "column",
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.borderRadius.md,
  overflow: "visible",
  transition: theme.transitions.normal,
  aspectRatio: "1 / 1.33", // Height is 1.33x width, so square image takes 75% and title takes 25%
  backgroundColor: theme.colors.bg.card,
  "&:hover [data-neon-line]": {
    opacity: 1,
    transform: "translateX(-50%) scaleX(1)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`,
    background: `linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(64, 64, 64, 0.15) 40%, rgba(192, 192, 192, 0.05) 70%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 1,
  },
}));

export const GameImageWrapper = styled.div<{ $backgroundColor: string }>(
  ({ $backgroundColor, theme }) => ({
    position: "relative",
    width: "100%",
    aspectRatio: "1", // Square aspect ratio
    overflow: "hidden",
    borderRadius: theme.borderRadius.md,
    backgroundColor: $backgroundColor,
    flexShrink: 0,
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

export const GameName = styled.div(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: 600,
  color: theme.colors.text.primary,
  textAlign: "center",
}));
