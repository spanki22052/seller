import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 48,
  padding: `${theme.spacing.xxl} ${theme.spacing.xxl}`,
  width: "100%",
  minHeight: 600,
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    minHeight: "auto",
    padding: `${theme.spacing.xxl} ${theme.spacing.lg}`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      linear-gradient(180deg, rgba(30, 20, 50, 0.3) 0%, rgba(10, 10, 10, 0.8) 100%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
}));

export const LeftSection = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  zIndex: 2,
  position: "relative",
  marginTop: theme.spacing.xxl,
  paddingRight: theme.spacing.xxl,
  paddingLeft: theme.spacing.xxl,
  paddingTop: theme.spacing.xxl,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-20%",
    left: "-20%",
    right: "-20%",
    bottom: "-20%",
    backgroundImage: `
      radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
      radial-gradient(circle at 8px 8px, rgba(255, 255, 255, 0.1) 1px, transparent 0),
      radial-gradient(circle at 14px 14px, rgba(255, 255, 255, 0.08) 1px, transparent 0)
    `,
    backgroundSize: "20px 20px, 40px 40px, 60px 60px",
    opacity: 0.3,
    pointerEvents: "none",
    zIndex: -1,
  },
}));

export const BrandName = styled.div({
  fontSize: 14,
  fontWeight: 500,
  color: "#a78bfa",
  textTransform: "uppercase",
  letterSpacing: 1,
});

export const Title = styled.h1(({ theme }) => ({
  fontSize: 48,
  fontWeight: 800,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  lineHeight: 1.2,
  margin: 0,
  "@media (max-width: 768px)": {
    fontSize: 32,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.6,
  color: theme.colors.text.primary,
  margin: 0,
  maxWidth: 600,
}));

export const ButtonGroup = styled.div({
  display: "flex",
  gap: 32,
  alignItems: "center",
});

export const SocialButton = styled.button(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: "50%",
  border: `2px solid ${theme.colors.accent.purple}`,
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.normal,
  boxShadow: `0 0 20px rgba(255, 0, 255, 0.3)`,
  textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(255, 0, 255, 0.1)",
    borderColor: theme.colors.accent.purpleLight,
    boxShadow: `0 0 30px rgba(255, 0, 255, 0.5), 0 0 50px rgba(255, 0, 255, 0.3)`,
    textShadow: "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
    borderColor: theme.colors.accent.purple,
  },
}));

export const AdditionalText = styled.p(({ theme }) => ({
  fontSize: 18,
  lineHeight: 1.6,
  color: theme.colors.text.primary,
  margin: 0,
  maxWidth: 500,
}));

export const TelegramLink = styled.span(({ theme }) => ({
  color: "#60a5fa",
  fontWeight: 600,
  cursor: "pointer",
  "&:hover": {
    color: theme.colors.accent.blueLight,
    textDecoration: "underline",
  },
}));

export const RightSection = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
  zIndex: 1,
  padding: theme.spacing.xxl,
  paddingRight: theme.spacing.xxl,
  background: `
    radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
  `,
  "@media (max-width: 1024px)": {
    minHeight: 400,
    padding: theme.spacing.lg,
  },
}));

export const CharacterWrapper = styled.div({
  position: "relative",
  zIndex: 2,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const NeonLines = styled.div(({ theme }) => ({
  position: "absolute",
  top: "-10%",
  left: "-10%",
  right: "-10%",
  bottom: "-10%",
  zIndex: 1,
  background: `
    linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%),
    linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)
  `,
  border: `2px solid ${theme.colors.accent.purple}`,
  borderRadius: 8,
  opacity: 0.6,
  pointerEvents: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "20%",
    left: "20%",
    right: "20%",
    bottom: "20%",
    border: `1px solid ${theme.colors.accent.blue}`,
    borderRadius: 4,
    opacity: 0.4,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "30%",
    left: "30%",
    right: "30%",
    bottom: "30%",
    border: `1px dashed ${theme.colors.accent.purple}`,
    borderRadius: 2,
    opacity: 0.3,
  },
}));
