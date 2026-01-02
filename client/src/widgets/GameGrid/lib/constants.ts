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

export const games: Game[] = [
  { id: "dayz", name: "Dayz", color: getRandomColor("dayz") },
  { id: "rust", name: "Rust", color: getRandomColor("rust") },
  { id: "apex", name: "Apex", color: getRandomColor("apex") },
  { id: "squad", name: "Squad", color: getRandomColor("squad") },
  { id: "rust2", name: "Rust", color: getRandomColor("rust2") },
  { id: "game6", name: "", color: getRandomColor("game6") },
  { id: "game7", name: "", color: getRandomColor("game7") },
  { id: "game8", name: "", color: getRandomColor("game8") },
];
