"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkeletonIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SkeletonIcon({ width = 400, height = 500, className }: SkeletonIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ width, height }}
      className={className}
    >
      <img
        src="/icons/skeleton-up.svg"
        alt="Skeleton"
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </motion.div>
  );
}

