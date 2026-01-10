import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div(({ theme }) => ({
  width: "100%",
  marginTop: 130,
  paddingTop: theme.spacing.xl,
  position: "relative",
  zIndex: 5,
  "@media (max-width: 768px)": {
    marginTop: 60,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  "@media (max-width: 480px)": {
    marginTop: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

export const ContentWrapper = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing.xl,
  backgroundColor: theme.colors.bg.card,
  backgroundImage: "url('/images/mainpage-block.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacing.xxl,
  border: `1px solid ${theme.colors.border.primary}`,
  boxShadow: theme.shadows.lg,
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "2px",
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
  },
  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  "@media (max-width: 480px)": {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
}));

export const LogoTopRight = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xl,
  right: theme.spacing.xl,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  "& img": {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
  },
  "@media (max-width: 1024px)": {
    position: "relative",
    top: 0,
    right: 0,
    marginBottom: theme.spacing.md,
  },
}));

export const TextSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  zIndex: 2,
  position: "relative",
  "@media (max-width: 768px)": {
    gap: "16px",
  },
  "@media (max-width: 480px)": {
    gap: "12px",
  },
});

export const Title = styled.h1({
  margin: 0,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  "& img": {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
  },
  "@media (max-width: 768px)": {
    "& img": {
      maxWidth: "80%",
    },
  },
});

export const Description = styled.p(({ theme }) => ({
  fontSize: "16px",
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
  margin: 0,
  maxWidth: "450px",
}));

export const ButtonGroup = styled.div({
  display: "flex",
  gap: "16px",
  marginTop: "8px",
  "*": {
    borderRadius: "999px !important",
  },
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.accent.purple,
  border: "none",
  color: theme.colors.text.primary,
  fontWeight: 600,
  borderRadius: "999px",
  padding: "12px 24px",
  height: "auto",
  "&:not(:disabled):hover": {
    backgroundColor: theme.colors.accent.purpleLight,
  },
  "&:not(:disabled):focus": {
    backgroundColor: theme.colors.accent.purple,
  },
  "&:not(:disabled):active": {
    backgroundColor: theme.colors.accent.purple,
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `2px solid ${theme.colors.accent.purple}`,
  color: theme.colors.text.primary,
  fontWeight: 600,
  borderRadius: "999px",
  padding: "12px 24px",
  height: "auto",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: theme.colors.accent.purpleLight,
    color: theme.colors.text.primary,
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.accent.purple,
  },
  "&:active": {
    borderColor: theme.colors.accent.purple,
  },
}));

export const ImageSection = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  position: "relative",
  zIndex: 2,
  height: "100%",
  overflow: "visible",
});

export const SkeletonWrapper = styled.div(({ theme }) => ({
  right: 0,
  display: "flex",
  zIndex: 699,
  alignItems: "center",
  justifyContent: "flex-end",
  "& > div": {
    position: "absolute",
    width: "750px !important",
    height: "600px !important",
    bottom: -80,
    "@media (max-width: 1499px)": {
      width: "720px !important",
      height: "570px !important",
      bottom: -75,
    },
    "@media (max-width: 1449px)": {
      width: "690px !important",
      height: "540px !important",
      bottom: -70,
    },
    "@media (max-width: 1399px)": {
      width: "660px !important",
      height: "510px !important",
      bottom: -65,
    },
    "@media (max-width: 1349px)": {
      width: "630px !important",
      height: "480px !important",
      bottom: -62,
    },
    "@media (max-width: 1299px)": {
      width: "600px !important",
      height: "450px !important",
      bottom: -59,
    },
    "@media (max-width: 1249px)": {
      width: "570px !important",
      height: "420px !important",
      bottom: -54,
    },
    "@media (max-width: 1199px)": {
      width: "540px !important",
      height: "390px !important",
      bottom: -50,
    },
    "@media (max-width: 1149px)": {
      width: "510px !important",
      height: "360px !important",
      bottom: -47,
    },
    "@media (max-width: 1099px)": {
      width: "480px !important",
      height: "330px !important",
      bottom: -46,
    },
    "@media (max-width: 1049px)": {
      width: "450px !important",
      height: "300px !important",
    },
  },
  "@media (max-width: 1048px)": {
    display: "none",
  },
  "& img": {
    transition: theme.transitions.normal,
    maxWidth: "100%",
    height: "auto",
    zIndex: 999,
  },
}));

export const TeaserButton = styled.button(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  right: "20px",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  backgroundColor: theme.colors.bg.secondary,
  color: theme.colors.text.primary,
  border: `2px solid ${theme.colors.accent.pink}`,
  borderRadius: theme.borderRadius.full,
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: `0 0 20px ${theme.colors.accent.pink}66`,
  transition: theme.transitions.normal,
  zIndex: 10,
  "&:hover": {
    backgroundColor: theme.colors.bg.tertiary,
    boxShadow: `0 0 30px ${theme.colors.accent.pink}99`,
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
}));
