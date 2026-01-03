import styled, { keyframes, css } from "styled-components";

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto 1fr",
  gap: theme.spacing.xl,
  width: "100%",
  alignItems: "center",
  minHeight: 600,
  padding: `${theme.spacing.xl} 0`,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto",
    gap: theme.spacing.lg,
    minHeight: "auto",
  },
}));

export const SearchBarWrapper = styled.div({
  gridColumn: "1 / -1",
  width: "100%",
  marginBottom: 16,
});

export const LeftSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  zIndex: 1,
});

export const BrandName = styled.div`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent.purple} 0%, ${({ theme }) => theme.colors.accent.purpleLight} 50%, ${({ theme }) => theme.colors.accent.blue} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  filter: drop-shadow(0 0 8px rgba(255, 0, 255, 0.6)) drop-shadow(0 0 16px rgba(255, 0, 255, 0.4));
  background-size: 200% 200%;
  animation: ${css`
    ${gradientShift} 3s ease infinite
  `};
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-position: 0% 50%;
  }
`;

export const Title = styled.h1(({ theme }) => ({
  fontSize: 48,
  fontWeight: 800,
  color: theme.colors.text.primary,
  lineHeight: 1.2,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 1,

  "@media (max-width: 768px)": {
    fontSize: 32,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  color: theme.colors.text.primary,
  lineHeight: 1.6,
  margin: 0,
}));

export const ButtonGroup = styled.div({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",

  "*": {
    borderRadius: "50px !important",
  },
});

export const PrimaryButton = styled.button(({ theme }) => ({
  padding: `calc(${theme.spacing.md} / 1.3) calc(${theme.spacing.xl} / 1.3)`,
  backgroundColor: theme.colors.accent.purple,
  color: theme.colors.text.primary,
  border: "none",
  borderRadius: theme.borderRadius.md,
  fontSize: "calc(16px / 1.3)",
  fontWeight: 700,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: 1,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  boxShadow: `
    0 4px 12px rgba(255, 0, 255, 0.4),
    0 0 20px rgba(255, 0, 255, 0.2),
    inset 0 0 20px rgba(255, 0, 255, 0.1)
  `,
  textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
  transform: "translateZ(0)", // GPU acceleration
  willChange: "transform",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
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
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  },

  "&:hover": {
    backgroundColor: theme.colors.accent.purpleLight,
    boxShadow: `
      0 6px 20px rgba(255, 0, 255, 0.6),
      0 0 30px rgba(255, 0, 255, 0.4),
      0 0 50px rgba(255, 0, 255, 0.2),
      inset 0 0 30px rgba(255, 0, 255, 0.2)
    `,
    textShadow:
      "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",

    "&::before": {
      left: "100%",
    },

    "&::after": {
      opacity: 1,
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: `
      0 6px 20px rgba(255, 0, 255, 0.6),
      0 0 30px rgba(255, 0, 255, 0.4),
      0 0 50px rgba(255, 0, 255, 0.2),
      inset 0 0 30px rgba(255, 0, 255, 0.2),
      0 0 0 3px rgba(255, 0, 255, 0.3)
    `,
    textShadow:
      "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: `
      0 4px 12px rgba(255, 0, 255, 0.4),
      0 0 20px rgba(255, 0, 255, 0.2),
      inset 0 0 20px rgba(255, 0, 255, 0.1)
    `,
    textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
  },

  "@media (prefers-reduced-motion: reduce)": {
    transition: "background-color 0.2s ease",
    "&::before": {
      transition: "none",
    },
    "&::after": {
      transition: "none",
    },
  },
}));

export const SecondaryButton = styled.button(({ theme }) => ({
  padding: `calc(${theme.spacing.md} / 1.3) calc(${theme.spacing.xl} / 1.3)`,
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  border: `calc(2px / 1.3) solid ${theme.colors.accent.purple}`,
  borderRadius: theme.borderRadius.md,
  fontSize: "calc(16px / 1.3)",
  fontWeight: 700,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: 1,
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  boxShadow: `
    0 0 10px rgba(255, 0, 255, 0.3),
    inset 0 0 10px rgba(255, 0, 255, 0.1)
  `,
  textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
  zIndex: 1,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    transition: "left 0.5s ease",
    zIndex: 0,
    pointerEvents: "none",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: "calc(-2px / 1.3)",
    left: "calc(-2px / 1.3)",
    right: "calc(-2px / 1.3)",
    bottom: "calc(-2px / 1.3)",
    borderRadius: theme.borderRadius.md,
    background: `linear-gradient(45deg, ${theme.colors.accent.purple}, ${theme.colors.accent.blue}, ${theme.colors.accent.purple})`,
    backgroundSize: "200% 200%",
    opacity: 0,
    zIndex: -1,
    transition: "opacity 0.3s ease, background-position 0.3s ease",
    backgroundPosition: "0% 50%",
    filter: "blur(8px)",
    pointerEvents: "none",
  },

  "&:hover": {
    backgroundColor: theme.colors.accent.purple,
    borderColor: theme.colors.accent.purpleLight,
    boxShadow: `
      0 0 20px rgba(255, 0, 255, 0.5),
      0 0 40px rgba(255, 0, 255, 0.3),
      inset 0 0 20px rgba(255, 0, 255, 0.2)
    `,
    textShadow:
      "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",

    "&::before": {
      left: "100%",
    },

    "&::after": {
      opacity: 0.6,
      backgroundPosition: "100% 50%",
    },
  },

  "&:focus": {
    outline: "none",
    borderColor: theme.colors.accent.purpleLight,
    boxShadow: `
      0 0 20px rgba(255, 0, 255, 0.5),
      0 0 40px rgba(255, 0, 255, 0.3),
      inset 0 0 20px rgba(255, 0, 255, 0.2),
      0 0 0 3px rgba(255, 0, 255, 0.3)
    `,
    textShadow:
      "0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6)",

    "&::after": {
      opacity: 0.6,
    },
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: `
      0 0 10px rgba(255, 0, 255, 0.3),
      inset 0 0 10px rgba(255, 0, 255, 0.1)
    `,
    textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
    borderColor: theme.colors.accent.purple,

    "&::after": {
      opacity: 0,
    },
  },
}));

export const TelegramText = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  lineHeight: 1.6,
  margin: 0,
  marginTop: theme.spacing.md,
}));

export const TelegramLink = styled.span(({ theme }) => ({
  color: theme.colors.accent.purple,
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "underline",

  "&:hover": {
    color: theme.colors.accent.purpleLight,
  },
}));

export const RightSection = styled.div({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 500,

  "@media (max-width: 1024px)": {
    minHeight: 400,
  },
});

export const CircularWrapper = styled.div({
  position: "relative",
  width: 500,
  height: 500,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@media (max-width: 768px)": {
    width: 350,
    height: 350,
  },
});

export const CircularImage = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  zIndex: 2,
  filter: "drop-shadow(0 0 40px rgba(255, 0, 255, 0.5))",
});

interface CircularCharProps {
  $rotation: number;
}

const rotateCircularText = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CircularText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  animation: ${css`
    ${rotateCircularText} 25s linear infinite
  `};
  transform-origin: center center;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CircularChar = styled.span<CircularCharProps>(
  ({ $rotation, theme }) => {
    const radius = 250;
    const angle = ($rotation * Math.PI) / 180;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;

    return {
      position: "absolute",
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) rotate(${$rotation}deg)`,
      transformOrigin: "center center",
      fontSize: 14,
      fontWeight: 700,
      color: theme.colors.text.primary,
      textTransform: "uppercase",
      letterSpacing: 2,
      whiteSpace: "nowrap",

      "@media (max-width: 768px)": {
        fontSize: 10,
      },
    };
  }
);

export const CircularTextInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  animation: ${css`
    ${rotateCircularText} 25s linear infinite
  `};
  transform-origin: center center;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CircularCharInner = styled.span<CircularCharProps>(
  ({ $rotation, theme }) => {
    // Outer radius is 250px, so inner radius = 250 - 32px gap = 218px
    const radius = 218;
    // Mobile: outer radius is ~175px (350/500 * 250), so inner = 175 - 32 = 143px
    const mobileRadius = 143;
    const angle = ($rotation * Math.PI) / 180;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    const mobileX = Math.sin(angle) * mobileRadius;
    const mobileY = -Math.cos(angle) * mobileRadius;

    return {
      position: "absolute",
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) rotate(${$rotation}deg)`,
      transformOrigin: "center center",
      fontSize: 10,
      fontWeight: 600,
      color: theme.colors.text.secondary,
      letterSpacing: 1,
      whiteSpace: "nowrap",

      "@media (max-width: 768px)": {
        fontSize: 8,
        left: `calc(50% + ${mobileX}px)`,
        top: `calc(50% + ${mobileY}px)`,
      },
    };
  }
);

export const GlowEffect = styled.div(({ theme }) => ({
  position: "absolute",
  width: "120%",
  height: "120%",
  top: "-10%",
  left: "-10%",
  borderRadius: "50%",
  background: `radial-gradient(circle, rgba(255, 0, 255, 0.125) 0%, transparent 70%)`,
  zIndex: 1,
  filter: "blur(20px)",
}));
