import styled from "styled-components";

export const CarouselContainer = styled.div(({ theme }) => ({
  width: "100%",
  position: "relative",
  padding: theme.spacing.xl,
  paddingBottom: "80px", // Extra space for dots

  // Custom carousel dots styling
  "& .carousel-dots": {
    "& .slick-dots": {
      bottom: "-50px",
    },
    "& .slick-dots li": {
      margin: "0 6px",
    },
    "& .slick-dots li button": {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: theme.colors.bg.tertiary,
      border: `2px solid ${theme.colors.border.primary}`,
      opacity: 0.6,
      transition: "all 0.3s ease",
      transform: "scale(0.8)",
      boxShadow: `0 0 10px rgba(0, 0, 0, 0.5)`,
    },
    "& .slick-dots li button:before": {
      content: "none",
    },
    "& .slick-dots li.slick-active button": {
      background: theme.colors.gradient.purpleBlue,
      border: `2px solid ${theme.colors.accent.purple}`,
      opacity: 1,
      transform: "scale(1.2)",
      boxShadow: `0 0 20px rgba(255, 0, 255, 0.4)`,
    },
    "& .slick-dots li:hover button": {
      opacity: 0.8,
      transform: "scale(1)",
      boxShadow: `0 0 15px rgba(255, 0, 255, 0.2)`,
    },
  },

  // Custom arrow buttons styling (Ant Design uses react-slick)
  "& .slick-arrow": {
    width: "36px !important",
    height: "36px !important",
    borderRadius: theme.borderRadius.lg,
    background: `${theme.colors.gradient.purpleBlue} !important`,
    border: `2px solid ${theme.colors.accent.purple} !important`,
    color: `${theme.colors.text.primary} !important`,
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px !important",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: `0 4px 15px rgba(255, 0, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
    backdropFilter: "blur(10px)",
    zIndex: 20,
    opacity: "1 !important",
    textIndent: "0 !important",
    lineHeight: "1 !important",
    fontFamily: "inherit !important",

    // Hide all default slick arrow content completely
    "&:before": {
      content: "none !important",
      display: "none !important",
      width: "0 !important",
      height: "0 !important",
      fontSize: "0 !important",
    },

    "&:after": {
      content: "none !important",
      display: "none !important",
      width: "0 !important",
      height: "0 !important",
      fontSize: "0 !important",
    },

    "&:hover": {
      boxShadow: `0 8px 25px rgba(255, 0, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    },

    "&:active": {
      transform: "translateY(-50%) scale(1.05) rotate(2deg) !important",
      boxShadow: `0 2px 10px rgba(255, 0, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
    },

    "&.slick-disabled": {
      opacity: "0.4 !important",
      cursor: "not-allowed !important",
      background: `${theme.colors.bg.secondary} !important`,
      borderColor: `${theme.colors.border.primary} !important`,
      boxShadow: `${theme.shadows.sm} !important`,
      "&:hover": {
        background: `${theme.colors.bg.secondary} !important`,
        borderColor: `${theme.colors.border.primary} !important`,
        transform: "translateY(-50%) !important",
        boxShadow: `${theme.shadows.sm} !important`,
        rotate: "0deg",
      },
    },

    "@media (max-width: 768px)": {
      width: "32px !important",
      height: "32px !important",
      fontSize: "9px !important",
    },

    "@media (max-width: 600px)": {
      width: "48px !important",
      height: "48px !important",
      fontSize: "13px !important",
    },
  },

  "& .slick-prev": {
    left: "-22px !important",
    "&:before": {
      content: "none !important",
      display: "none !important",
    },
    "@media (max-width: 768px)": {
      left: "-45px !important",
    },
    "@media (max-width: 600px)": {
      left: "-28px !important",
    },
  },

  "& .slick-next": {
    right: "-22px !important",
    "&:before": {
      content: "none !important",
      display: "none !important",
    },
    "@media (max-width: 768px)": {
      right: "-45px !important",
    },
    "@media (max-width: 600px)": {
      right: "-28px !important",
    },
  },

  // Slick carousel custom styling
  "& .slick-track": {
    display: "flex",
    alignItems: "stretch",
  },

  "& .slick-slide": {
    height: "auto",
    display: "flex",
  },

  "& .slick-slide > div": {
    height: "100%",
    display: "flex",
  },
}));

export const CarouselWrapper = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
  width: "100%",
  justifyItems: "center",
  padding: `0 ${theme.spacing.md}`,
  transition: "all 0.3s ease",

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    padding: `0 ${theme.spacing.sm}`,
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "8px",
  },
}));

