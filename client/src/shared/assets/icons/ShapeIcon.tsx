"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface ShapeIconProps {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  className?: string;
  src?: string;
  alt?: string;
}

const ShapeWrapper = styled(motion.div)<{
  $width: number;
  $height: number;
  $top?: number;
  $left?: number;
}>(({ $width, $height, $top, $left }) => ({
  position: "absolute",
  width: `${$width}px`,
  height: `${$height}px`,
  ...($top !== undefined && { top: `${$top}px` }),
  ...($left !== undefined && { left: `${$left}px` }),
  display: "table",
  backfaceVisibility: "hidden",
  "@media (max-width: 320px)": {
    width: "72px",
    height: "342px",
    top: "0px",
    left: "25px",
  },
  "@media (min-width: 321px) and (max-width: 480px)": {
    width: "49px",
    height: "206px",
    top: "15px",
    left: "22px",
  },
  "@media (min-width: 481px) and (max-width: 640px)": {
    width: "33px",
    height: "132px",
    top: "44px",
    left: "20px",
  },
  "@media (min-width: 641px) and (max-width: 960px)": {
    width: "56px",
    height: "236px",
    top: "77px",
    left: "-5px",
  },
  "@media (min-width: 961px)": {
    width: "75px",
    height: "316px",
    top: "102px",
    left: "-95px",
  },
}));

const ImageContainer = styled.div({
  width: "inherit",
  height: "inherit",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
});

export function ShapeIcon({
  width = 33,
  height = 132,
  top,
  left,
  className,
  src,
  alt = "Shape icon",
}: ShapeIconProps) {
  const hoverAnimation = {
    x: 258,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  };

  return (
    <ShapeWrapper
      $width={width}
      $height={height}
      $top={top}
      $left={left}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={hoverAnimation}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <ImageContainer
        style={
          src
            ? {
                backgroundImage: `url("${src}")`,
              }
            : undefined
        }
        role="img"
        aria-label={alt}
      >
        {!src && (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
              borderRadius: "4px",
            }}
          />
        )}
      </ImageContainer>
    </ShapeWrapper>
  );
}
