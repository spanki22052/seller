import { Game } from "../model/types";

// Generate random color based on seed
export const getRandomColor = (seed: string): string => {
  // Use seed to generate consistent colors
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate vibrant colors
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 30); // 60-90%
  const lightness = 40 + (Math.abs(hash) % 20); // 40-60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Generate random images using Picsum Photos
const getRandomImage = (
  seed: string,
  width: number = 400,
  height: number = 600
) => {
  // Use seed to generate consistent image IDs
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const imageId = Math.abs(hash) % 1000;
  return `https://picsum.photos/seed/${imageId}/${width}/${height}`;
};

export const games: Game[] = [
  { id: "dota2", name: "Dota 2", color: getRandomColor("dota2"), image: getRandomImage("dota2") },
  { id: "scum", name: "Scum", color: getRandomColor("scum"), image: getRandomImage("scum") },
  { id: "rainbow-six", name: "Rainbow Six", color: getRandomColor("rainbow-six"), image: getRandomImage("rainbow-six") },
  { id: "deadside", name: "Deadside", color: getRandomColor("deadside"), image: getRandomImage("deadside") },
];
