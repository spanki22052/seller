"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonIcon } from "@/shared/assets/icons";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import { MENU_ITEMS } from "@/widgets/Sidebar/lib/constants";
import { MenuItem } from "@/widgets/Sidebar/model/types";
import * as Styled from "./styled";

export function MainCard() {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const textVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Filter games and cheats based on debounced search query
  const filteredResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return [];
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    const results: MenuItem[] = [];
    const matchedGameIds = new Set<string>();

    // First: Search by game name (exact match gets priority)
    MENU_ITEMS.forEach((item) => {
      if (item.isCategory) return; // Skip categories

      const itemLabelLower = item.label.toLowerCase();
      const isExactMatch = itemLabelLower === query;
      const isPartialMatch = itemLabelLower.includes(query);

      if (isExactMatch || isPartialMatch) {
        results.push(item);
        if (item.cheats) {
          matchedGameIds.add(item.id);
        }
      }
    });

    // Second: Search by cheat name
    MENU_ITEMS.forEach((item) => {
      if (item.isCategory || matchedGameIds.has(item.id)) return;

      if (item.cheats) {
        const hasMatchingCheat = item.cheats.some((cheat) =>
          cheat.name.toLowerCase().includes(query)
        );

        if (hasMatchingCheat) {
          results.push(item);
          matchedGameIds.add(item.id);
        }
      }
    });

    // Sort: exact game matches first, then partial matches, then cheat matches
    return results.sort((a, b) => {
      const aLabelLower = a.label.toLowerCase();
      const bLabelLower = b.label.toLowerCase();
      const aExact = aLabelLower === query;
      const bExact = bLabelLower === query;
      const aStartsWith = aLabelLower.startsWith(query);
      const bStartsWith = bLabelLower.startsWith(query);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [debouncedSearchQuery]);

  // Filter cheats for a specific game and check if query matches game name
  const getFilteredCheats = (cheats: MenuItem["cheats"], gameLabel: string) => {
    if (!cheats) {
      return { cheats: [], shouldShowAll: false };
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    const gameLabelLower = gameLabel.toLowerCase();

    // If query matches game name exactly or partially, show all cheats
    const shouldShowAll =
      gameLabelLower === query || gameLabelLower.includes(query);

    if (shouldShowAll) {
      return {
        cheats: cheats.sort((a, b) => a.name.localeCompare(b.name)),
        shouldShowAll: true,
      };
    }

    // Otherwise, filter cheats by query
    const filtered = cheats.filter((cheat) =>
      cheat.name.toLowerCase().includes(query)
    );

    const sorted = filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStartsWith = aName.startsWith(query);
      const bStartsWith = bName.startsWith(query);
      const aExact = aName === query;
      const bExact = bName === query;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.name.localeCompare(b.name);
    });

    return { cheats: sorted, shouldShowAll: false };
  };

  // Check if a cheat matches the search query (for highlighting)
  const isCheatHighlighted = (cheatName: string) => {
    const query = debouncedSearchQuery.toLowerCase().trim();
    return cheatName.toLowerCase().includes(query);
  };

  // Compute dropdown visibility
  const shouldShowDropdown = useMemo(() => {
    return debouncedSearchQuery.trim().length > 0 && filteredResults.length > 0;
  }, [debouncedSearchQuery, filteredResults]);

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
    <Styled.Container>
      <Styled.SearchBar ref={searchBarRef}>
        <Input
          placeholder="Поиск..."
          prefix={<SearchOutlined />}
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
                    item.cheats,
                    item.label
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
                                      // Handle navigation here
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
      </Styled.SearchBar>
      <Styled.ContentWrapper>
        <Styled.LogoTopRight>
          <Image
            src={cheatarenaLogo}
            alt="CHEATARENA"
            width={154}
            height={26}
            priority
          />
        </Styled.LogoTopRight>
        <Styled.TextSection
          as={motion.div}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.Title>
            <Image
              src="/images/cheats.png"
              alt="Приватные читы"
              width={400}
              height={120}
              priority
            />
          </Styled.Title>
          <Styled.Description>
            Сейчас на сайте нет контента который вы ищите. Мы работаем на
            решением проблем. Поздравляем всех с новым годом. Надеемся в скором
            времени решить все юридические вопросы. Оставайтесь с нами!
          </Styled.Description>
          <Styled.ButtonGroup>
            <Styled.PrimaryButton type="primary" size="large">
              Тех поддержка
            </Styled.PrimaryButton>
            <Styled.SecondaryButton size="large">
              Связь с админом
            </Styled.SecondaryButton>
          </Styled.ButtonGroup>
        </Styled.TextSection>
        <Styled.ImageSection
          as={motion.div}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.SkeletonWrapper>
            <SkeletonIcon />
          </Styled.SkeletonWrapper>
        </Styled.ImageSection>
      </Styled.ContentWrapper>
    </Styled.Container>
  );
}
