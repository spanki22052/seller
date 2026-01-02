import { StaticImageData } from "next/image";
import { MotionValue } from "framer-motion";

export interface CrystalData {
  id: number;
  image: StaticImageData;
  x: number;
  y: number;
  size: number;
  rotation: number;
  parallaxX: number;
  parallaxY: number;
}

export interface CrystalProps {
  crystal: CrystalData;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean;
}

