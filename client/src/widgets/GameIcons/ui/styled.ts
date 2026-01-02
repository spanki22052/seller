import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "16px",
  paddingTop: theme.spacing.xl,
  paddingBottom: theme.spacing.xl,
  width: "100%",
  position: "relative",
  zIndex: 5,
  flexWrap: "wrap",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "2px",
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "2px",
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "@media (max-width: 768px)": {
    gap: "16px",
    padding: theme.spacing.lg,
  },
}));

export const GameItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
  },
});

export const GameIcon = styled.div(({ theme }) => ({
  width: "190px",
  height: "190px",
  borderRadius: "50%",
  border: `2px solid ${theme.colors.border.secondary}`,
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.colors.bg.secondary,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 0 20px ${theme.colors.accent.purple}66`,
  },
  "@media (max-width: 768px)": {
    width: "100px",
    height: "100px",
  },
}));

export const GameImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  [`${GameItem}:hover &`]: {
    transform: "scale(1.1)",
  },
});

export const GameName = styled.div(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.colors.text.primary,
  textAlign: "center",
  letterSpacing: "1px",
}));
