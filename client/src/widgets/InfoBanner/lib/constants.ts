import { NeonBlinkData } from "../model/types";
import neonBlinkImage from "@/shared/assets/images/neon-blink.png";

export const SPRING_CONFIG = { damping: 50, stiffness: 100 };

export const NEON_BLINK_IMAGE = neonBlinkImage;

export const NEON_BLINK_COUNT = 8;
export const NEON_BLINK_SIZE_MIN = 40;
export const NEON_BLINK_SIZE_MAX = 80;
export const NEON_BLINK_ANIMATION_DURATION_MIN = 2;
export const NEON_BLINK_ANIMATION_DURATION_MAX = 4;

export function generateNeonBlinks(count: number): NeonBlinkData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: NEON_BLINK_SIZE_MIN + Math.random() * (NEON_BLINK_SIZE_MAX - NEON_BLINK_SIZE_MIN),
    delay: Math.random() * 2,
    duration: NEON_BLINK_ANIMATION_DURATION_MIN + Math.random() * (NEON_BLINK_ANIMATION_DURATION_MAX - NEON_BLINK_ANIMATION_DURATION_MIN),
  }));
}

