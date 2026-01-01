"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import * as Styled from "./styled";
import { games, languages, type MenuItem, type Game } from "../mocks/mock";
import { cheatCards } from "@/widgets/CheatCards/mocks/mock";
import logoImage from "@/shared/assets/logo.png";

interface CheatResult {
  name: string;
  description?: string;
}

interface GameSearchResult {
  game: Game;
  cheats: CheatResult[];
}

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [gamesSearch, setGamesSearch] = useState("");
  const [openCheatsForGame, setOpenCheatsForGame] = useState<string | null>(
    null
  );
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const languageRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLLIElement>(null);
  const globalSearchRef = useRef<HTMLDivElement>(null);
  const debouncedGlobalSearch = useDebounce(globalSearchQuery, 300);
  const { t, i18n: i18nInstance } = useTranslation();
  const router = useRouter();

  const currentLanguage = i18nInstance.language || "ru";

  const handleCheatClick =
    (gameName: string, cheatName: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(false);
      setIsGamesOpen(false);
      setOpenCheatsForGame(null);

      // Find matching cheat card by game name and cheat name
      // For now, use a simple mapping - you can improve this with a proper mapping object
      const cheatCard = cheatCards.find((card) => {
        // Try to match by checking if cheat name appears in card name or description
        const cardName = card.nameKey.toLowerCase();
        const cardDesc = card.descriptionKey.toLowerCase();
        const searchName = cheatName.toLowerCase();
        return cardName.includes(searchName) || cardDesc.includes(searchName);
      });

      // Use first cheat card as fallback if no match found
      const cheatId = cheatCard?.id || cheatCards[0]?.id || "1";
      router.push(`/product?id=${cheatId}`);
    };

  const handleLanguageChange = (langCode: string) => {
    i18nInstance.changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(gamesSearch.toLowerCase())
  );

  const handleGameClick = (gameName: string) => {
    setOpenCheatsForGame(openCheatsForGame === gameName ? null : gameName);
  };

  const handleGamesSearchChange = (value: string) => {
    setGamesSearch(value);
    if (value) {
      setOpenCheatsForGame(null);
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find the scrollable main content element (the main tag with overflow-y: auto)
    const mainContent = document.querySelector("main");
    
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Fallback to window scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleGlobalSearchChange = (value: string) => {
    setGlobalSearchQuery(value);
  };

  const handleGlobalSearchResultClick =
    (gameName?: string, cheatName?: string) => () => {
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
      }

      router.push(`/product?id=${cheatId}`);
      setGlobalSearchQuery("");
    };

  // Global search logic - use useMemo for results calculation
  const globalSearchResultsMemo = useMemo(() => {
    if (!debouncedGlobalSearch.trim()) {
      return [];
    }

    const searchLower = debouncedGlobalSearch.toLowerCase().trim();
    const foundGames: GameSearchResult[] = [];

    games.forEach((game) => {
      const gameNameLower = game.name.toLowerCase();
      const matchingCheats: CheatResult[] = [];

      // Check if game name matches
      const gameMatches = gameNameLower.includes(searchLower);

      // Check cheats within this game
      game.cheats.forEach((cheat) => {
        const cheatNameLower = cheat.name.toLowerCase();
        const cheatDescLower = cheat.description?.toLowerCase() || "";
        if (
          cheatNameLower.includes(searchLower) ||
          cheatDescLower.includes(searchLower)
        ) {
          matchingCheats.push({
            name: cheat.name,
            description: cheat.description,
          });
        }
      });

      // If game name matches or has matching cheats, add it to results
      if (gameMatches || matchingCheats.length > 0) {
        const cheatsToShow = gameMatches
          ? game.cheats.map((c) => ({
              name: c.name,
              description: c.description,
            }))
          : matchingCheats;

        foundGames.push({
          game,
          cheats: cheatsToShow,
        });
      }
    });

    return foundGames;
  }, [debouncedGlobalSearch]);

  // Derive open state from results
  const isGlobalSearchOpen =
    globalSearchResultsMemo.length > 0 && debouncedGlobalSearch.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
      if (
        gamesRef.current &&
        !gamesRef.current.contains(event.target as Node)
      ) {
        setIsGamesOpen(false);
        setOpenCheatsForGame(null);
      }
      // Global search panel closes when clicking outside
      if (
        globalSearchRef.current &&
        !globalSearchRef.current.contains(event.target as Node) &&
        isGlobalSearchOpen
      ) {
        setGlobalSearchQuery("");
      }
    };

    if (
      isLanguageOpen ||
      isGamesOpen ||
      openCheatsForGame ||
      isGlobalSearchOpen
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageOpen, isGamesOpen, openCheatsForGame, isGlobalSearchOpen]);

  const menuItems: MenuItem[] = [
    { icon: "home", text: t("sidebar.home"), href: "/", hasDropdown: false },
    {
      icon: "extension",
      text: t("sidebar.cheatsLibrary"),
      href: "/explore",
      hasDropdown: false,
    },
    { icon: "games", text: t("sidebar.games"), href: "#", hasDropdown: true },
  ];

  return (
    <>
      <Styled.SidebarContainer>
        <Styled.MenuButton onClick={() => setIsOpen(!isOpen)}>
          <motion.span
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Styled.MenuIcon viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </Styled.MenuIcon>
          </motion.span>
        </Styled.MenuButton>

        <Styled.LanguageSelectorWrapper>
          <Styled.LanguageSelectorContainer ref={languageRef}>
            <Styled.LanguageButton
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.toUpperCase()}
            </Styled.LanguageButton>

            <AnimatePresence>
              {isLanguageOpen && (
                <Styled.LanguageDropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {languages.map((lang) => (
                    <Styled.LanguageOption
                      key={lang.code}
                      $active={currentLanguage === lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {lang.label}
                    </Styled.LanguageOption>
                  ))}
                </Styled.LanguageDropdown>
              )}
            </AnimatePresence>
          </Styled.LanguageSelectorContainer>
        </Styled.LanguageSelectorWrapper>

        <Styled.PlayButton
          as={motion.button}
          onClick={handleScrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Styled.PlayIcon>arrow_upward</Styled.PlayIcon>
        </Styled.PlayButton>
        <Styled.AccentBar />
      </Styled.SidebarContainer>

      <AnimatePresence>
        {isOpen && (
          <Styled.MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <Styled.MenuPanel
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Styled.MenuContent>
                <Styled.MenuLogoWrapper
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={logoImage}
                    alt="CHEATARENA"
                    height={40}
                    width={180}
                    priority
                    style={{
                      height: "auto",
                      width: "100%",
                      maxWidth: "180px",
                    }}
                  />
                </Styled.MenuLogoWrapper>
                <Styled.GlobalSearchWrapper
                  ref={globalSearchRef}
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Styled.GlobalSearchIcon>search</Styled.GlobalSearchIcon>
                  <Styled.GlobalSearchInput
                    type="text"
                    placeholder={t("search")}
                    value={globalSearchQuery}
                    onChange={(e) => handleGlobalSearchChange(e.target.value)}
                    onFocus={() => {
                      // Focus handled by derived state
                    }}
                  />
                </Styled.GlobalSearchWrapper>
                <Styled.MenuList>
                  {menuItems.map((item, index) => {
                    const isGamesItem =
                      item.hasDropdown && item.icon === "games";
                    return (
                      <Styled.MenuItemWithDropdown
                        key={index}
                        ref={isGamesItem ? gamesRef : undefined}
                      >
                        {item.hasDropdown ? (
                          <>
                            <Styled.MenuItemButton
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                              }}
                              onClick={() => {
                                setIsGamesOpen(!isGamesOpen);
                                handleGamesSearchChange("");
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <Styled.MenuIconWrapper>
                                  {item.icon}
                                </Styled.MenuIconWrapper>
                                <Styled.MenuText>{item.text}</Styled.MenuText>
                              </div>
                              <Styled.DropdownArrow
                                animate={{ rotate: isGamesOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                expand_more
                              </Styled.DropdownArrow>
                            </Styled.MenuItemButton>

                            <AnimatePresence>
                              {isGamesOpen && (
                                <Styled.GamesDropdown
                                  initial={{ opacity: 0, scaleY: 0 }}
                                  animate={{ opacity: 1, scaleY: 1 }}
                                  exit={{ opacity: 0, scaleY: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  style={{ transformOrigin: "top" }}
                                >
                                  <Styled.GamesSearchWrapper>
                                    <Styled.GamesSearchInput
                                      type="text"
                                      placeholder={t("search")}
                                      value={gamesSearch}
                                      onChange={(e) =>
                                        handleGamesSearchChange(e.target.value)
                                      }
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </Styled.GamesSearchWrapper>
                                  <Styled.GamesList>
                                    {filteredGames.length > 0 ? (
                                      filteredGames.map((game, gameIndex) => {
                                        const isCheatsOpen =
                                          openCheatsForGame === game.name;
                                        return (
                                          <div key={game.name}>
                                            <Styled.GameItem
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{
                                                delay: gameIndex * 0.03,
                                                duration: 0.2,
                                              }}
                                              whileHover={{ scale: 1.02 }}
                                              whileTap={{ scale: 0.98 }}
                                              onClick={() =>
                                                handleGameClick(game.name)
                                              }
                                            >
                                              <Styled.GameItemContent>
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                  }}
                                                >
                                                  <Styled.GameItemIcon>
                                                    {game.icon}
                                                  </Styled.GameItemIcon>
                                                  <Styled.GameItemText>
                                                    {game.name}
                                                  </Styled.GameItemText>
                                                </div>
                                                <Styled.GameItemArrow
                                                  animate={{
                                                    rotate: isCheatsOpen
                                                      ? 90
                                                      : 0,
                                                  }}
                                                  transition={{ duration: 0.3 }}
                                                >
                                                  chevron_right
                                                </Styled.GameItemArrow>
                                              </Styled.GameItemContent>
                                            </Styled.GameItem>

                                            <AnimatePresence>
                                              {isCheatsOpen && (
                                                <Styled.CheatsDropdown
                                                  initial={{
                                                    opacity: 0,
                                                    scaleY: 0,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    scaleY: 1,
                                                  }}
                                                  exit={{
                                                    opacity: 0,
                                                    scaleY: 0,
                                                  }}
                                                  transition={{
                                                    duration: 0.2,
                                                    ease: [0.22, 1, 0.36, 1],
                                                  }}
                                                  style={{
                                                    transformOrigin: "top",
                                                  }}
                                                >
                                                  <Styled.CheatsList>
                                                    {game.cheats.map(
                                                      (cheat, cheatIndex) => (
                                                        <Styled.CheatItem
                                                          key={cheat.name}
                                                          initial={{
                                                            opacity: 0,
                                                            x: -5,
                                                          }}
                                                          animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                          }}
                                                          transition={{
                                                            delay:
                                                              cheatIndex * 0.02,
                                                            duration: 0.15,
                                                          }}
                                                          whileHover={{
                                                            scale: 1.01,
                                                            x: 4,
                                                          }}
                                                          whileTap={{
                                                            scale: 0.99,
                                                          }}
                                                          onClick={handleCheatClick(
                                                            game.name,
                                                            cheat.name
                                                          )}
                                                        >
                                                          <Styled.CheatName>
                                                            {cheat.name}
                                                          </Styled.CheatName>
                                                          {cheat.description && (
                                                            <Styled.CheatDescription>
                                                              {
                                                                cheat.description
                                                              }
                                                            </Styled.CheatDescription>
                                                          )}
                                                        </Styled.CheatItem>
                                                      )
                                                    )}
                                                  </Styled.CheatsList>
                                                </Styled.CheatsDropdown>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div
                                        style={{
                                          padding: "16px",
                                          textAlign: "center",
                                          color: "var(--text-secondary)",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {t("noGamesFound") || "No games found"}
                                      </div>
                                    )}
                                  </Styled.GamesList>
                                </Styled.GamesDropdown>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            style={{ textDecoration: "none" }}
                            onClick={() => setIsOpen(false)}
                          >
                            <Styled.AnimatedMenuLink
                              as={motion.div}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                              }}
                            >
                              <Styled.MenuIconWrapper>
                                {item.icon}
                              </Styled.MenuIconWrapper>
                              <Styled.MenuText>{item.text}</Styled.MenuText>
                            </Styled.AnimatedMenuLink>
                          </Link>
                        )}
                      </Styled.MenuItemWithDropdown>
                    );
                  })}
                </Styled.MenuList>
              </Styled.MenuContent>
            </Styled.MenuPanel>
          </Styled.MenuOverlay>
        )}
      </AnimatePresence>

      {/* Global Search Results Panel */}
      <AnimatePresence>
        {isGlobalSearchOpen && globalSearchResultsMemo.length > 0 && (
          <Styled.GlobalSearchPanel
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Styled.GlobalSearchHeader>
              <Styled.GlobalSearchTitle>
                {t("sidebar.searchResults")}
              </Styled.GlobalSearchTitle>
              <Styled.CloseButton
                onClick={() => {
                  setGlobalSearchQuery("");
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                close
              </Styled.CloseButton>
            </Styled.GlobalSearchHeader>
            <Styled.GlobalSearchContent>
              {globalSearchResultsMemo.map((result, gameIndex) => (
                <Styled.GlobalSearchGameGroup
                  key={result.game.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: gameIndex * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Styled.GlobalSearchGameHeader
                    onClick={handleGlobalSearchResultClick(result.game.name)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Styled.GlobalSearchGameIcon>
                      {result.game.icon}
                    </Styled.GlobalSearchGameIcon>
                    <Styled.GlobalSearchGameName>
                      {result.game.name}
                    </Styled.GlobalSearchGameName>
                  </Styled.GlobalSearchGameHeader>
                  <Styled.GlobalSearchCheatsList>
                    {result.cheats.map((cheat, cheatIndex) => (
                      <Styled.GlobalSearchCheatItem
                        key={`${result.game.name}-${cheat.name}-${cheatIndex}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: gameIndex * 0.05 + cheatIndex * 0.03,
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGlobalSearchResultClick(
                          result.game.name,
                          cheat.name
                        )}
                      >
                        <Styled.GlobalSearchCheatIcon>
                          extension
                        </Styled.GlobalSearchCheatIcon>
                        <Styled.GlobalSearchCheatContent>
                          <Styled.GlobalSearchCheatName>
                            {cheat.name}
                          </Styled.GlobalSearchCheatName>
                          {cheat.description && (
                            <Styled.GlobalSearchCheatDescription>
                              {cheat.description}
                            </Styled.GlobalSearchCheatDescription>
                          )}
                        </Styled.GlobalSearchCheatContent>
                      </Styled.GlobalSearchCheatItem>
                    ))}
                  </Styled.GlobalSearchCheatsList>
                </Styled.GlobalSearchGameGroup>
              ))}
            </Styled.GlobalSearchContent>
          </Styled.GlobalSearchPanel>
        )}
      </AnimatePresence>
    </>
  );
};
