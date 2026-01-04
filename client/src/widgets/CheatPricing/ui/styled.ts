import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,
  width: "100%",
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 36,
  fontWeight: 800,
  color: theme.colors.text.primary,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 1,

  "@media (max-width: 768px)": {
    fontSize: 28,
  },
}));

export const CarouselWrapper = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 24,
  width: "100%",
  position: "relative",

  "@media (max-width: 768px)": {
    gap: theme.spacing.md,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.sm,
  },
}));

export const NavButton = styled.button(({ theme }) => ({
  width: 48,
  position: "relative",
  height: 48,
  borderRadius: "50%",
  border: `2px solid ${theme.colors.border.accent}`,
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  fontSize: 32,
  fontWeight: 300,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.3s ease",
  padding: 0,
  overflow: "visible",

  "&:hover": {
    backgroundColor: theme.colors.accent.purple,
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 4px 12px rgba(139, 92, 246, 0.4)`,
  },

  "@media (max-width: 768px)": {
    width: 40,
    height: 40,
    fontSize: 24,
  },
}));

export const LeftArrowIcon = styled.span({
  position: "absolute",
  lineHeight: 1,
  margin: 0,
  padding: 0,
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  transform: "translate(-2px, -2px)",
});

export const ArrowIcon = styled.span({
  position: "absolute",
  lineHeight: 1,
  margin: 0,
  padding: 0,
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  transform: "translate(0, -2px)",
});

export const CardsContainer = styled.div(({ theme }) => ({
  flex: 1,
  display: "flex",
  gap: 24,
  overflowX: "auto",
  overflowY: "hidden",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  minHeight: 500,
  padding: "0 12px",

  "@media (max-width: 768px)": {
    gap: theme.spacing.md,
    minHeight: 400,
    padding: "0 8px",
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.sm,
    minHeight: 350,
    padding: "0 4px",
  },
}));

export const Card = styled.div(({ theme }) => ({
  minWidth: 292,
  maxWidth: 333,
  width: "100%",
  borderRadius: theme.borderRadius.lg,
  overflow: "hidden",
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  display: "flex",
  flexDirection: "column",
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
  flexShrink: 0,

  "@media (max-width: 768px)": {
    minWidth: 233,
    maxWidth: 267,
  },

  "@media (max-width: 480px)": {
    minWidth: 200,
    maxWidth: 233,
  },
}));

export const ImageWrapper = styled.div({
  position: "relative",
  width: "100%",
  paddingBottom: "75%", // 4:3 aspect ratio
  overflow: "hidden",

  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

export const CardContent = styled.div(({ theme }) => ({
  padding: theme.spacing.xl,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
  flex: 1,

  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  "@media (max-width: 480px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
}));

export const PriceText = styled.div(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  letterSpacing: 1,
  textAlign: "center",

  "@media (max-width: 768px)": {
    fontSize: 20,
  },

  "@media (max-width: 480px)": {
    fontSize: 16,
    letterSpacing: 0.5,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  lineHeight: 1.6,
  margin: 0,
  textAlign: "center",

  "@media (max-width: 768px)": {
    fontSize: 12,
    lineHeight: 1.5,
  },

  "@media (max-width: 480px)": {
    fontSize: 11,
    lineHeight: 1.4,
  },
}));

export const ButtonGroup = styled.div(({ theme }) => ({
  display: "flex",
  gap: 12,
  justifyContent: "center",
  marginTop: "auto",
  flexWrap: "wrap",

  "@media (max-width: 768px)": {
    gap: theme.spacing.sm,
  },

  "@media (max-width: 480px)": {
    gap: theme.spacing.xs,
  },
}));

export const BuyButton = styled.button(({ theme }) => ({
  padding: "11px 21px",
  backgroundColor: theme.colors.accent.purple,
  color: theme.colors.text.primary,
  border: "none",
  borderRadius: theme.borderRadius.md,
  fontSize: 11,
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

  "@media (max-width: 768px)": {
    padding: "9px 18px",
    fontSize: 10,
  },

  "@media (max-width: 480px)": {
    padding: "8px 16px",
    fontSize: 9,
    letterSpacing: 0.5,
  },

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

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none",
    textShadow: "none",
    "&:hover": {
      backgroundColor: theme.colors.accent.purple,
      boxShadow: `
        0 4px 12px rgba(255, 0, 255, 0.4),
        0 0 20px rgba(255, 0, 255, 0.2),
        inset 0 0 20px rgba(255, 0, 255, 0.1)
      `,
      textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
      "&::before": {
        left: "-100%",
      },
      "&::after": {
        opacity: 0,
      },
    },
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

export const TelegramButton = styled.button(({ theme }) => ({
  padding: "11px 21px",
  backgroundColor: "transparent",
  color: theme.colors.text.primary,
  border: `2px solid ${theme.colors.text.primary}`,
  borderRadius: theme.borderRadius.md,
  fontSize: 11,
  fontWeight: 700,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: 1,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  transform: "translateZ(0)", // GPU acceleration
  willChange: "transform",
  boxShadow: "0 0 0 rgba(255, 255, 255, 0)",

  "@media (max-width: 768px)": {
    padding: "9px 18px",
    fontSize: 10,
  },

  "@media (max-width: 480px)": {
    padding: "8px 16px",
    fontSize: 9,
    letterSpacing: 0.5,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
    transition: "left 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    inset: "-2px",
    borderRadius: theme.borderRadius.md,
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4))`,
    opacity: 0,
    transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    pointerEvents: "none",
    zIndex: -1,
  },

  "&:hover": {
    borderColor: theme.colors.text.primary,
    boxShadow: `
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 40px rgba(255, 255, 255, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.05)
    `,
    textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",

    "&::before": {
      left: "100%",
    },

    "&::after": {
      opacity: 1,
    },
  },

  "&:focus": {
    outline: "none",
    borderColor: theme.colors.text.primary,
    boxShadow: `
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 40px rgba(255, 255, 255, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.05),
      0 0 0 3px rgba(255, 255, 255, 0.2)
    `,
    textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
    textShadow: "none",
  },

  "@media (prefers-reduced-motion: reduce)": {
    transition: "border-color 0.2s ease",
    "&::before": {
      transition: "none",
    },
    "&::after": {
      transition: "none",
    },
  },
}));
