import { NeonBlinkData } from "../model/types";
import { CrystalData } from "@/shared/ui/Crystal";
import crystal1 from "@/shared/assets/images/crystalls/crystal1.png";
import crystal2 from "@/shared/assets/images/crystalls/crystal2.png";
import crystal3 from "@/shared/assets/images/crystalls/crystal3.png";
import crystal4 from "@/shared/assets/images/crystalls/crystal4.png";
import crystal from "@/shared/assets/images/crystalls/crystal.png";
import neonBlinkImage from "@/shared/assets/images/neon-blink.png";

export const CRYSTAL_IMAGES = [crystal1, crystal2, crystal3, crystal4, crystal];

export const CRYSTAL_COUNT = 12;

export const CRYSTAL_SIZE_MIN = 20;
export const CRYSTAL_SIZE_MAX = 40;

export const CRYSTAL_PARALLAX_MAX = 25;

export const SPRING_CONFIG = { damping: 50, stiffness: 100 };

export function generateCrystals(count: number): CrystalData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    image: CRYSTAL_IMAGES[Math.floor(Math.random() * CRYSTAL_IMAGES.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: CRYSTAL_SIZE_MIN + Math.random() * (CRYSTAL_SIZE_MAX - CRYSTAL_SIZE_MIN),
    rotation: Math.random() * 360,
    parallaxX: (Math.random() - 0.5) * CRYSTAL_PARALLAX_MAX * 2,
    parallaxY: (Math.random() - 0.5) * CRYSTAL_PARALLAX_MAX * 2,
  }));
}

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

