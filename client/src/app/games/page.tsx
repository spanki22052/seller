import { GamesPage } from "@/compositions/GamesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Игры | CheatArena - Лучшие DLC для игр",
  description: "Найдите лучшие DLC и хаки для ваших любимых игр. Более 100+ игр с проверенными DLC от профессиональных разработчиков.",
  keywords: "DLC, хаки, игры, cheats, hacks, games, CheatArena",
  openGraph: {
    title: "Игры | CheatArena",
    description: "Найдите лучшие DLC для ваших любимых игр",
    type: "website",
  },
};

export default function Games() {
  return <GamesPage />;
}
