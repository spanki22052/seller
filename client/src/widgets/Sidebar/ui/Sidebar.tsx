"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useImageModalState } from "@/shared/contexts/ImageModalContext";
import {
  searchGames,
  gameKeys,
  type GameWithCheats,
  type Cheat,
} from "@/entities/game";
import chitarenaLogo from "@/shared/assets/images/chitarena-full-logo.png";
import { SIDEBAR_WIDTH_OPEN } from "../lib/constants";
import { MenuItem } from "../model/types";
import { CloseIcon } from "./CloseIcon";
import { useSidebarData } from "../hooks/useSidebarData";
import * as Styled from "./styled";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const { isImageModalOpen } = useImageModalState();
  const { menuItems: allMenuItems, isLoading: isLoadingAll } = useSidebarData();

  // Backend search query
  const { data: searchResults = [], isLoading: isLoadingSearch } = useQuery({
    queryKey: gameKeys.search(debouncedSearchQuery),
    queryFn: () => searchGames(debouncedSearchQuery),
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  // Transform backend search results to MenuItem format
  const searchMenuItems = useMemo(() => {
    if (!debouncedSearchQuery.trim() || searchResults.length === 0) {
      return [];
    }

    const baseItems: MenuItem[] = [
      { id: "home", label: "Главная", isCategory: true, href: "/" },
    ];

    const gameItems: MenuItem[] = searchResults.map((game: GameWithCheats) => ({
      id: game.id,
      label: game.name.toUpperCase(),
      href: `/game/${game.id}`,
      cheats: [
        {
          id: `${game.id}-main`,
          name: "Смотреть главную страницу",
          href: `/game/${game.id}`,
        },
        ...game.cheats.map((cheat: Cheat) => ({
          id: cheat.id,
          name: cheat.brandName,
          href: `/game/${game.id}/cheat/${cheat.id}`,
        })),
      ],
    }));

    return [...baseItems, ...gameItems];
  }, [searchResults, debouncedSearchQuery]);

  // Use search results if searching, otherwise use all items
  const menuItems =
    debouncedSearchQuery.trim().length > 0 ? searchMenuItems : allMenuItems;
  const isLoading =
    debouncedSearchQuery.trim().length > 0 ? isLoadingSearch : isLoadingAll;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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

  // Логика поиска и фильтрации - используем backend search результаты
  const filteredAndSortedItems = useMemo(() => {
    // Если нет поискового запроса, показываем все элементы
    if (!debouncedSearchQuery.trim()) {
      return menuItems;
    }

    // Backend уже отфильтровал результаты, просто используем их
    return menuItems;
  }, [debouncedSearchQuery, menuItems]);

  // Вычисляем какие dropdown должны быть открыты при поиске
  const autoOpenDropdowns = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return new Set<string>();
    }

    const newOpenDropdowns = new Set<string>();

    // При поиске открываем все игры с читами (backend уже отфильтровал)
    filteredAndSortedItems.forEach((item) => {
      if (item.cheats && item.cheats.length > 0) {
        newOpenDropdowns.add(item.id);
      }
    });

    return newOpenDropdowns;
  }, [debouncedSearchQuery, filteredAndSortedItems]);

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

  // Функция для получения читов (backend уже отфильтровал их)
  const getFilteredCheats = (cheats: MenuItem["cheats"]) => {
    if (!cheats) {
      return [];
    }

    // Backend уже отфильтровал читы, просто возвращаем их
    return cheats;
  };

  // Функция для получения ссылок главной страницы
  const getFilteredHomeLinks = (homeLinks: MenuItem["homeLinks"]) => {
    if (!homeLinks) {
      return [];
    }

    return homeLinks;
  };

  // Функция для навигации к странице чита
  const handleCheatClick = (
    gameId: string,
    cheatId: string,
    cheatName: string,
    e?: React.MouseEvent
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    onClose();

    // Если это "Смотреть главную страницу", переходим на страницу игры
    const isMainPage =
      cheatId.endsWith("-main") || cheatName === "Смотреть главную страницу";

    if (isMainPage) {
      router.push(`/game/${gameId}`);
    } else {
      router.push(`/game/${gameId}/cheat/${cheatId}`);
    }
  };

  // Функция для навигации по категориям
  const handleCategoryClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
    router.push(href);
  };

  // Функция для навигации на главную страницу
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
    router.push("/");
  };

  // Обработчик клика по элементу меню с читами (только переключает dropdown)
  const handleMenuItemWithCheatsClick = (
    item: MenuItem,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // Только переключаем dropdown, не навигируем
    toggleDropdown(item.id);
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
      <AnimatePresence>
        {isOpen && (
          <>
            <Styled.Overlay
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={onClose}
            />
            <Styled.SidebarContainer
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ width: SIDEBAR_WIDTH_OPEN }}
            >
              <CloseIcon onClick={onClose} />
              <Styled.SidebarContent>
                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Styled.LogoWrapper
                    onClick={handleLogoClick}
                    as={motion.div}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
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
                      suffix={
                        isLoading && debouncedSearchQuery.trim().length > 0 ? (
                          <Spin size="small" />
                        ) : null
                      }
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
                  {isLoading ? (
                    <Styled.MenuItem
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Styled.MenuItemLink $isCategory>
                        <Spin size="small" /> Загрузка...
                      </Styled.MenuItemLink>
                    </Styled.MenuItem>
                  ) : filteredAndSortedItems.length === 0 ? (
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
                      const hasHomeLinks =
                        item.homeLinks && item.homeLinks.length > 0;

                      return (
                        <Styled.MenuItem
                          key={item.id}
                          custom={index}
                          variants={menuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          {hasCheats || item.homeLinks ? (
                            <Styled.MenuItemButton
                              $isCategory={item.isCategory}
                              $isOpen={isDropdownOpen}
                              onClick={(e) =>
                                handleMenuItemWithCheatsClick(item, e)
                              }
                            >
                              <span>{item.label}</span>
                              <Styled.DropdownIcon $isOpen={isDropdownOpen} />
                            </Styled.MenuItemButton>
                          ) : (
                            <Styled.MenuItemLink
                              href={item.href || "#"}
                              $isCategory={item.isCategory}
                              $isClickable={!!item.href}
                              onClick={(e) => {
                                if (item.href) {
                                  handleCategoryClick(item.href, e);
                                } else {
                                  e.preventDefault();
                                  // Игры без читов не кликабельны
                                }
                              }}
                            >
                              {item.label}
                            </Styled.MenuItemLink>
                          )}

                          {(hasCheats || hasHomeLinks) && (
                            <AnimatePresence>
                              {isDropdownOpen &&
                                (() => {
                                  if (hasHomeLinks) {
                                    const filteredHomeLinks =
                                      getFilteredHomeLinks(item.homeLinks);
                                    return filteredHomeLinks.length > 0 ? (
                                      <Styled.DropdownList
                                        variants={dropdownVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                      >
                                        {filteredHomeLinks.map(
                                          (homeLink, linkIndex) => (
                                            <Styled.DropdownItem
                                              key={homeLink.id}
                                              custom={linkIndex}
                                              variants={dropdownItemVariants}
                                              initial="closed"
                                              animate="open"
                                            >
                                              <a
                                                href={homeLink.url}
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  onClose();
                                                  window.open(
                                                    homeLink.url,
                                                    "_blank"
                                                  );
                                                }}
                                              >
                                                {homeLink.title}
                                              </a>
                                            </Styled.DropdownItem>
                                          )
                                        )}
                                      </Styled.DropdownList>
                                    ) : null;
                                  } else if (hasCheats) {
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
                                                href={
                                                  cheat.href ||
                                                  (cheat.id.endsWith("-main") ||
                                                  cheat.name ===
                                                    "Смотреть главную страницу"
                                                    ? `/game/${item.id}`
                                                    : `/game/${item.id}/cheat/${cheat.id}`)
                                                }
                                                onClick={(e) => {
                                                  handleCheatClick(
                                                    item.id,
                                                    cheat.id,
                                                    cheat.name,
                                                    e
                                                  );
                                                }}
                                              >
                                                {cheat.name}
                                              </a>
                                            </Styled.DropdownItem>
                                          )
                                        )}
                                      </Styled.DropdownList>
                                    ) : null;
                                  }
                                  return null;
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
