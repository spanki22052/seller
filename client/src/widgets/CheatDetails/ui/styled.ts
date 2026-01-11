import styled from "styled-components";

interface SectionHeaderProps {
  $isExpanded: boolean;
}

// Container
export const Container = styled.div(({ theme }) => ({
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  padding: `0 ${theme.spacing.md}`,

  "@media (max-width: 768px)": {
    maxWidth: "100%",
    padding: `${theme.spacing.lg} ${theme.spacing.md}`,
  },
}));

// Card
export const Card = styled.div(({ theme }) => ({
  background: `linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  ),
  rgba(0, 0, 0, 0.8)`,
  border: `1px solid ${theme.colors.accent.purple}33`,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",

  "@media (max-width: 768px)": {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
}));

// Header
export const Header = styled.div({
  textAlign: "center",
  marginBottom: 32,

  "@media (max-width: 768px)": {
    marginBottom: 24,
  },
});

export const Title = styled.h1(({ theme }) => ({
  fontSize: 32,
  fontWeight: 800,
  color: theme.colors.text.primary,
  margin: 0,
  marginBottom: 12,
  letterSpacing: 1.5,

  "@media (max-width: 768px)": {
    fontSize: 28,
  },

  "@media (max-width: 480px)": {
    fontSize: 24,
  },
}));

export const Subtitle = styled.p(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  margin: 0,
  opacity: 0.8,
  lineHeight: 1.5,

  "@media (max-width: 768px)": {
    fontSize: 15,
  },
}));

// Content
export const Content = styled.div(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: 24,
  padding: 0,

  "@media (max-width: 1024px)": {
    flexDirection: "column",
    gap: theme.spacing.lg,
  },

  "@media (max-width: 768px)": {
    gap: theme.spacing.md,
  },
}));

export const LeftColumn = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const RightColumn = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const Section = styled.div(({ theme }) => ({
  border: `1px solid ${theme.colors.border.primary}`,
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.bg.secondary,
  overflow: "hidden",
  boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
}));

export const SectionHeader = styled.div<SectionHeaderProps>(
  ({ theme, $isExpanded }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    cursor: "pointer",
    backgroundColor: $isExpanded ? "#0d001a" : "transparent",
    borderBottom: $isExpanded
      ? `1px solid ${theme.colors.border.primary}`
      : "none",
    transition: "background-color 0.3s ease",

    "&:hover": {
      backgroundColor: $isExpanded ? "#0d001a" : theme.colors.bg.tertiary,
    },

    "@media (max-width: 768px)": {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    },

    "@media (max-width: 480px)": {
      padding: `6px ${theme.spacing.sm}`,
    },
  })
);

export const SectionTitle = styled.h3(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  color: theme.colors.text.primary,
  margin: 0,
  letterSpacing: 0.5,

  "@media (max-width: 768px)": {
    fontSize: 18,
  },

  "@media (max-width: 480px)": {
    fontSize: 16,
  },
}));

export const ExpandIcon = styled.div(({ theme }) => ({
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  position: "relative",
  transition: "all 0.3s ease",

  "&::before": {
    content: '""',
    width: 0,
    height: 0,
    borderLeft: `6px solid ${theme.colors.accent.purple}`,
    borderTop: "4px solid transparent",
    borderBottom: "4px solid transparent",
    transition: "all 0.3s ease",
  },

  [`${SectionHeader}:hover &`]: {
    "&::before": {
      borderLeftColor:
        theme.colors.accent.purpleDark || theme.colors.accent.purple,
    },
  },

  "@media (max-width: 768px)": {
    width: 18,
    height: 18,
    "&::before": {
      borderLeftWidth: 5,
      borderTopWidth: 3,
      borderBottomWidth: 3,
    },
  },

  "@media (max-width: 480px)": {
    width: 16,
    height: 16,
    "&::before": {
      borderLeftWidth: 4,
      borderTopWidth: 2.5,
      borderBottomWidth: 2.5,
    },
  },
}));

export const SectionContent = styled.div({
  overflow: "hidden",
});

export const DescriptionContent = styled.div(({ theme }) => ({
  padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
  fontSize: 16,
  lineHeight: 1.6,
  color: theme.colors.text.secondary,

  // Basic markdown styling
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    fontWeight: 600,
  },

  "& h1": {
    fontSize: 28,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    paddingBottom: theme.spacing.sm,
  },

  "& h2": {
    fontSize: 24,
  },

  "& h3": {
    fontSize: 20,
  },

  "& p": {
    marginBottom: theme.spacing.md,
  },

  "& ul, & ol": {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.xl,
  },

  "& li": {
    marginBottom: theme.spacing.xs,
  },

  "& code": {
    backgroundColor: theme.colors.bg.tertiary,
    padding: "2px 6px",
    borderRadius: theme.borderRadius.sm,
    fontSize: 14,
    fontFamily: "monospace",
  },

  "& pre": {
    backgroundColor: theme.colors.bg.tertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: "auto",
    marginBottom: theme.spacing.md,

    "& code": {
      backgroundColor: "transparent",
      padding: 0,
      fontSize: 14,
    },
  },

  "& blockquote": {
    borderLeft: `4px solid ${theme.colors.accent.purple}`,
    paddingLeft: theme.spacing.md,
    marginLeft: 0,
    marginBottom: theme.spacing.md,
    color: theme.colors.text.tertiary,
    fontStyle: "italic",
  },

  "& a": {
    color: theme.colors.accent.purple,
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },

  "@media (max-width: 768px)": {
    padding: `${theme.spacing.lg} ${theme.spacing.lg}`,
    fontSize: 15,
  },

  "@media (max-width: 480px)": {
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    fontSize: 14,
  },
}));

