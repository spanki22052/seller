"use client";

import React from "react";
import { motion } from "framer-motion";

interface SettingsIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SettingsIcon({ width = 24, height = 24, className }: SettingsIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width, height, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C13.1 2 14 2.9 14 4V5C14.55 5 15 5.45 15 6V8H9V6C9 5.45 9.45 5 10 5V4C10 2.9 10.9 2 12 2ZM9 9H15V11H9V9ZM15 12H9V14H15V12ZM10 15H14V17C14 17.55 13.55 18 13 18H11C10.45 18 10 17.55 10 18V15Z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    </motion.div>
  );
}
