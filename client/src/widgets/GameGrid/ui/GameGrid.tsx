"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { gameKeys, Game, getAllGamesWithCheats } from "@/entities/game";
import { useFilteredGames } from "../hooks/useFilteredGames";
import * as Styled from "./styled";

// Custom arrow components that properly handle react-slick props
// Ant Design Carousel uses react-slick, which passes onClick, className, style, etc.
interface ArrowProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  currentSlide?: number;
  slideCount?: number;
}

const CustomPrevArrow = (props: ArrowProps) => {
  const { onClick, className, style, currentSlide } = props;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Previous games"
      aria-disabled={currentSlide === 0}
    >
      <LeftOutlined />
    </button>
  );
};

const CustomNextArrow = (props: ArrowProps) => {
  const { onClick, className, style, currentSlide, slideCount } = props;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Next games"
      aria-disabled={currentSlide === slideCount! - 1}
    >
      <RightOutlined />
    </button>
  );
};

interface GameGridProps {
  categoryId?: string | null;
}

export function GameGrid({ categoryId }: GameGridProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4); // Default for SSR

  const { data: gamesWithCheats = [] } = useQuery({
    queryKey: [...gameKeys.lists(), "with-cheats"],
    queryFn: getAllGamesWithCheats,
  });

  const {
    filteredGames,
    hasGames,
    isLoading: isGamesLoading,
  } = useFilteredGames({ categoryId });

  // Function to chunk array into groups of specified size
  const chunkArray = (array: Game[], chunkSize: number): Game[][] => {
    const chunks: Game[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Determine cards per slide based on screen size (client-side only)
  // Use useLayoutEffect to update before paint to minimize hydration mismatch
  React.useLayoutEffect(() => {
    const updateCardsPerSlide = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setCardsPerSlide(4); // Desktop
        } else if (window.innerWidth >= 768) {
          setCardsPerSlide(3); // Tablet
        } else if (window.innerWidth >= 600) {
          setCardsPerSlide(2); // Mobile medium
        } else {
          setCardsPerSlide(1); // Mobile small - single card that expands
        }
      }
    };

    // Set initial value immediately
    updateCardsPerSlide();

    // Update on resize
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Calculate game statistics from cheats data
  const gameStats = React.useMemo(() => {
    const stats: Record<string, { minPrice: number; offersCount: number }> = {};

    gamesWithCheats.forEach((game) => {
      const availableCheats = game.cheats.filter(
        (cheat) =>
          cheat.status === "AVAILABLE" &&
          cheat.price.amount !== null &&
          cheat.price.amount > 0
      );

      if (availableCheats.length > 0) {
        const prices = availableCheats.map((cheat) => cheat.price.amount!);
        const minPrice = Math.min(...prices);
        stats[game.id] = {
          minPrice,
          offersCount: availableCheats.length,
        };
      } else {
        stats[game.id] = {
          minPrice: 0,
          offersCount: 0,
        };
      }
    });

    return stats;
  }, [gamesWithCheats]);

  // Debug logging to verify filtering works correctly
  React.useEffect(() => {
    console.log("GameGrid filtering debug:", {
      categoryId,
      filteredGamesCount: filteredGames.length,
      filteredGameIds: filteredGames.map((g) => g.id),
      hasGames,
    });
  }, [categoryId, filteredGames, hasGames]);

  const gameSlides = React.useMemo(
    () => chunkArray(filteredGames, cardsPerSlide),
    [filteredGames, cardsPerSlide]
  );

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
  };

  // Keyboard navigation handler
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Space or Enter to pause/play (Note: pauseOnHover handles mouse interactions)
    // This keyboard handler could be enhanced to control autoplay if needed
  };

  if (isGamesLoading) {
    return (
      <Styled.CarouselContainer>
        <Styled.CarouselWrapper>
          {Array.from({ length: cardsPerSlide }).map((_, index) => (
            <Styled.GameTile key={`skeleton-${index}`}>
              <Styled.GameImageWrapper $backgroundColor="#333">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#444",
                  }}
                />
              </Styled.GameImageWrapper>
              <Styled.GradientOverlay />
            </Styled.GameTile>
          ))}
        </Styled.CarouselWrapper>
      </Styled.CarouselContainer>
    );
  }

  if (filteredGames.length === 0) {
    return null;
  }

  return (
    <Styled.CarouselContainer
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Games carousel"
      suppressHydrationWarning
    >
      <Carousel
        // Navigation
        arrows
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        // Indicators
        dots={{ className: "carousel-dots" }}
        // Behavior
        infinite={gameSlides.length > 1}
        autoplay={{
          dotDuration: true,
        }}
        autoplaySpeed={5000} // 5 seconds between slides
        pauseOnHover={true} // Pause on mouse hover
        draggable={false} // Disable touch/swipe support
        swipeToSlide={false} // Disable swiping to any slide
        // Animation
        speed={500} // Smooth but not too slow
        easing="cubic-bezier(0.4, 0, 0.2, 1)" // Material Design easing
        effect="scrollx" // Horizontal scroll effect
        waitForAnimate={false} // Don't wait for animation to complete
        fade={false} // Keep scrollx for better UX with multiple items per slide
        // Accessibility
        aria-label={`Games carousel - showing ${currentSlide + 1} of ${
          gameSlides.length
        } pages`}
        aria-live="polite"
        aria-describedby="carousel-instructions"
        // Events
        afterChange={handleSlideChange}
        beforeChange={() => {
          // Optional: Add analytics or prefetching logic here
        }}
        // Responsive behavior
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              arrows: true, // Keep arrows on tablet
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              arrows: true, // Keep arrows on mobile for accessibility
              dots: true,
            },
          },
        ]}
      >
        {gameSlides.map((slideGames, slideIndex) => (
          <div key={`slide-${slideIndex}`} style={{ position: "relative" }}>
            {/* Slide Counter */}
            <Styled.SlideCounter>
              {slideIndex + 1} / {gameSlides.length}
            </Styled.SlideCounter>

            <Styled.CarouselWrapper>
              {slideGames.map((game: Game) => {
                // Get real data from game statistics
                const stats = gameStats[game.id] || {
                  minPrice: 0,
                  offersCount: 0,
                };
                const { minPrice, offersCount } = stats;

                return (
                  <Styled.GameTile
                    key={game.id}
                    onClick={() => handleGameClick(game.id)}
                  >
                    <Styled.GameImageWrapper
                      $backgroundColor={game.color || "#1a1a1a"}
                      onContextMenu={(e) => e.preventDefault()} // Prevent right-click on wrapper
                    >
                      {game.image && (
                        <Styled.GameImage
                          src={game.image}
                          alt={`${game.name} game cover`}
                          loading="lazy"
                          onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
                          onDragStart={(e) => e.preventDefault()} // Prevent dragging
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                          }}
                        />
                      )}
                    </Styled.GameImageWrapper>

                    <Styled.GradientOverlay />

                    <Styled.GameContent>
                      {game.name && (
                        <Styled.GameName>{game.name}</Styled.GameName>
                      )}

                      <Styled.PriceContainer>
                        {minPrice > 0 ? (
                          <>
                            <Styled.PriceBadge>
                              от{" "}
                              <Styled.PriceAmount>
                                {" "}
                                {minPrice} ₽
                              </Styled.PriceAmount>
                            </Styled.PriceBadge>
                            <Styled.OffersCount>
                              {offersCount} предложений
                            </Styled.OffersCount>
                          </>
                        ) : (
                          <Styled.OffersCount>
                            Нет предложений
                          </Styled.OffersCount>
                        )}
                      </Styled.PriceContainer>
                    </Styled.GameContent>
                  </Styled.GameTile>
                );
              })}
              {/* Fill empty slots if needed */}
              {slideGames.length < cardsPerSlide &&
                Array.from({ length: cardsPerSlide - slideGames.length }).map(
                  (_, index) => (
                    <Styled.EmptyTile key={`empty-${slideIndex}-${index}`} />
                  )
                )}
            </Styled.CarouselWrapper>
          </div>
        ))}
      </Carousel>
    </Styled.CarouselContainer>
  );
}
