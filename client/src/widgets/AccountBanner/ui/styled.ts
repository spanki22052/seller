import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  padding: "24px 0 0 24px",
  gap: theme.spacing.xl,
  backgroundColor: "transparent",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
  },
}));

export const CrystalsContainer = styled.div({
  position: "absolute",
  top: "-10%",
  left: "-10%",
  right: "-10%",
  bottom: "-10%",
  pointerEvents: "none",
  zIndex: 10,
  overflow: "visible",
});

export const NeonBlinkContainer = styled.div({
  position: "absolute",
  top: "-10%",
  left: "-10%",
  right: "-10%",
  bottom: "-10%",
  pointerEvents: "none",
  zIndex: 5,
  overflow: "visible",
});

export const NeonBlinkWrapper = styled.div({
  position: "absolute",
  pointerEvents: "none",
  transform: "translate(-50%, -50%)",
});

export const RedLinesWrapper = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0.8,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const LeftSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  zIndex: 2,
  position: "relative",
});

export const LogosContainer = styled.div({
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
});

export const LogoWrapper = styled.div(({ theme }) => ({
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.normal,
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

export const TextContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const MainText = styled.div(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.4,
  color: theme.colors.text.primary,
  "@media (max-width: 768px)": {
    fontSize: 20,
  },
}));

export const SecondaryText = styled.div(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
}));

export const ButtonWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 8,
});

export const StoreButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
  border: "none",
  color: theme.colors.text.primary,
  fontWeight: 600,
  borderRadius: "999px !important",
  padding: "12px 32px",
  height: "auto",
  fontSize: 16,
  width: "fit-content",
  boxShadow: `0 0 20px ${theme.colors.accent.purple}66, 0 0 40px ${theme.colors.accent.pink}44, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
    transition: "left 0.5s ease",
  },
  "&:not(:disabled):hover": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purpleLight} 0%, ${theme.colors.accent.pinkLight} 50%, ${theme.colors.accent.blueLight} 100%) !important`,
    transform: "translateY(-2px)",
    boxShadow: `0 0 30px ${theme.colors.accent.purple}99, 0 0 60px ${theme.colors.accent.pink}66, 0 4px 20px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15)`,
    "&::before": {
      left: "100%",
    },
  },
  "&:not(:disabled):focus": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    boxShadow: `0 0 25px ${theme.colors.accent.purple}88, 0 0 50px ${theme.colors.accent.pink}55, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
  },
  "&:not(:disabled):active": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    transform: "translateY(0)",
    boxShadow: `0 0 20px ${theme.colors.accent.purple}66, 0 0 40px ${theme.colors.accent.pink}44`,
  },
}));

export const BottomText = styled.div(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.text.tertiary,
}));

export const RightSection = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  position: "relative",
  zIndex: 2,
  height: "100%",
  overflow: "hidden",
});

export const SkeletonImageWrapper = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  "@media (max-width: 1024px)": {
    minHeight: 300,
    maxWidth: "100%",
  },
});
