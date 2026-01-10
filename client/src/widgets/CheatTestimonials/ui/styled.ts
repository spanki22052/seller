import styled from "styled-components";

export const Container = styled.section(({ theme }) => ({
  width: "100%",
  padding: `${theme.spacing.xxl} 0`,
  position: "relative",
  overflow: "hidden",
}));

export const Content = styled.div(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: `0 ${theme.spacing.xl}`,
  "@media (max-width: 768px)": {
    padding: `0 ${theme.spacing.lg}`,
  },
  "@media (max-width: 480px)": {
    padding: `0 ${theme.spacing.md}`,
  },
}));

export const Header = styled.div(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing.xxl,
  "& h2": {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: theme.colors.text.primary,
    margin: 0,
    marginBottom: theme.spacing.md,
    background: theme.colors.gradient.purpleBlueHorizontal,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  "& p": {
    fontSize: "1.1rem",
    color: theme.colors.text.secondary,
    margin: "0 auto",
    maxWidth: "600px",
  },
  "@media (max-width: 768px)": {
    marginBottom: theme.spacing.xl,
    "& h2": {
      fontSize: "2rem",
    },
    "& p": {
      fontSize: "1rem",
    },
  },
  "@media (max-width: 480px)": {
    "& h2": {
      fontSize: "1.75rem",
    },
    "& p": {
      fontSize: "0.95rem",
    },
  },
}));

export const CarouselWrapper = styled.div({
  position: "relative",
  "& .swiper": {
    paddingBottom: "60px",
  },
  "& .swiper-pagination": {
    bottom: "20px !important",
    "& .swiper-pagination-bullet": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      opacity: 1,
      width: "12px",
      height: "12px",
      margin: "0 6px",
      transition: "all 0.3s ease",
    },
    "& .swiper-pagination-bullet-active": {
      backgroundColor: "#8b5cf6",
      transform: "scale(1.2)",
    },
  },
  "& .swiper-button-next, & .swiper-button-prev": {
    color: "#8b5cf6",
    width: "40px",
    height: "40px",
    marginTop: "-20px",
    "&::after": {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  "& .swiper-button-next": {
    right: "10px",
  },
  "& .swiper-button-prev": {
    left: "10px",
  },
});

export const TestimonialCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  border: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.md,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const TestimonialHeader = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  gap: "12px",
});

export const Avatar = styled.div(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: theme.colors.gradient.purpleBlueVertical,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: theme.colors.text.primary,
  flexShrink: 0,
}));

export const UserInfo = styled.div({
  flex: 1,
  "& .name": {
    fontSize: "1rem",
    fontWeight: 600,
    margin: 0,
    color: "#fff",
  },
  "& .game": {
    fontSize: "0.85rem",
    color: "#8b5cf6",
    margin: 0,
    fontWeight: 500,
  },
});

export const Rating = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  marginBottom: "12px",
  "& .star": {
    color: "#fbbf24",
    fontSize: "1.1rem",
  },
});

export const TestimonialText = styled.div(({ theme }) => ({
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
  margin: 0,
  flex: 1,
}));

export const TestimonialDate = styled.div(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.colors.text.tertiary,
  marginTop: "12px",
  textAlign: "right",
}));

export const LoadingPlaceholder = styled.div<{ $minHeight?: number }>(
  ({ theme, $minHeight = 300 }) => ({
    minHeight: $minHeight,
    backgroundColor: theme.colors.bg.card,
    borderRadius: theme.borderRadius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.border.primary}`,
  })
);

export const NoReviewsMessage = styled.div(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing.xxl,
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.primary}`,
  "& h3": {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: theme.colors.text.primary,
    margin: 0,
    marginBottom: theme.spacing.md,
  },
  "& p": {
    fontSize: "1rem",
    color: theme.colors.text.secondary,
    margin: 0,
  },
}));

export const LoadingMessage = styled.div(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing.xxl,
  backgroundColor: theme.colors.bg.card,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.border.primary}`,
  "& div": {
    fontSize: "1.1rem",
    color: theme.colors.text.secondary,
  },
}));
