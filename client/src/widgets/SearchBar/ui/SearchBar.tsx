"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { searchGames, gameKeys } from "@/entities/game";
import { MenuItem } from "@/widgets/Sidebar/model/types";
import * as Styled from "./styled";

export function SearchBar() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Backend search query
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: gameKeys.search(debouncedSearchQuery),
    queryFn: () => searchGames(debouncedSearchQuery),
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  // Transform backend results to MenuItem format
  const filteredResults = useMemo(() => {
    if (!debouncedSearchQuery.trim() || searchResults.length === 0) {
      return [];
    }

    return searchResults.map((game) => ({
      id: game.id,
      label: game.name,
      href: `/game/${game.id}`,
      cheats: game.cheats.map((cheat) => ({
        id: cheat.id,
        name: cheat.name,
        href: `/game/${game.id}/cheat/${cheat.id}`,
      })),
    }));
  }, [searchResults, debouncedSearchQuery]);

  // Get cheats for a game (backend already filters them)
  const getFilteredCheats = (cheats: MenuItem["cheats"]) => {
    if (!cheats) {
      return { cheats: [] };
    }

    return {
      cheats: cheats.sort((a, b) => a.name.localeCompare(b.name)),
    };
  };

  // Check if a cheat matches the search query (for highlighting)
  const isCheatHighlighted = (cheatName: string) => {
    const query = debouncedSearchQuery.toLowerCase().trim();
    return cheatName.toLowerCase().includes(query);
  };

  // Compute dropdown visibility
  const shouldShowDropdown = useMemo(() => {
    return (
      debouncedSearchQuery.trim().length > 0 &&
      !isLoading &&
      filteredResults.length > 0
    );
  }, [debouncedSearchQuery, isLoading, filteredResults]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        dropdownRef.current &&
        !searchBarRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (shouldShowDropdown && isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, shouldShowDropdown]);

  // Sync dropdown visibility with shouldShowDropdown
  useEffect(() => {
    setIsDropdownOpen(shouldShowDropdown);
  }, [shouldShowDropdown]);

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      scale: prefersReducedMotion ? 1 : 0.95,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      scale: prefersReducedMotion ? 1 : 0.95,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -10,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        delay: prefersReducedMotion ? 0 : i * 0.03,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const cheatVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -5,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.15,
        delay: prefersReducedMotion ? 0 : i * 0.02,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Styled.SearchBarContainer ref={searchBarRef}>
      <Input
        placeholder="Поиск..."
        prefix={<SearchOutlined />}
        suffix={isLoading ? <Spin size="small" /> : null}
        size="large"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => {
          if (shouldShowDropdown) {
            setIsDropdownOpen(true);
          }
        }}
      />
      <AnimatePresence>
        {isDropdownOpen && filteredResults.length > 0 && (
          <Styled.Dropdown
            ref={dropdownRef}
            as={motion.div}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Styled.DropdownContent>
              {filteredResults.map((item, index) => {
                const { cheats: filteredCheats } = getFilteredCheats(
                  item.cheats
                );
                const hasCheats = filteredCheats && filteredCheats.length > 0;

                return (
                  <Styled.DropdownItem
                    key={item.id}
                    as={motion.div}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Styled.GameItem>
                      <Styled.GameName>{item.label}</Styled.GameName>
                      {hasCheats && (
                        <Styled.CheatsList>
                          {filteredCheats.map((cheat, cheatIndex) => {
                            const isHighlighted = isCheatHighlighted(
                              cheat.name
                            );
                            return (
                              <Styled.CheatItem
                                key={cheat.id}
                                as={motion.div}
                                custom={cheatIndex}
                                variants={cheatVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                <Styled.CheatLink
                                  href={cheat.href || "#"}
                                  $isHighlighted={isHighlighted}
                                  onClick={(
                                    e: React.MouseEvent<HTMLAnchorElement>
                                  ) => {
                                    e.preventDefault();
                                    if (cheat.href) {
                                      router.push(cheat.href);
                                      setIsDropdownOpen(false);
                                      setSearchQuery("");
                                    }
                                  }}
                                >
                                  {cheat.name}
                                </Styled.CheatLink>
                              </Styled.CheatItem>
                            );
                          })}
                        </Styled.CheatsList>
                      )}
                    </Styled.GameItem>
                  </Styled.DropdownItem>
                );
              })}
            </Styled.DropdownContent>
          </Styled.Dropdown>
        )}
      </AnimatePresence>
    </Styled.SearchBarContainer>
  );
}

