import styled, { keyframes, css } from "styled-components";

const glitch = keyframes`
  0% {
    transform: translate(0);
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }
  20% {
    transform: translate(-2px, 2px);
    text-shadow: -2px 0 10px rgba(255, 0, 255, 0.5), 2px 0 10px rgba(59, 130, 246, 0.5);
  }
  40% {
    transform: translate(-2px, -2px);
    text-shadow: -2px 0 10px rgba(59, 130, 246, 0.5), 2px 0 10px rgba(255, 0, 255, 0.5);
  }
  60% {
    transform: translate(2px, 2px);
    text-shadow: 2px 0 10px rgba(255, 0, 255, 0.5), -2px 0 10px rgba(59, 130, 246, 0.5);
  }
  80% {
    transform: translate(2px, -2px);
    text-shadow: 2px 0 10px rgba(59, 130, 246, 0.5), -2px 0 10px rgba(255, 0, 255, 0.5);
  }
  100% {
    transform: translate(0);
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(100%);
    opacity: 0.1;
  }
`;

export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "transparent", // Background handled by globals.css
  position: "relative",
  zIndex: 1,
});

export const MainContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xl,
  paddingBottom: theme.spacing.xxl,
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  paddingLeft: theme.spacing.xl,
  paddingRight: theme.spacing.xl,
  minHeight: "calc(100vh - 200px)", // Account for navbar/header height
}));

export const ErrorCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: 2px solid ${({ theme }) => theme.colors.accent.purple};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 900px;
  width: 100%;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.2),
    inset 0 0 20px rgba(255, 0, 255, 0.05);
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.accent.purple},
      transparent
    );
    animation: ${css`
      ${scanline} 3s linear infinite
    `};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
    max-width: 100%;
  }
`;

export const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  width: "100%",
  textAlign: "center",
  position: "relative",
  zIndex: 2,
});

export const ErrorHeader = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  flexWrap: "wrap",
  width: "100%",

  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: 16,
  },
});

export const ErrorLabel = styled.span(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  color: theme.colors.accent.purple,
  textTransform: "uppercase",
  letterSpacing: 2,
  textShadow: `0 0 10px ${theme.colors.accent.purple}`,
  fontFamily: "inherit",

  "@media (max-width: 768px)": {
    fontSize: 24,
  },
}));

export const Number404 = styled.h1`
  font-size: 140px;
  font-weight: 800;
  line-height: 1;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: inherit;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  position: relative;
  transform: translateZ(0);
  will-change: transform;
  animation: ${css`
    ${glitch} 3s infinite
  `};

  @media (max-width: 768px) {
    font-size: 100px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const GarbledText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin: 0;
  letter-spacing: 2px;
  font-family: monospace;
  opacity: 0.8;
  position: relative;
  transform: translateZ(0);
  will-change: transform;
  animation: ${css`
    ${glitch} 4s infinite
  `};
  animation-delay: 0.5s;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ButtonWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 16,
});

export const HomeButton = styled.a(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
  backgroundColor: theme.colors.bg.secondary,
  color: theme.colors.accent.purple,
  border: `2px solid ${theme.colors.accent.purple}`,
  borderRadius: theme.borderRadius.lg,
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: 2,
  textDecoration: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  boxShadow: `
    0 0 15px rgba(255, 0, 255, 0.3),
    inset 0 0 10px rgba(255, 0, 255, 0.05)
  `,
  textShadow: `0 0 10px ${theme.colors.accent.purple}`,
  transform: "translateZ(0)",
  willChange: "transform",
  minWidth: 200,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.1), transparent)`,
    transition: "left 0.5s ease",
  },

  "&:hover": {
    backgroundColor: theme.colors.bg.tertiary,
    boxShadow: `
      0 0 25px rgba(255, 0, 255, 0.5),
      inset 0 0 15px rgba(255, 0, 255, 0.1)
    `,
    textShadow: `0 0 15px ${theme.colors.accent.purple}`,
    borderColor: theme.colors.accent.purpleLight,

    "&::before": {
      left: "100%",
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: `
      0 0 25px rgba(255, 0, 255, 0.5),
      inset 0 0 15px rgba(255, 0, 255, 0.1),
      0 0 0 3px rgba(255, 0, 255, 0.3)
    `,
    textShadow: `0 0 15px ${theme.colors.accent.purple}`,
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: `
      0 0 15px rgba(255, 0, 255, 0.3),
      inset 0 0 10px rgba(255, 0, 255, 0.05)
    `,
    textShadow: `0 0 10px ${theme.colors.accent.purple}`,
  },

  "@media (max-width: 768px)": {
    fontSize: 16,
    padding: `${12} ${24}`,
    minWidth: 180,
  },

  "@media (prefers-reduced-motion: reduce)": {
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    "&::before": {
      transition: "none",
    },
  },
}));
