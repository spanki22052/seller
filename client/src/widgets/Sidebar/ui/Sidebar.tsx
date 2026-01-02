"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import chitarenaLogo from "@/shared/assets/images/chitarena-full-logo.png";
import { MENU_ITEMS, SIDEBAR_WIDTH_OPEN } from "../lib/constants";
import { MenuItem } from "../model/types";
import { CloseIcon } from "./CloseIcon";
import * as Styled from "./styled";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Логика поиска и фильтрации
  const filteredAndSortedItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return MENU_ITEMS;
    }

    const query = searchQuery.toLowerCase().trim();
    const results: MenuItem[] = [];
    const matchedGameIds = new Set<string>();

    // Поиск по названию игры
    MENU_ITEMS.forEach((item) => {
      const itemLabelLower = item.label.toLowerCase();
      if (itemLabelLower.includes(query)) {
        results.push(item);
        if (item.cheats) {
          matchedGameIds.add(item.id);
        }
      }
    });

    // Поиск по названию читов
    MENU_ITEMS.forEach((item) => {
      if (item.cheats) {
        const hasMatchingCheat = item.cheats.some((cheat) =>
          cheat.name.toLowerCase().includes(query)
        );

        if (hasMatchingCheat && !matchedGameIds.has(item.id)) {
          results.push(item);
          matchedGameIds.add(item.id);
        }
      }
    });

    // Сортировка: сначала категории, потом игры с совпадениями
    return results.sort((a, b) => {
      if (a.isCategory && !b.isCategory) return -1;
      if (!a.isCategory && b.isCategory) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [searchQuery]);

  // Вычисляем какие dropdown должны быть открыты при поиске
  const autoOpenDropdowns = useMemo(() => {
    if (!searchQuery.trim()) {
      return new Set<string>();
    }

    const query = searchQuery.toLowerCase().trim();
    const newOpenDropdowns = new Set<string>();

    filteredAndSortedItems.forEach((item) => {
      if (item.cheats) {
        const hasMatchingCheat = item.cheats.some((cheat) =>
          cheat.name.toLowerCase().includes(query)
        );
        const matchesGameName = item.label.toLowerCase().includes(query);

        if (hasMatchingCheat || matchesGameName) {
          newOpenDropdowns.add(item.id);
        }
      }
    });

    return newOpenDropdowns;
  }, [searchQuery, filteredAndSortedItems]);

  // Синхронизируем открытые dropdown с результатами поиска
  useEffect(() => {
    setOpenDropdowns(autoOpenDropdowns);
  }, [autoOpenDropdowns]);

  const toggleDropdown = (itemId: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Функция для фильтрации и сортировки читов по поисковому запросу
  const getFilteredCheats = (cheats: MenuItem["cheats"]) => {
    if (!cheats || !searchQuery.trim()) {
      return cheats || [];
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = cheats.filter((cheat) =>
      cheat.name.toLowerCase().includes(query)
    );

    // Сортировка: читы, которые начинаются с поискового запроса, идут первыми
    return filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStartsWith = aName.startsWith(query);
      const bStartsWith = bName.startsWith(query);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  const sidebarVariants = {
    closed: {
      x: prefersReducedMotion ? 0 : -SIDEBAR_WIDTH_OPEN,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
    open: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        delay: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -20,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : 0.1 + i * 0.02,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const dropdownVariants = {
    closed: {
      height: 0,
      opacity: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const dropdownItemVariants = {
    closed: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -10,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.15,
      },
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
        delay: prefersReducedMotion ? 0 : i * 0.03,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <>
      {!isOpen && (
        <Styled.HamburgerButton
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
          as={motion.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <Styled.HamburgerLine />
          <Styled.HamburgerLine />
          <Styled.HamburgerLine />
        </Styled.HamburgerButton>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <Styled.Overlay
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
            />
            <Styled.SidebarContainer
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ width: SIDEBAR_WIDTH_OPEN }}
            >
              <CloseIcon onClick={() => setIsOpen(false)} />
              <Styled.SidebarContent>
                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Styled.LogoWrapper>
                    <Image
                      src={chitarenaLogo}
                      alt="CHITARENA"
                      width={100}
                      height={30}
                      priority
                    />
                  </Styled.LogoWrapper>
                </motion.div>

                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Styled.SearchWrapper>
                    <Input
                      placeholder="Поиск..."
                      prefix={<SearchOutlined />}
                      size="large"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Styled.SearchWrapper>
                </motion.div>

                <Styled.MenuList
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {filteredAndSortedItems.length === 0 ? (
                    <Styled.MenuItem
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Styled.MenuItemLink $isCategory>
                        Ничего не найдено
                      </Styled.MenuItemLink>
                    </Styled.MenuItem>
                  ) : (
                    filteredAndSortedItems.map((item, index) => {
                      const isDropdownOpen = openDropdowns.has(item.id);
                      const hasCheats = item.cheats && item.cheats.length > 0;

                      return (
                        <Styled.MenuItem
                          key={item.id}
                          custom={index}
                          variants={menuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          {hasCheats ? (
                            <Styled.MenuItemButton
                              $isCategory={item.isCategory}
                              $isOpen={isDropdownOpen}
                              onClick={() => toggleDropdown(item.id)}
                            >
                              <span>{item.label}</span>
                              <Styled.DropdownIcon $isOpen={isDropdownOpen} />
                            </Styled.MenuItemButton>
                          ) : (
                            <Styled.MenuItemLink
                              href={item.href || "#"}
                              $isCategory={item.isCategory}
                              onClick={(e) => {
                                e.preventDefault();
                                // Handle navigation here
                              }}
                            >
                              {item.label}
                            </Styled.MenuItemLink>
                          )}

                          {hasCheats && (
                            <AnimatePresence>
                              {isDropdownOpen &&
                                (() => {
                                  const filteredCheats = getFilteredCheats(
                                    item.cheats
                                  );
                                  return filteredCheats.length > 0 ? (
                                    <Styled.DropdownList
                                      variants={dropdownVariants}
                                      initial="closed"
                                      animate="open"
                                      exit="closed"
                                    >
                                      {filteredCheats.map(
                                        (cheat, cheatIndex) => (
                                          <Styled.DropdownItem
                                            key={cheat.id}
                                            custom={cheatIndex}
                                            variants={dropdownItemVariants}
                                            initial="closed"
                                            animate="open"
                                          >
                                            <a
                                              href={cheat.href || "#"}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                // Handle navigation here
                                              }}
                                            >
                                              {cheat.name}
                                            </a>
                                          </Styled.DropdownItem>
                                        )
                                      )}
                                    </Styled.DropdownList>
                                  ) : null;
                                })()}
                            </AnimatePresence>
                          )}
                        </Styled.MenuItem>
                      );
                    })
                  )}
                </Styled.MenuList>
              </Styled.SidebarContent>
            </Styled.SidebarContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
