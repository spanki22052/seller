import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div(({ theme }) => ({
  width: "100%",
  marginTop: 30,
  paddingTop: theme.spacing.xl,
  paddingBottom: theme.spacing.xl,
  position: "relative",
  zIndex: 5,
}));

export const SearchBar = styled.div(({ theme }) => ({
  marginTop: "64px",
  marginBottom: theme.spacing.md,
  width: "300px",
  position: "relative",
  zIndex: 1000,
  "& .ant-input": {
    backgroundColor: theme.colors.bg.input,
    borderColor: theme.colors.border.primary,
    color: theme.colors.text.primary,
    borderRadius: theme.borderRadius.md,
    "&::placeholder": {
      color: theme.colors.text.tertiary,
    },
    "&:hover": {
      borderColor: theme.colors.accent.purple,
    },
    "&:focus": {
      borderColor: theme.colors.accent.purple,
      boxShadow: `0 0 0 2px ${theme.colors.accent.purple}33`,
    },
  },
  "& .anticon": {
    color: theme.colors.text.secondary,
  },
}));

export const Dropdown = styled.div(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "600px",
  marginTop: 12,
  backgroundColor: theme.colors.bg.card,
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.lg,
  boxShadow: `${theme.shadows.lg}, 0 0 40px ${theme.colors.accent.purple}33`,
  overflow: "hidden",
  zIndex: 1001,
  maxHeight: 600,
  overflowY: "auto",
  backdropFilter: "blur(10px)",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.colors.bg.secondary,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.colors.border.secondary,
    borderRadius: 4,
    "&:hover": {
      backgroundColor: theme.colors.accent.purple,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: theme.colors.gradient.purpleBlueVertical,
    boxShadow: theme.shadows.glow,
    zIndex: 1,
  },
  "@media (max-width: 768px)": {
    width: "100%",
    maxWidth: "calc(100vw - 32px)",
  },
}));

export const DropdownContent = styled.div(({ theme }) => ({
  padding: "16px 0",
  background: `linear-gradient(180deg, ${theme.colors.bg.card} 0%, ${theme.colors.bg.secondary} 100%)`,
}));

export const DropdownItem = styled.div({
  padding: 0,
});

export const GameItem = styled.div(({ theme }) => ({
  padding: "16px 24px",
  borderBottom: `1px solid ${theme.colors.border.primary}`,
  position: "relative",
  transition: theme.transitions.normal,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.colors.bg.hover,
    "&::after": {
      opacity: 1,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.colors.gradient.purpleBlueVertical,
    opacity: 0,
    transition: theme.transitions.normal,
  },
}));

export const GameName = styled.div(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.colors.text.primary,
  marginBottom: 12,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  background: theme.colors.gradient.purpleBlue,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

export const CheatsList = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginTop: 12,
  paddingLeft: 20,
  borderLeft: `2px solid ${theme.colors.border.secondary}`,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: -2,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.colors.gradient.purpleBlueVertical,
    opacity: 0.5,
  },
}));

export const CheatItem = styled.div({});

interface CheatLinkProps {
  $isHighlighted?: boolean;
}

export const CheatLink = styled.a<CheatLinkProps>(
  ({ theme, $isHighlighted }) => ({
    display: "block",
    fontSize: "15px",
    color: $isHighlighted
      ? theme.colors.text.primary
      : theme.colors.text.secondary,
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: theme.borderRadius.md,
    transition: theme.transitions.normal,
    position: "relative",
    fontWeight: $isHighlighted ? 600 : 400,
    backgroundColor: $isHighlighted
      ? `${theme.colors.accent.purple}22`
      : "transparent",
    border: $isHighlighted
      ? `1px solid ${theme.colors.accent.purple}66`
      : "1px solid transparent",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: $isHighlighted
        ? theme.colors.gradient.purpleBlueVertical
        : "transparent",
      borderRadius: `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}`,
      transition: theme.transitions.normal,
    },
    "&:hover": {
      color: theme.colors.text.primary,
      backgroundColor: $isHighlighted
        ? `${theme.colors.accent.purple}33`
        : theme.colors.bg.tertiary,
      transform: "translateX(6px)",
      borderColor: theme.colors.accent.purple,
      boxShadow: $isHighlighted
        ? `0 0 12px ${theme.colors.accent.purple}44`
        : "none",
      "&::before": {
        background: theme.colors.gradient.purpleBlueVertical,
      },
    },
  })
);

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
  background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
  border: "none",
  color: theme.colors.text.primary,
  fontWeight: 600,
  borderRadius: "999px",
  padding: "12px 24px",
  height: "auto",
  boxShadow: `0 0 20px ${theme.colors.accent.purple}66, 0 0 40px ${theme.colors.accent.pink}44, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
    transition: "left 0.5s ease",
  },
  "&:not(:disabled):hover": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purpleLight} 0%, ${theme.colors.accent.pinkLight} 50%, ${theme.colors.accent.blueLight} 100%) !important`,
    transform: "translateY(-2px)",
    boxShadow: `0 0 30px ${theme.colors.accent.purple}99, 0 0 60px ${theme.colors.accent.pink}66, 0 4px 20px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15)`,
    "&::before": {
      left: "100%",
    },
  },
  "&:not(:disabled):focus": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    boxShadow: `0 0 25px ${theme.colors.accent.purple}88, 0 0 50px ${theme.colors.accent.pink}55, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
  },
  "&:not(:disabled):active": {
    background: `linear-gradient(135deg, ${theme.colors.accent.purple} 0%, ${theme.colors.accent.pink} 50%, ${theme.colors.accent.blue} 100%) !important`,
    transform: "translateY(0)",
    boxShadow: `0 0 20px ${theme.colors.accent.purple}66, 0 0 40px ${theme.colors.accent.pink}44`,
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `1px solid ${theme.colors.text.primary}`,
  color: theme.colors.text.primary,
  fontWeight: 600,
  borderRadius: theme.borderRadius.md,
  padding: "12px 24px",
  height: "auto",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: theme.colors.accent.purple,
    color: theme.colors.text.primary,
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
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
    bottom: -85,
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
      bottom: -60,
    },
    "@media (max-width: 1299px)": {
      width: "600px !important",
      height: "450px !important",
      bottom: -60,
    },
    "@media (max-width: 1249px)": {
      width: "570px !important",
      height: "420px !important",
      bottom: -55,
    },
    "@media (max-width: 1199px)": {
      width: "540px !important",
      height: "390px !important",
      bottom: -45,
    },
    "@media (max-width: 1149px)": {
      width: "510px !important",
      height: "360px !important",
      bottom: -45,
    },
    "@media (max-width: 1099px)": {
      width: "480px !important",
      height: "330px !important",
      bottom: -45,
    },
    "@media (max-width: 1049px)": {
      width: "450px !important",
      height: "300px !important",
      bottom: -48,
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
