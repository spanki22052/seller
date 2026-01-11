import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 48,
  padding: `${theme.spacing.xxl} ${theme.spacing.xxl}`,
  width: "100%",
  minHeight: 600,
  backgroundColor: "#0f0f0f",
  backgroundImage: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    minHeight: "auto",
    padding: `${theme.spacing.xxl} ${theme.spacing.lg}`,
  },
}));

export const TextSection = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  zIndex: 2,
  position: "relative",
  paddingRight: theme.spacing.xxl,
  paddingLeft: theme.spacing.xxl,
  justifyContent: "center",
  overflow: "visible",
  "@media (max-width: 1024px)": {
    marginTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    minHeight: 400,
  },
}));

export const Title = styled.h2(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.4,
  color: theme.colors.text.primary,
  margin: 0,
  position: "relative",
  zIndex: 4,
  "@media (max-width: 768px)": {
    fontSize: 24,
  },
}));

export const Description = styled.p(({ theme }) => ({
  fontSize: 18,
  lineHeight: 1.6,
  color: theme.colors.text.secondary,
  margin: 0,
  maxWidth: 600,
  position: "relative",
  zIndex: 4,
  "@media (max-width: 768px)": {
    fontSize: 16,
  },
}));

export const ImageSection = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
  zIndex: 1,
  "@media (max-width: 1024px)": {
    minHeight: 400,
    padding: theme.spacing.lg,
  },
}));

export const SkeletonImageWrapper = styled.div({
  position: "relative",
  zIndex: 4,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "auto",
    maxWidth: 600,
    objectFit: "contain",
    position: "relative",
  },
  "@media (max-width: 1024px)": {
    "& img": {
      maxWidth: "100%",
    },
  },
});