// Markdown components
export const MarkdownH1 = styled.h1(({ theme }) => ({
  color: theme.colors.text.primary,
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.md,
  fontWeight: 600,
  fontSize: 28,
  borderBottom: `1px solid ${theme.colors.border.primary}`,
  paddingBottom: theme.spacing.sm,

  "@media (max-width: 768px)": {
    fontSize: 24,
  },

  "@media (max-width: 480px)": {
    fontSize: 20,
  },
}));

export const MarkdownH2 = styled.h2(({ theme }) => ({
  color: theme.colors.text.primary,
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.md,
  fontWeight: 600,
  fontSize: 24,

  "@media (max-width: 768px)": {
    fontSize: 20,
  },

  "@media (max-width: 480px)": {
    fontSize: 18,
  },
}));

export const MarkdownH3 = styled.h3(({ theme }) => ({
  color: theme.colors.text.primary,
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.md,
  fontWeight: 600,
  fontSize: 20,

  "@media (max-width: 768px)": {
    fontSize: 18,
  },

  "@media (max-width: 480px)": {
    fontSize: 16,
  },
}));

export const MarkdownP = styled.p(({ theme }) => ({
  marginBottom: theme.spacing.md,
  lineHeight: 1.6,
}));

export const MarkdownUl = styled.ul(({ theme }) => ({
  marginBottom: theme.spacing.md,
  paddingLeft: theme.spacing.xl,

  "@media (max-width: 768px)": {
    paddingLeft: theme.spacing.lg,
  },
}));

export const MarkdownOl = styled.ol(({ theme }) => ({
  marginBottom: theme.spacing.md,
  paddingLeft: theme.spacing.xl,

  "@media (max-width: 768px)": {
    paddingLeft: theme.spacing.lg,
  },
}));

export const MarkdownLi = styled.li(({ theme }) => ({
  marginBottom: theme.spacing.xs,
  lineHeight: 1.5,
}));

export const MarkdownCode = styled.code(({ theme }) => ({
  backgroundColor: theme.colors.bg.tertiary,
  padding: "2px 6px",
  borderRadius: theme.borderRadius.sm,
  fontSize: 14,
  fontFamily: "monospace",
  color: theme.colors.accent.purple,
}));

export const MarkdownPre = styled.pre(({ theme }) => ({
  backgroundColor: theme.colors.bg.tertiary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
  overflow: "auto",
  marginBottom: theme.spacing.md,
  fontSize: 14,
  lineHeight: 1.4,

  "& code": {
    backgroundColor: "transparent",
    padding: 0,
    fontSize: 14,
  },
}));

export const MarkdownBlockquote = styled.blockquote(({ theme }) => ({
  borderLeft: `4px solid ${theme.colors.accent.purple}`,
  paddingLeft: theme.spacing.md,
  marginLeft: 0,
  marginBottom: theme.spacing.md,
  color: theme.colors.text.tertiary,
  fontStyle: "italic",
  backgroundColor: theme.colors.bg.tertiary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
}));

export const MarkdownLink = styled.a(({ theme }) => ({
  color: theme.colors.accent.purple,
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const MarkdownStrong = styled.strong(({ theme }) => ({
  fontWeight: 700,
  color: theme.colors.text.primary,
}));

export const MarkdownEm = styled.em({
  fontStyle: "italic",
});

export const FunctionsList = styled.div(({ theme }) => ({
  padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,

  "@media (max-width: 768px)": {
    padding: `${theme.spacing.lg} ${theme.spacing.lg}`,
    gap: theme.spacing.lg,
  },

  "@media (max-width: 480px)": {
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    gap: theme.spacing.md,
  },
}));

export const FunctionCategory = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const CategoryTitle = styled.h4(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.accent.purple,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 0.5,

  "@media (max-width: 768px)": {
    fontSize: 18,
  },

  "@media (max-width: 480px)": {
    fontSize: 16,
  },
}));

export const FeaturesList = styled.ul(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
}));

export const FeatureItem = styled.li(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  paddingRight: theme.spacing.md,
  position: "relative",
  lineHeight: 1.5,

  "&::after": {
    content: '"\\0020-"',
    position: "absolute",
    left: -5,
    color: theme.colors.accent.purple,
    fontSize: 20,
    lineHeight: 1,
    top: "50%",
    transform: "translateY(-50%)",
  },

  "@media (max-width: 768px)": {
    fontSize: 15,
    paddingLeft: theme.spacing.sm,
  },

  "@media (max-width: 480px)": {
    fontSize: 14,
  },
}));

// Footer
export const Footer = styled.div({
  marginTop: 32,
  textAlign: "center",

  "@media (max-width: 768px)": {
    marginTop: 24,
  },
});

export const FooterText = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.colors.text.secondary,
  margin: 0,
  opacity: 0.7,
  lineHeight: 1.5,

  "@media (max-width: 768px)": {
    fontSize: 13,
  },
}));
