import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing.xxl,
  padding: `${theme.spacing.xxl} ${theme.spacing.xxl}`,
  width: "100%",
  minHeight: 600,
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    minHeight: "auto",
    gap: 0,
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  },
  "@media (max-width: 768px)": {
    gap: 0,
    padding: `${theme.spacing.lg} ${theme.spacing.md}`,
  },
  "@media (max-width: 480px)": {
    gap: 0,
    padding: `${theme.spacing.md} ${theme.spacing.sm}`,
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
  gap: theme.spacing.lg,
  zIndex: 2,
  position: "relative",
  marginTop: theme.spacing.xxl,
  paddingRight: theme.spacing.xxl,
  paddingLeft: theme.spacing.xxl,
  paddingTop: theme.spacing.xxl,
  "@media (max-width: 1024px)": {
    marginTop: theme.spacing.xl,
    paddingRight: theme.spacing.lg,
    paddingLeft: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
    zIndex: 3,
  },
  "@media (max-width: 768px)": {
    marginTop: theme.spacing.lg,
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.md,
    zIndex: 3,
  },
  "@media (max-width: 480px)": {
    marginTop: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
    zIndex: 3,
  },
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
    "@media (max-width: 768px)": {
      opacity: 0.15, // Reduce pattern visibility on smaller screens for better readability
    },
  },
}));

export const BrandName = styled.div({
  fontSize: 14,
  fontWeight: 500,
  color: "#a78bfa",
  textTransform: "uppercase",
  letterSpacing: 1,
  display: "flex",
  alignItems: "center",
  "@media (max-width: 768px)": {
    fontSize: 13,
  },
  "@media (max-width: 480px)": {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

export const Title = styled.h1(({ theme }) => ({
  fontSize: 48,
  fontWeight: 800,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  lineHeight: 1.2,
  margin: 0,
  "@media (max-width: 1024px)": {
    fontSize: 40,
  },
  "@media (max-width: 768px)": {
    fontSize: 28,
    lineHeight: 1.3,
  },
  "@media (max-width: 480px)": {
    fontSize: 24,
    lineHeight: 1.3,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.6,
  color: theme.colors.text.primary,
  margin: 0,
  maxWidth: 600,
  "@media (max-width: 1024px)": {
    fontSize: 18,
    maxWidth: "100%",
  },
  "@media (max-width: 768px)": {
    fontSize: 16,
    lineHeight: 1.5,
  },
  "@media (max-width: 480px)": {
    fontSize: 14,
    lineHeight: 1.5,
  },
}));

export const ButtonGroup = styled.div({
  display: "flex",
  gap: 32,
  alignItems: "center",
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    gap: 24,
  },
  "@media (max-width: 480px)": {
    gap: 16,
  },
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
  touchAction: "manipulation", // Improve touch responsiveness
  WebkitTapHighlightColor: "transparent", // Remove tap highlight on mobile
  "@media (max-width: 768px)": {
    width: 72,
    height: 72,
    fontSize: 14,
  },
  "@media (max-width: 480px)": {
    width: 56, // Minimum 44px touch target + padding
    height: 56,
    fontSize: 12,
    borderWidth: "1.5px",
    boxShadow: `0 0 15px rgba(255, 0, 255, 0.25)`,
  },
  "&:hover": {
    backgroundColor: "rgba(255, 0, 255, 0.1)",
    borderColor: theme.colors.accent.purpleLight,
    boxShadow: `0 0 30px rgba(255, 0, 255, 0.5), 0 0 50px rgba(255, 0, 255, 0.3)`,
    textShadow: "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",
    transform: "scale(1.05)",
    "@media (max-width: 768px)": {
      transform: "scale(1.03)", // Slightly less scale on smaller screens
    },
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
  "@media (max-width: 1024px)": {
    fontSize: 16,
    maxWidth: "100%",
  },
  "@media (max-width: 768px)": {
    fontSize: 14,
    lineHeight: 1.5,
  },
  "@media (max-width: 480px)": {
    fontSize: 12,
    lineHeight: 1.4,
  },
}));

export const TelegramLink = styled.span(({ theme }) => ({
  color: "#60a5fa",
  fontWeight: 600,
  cursor: "pointer",
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
  minHeight: "44px", // Ensure touch target is accessible
  display: "inline-block",
  padding: "4px 0", // Add padding for better touch target
  "@media (max-width: 480px)": {
    padding: "6px 0", // More padding on mobile for easier tapping
  },
  "&:hover": {
    color: theme.colors.accent.blueLight,
    textDecoration: "underline",
  },
  "&:active": {
    opacity: 0.8, // Visual feedback on touch
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "auto",
    padding: 0,
    background: `
      radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
    `,
  },
  "@media (max-width: 768px)": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "auto",
    padding: 0,
    background: `
      radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
    `,
  },
  "@media (max-width: 480px)": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "auto",
    padding: 0,
    background: `
      radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
    `,
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
  "@media (max-width: 1024px)": {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "auto",
    height: "auto",
    maxWidth: "50%",
    opacity: 0.3,
  },
  "@media (max-width: 768px)": {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "auto",
    height: "auto",
    maxWidth: "45%",
    opacity: 0.3,
  },
  "@media (max-width: 480px)": {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "auto",
    height: "auto",
    maxWidth: "40%",
    opacity: 0.25,
  },
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
