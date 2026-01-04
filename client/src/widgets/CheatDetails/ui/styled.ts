import styled, { keyframes, css } from "styled-components";

const neonPulse = keyframes({
  "0%, 100%": {
    opacity: 0.6,
    filter: "blur(1px)",
  },
  "50%": {
    opacity: 1,
    filter: "blur(2px)",
  },
});

const neonGlow = keyframes({
  "0%, 100%": {
    boxShadow:
      "0 0 5px rgba(255, 0, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3)",
  },
  "50%": {
    boxShadow:
      "0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3)",
  },
});

export const Container = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  marginBottom: theme.spacing.xl,
}));

export const BorderWrapper = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  zIndex: 1,
}));

export const BorderLayer = styled.div<{ $offset: number; $opacity: number }>(
  ({ theme, $offset, $opacity }) => ({
    position: "absolute",
    top: -$offset,
    left: -$offset,
    right: -$offset,
    bottom: -$offset,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.accent.purple}`,
    opacity: $opacity,
    zIndex: -Math.floor($offset / 4),
    pointerEvents: "none",
  })
);

export const BreadcrumbsContainer = styled.nav(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
  marginBottom: 90,
  flexWrap: "wrap",
}));

export const BreadcrumbLink = styled.a<{ $isActive?: boolean }>(
  ({ theme, $isActive }) => ({
    fontSize: 14,
    fontWeight: $isActive ? 600 : 400,
    color: $isActive ? theme.colors.text.primary : theme.colors.text.secondary,
    textDecoration: "none",
    cursor: "pointer",
    transition: theme.transitions.fast,
    whiteSpace: "nowrap",

    "&:hover": {
      color: theme.colors.text.primary,
    },
  })
);

export const BreadcrumbArrow = styled.span(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
  margin: `0 ${theme.spacing.xs}`,
  userSelect: "none",
}));

export const NeonLinesContainer = styled.div({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  height: 2,
  transform: "translateY(-50%)",
  zIndex: 0,
  pointerEvents: "none",
});

export const NeonLine = styled.div<{ $delay?: number }>`
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.accent.purple} 20%,
    ${({ theme }) => theme.colors.accent.pink} 50%,
    ${({ theme }) => theme.colors.accent.purple} 80%,
    transparent 100%
  );
  opacity: 0.6;
  animation: ${css`
    ${neonPulse} 3s ease-in-out infinite
  `};
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  filter: blur(0.5px);
`;

export const ContentWrapper = styled.div(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing.xxl,
  alignItems: "start",
  zIndex: 1,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    gap: theme.spacing.xl,
  },
}));

export const VideoSection = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  backgroundColor: theme.colors.bg.secondary,
  borderRadius: theme.borderRadius.lg,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${theme.colors.border.primary}`,
  minHeight: 400,
}));

export const VideoPlaceholder = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  color: theme.colors.text.tertiary,
  fontSize: 64,
  fontWeight: 300,
  opacity: 0.5,
}));

export const VideoElement = styled.video({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const DetailsSection = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  position: "relative",
}));

export const ProductName = styled.h1(({ theme }) => ({
  fontSize: 64,
  fontWeight: 800,
  color: theme.colors.text.primary,
  textTransform: "uppercase",
  letterSpacing: 2,
  margin: 0,
  lineHeight: 1.1,

  "@media (max-width: 768px)": {
    fontSize: 40,
  },
}));

export const SpecsList = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
}));

export const SpecItem = styled.div<{ $highlighted?: boolean }>(
  ({ theme, $highlighted }) => ({
    fontSize: 16,
    fontWeight: 400,
    color: theme.colors.text.primary,
    lineHeight: 1.6,

    "@media (max-width: 768px)": {
      fontSize: 14,
    },
  })
);

export const SpecHighlight = styled.span(({ theme }) => ({
  color: theme.colors.accent.purple,
  fontWeight: 600,
}));

export const MarkdownContent = styled.div(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.colors.text.primary,
  lineHeight: 1.6,

  "& p": {
    margin: 0,
    marginBottom: theme.spacing.md,
    "&:last-child": {
      marginBottom: 0,
    },
  },

  "& span": {
    display: "inline",
  },

  "@media (max-width: 768px)": {
    fontSize: 14,
  },
}));

export const ReviewsButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 2px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  align-self: flex-start;
  margin-top: ${({ theme }) => theme.spacing.md};

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
      rgba(255, 0, 255, 0.3),
      transparent
    );
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.purple};
    color: ${({ theme }) => theme.colors.accent.purple};
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
    animation: ${css`
      ${neonGlow} 2s ease-in-out infinite
    `};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const RightNeonBorder = styled.div`
  position: absolute;
  top: 0;
  right: -20px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 0, 255, 0.6) 20%,
    rgba(236, 72, 153, 0.6) 50%,
    rgba(255, 0, 255, 0.6) 80%,
    transparent 100%
  );
  opacity: 0.8;
  animation: ${css`
    ${neonPulse} 3s ease-in-out infinite
  `};
  filter: blur(1px);

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CurvedNeonLine = styled.div`
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 0, 255, 0.4);
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  opacity: 0.6;
  animation: ${css`
    ${neonPulse} 4s ease-in-out infinite
  `};
  filter: blur(1px);

  @media (max-width: 1024px) {
    display: none;
  }
`;
