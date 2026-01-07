import { GamesPage } from "@/compositions/GamesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Игры | CheatArena - Лучшие читы для игр",
  description: "Найдите лучшие читы и хаки для ваших любимых игр. Более 100+ игр с проверенными читами от профессиональных разработчиков.",
  keywords: "читы, хаки, игры, cheats, hacks, games, CheatArena",
  openGraph: {
    title: "Игры | CheatArena",
    description: "Найдите лучшие читы для ваших любимых игр",
    type: "website",
  },
};

export default function Games() {
  return <GamesPage />;
}
