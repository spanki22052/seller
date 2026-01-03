import styled, { keyframes, css } from "styled-components";

interface CircularTextContainerProps {
  $animationDuration: number;
}

interface CircularCharProps {
  $rotation: number;
  $radius: number;
  $mobileRadius: number;
  $fontSize: number;
  $mobileFontSize: number;
  $fontWeight: number;
  $letterSpacing: number;
  $color?: string;
}

const rotateCircularText = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CircularTextContainer = styled.div<CircularTextContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  animation: ${({ $animationDuration }) => css`
    ${rotateCircularText} ${$animationDuration}s linear infinite
  `};
  transform-origin: center center;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CircularChar = styled.span<CircularCharProps>(
  ({
    $rotation,
    $radius,
    $mobileRadius,
    $fontSize,
    $mobileFontSize,
    $fontWeight,
    $letterSpacing,
    $color,
    theme,
  }) => {
    const angle = ($rotation * Math.PI) / 180;
    const x = Math.sin(angle) * $radius;
    const y = -Math.cos(angle) * $radius;
    const mobileX = Math.sin(angle) * $mobileRadius;
    const mobileY = -Math.cos(angle) * $mobileRadius;

    return {
      position: "absolute",
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) rotate(${$rotation}deg)`,
      transformOrigin: "center center",
      fontSize: $fontSize,
      fontWeight: $fontWeight,
      color: $color ?? theme.colors.text.primary,
      textTransform: "uppercase",
      letterSpacing: $letterSpacing,
      whiteSpace: "nowrap",

      "@media (max-width: 768px)": {
        fontSize: $mobileFontSize,
        left: `calc(50% + ${mobileX}px)`,
        top: `calc(50% + ${mobileY}px)`,
      },
    };
  }
);

