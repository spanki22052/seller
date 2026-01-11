import { GamesPage } from "@/compositions/GamesPage";
import { Metadata } from "next";
import { getSeoPage } from "@/entities/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoPage('games');

  const baseTitle = "Игры | CheatArena - Лучшие DLC для игр";
  const baseDescription = "Найдите лучшие DLC и хаки для ваших любимых игр. Более 100+ игр с проверенными DLC от профессиональных разработчиков.";

  return {
    title: baseTitle,
    description: seoData?.keywords?.length
      ? `${baseDescription} ${seoData.keywords.join(', ')}`
      : baseDescription,
    keywords: seoData?.keywords || ["DLC", "хаки", "игры", "cheats", "hacks", "games", "CheatArena"],
    openGraph: {
      title: "Игры | CheatArena",
      description: seoData?.keywords?.length
        ? `${baseDescription} ${seoData.keywords.slice(0, 3).join(', ')}`
        : baseDescription,
      type: "website",
    },
  };
}

export default function Games() {
  return <GamesPage />;
}
