import { HomePage } from "@/compositions/HomePage";
import { Metadata } from "next";
import { getSeoPage } from "@/entities/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoPage('home');

  const baseTitle = "CheatArena - Лучшие DLC для игр";
  const baseDescription = "Профессиональные DLC и хаки для популярных игр. Безопасные и эффективные решения от проверенных разработчиков.";

  return {
    title: baseTitle,
    description: seoData?.keywords?.length
      ? `${baseDescription} ${seoData.keywords.join(', ')}`
      : baseDescription,
    keywords: seoData?.keywords || ["DLC", "хаки", "игры", "cheats", "hacks", "games", "CheatArena"],
    openGraph: {
      title: baseTitle,
      description: seoData?.keywords?.length
        ? `${baseDescription} ${seoData.keywords.slice(0, 3).join(', ')}`
        : baseDescription,
      type: "website",
    },
  };
}

export default function Home() {
  return <HomePage />;
}