export const EmptyState = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "300px",
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.primary}`,
}));

export const EmptyText = styled.div(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontSize: "18px",
  fontWeight: 500,
}));

export const EmptyTile = styled.div({
  visibility: "hidden",
});

export const CustomArrow = styled.button<{ direction: "left" | "right" }>(
  ({ theme, direction }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: theme.colors.gradient.purpleBlue,
    border: `3px solid ${theme.colors.accent.purple}`,
    color: theme.colors.text.primary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: `0 4px 15px rgba(255, 0, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
    backdropFilter: "blur(10px)",

    ...(direction === "left" ? { left: "-44px" } : { right: "-44px" }),

    "&:hover": {
      background: theme.colors.gradient.purplePink,
      borderColor: theme.colors.accent.purpleLight,
      transform: "translateY(-50%) scale(1.15) rotate(5deg)",
      boxShadow: `0 8px 25px rgba(255, 0, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
      color: "#ffffff",
    },

    "&:active": {
      transform: "translateY(-50%) scale(1.05) rotate(2deg)",
      boxShadow: `0 2px 10px rgba(255, 0, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
    },

    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
      background: theme.colors.bg.secondary,
      borderColor: theme.colors.border.primary,
      boxShadow: theme.shadows.sm,
      "&:hover": {
        background: theme.colors.bg.secondary,
        borderColor: theme.colors.border.primary,
        transform: "translateY(-50%)",
        boxShadow: theme.shadows.sm,
        rotate: "0deg",
      },
    },

    // Add subtle glow effect
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      borderRadius: "50%",
      background: `conic-gradient(from 0deg, transparent, ${theme.colors.accent.purple}, transparent)`,
      opacity: 0,
      transition: "opacity 0.3s ease",
      zIndex: -1,
    },

    "&:hover::before": {
      opacity: 0.8,
    },

    "@media (max-width: 768px)": {
      width: "64px",
      height: "64px",
      fontSize: "18px",
      ...(direction === "left" ? { left: "-90px" } : { right: "-90px" }),
    },

    "@media (max-width: 600px)": {
      width: "60px",
      height: "60px",
      fontSize: "16px",
      ...(direction === "left" ? { left: "-38px" } : { right: "-38px" }),
    },
  })
);

export const GameTile = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.borderRadius.lg,
  overflow: "hidden",
  transition: theme.transitions.normal,
  aspectRatio: "1 / 1.33",
  backgroundColor: "#000000",
  border: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.sm,
  minWidth: "200px",
  maxWidth: "280px",
  width: "100%",

  "&:hover": {
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 8px 25px rgba(255, 0, 255, 0.15)`,
    transform: "translateY(-2px)",
  },

  "@media (max-width: 768px)": {
    minWidth: "150px",
    maxWidth: "200px",
  },

  "@media (max-width: 600px)": {
    minWidth: "250px",
    maxWidth: "400px",
  },
}));

export const GameImageWrapper = styled.div<{ $backgroundColor: string }>(
  ({ $backgroundColor }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: $backgroundColor,
    zIndex: 0,
  })
);

export const GameImage = styled.img({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

// Gradient overlay for text readability
export const GradientOverlay = styled.div({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "50%",
  background: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)`,
  pointerEvents: "none",
  zIndex: 1,
});

// Bottom content container
export const GameContent = styled.div(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing.md,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const GameName = styled.div(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  lineHeight: 1.2,
  textShadow: `0 2px 8px rgba(0, 0, 0, 0.8)`,

  "@media (max-width: 768px)": {
    fontSize: "18px",
  },

  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const PriceContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
  flexWrap: "wrap",
}));

export const PriceBadge = styled.div(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: theme.colors.bg.secondary,
  borderRadius: theme.borderRadius.md,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  fontSize: "14px",
  fontWeight: 500,
  color: theme.colors.text.primary,
  border: `1px solid ${theme.colors.border.primary}`,

  "@media (max-width: 600px)": {
    fontSize: "12px",
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
  },
}));

export const PriceAmount = styled.span(({ theme }) => ({
  color: theme.colors.accent.purple,
  fontWeight: 600,
  paddingLeft: 4,
}));

export const OffersCount = styled.span(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 400,
  color: theme.colors.text.secondary,
  whiteSpace: "nowrap",

  "@media (max-width: 600px)": {
    fontSize: "11px",
  },
}));

// Top badge (e.g., "Топ месяца")
export const TopBadge = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.md,
  left: theme.spacing.md,
  backgroundColor: "#8b4513", // Dark brown
  borderRadius: theme.borderRadius.md,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  fontSize: "12px",
  fontWeight: 600,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  zIndex: 3,
  boxShadow: `0 2px 8px rgba(0, 0, 0, 0.5)`,

  "@media (max-width: 600px)": {
    fontSize: "10px",
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
    top: theme.spacing.sm,
    left: theme.spacing.sm,
  },
}));

export const SlideCounter = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.md,
  right: theme.spacing.md,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.sm,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  fontSize: "12px",
  fontWeight: 500,
  color: theme.colors.text.secondary,
  boxShadow: theme.shadows.sm,
  zIndex: 15,
  backdropFilter: "blur(10px)",
  opacity: 0.9,

  "@media (max-width: 768px)": {
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    fontSize: "11px",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  },
}));
