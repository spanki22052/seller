import styled, { css, keyframes } from "styled-components";

// Keyframe animations for modern effects
const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Glassmorphism mixin
const glassmorphism = css`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Base container styles
export const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
});

export const MainContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: theme.spacing.xxl,
  paddingTop: theme.spacing.xxl,
  paddingBottom: theme.spacing.xxl,
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  paddingLeft: theme.spacing.xl,
  paddingRight: theme.spacing.xl,

  "@media (max-width: 768px)": {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    gap: theme.spacing.xl,
  },
}));

// Header styles
export const Header = styled.div(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing.xxl,
  marginBottom: theme.spacing.xl,

  "@media (max-width: 768px)": {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },

  "& h1": {
    fontSize: "3.5rem",
    fontWeight: 700,
    background: theme.colors.gradient.purpleBlue,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: theme.spacing.md,
    lineHeight: 1.2,

    "@media (max-width: 768px)": {
      fontSize: "2.5rem",
    },
  },

  "& p": {
    fontSize: "1.25rem",
    color: theme.colors.text.secondary,
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,

    "@media (max-width: 768px)": {
      fontSize: "1.1rem",
    },
  },
}));

// Warning section styles
export const WarningSection = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: theme.spacing.lg,
  marginBottom: theme.spacing.xxl,

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: theme.spacing.md,
  },
}));

// Warning card styles with different types
export const WarningCard = styled.div<{
  type: "danger" | "warning" | "info" | "success";
}>`
  ${glassmorphism}
  padding: ${({ theme }) => theme.spacing.xl};
  borderradius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  animation: ${css`${float} 6s ease-in-out infinite`};

  ${({ type, theme }) => {
    const colors = {
      danger: {
        borderColor: theme.colors.status.error,
        glow: `0 0 20px rgba(239, 68, 68, 0.3)`,
        iconBg: `linear-gradient(135deg, ${theme.colors.status.error}22, ${theme.colors.status.error}44)`,
      },
      warning: {
        borderColor: theme.colors.status.warning,
        glow: `0 0 20px rgba(245, 158, 11, 0.3)`,
        iconBg: `linear-gradient(135deg, ${theme.colors.status.warning}22, ${theme.colors.status.warning}44)`,
      },
      info: {
        borderColor: theme.colors.status.info,
        glow: `0 0 20px rgba(59, 130, 246, 0.3)`,
        iconBg: `linear-gradient(135deg, ${theme.colors.status.info}22, ${theme.colors.status.info}44)`,
      },
      success: {
        borderColor: theme.colors.status.success,
        glow: `0 0 20px rgba(16, 185, 129, 0.3)`,
        iconBg: `linear-gradient(135deg, ${theme.colors.status.success}22, ${theme.colors.status.success}44)`,
      },
    };

    return css`
      border-color: ${colors[type].borderColor};
      box-shadow: ${colors[type].glow};

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), ${colors[type].glow};
        animation-play-state: paused;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        transition: left 0.5s;
      }

      &:hover::before {
        left: 100%;
      }
    `;
  }}

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const WarningIcon = styled.div(({ theme }) => ({
  fontSize: "2rem",
  width: "60px",
  height: "60px",
  borderRadius: theme.borderRadius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing.md,
  background:
    "linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(59, 130, 246, 0.1))",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

export const WarningContent = styled.div({
  position: "relative",
  zIndex: 1,
});

export const WarningTitle = styled.h3(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.sm,
  lineHeight: 1.4,
}));

export const WarningText = styled.p(({ theme }) => ({
  fontSize: "1rem",
  color: theme.colors.text.secondary,
  lineHeight: 1.6,
  margin: 0,
}));

// FAQ section styles
export const FAQSection = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  marginBottom: theme.spacing.xxl,
}));

export const FAQItem = styled.div(({ theme }) => ({
  background: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  border: `1px solid ${theme.colors.border.primary}`,
  transition: `all ${theme.transitions.normal}`,

  "&:hover": {
    borderColor: theme.colors.border.accent,
    boxShadow: theme.shadows.glow,
    transform: "translateY(-2px)",
  },

  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
  },
}));

export const FAQQuestion = styled.h3(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.md,
  lineHeight: 1.4,
  background: theme.colors.gradient.purpleBlue,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export const FAQAnswer = styled.p(({ theme }) => ({
  fontSize: "1rem",
  color: theme.colors.text.secondary,
  lineHeight: 1.7,
  margin: 0,
}));
