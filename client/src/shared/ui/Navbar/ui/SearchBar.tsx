"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import {
  searchGames,
  gameKeys,
  type GameWithCheats,
  type Cheat,
} from "@/entities/game";
import * as Styled from "./styled";

export function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: gameKeys.search(debouncedSearchQuery),
    queryFn: () => searchGames(debouncedSearchQuery),
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  // Flatten results: games first, then cheats
  const flatResults = React.useMemo(() => {
    const results: Array<{
      type: "game" | "cheat";
      data: GameWithCheats | Cheat;
      gameId?: string;
    }> = [];

    searchResults.forEach((game: GameWithCheats) => {
      // Add game
      results.push({ type: "game", data: game });

      // Add cheats for this game
      game.cheats.forEach((cheat) => {
        results.push({ type: "cheat", data: cheat, gameId: game.id });
      });
    });

    return results;
  }, [searchResults]);

  // Filter results based on search query
  const filteredResults = React.useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return [];
    }

    const query = debouncedSearchQuery.toLowerCase().trim();

    // If query matches a game name exactly, show only that game's cheats
    const exactGameMatch = searchResults.find(
      (game: GameWithCheats) => game.name.toLowerCase() === query
    );

    if (exactGameMatch) {
      return [
        { type: "game" as const, data: exactGameMatch },
        ...exactGameMatch.cheats.map((cheat) => ({
          type: "cheat" as const,
          data: cheat,
          gameId: exactGameMatch.id,
        })),
      ];
    }

    // Otherwise show all matching games and cheats
    return flatResults.filter((item) => {
      if (item.type === "game") {
        const game = item.data as GameWithCheats;
        return game.name.toLowerCase().includes(query);
      } else {
        const cheat = item.data as Cheat;
        return (
          cheat.name.toLowerCase().includes(query) ||
          cheat.brandName.toLowerCase().includes(query)
        );
      }
    });
  }, [debouncedSearchQuery, flatResults, searchResults]);

  React.useEffect(() => {
    // Only open the dropdown if there are results and the query isn't empty
    const shouldOpen =
      filteredResults.length > 0 && debouncedSearchQuery.trim().length > 0;
    setIsDropdownOpen(shouldOpen);

    // Focus the first result if dropdown is open, otherwise reset
    setFocusedIndex(shouldOpen ? 0 : -1);
  }, [filteredResults, debouncedSearchQuery]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        searchInputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (item: (typeof filteredResults)[0]) => {
    if (item.type === "game") {
      const game = item.data as GameWithCheats;
      router.push(`/game/${game.id}`);
    } else {
      const cheat = item.data as Cheat;
      router.push(`/game/${item.gameId}/cheat/${cheat.id}`);
    }
    setIsDropdownOpen(false);
    setSearchQuery("");
    searchInputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleItemClick(filteredResults[focusedIndex]);
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 0 : 0,
      y: prefersReducedMotion ? 0 : -10,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 0 : 0,
      x: prefersReducedMotion ? 0 : -10,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        delay: prefersReducedMotion ? 0 : i * 0.02,
      },
    }),
  };

  return (
    <Styled.SearchBarContainer ref={dropdownRef}>
      <Styled.SearchInputWrapper>
        <Styled.SearchIcon>
          {isLoading ? (
            <LoadingOutlined style={{ fontSize: 16 }} />
          ) : (
            <SearchOutlined style={{ fontSize: 16 }} />
          )}
        </Styled.SearchIcon>
        <Styled.SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="Поиск игр и DLC..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredResults.length > 0) {
              setIsDropdownOpen(true);
            }
          }}
        />
      </Styled.SearchInputWrapper>

      <AnimatePresence>
        {isDropdownOpen && filteredResults.length > 0 && (
          <Styled.Dropdown
            as={motion.div}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredResults.map((item, index) => {
              const isFocused = index === focusedIndex;
              const isGame = item.type === "game";
              const game = isGame ? (item.data as GameWithCheats) : null;
              const cheat = !isGame ? (item.data as Cheat) : null;

              // Get actual cheat count from the game data
              const cheatsCount = isGame ? game!.cheats.length : 0;

              return (
                <Styled.DropdownItem
                  key={isGame ? `game-${game!.id}` : `cheat-${cheat!.id}`}
                  as={motion.div}
                  variants={itemVariants}
                  custom={index}
                  $isGame={isGame}
                  $isFocused={isFocused}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {isGame ? (
                    <>
                      <Styled.ItemIcon $isGame={true}>🎮</Styled.ItemIcon>
                      <Styled.ItemContent>
                        <Styled.ItemTitle>{game!.name}</Styled.ItemTitle>
                        <Styled.ItemSubtitle>
                          {cheatsCount} {cheatsCount === 1 ? "DLC" : "DLC"}
                        </Styled.ItemSubtitle>
                      </Styled.ItemContent>
                    </>
                  ) : (
                    <>
                      <Styled.ItemIcon $isGame={false}>⚡</Styled.ItemIcon>
                      <Styled.ItemContent>
                        <Styled.ItemTitle>{cheat!.brandName}</Styled.ItemTitle>
                        <Styled.ItemSubtitle>{cheat!.name}</Styled.ItemSubtitle>
                      </Styled.ItemContent>
                    </>
                  )}
                </Styled.DropdownItem>
              );
            })}
          </Styled.Dropdown>
        )}
      </AnimatePresence>
    </Styled.SearchBarContainer>
  );
}
