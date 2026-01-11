import { FaqPage } from "@/compositions/FaqPage";
import { Metadata } from "next";
import { getSeoPage } from "@/entities/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoPage('faq');

  const baseTitle = "FAQ | CheatArena - Частые вопросы";
  const baseDescription = "Ответы на самые частые вопросы о наших DLC и хаках. Узнайте о безопасности, установке и поддержке.";

  return {
    title: baseTitle,
    description: seoData?.keywords?.length
      ? `${baseDescription} ${seoData.keywords.join(', ')}`
      : baseDescription,
    keywords: seoData?.keywords || ["FAQ", "вопросы", "ответы", "DLC", "хаки", "поддержка", "CheatArena"],
    openGraph: {
      title: baseTitle,
      description: seoData?.keywords?.length
        ? `${baseDescription} ${seoData.keywords.slice(0, 3).join(', ')}`
        : baseDescription,
      type: "website",
    },
  };
}

export default function FAQ() {
  return <FaqPage />;
}
