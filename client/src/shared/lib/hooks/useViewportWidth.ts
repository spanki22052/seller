"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect viewport width
 * Safe for SSR - returns 0 initially, then updates after mount
 * @param breakpoint - Breakpoint in pixels (default: 1024)
 * @returns Object with viewport width and whether it's below breakpoint
 */
export function useViewportWidth(breakpoint: number = 1024) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsBelowBreakpoint(width < breakpoint);
    };

    // Set initial value
    updateViewport();

    // Listen for resize events
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, [breakpoint]);

  return { viewportWidth, isBelowBreakpoint };
}

