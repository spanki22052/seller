"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Input, Button } from "antd";
import { SearchOutlined, TrophyOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  getGames,
  getAllGamesWithCheats,
  gameKeys,
  Game,
} from "@/entities/game";
import { getCategories, categoryKeys, Category } from "@/entities/category";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { gamesPageAnimations } from "../lib/animConstants";
import * as Styled from "./styled";

export function GamesPage() {
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });

  // Fetch all games
  const { data: games = [], isLoading: isGamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  // Fetch games with cheats for statistics
  const { data: gamesWithCheats = [] } = useQuery({
    queryKey: [...gameKeys.lists(), "with-cheats"],
    queryFn: getAllGamesWithCheats,
  });

  // Calculate game statistics from cheats data
  const gameStats = useMemo(() => {
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

  // Set default category on mount (PC or first category)
  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      const pcCategory = categories.find(
        (cat) => cat.name.toUpperCase() === "PC"
      );
      setSelectedCategoryId(pcCategory?.id || categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // Filter games based on search query and category
  const filteredGames = useMemo(() => {
    let filtered = games;

    // Filter by category
    if (selectedCategoryId) {
      filtered = filtered.filter((game) => {
        return game.categoryId === selectedCategoryId;
      });
    }

    // Filter by search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [games, debouncedSearchQuery, selectedCategoryId]);

  // Calculate total statistics
  const totalStats = useMemo(() => {
    const totalGames = games.length;
    const totalOffers = Object.values(gameStats).reduce(
      (sum, stat) => sum + stat.offersCount,
      0
    );
    const gamesWithOffers = Object.values(gameStats).filter(
      (stat) => stat.offersCount > 0
    ).length;

    return {
      totalGames,
      totalOffers,
      gamesWithOffers,
    };
  }, [games, gameStats]);

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  if (isGamesLoading) {
    return (
      <>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Styled.Container>
          <Styled.ContentWrapper>
            <Styled.HeaderSection>
              <Styled.PageTitle>Игры</Styled.PageTitle>
              <Styled.PageSubtitle>
                Ищите и находите лучшие читы для ваших любимых игр
              </Styled.PageSubtitle>
            </Styled.HeaderSection>

            <Styled.SearchSection>
              <Input
                placeholder="Поиск игр..."
                prefix={<SearchOutlined />}
                size="large"
                disabled
              />
            </Styled.SearchSection>

            <Styled.SkeletonWrapper>
              {Array.from({ length: 12 }).map((_, index) => (
                <Styled.LoadingSkeleton key={`skeleton-${index}`} />
              ))}
            </Styled.SkeletonWrapper>
          </Styled.ContentWrapper>
        </Styled.Container>
      </>
    );
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.ContentWrapper>
          <Styled.HeaderSection>
            <Styled.PageTitle>Игры</Styled.PageTitle>
            <Styled.PageSubtitle>
              Ищите и находите лучшие читы для ваших любимых игр. У нас более{" "}
              {totalStats.totalGames} игр с {totalStats.totalOffers}{" "}
              предложениями
            </Styled.PageSubtitle>
          </Styled.HeaderSection>

          {/* Statistics Section */}
          <Styled.StatsSection>
            <Styled.StatCard>
              <Styled.StatValue>{totalStats.totalGames}</Styled.StatValue>
              <Styled.StatLabel>Игр</Styled.StatLabel>
            </Styled.StatCard>
            <Styled.StatCard>
              <Styled.StatValue>{totalStats.totalOffers}</Styled.StatValue>
              <Styled.StatLabel>Предложений</Styled.StatLabel>
            </Styled.StatCard>
            <Styled.StatCard>
              <Styled.StatValue>{totalStats.gamesWithOffers}</Styled.StatValue>
              <Styled.StatLabel>С читами</Styled.StatLabel>
            </Styled.StatCard>
          </Styled.StatsSection>

          {/* Search Section */}
          <Styled.SearchSection>
            <Input
              placeholder="Поиск игр..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={handleSearchChange}
              allowClear
            />
          </Styled.SearchSection>

          {/* Categories Section */}
          {categories.length > 0 && (
            <Styled.CategoriesSection>
              {categories.map((category) => (
                <Styled.CategoryButton
                  key={category.id}
                  type={
                    selectedCategoryId === category.id ? "primary" : "default"
                  }
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Styled.CategoryButton>
              ))}
            </Styled.CategoriesSection>
          )}

          {/* Games Grid */}
          <AnimatePresence mode="wait">
            {filteredGames.length === 0 ? (
              <motion.div
                key="empty-state"
                variants={gamesPageAnimations.emptyState(prefersReducedMotion)}
                initial="hidden"
                animate="visible"
              >
                <Styled.EmptyState>
                  <Styled.EmptyIcon>
                    <TrophyOutlined />
                  </Styled.EmptyIcon>
                  <Styled.EmptyText>
                    {debouncedSearchQuery.trim()
                      ? `Не найдено игр по запросу "${debouncedSearchQuery}"`
                      : "Игры не найдены"}
                  </Styled.EmptyText>
                  <Styled.EmptySubtext>
                    {debouncedSearchQuery.trim()
                      ? "Попробуйте изменить поисковый запрос или проверьте правильность написания"
                      : "В данный момент нет доступных игр"}
                  </Styled.EmptySubtext>
                </Styled.EmptyState>
              </motion.div>
            ) : (
              <motion.div
                key={`games-grid-${selectedCategoryId}`}
                variants={gamesPageAnimations.gamesGridContainer(
                  prefersReducedMotion
                )}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Styled.GamesGrid>
                  {filteredGames.map((game: Game) => {
                    // Get real data from game statistics
                    const stats = gameStats[game.id] || {
                      minPrice: 0,
                      offersCount: 0,
                    };
                    const { minPrice, offersCount } = stats;

                    return (
                      <motion.div
                        key={game.id}
                        variants={gamesPageAnimations.gameCard(
                          prefersReducedMotion
                        )}
                        layout
                      >
                        <Styled.GameCard
                          onClick={() => handleGameClick(game.id)}
                        >
                          <Styled.GameImageWrapper
                            $backgroundColor={game.color || "#1a1a1a"}
                          >
                            {game.image && (
                              <Styled.GameImage
                                src={game.image}
                                alt={`${game.name} game cover`}
                                loading="lazy"
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
                        </Styled.GameCard>
                      </motion.div>
                    );
                  })}
                </Styled.GamesGrid>
              </motion.div>
            )}
          </AnimatePresence>
        </Styled.ContentWrapper>
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking
export default GamesPage;
