import styled from "styled-components";
import { Button } from "antd";

export const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.lg,
  width: "100%",
  "@media (max-width: 1024px)": {
    flexDirection: "column",
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
    gap: theme.spacing.md,
  },
  "@media (max-width: 768px)": {
    padding: `${theme.spacing.lg} ${theme.spacing.md}`,
    gap: theme.spacing.md,
  },
  "@media (max-width: 480px)": {
    padding: `${theme.spacing.md} ${theme.spacing.sm}`,
    gap: theme.spacing.sm,
  },
}));

export const MainContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing.lg,
  padding: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  border: `1px solid ${theme.colors.border.primary}`,
  backgroundColor: "transparent",
  position: "relative",
  overflow: "hidden",
  flex: "2 1 0",
  minWidth: 0,
  width: "100%",
  "@media (max-width: 1024px)": {
    flexDirection: "column",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    flex: "1 1 auto",
  },
  "@media (max-width: 768px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  "@media (max-width: 480px)": {
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
}));

export const LeftContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  flex: "2 1 0",
  minWidth: 0,
  "@media (max-width: 1024px)": {
    flex: "1 1 auto",
    gap: theme.spacing.sm,
  },
  "@media (max-width: 768px)": {
    gap: theme.spacing.sm,
  },
  "@media (max-width: 480px)": {
    gap: theme.spacing.xs,
  },
}));

export const RightColumn = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  flex: "1 1 0",
  minWidth: 280,
  maxWidth: 350,
  "@media (max-width: 1024px)": {
    minWidth: "auto",
    maxWidth: "none",
    width: "100%",
    flex: "1 1 auto",
    gap: theme.spacing.sm,
  },
  "@media (max-width: 768px)": {
    gap: theme.spacing.sm,
  },
  "@media (max-width: 480px)": {
    gap: theme.spacing.xs,
  },
}));

export const SideContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  padding: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  border: `1px solid ${theme.colors.border.primary}`,
  backgroundColor: "transparent",
  position: "relative",
  overflow: "hidden",
  "@media (max-width: 1024px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  "@media (max-width: 768px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  "@media (max-width: 480px)": {
    padding: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
}));

export const LogosContainer = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.sm,
  alignItems: "center",
  flexWrap: "wrap",
  position: "relative",
  zIndex: 1,
  marginBottom: theme.spacing.xs,
  "@media (max-width: 768px)": {
    gap: theme.spacing.xs,
  },
  "@media (max-width: 480px)": {
    gap: theme.spacing.xs,
  },
}));

export const LogoWrapper = styled.div({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "@media (max-width: 768px)": {
    width: 32,
    height: 32,
  },
  "@media (max-width: 480px)": {
    width: 28,
    height: 28,
  },
});

export const Title = styled.h3(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.text.primary,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  position: "relative",
  zIndex: 1,
  "@media (max-width: 1024px)": {
    fontSize: 18,
  },
  "@media (max-width: 768px)": {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  "@media (max-width: 480px)": {
    fontSize: 14,
    letterSpacing: 0.2,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  margin: 0,
  lineHeight: 1.6,
  position: "relative",
  zIndex: 1,
  "@media (max-width: 1024px)": {
    fontSize: 13,
    lineHeight: 1.5,
  },
  "@media (max-width: 768px)": {
    fontSize: 12,
    lineHeight: 1.5,
  },
  "@media (max-width: 480px)": {
    fontSize: 11,
    lineHeight: 1.4,
  },
}));

export const ButtonWrapper = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: theme.spacing.sm,
  position: "relative",
  zIndex: 1,
  "@media (max-width: 768px)": {
    marginTop: theme.spacing.xs,
    justifyContent: "center",
  },
  "@media (max-width: 480px)": {
    marginTop: theme.spacing.xs,
    width: "100%",
  },
}));

export const MotionButtonWrapper = styled.div({
  display: "inline-block",
  "@media (max-width: 480px)": {
    display: "block",
    width: "100%",
  },
});

const BaseGoButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
  border: "none",
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: 14,
  textTransform: "uppercase",
  letterSpacing: 1,
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  height: "auto",
  borderRadius: theme.borderRadius.md,
  boxShadow: `
    0 0 20px ${theme.colors.accent.purple}66,
    0 0 40px ${theme.colors.accent.pink}44,
    0 4px 12px rgba(139, 92, 246, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.1)
  `,
  position: "relative",
  overflow: "hidden",
  transition: theme.transitions.normal,
  "@media (max-width: 1024px)": {
    fontSize: 13,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    letterSpacing: 0.8,
  },
  "@media (max-width: 768px)": {
    fontSize: 12,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    letterSpacing: 0.5,
  },
  "@media (max-width: 480px)": {
    fontSize: 11,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    letterSpacing: 0.3,
    width: "100%",
  },
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
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
    animation: "pulse 2s ease-in-out infinite",
    pointerEvents: "none",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 0.5,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 0.8,
      transform: "scale(1.1)",
    },
  },
  "&:not(:disabled):hover": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purpleLight} 0%, ${theme.colors.accent.pinkLight} 50%, ${theme.colors.accent.blueLight} 100%) !important`,
    transform: "translateY(-2px)",
    boxShadow: `
      0 0 30px ${theme.colors.accent.purple}99,
      0 0 60px ${theme.colors.accent.pink}66,
      0 0 40px ${theme.colors.accent.blue}55,
      0 4px 20px rgba(139, 92, 246, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.15)
    `,
    "&::before": {
      left: "100%",
    },
  },
  "&:not(:disabled):focus": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    boxShadow: `
      0 0 25px ${theme.colors.accent.purple}88,
      0 0 50px ${theme.colors.accent.pink}55,
      0 0 35px ${theme.colors.accent.blue}44,
      inset 0 0 20px rgba(255, 255, 255, 0.1)
    `,
  },
  "&:not(:disabled):active": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    transform: "translateY(0)",
    boxShadow: `
      0 0 20px ${theme.colors.accent.purple}66,
      0 0 40px ${theme.colors.accent.pink}44,
      0 4px 12px rgba(139, 92, 246, 0.4)
    `,
  },
}));

export const GoButton = BaseGoButton;
