"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { games } from "@/widgets/Sidebar/mocks/mock";
import { cheatCards } from "@/widgets/CheatCards/mocks/mock";
import * as Styled from "./styled";

interface CheatResult {
  name: string;
  description?: string;
}

interface GameSearchResult {
  gameName: string;
  cheats: CheatResult[];
}

export const Search = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GameSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const searchLower = debouncedQuery.toLowerCase().trim();
    const foundGames: Map<string, GameSearchResult> = new Map();

    // Search through games and cheats
    games.forEach((game) => {
      const gameNameLower = game.name.toLowerCase();
      const matchingCheats: CheatResult[] = [];
      
      // Check if game name matches
      const gameMatches = gameNameLower.includes(searchLower);
      
      // Check cheats within this game
      game.cheats.forEach((cheat) => {
        const cheatNameLower = cheat.name.toLowerCase();
        if (cheatNameLower.includes(searchLower)) {
          matchingCheats.push({
            name: cheat.name,
            description: cheat.description,
          });
        }
      });

      // If game name matches or has matching cheats, add it to results
      if (gameMatches || matchingCheats.length > 0) {
        // If game name matches, show all cheats; otherwise show only matching cheats
        const cheatsToShow = gameMatches ? game.cheats.map(c => ({
          name: c.name,
          description: c.description,
        })) : matchingCheats;

        foundGames.set(game.name, {
          gameName: game.name,
          cheats: cheatsToShow,
        });
      }
    });

    const resultsArray = Array.from(foundGames.values());
    setResults(resultsArray);
    setIsDropdownOpen(resultsArray.length > 0);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleResultClick = (gameName?: string, cheatName?: string) => () => {
    // Find matching cheat card
    let cheatId = cheatCards[0]?.id || "1";
    
    if (gameName && cheatName) {
      const cheatCard = cheatCards.find((card) => {
        const cardName = card.nameKey.toLowerCase();
        const cardDesc = card.descriptionKey.toLowerCase();
        const searchName = cheatName.toLowerCase();
        return cardName.includes(searchName) || cardDesc.includes(searchName);
      });
      if (cheatCard) {
        cheatId = cheatCard.id;
      }
    } else if (gameName) {
      // If only game name, try to find first cheat for that game
      const game = games.find((g) => g.name.toLowerCase() === gameName.toLowerCase());
      if (game && game.cheats.length > 0) {
        const firstCheat = game.cheats[0];
        const cheatCard = cheatCards.find((card) => {
          const cardName = card.nameKey.toLowerCase();
          const cardDesc = card.descriptionKey.toLowerCase();
          const searchName = firstCheat.name.toLowerCase();
          return cardName.includes(searchName) || cardDesc.includes(searchName);
        });
        if (cheatCard) {
          cheatId = cheatCard.id;
        }
      }
    }
    
    router.push(`/product?id=${cheatId}`);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <Styled.SearchContainer ref={containerRef}>
      <Styled.SearchIcon>search</Styled.SearchIcon>
      <Styled.SearchInput
        placeholder={t("search")}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <AnimatePresence>
        {isDropdownOpen && results.length > 0 && (
          <Styled.Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Styled.DropdownList>
              {results.map((gameResult, gameIndex) => (
                <Styled.GameGroup
                  key={gameResult.gameName}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: gameIndex * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Styled.GameHeader onClick={handleResultClick(gameResult.gameName)}>
                      <Styled.ItemIcon>sports_esports</Styled.ItemIcon>
                      <Styled.ItemContent>
                        <Styled.ItemTitle>{gameResult.gameName}</Styled.ItemTitle>
                      </Styled.ItemContent>
                    </Styled.GameHeader>
                  </motion.div>
                  <Styled.CheatsList>
                    {gameResult.cheats.map((cheat, cheatIndex) => (
                      <Styled.CheatItem
                        key={`${gameResult.gameName}-${cheat.name}-${cheatIndex}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: gameIndex * 0.05 + cheatIndex * 0.03,
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleResultClick(gameResult.gameName, cheat.name)}
                      >
                        <Styled.CheatIcon>extension</Styled.CheatIcon>
                        <Styled.ItemContent>
                          <Styled.ItemTitle>{cheat.name}</Styled.ItemTitle>
                          {cheat.description && (
                            <Styled.ItemSubtitle>{cheat.description}</Styled.ItemSubtitle>
                          )}
                        </Styled.ItemContent>
                      </Styled.CheatItem>
                    ))}
                  </Styled.CheatsList>
                </Styled.GameGroup>
              ))}
            </Styled.DropdownList>
          </Styled.Dropdown>
        )}
      </AnimatePresence>
    </Styled.SearchContainer>
  );
};

