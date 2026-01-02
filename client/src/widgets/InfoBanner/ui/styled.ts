import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  gridTemplateColumns: "1fr 1fr",
  padding: 24,
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

export const LeftSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  zIndex: 2,
  position: "relative",
  justifyContent: "center",
});

export const RightSection = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  position: "relative",
  zIndex: 2,
  height: "100%",
  gap: 24,
  "@media (max-width: 1024px)": {
    alignItems: "center",
  },
});

export const SkeletonImageWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: 600,
    height: 700,
  },
  "@media (max-width: 1199px)": {
    display: "none",
  },
});

export const InfoImageWrapper = styled.div({
  position: "relative",
  width: "100%",
  maxWidth: 500,
  height: "100%",
  minHeight: 400,
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

export const TextContent = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  paddingRight: 24,
  maxWidth: "50%",
  zIndex: 3,
  "@media (max-width: 1024px)": {
    position: "relative",
    maxWidth: "100%",
    paddingRight: 0,
    marginTop: 24,
    justifyContent: "flex-start",
  },
});

export const Title = styled.div(({ theme }) => ({
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 1.4,
  color: theme.colors.text.primary,
  marginBottom: 8,
  "@media (max-width: 768px)": {
    fontSize: 24,
  },
}));

export const Paragraph = styled.div(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
  fontStyle: "italic",
  "@media (max-width: 768px)": {
    fontSize: 14,
  },
}));
