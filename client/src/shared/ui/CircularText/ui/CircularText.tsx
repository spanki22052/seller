"use client";

import React from "react";
import * as Styled from "./styled";

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  mobileFontSize?: number;
  mobileRadius?: number;
  fontWeight?: number;
  letterSpacing?: number;
  color?: string;
  animationDuration?: number;
}

export function CircularText({
  text,
  radius = 200,
  fontSize = 12,
  mobileFontSize = 8,
  mobileRadius,
  fontWeight = 700,
  letterSpacing = 2,
  color,
  animationDuration = 25,
}: CircularTextProps) {
  const effectiveMobileRadius = mobileRadius ?? radius * 0.7;

  return (
    <Styled.CircularTextContainer $animationDuration={animationDuration}>
      {text.split("").map((char, index) => (
        <Styled.CircularChar
          key={`${index}-${char}`}
          $rotation={(index / text.length) * 360}
          $radius={radius}
          $mobileRadius={effectiveMobileRadius}
          $fontSize={fontSize}
          $mobileFontSize={mobileFontSize}
          $fontWeight={fontWeight}
          $letterSpacing={letterSpacing}
          $color={color}
        >
          {char === " " ? "\u00A0" : char}
        </Styled.CircularChar>
      ))}
    </Styled.CircularTextContainer>
  );
}

