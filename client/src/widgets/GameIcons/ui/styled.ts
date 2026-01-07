import styled, { keyframes, css } from "styled-components";

const neonPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(236, 72, 153, 0.5),
      0 0 20px rgba(255, 0, 255, 0.4),
      0 0 30px rgba(59, 130, 246, 0.3),
      inset 0 0 20px rgba(255, 0, 255, 0.25);
    opacity: 0.9;
  }
  50% {
    box-shadow: 
      0 0 15px rgba(236, 72, 153, 0.8),
      0 0 30px rgba(255, 0, 255, 0.6),
      0 0 45px rgba(59, 130, 246, 0.5),
      inset 0 0 30px rgba(255, 0, 255, 0.4);
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  flex-wrap: wrap;
  overflow: visible;

  @media (max-width: 768px) {
    gap: 16px;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const GameItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
  },
});

export const GameIcon = styled.div(({ theme }) => ({
  width: 190,
  height: 190,
  borderRadius: "50%",
  border: `1px solid ${theme.colors.text.primary}`,
  padding: 8,
  overflow: "hidden",
  position: "relative",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: `linear-gradient(to top, ${theme.colors.accent.purple}80, transparent)`,
    borderRadius: "0 0 50% 50%",
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
    zIndex: 1,
  },
  "&:hover": {
    borderColor: theme.colors.accent.purple,
    boxShadow: `0 0 20px ${theme.colors.accent.purple}66`,
    "&::before": {
      opacity: 1,
    },
  },
  "@media (max-width: 768px)": {
    width: 100,
    height: 100,
  },
}));

export const GameImage = styled.img({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  position: "relative",
  zIndex: 2,
  transition: "transform 0.3s ease",
  [`${GameItem}:hover &`]: {
    transform: "scale(1.1)",
  },
});

export const GameName = styled.div(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.colors.text.primary,
  textAlign: "center",
  letterSpacing: "1px",
}));
