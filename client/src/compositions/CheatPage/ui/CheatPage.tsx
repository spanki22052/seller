"use client";

import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { Footer } from "@/widgets/Footer";
import { useSettings } from "@/entities/settings/api/useSettings";
import type { Settings } from "@/entities/settings/model/types";
import { useCheat } from "@/entities/cheat/api";
import { CheatDetails } from "@/widgets/CheatDetails";
import { SEOHead } from "@/shared/ui";
import * as Styled from "./styled";

const CheatHero = dynamic(
  () =>
    import("@/widgets/CheatHero").then((mod) => ({ default: mod.CheatHero })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={600} />,
  }
);

const CheatFunctions = dynamic(
  () =>
    import("@/widgets/CheatFunctions").then((mod) => ({
      default: mod.CheatFunctions,
    })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={300} />,
  }
);

const CheatTestimonials = dynamic(
  () =>
    import("@/widgets/CheatTestimonials").then((mod) => ({
      default: mod.CheatTestimonials,
    })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={400} />,
  }
);

interface CheatPageProps {
  cheatId: string;
}

/**
 * CheatPage component - displays detailed information about a specific cheat
 * for a game, including hero section, details, functions, video, and pricing.
 *
 * @param cheatId - The unique identifier of the cheat
 */
export function CheatPage({ cheatId }: CheatPageProps) {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  // Получаем данные о settings и cheat
  const { data: settings } = useSettings() as { data: Settings | undefined };
  const { data: cheat } = useCheat(cheatId);

  // SEO data
  const seoTitle = cheat ? `${cheat.brandName} - ${cheat.name} | Читы для игр` : "Читы для игр";
  const seoDescription = cheat?.description || `Купить чит ${cheat?.brandName} для ${cheat?.name}. Скачать приватные читы с гарантией безопасности.`;
  const seoKeywords = cheat?.seoText || `${cheat?.brandName}, ${cheat?.name}, читы, cheats, hack, aimbot`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.MainContent>
          <Styled.CheatHeroWrapper>
            <CheatHero cheatId={cheatId} />
          </Styled.CheatHeroWrapper>
          <CheatDetails cheatId={cheatId} />
          <CheatTestimonials
            reviewDigitalSeller={cheat?.reviewDigitalSeller}
          />
        </Styled.MainContent>

        <Footer />
      </Styled.Container>
    </>
  );
}

export default CheatPage;
