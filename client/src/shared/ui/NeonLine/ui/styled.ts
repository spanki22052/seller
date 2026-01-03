import styled from "styled-components";

export const NeonLine = styled.div(({ theme }) => ({
  position: "absolute",
  bottom: -12,
  left: "50%",
  width: "80%",
  height: 6,
  transform: "translateX(-50%) scaleX(0)",
  transformOrigin: "center",
  background: `radial-gradient(ellipse 50% 100% at center, ${theme.colors.accent.purpleLight} 0%, ${theme.colors.accent.purple} 40%, transparent 70%)`,
  maskImage: `radial-gradient(ellipse 50% 100% at center, black 0%, black 45%, transparent 75%)`,
  WebkitMaskImage: `radial-gradient(ellipse 50% 100% at center, black 0%, black 45%, transparent 75%)`,
  boxShadow: `0 0 8px ${theme.colors.accent.purple}, 0 0 16px ${theme.colors.accent.purple}`,
  opacity: 0,
  transition:
    "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  willChange: "transform, opacity",
  pointerEvents: "none",
}));

