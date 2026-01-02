import { StaticImageData } from "next/image";

export interface Platform {
  id: string;
  name: string;
  image: StaticImageData;
}

export interface NeonBlinkData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}
