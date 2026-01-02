"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NeonBlinkData } from "../model/types";
import { NEON_BLINK_IMAGE } from "../lib/constants";
import * as Styled from "./styled";

interface NeonBlinkProps {
  blink: NeonBlinkData;
  prefersReducedMotion: boolean;
}

export function NeonBlink({ blink, prefersReducedMotion }: NeonBlinkProps) {
  if (prefersReducedMotion) {
    return (
      <Styled.NeonBlinkWrapper
        style={{
          left: `${blink.x}%`,
          top: `${blink.y}%`,
          width: `${blink.size}px`,
          height: `${blink.size}px`,
          opacity: 0.6,
        }}
      >
        <Image
          src={NEON_BLINK_IMAGE}
          alt="Neon blink"
          width={blink.size}
          height={blink.size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Styled.NeonBlinkWrapper>
    );
  }

  return (
    <Styled.NeonBlinkWrapper
      style={{
        left: `${blink.x}%`,
        top: `${blink.y}%`,
        width: `${blink.size}px`,
        height: `${blink.size}px`,
      }}
    >
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: blink.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: blink.delay,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={NEON_BLINK_IMAGE}
          alt="Neon blink"
          width={blink.size}
          height={blink.size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </motion.div>
    </Styled.NeonBlinkWrapper>
  );
}

