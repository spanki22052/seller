"use client";

import { useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { OfficialEmailInfo } from "@/widgets/OfficialEmailInfo";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import * as Styled from "./styled";

const CheatHero = dynamic(
  () =>
    import("@/widgets/CheatHero").then((mod) => ({ default: mod.CheatHero })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={600} />,
  }
);

const CheatScreenshots = dynamic(
  () =>
    import("@/widgets/CheatScreenshots").then((mod) => ({
      default: mod.CheatScreenshots,
    })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={400} />,
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

const CheatVideo = dynamic(
  () =>
    import("@/widgets/CheatVideo").then((mod) => ({ default: mod.CheatVideo })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={500} />,
  }
);

const CheatPricing = dynamic(
  () =>
    import("@/widgets/CheatPricing").then((mod) => ({
      default: mod.CheatPricing,
    })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={400} />,
  }
);

const CheatDetails = dynamic(
  () =>
    import("@/widgets/CheatDetails").then((mod) => ({
      default: mod.CheatDetails,
    })),
  {
    ssr: false,
    loading: () => <Styled.LoadingPlaceholder $minHeight={500} />,
  }
);

interface CheatPageProps {
  gameId: string;
  cheatId: string;
}

/**
 * CheatPage component - displays detailed information about a specific cheat
 * for a game, including hero section, details, screenshots, functions, video, and pricing.
 *
 * @param gameId - The unique identifier of the game
 * @param cheatId - The unique identifier of the cheat
 */
export function CheatPage({ gameId, cheatId }: CheatPageProps) {
  const pricingRef = useRef<HTMLDivElement>(null);
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const functionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const accountsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /**
   * Scrolls to the pricing section smoothly, respecting user's reduced motion preference.
   * Used when "Buy Now" button is clicked in the hero section.
   */
  const scrollToPricing = useCallback(() => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [prefersReducedMotion]);

  /**
   * Individual scroll handlers for each section.
   * Respects user's reduced motion preference.
   */
  const scrollToScreenshots = useCallback(() => {
    if (screenshotsRef.current) {
      screenshotsRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [prefersReducedMotion]);

  const scrollToFunctions = useCallback(() => {
    if (functionsRef.current) {
      functionsRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [prefersReducedMotion]);

  const scrollToVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [prefersReducedMotion]);

  const scrollToAccounts = useCallback(() => {
    if (accountsRef.current) {
      accountsRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [prefersReducedMotion]);

  /**
   * Map of section IDs to their scroll handlers.
   * Used by breadcrumbs to navigate to different sections.
   */
  const scrollHandlers = useMemo(
    () => ({
      screenshots: scrollToScreenshots,
      functions: scrollToFunctions,
      pricing: scrollToPricing,
      accounts: scrollToAccounts,
      video: scrollToVideo,
    }),
    [
      scrollToScreenshots,
      scrollToFunctions,
      scrollToPricing,
      scrollToAccounts,
      scrollToVideo,
    ]
  );

  return (
    <>
      <Sidebar />
      <Styled.Container>
        <Styled.MainContent>
          <Styled.CheatHeroWrapper>
            <CheatHero
              gameId={gameId}
              cheatId={cheatId}
              onBuyNowClick={scrollToPricing}
            />
          </Styled.CheatHeroWrapper>
          <CheatDetails cheatId={cheatId} onBreadcrumbClick={scrollHandlers} />
          <div ref={screenshotsRef}>
            <CheatScreenshots cheatId={cheatId} />
          </div>
          <div ref={functionsRef}>
            <CheatFunctions cheatId={cheatId} />
          </div>
          <div ref={videoRef}>
            <CheatVideo cheatId={cheatId} />
          </div>
          <div ref={pricingRef}>
            <CheatPricing cheatId={cheatId} />
          </div>
        </Styled.MainContent>

        <div ref={accountsRef}>
          <OfficialEmailInfo />
        </div>
      </Styled.Container>
    </>
  );
}

export default CheatPage;
