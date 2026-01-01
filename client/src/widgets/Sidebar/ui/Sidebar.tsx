"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import * as Styled from "./styled";
import { games, languages, type MenuItem } from "../mocks/mock";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [gamesSearch, setGamesSearch] = useState("");
  const [openCheatsForGame, setOpenCheatsForGame] = useState<string | null>(
    null
  );
  const languageRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLLIElement>(null);
  const { t, i18n: i18nInstance } = useTranslation();
  const router = useRouter();

  const currentLanguage = i18nInstance.language || "ru";

  const handleCheatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsGamesOpen(false);
    setOpenCheatsForGame(null);
    router.push("/product");
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
    };

    if (isLanguageOpen || isGamesOpen || openCheatsForGame) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageOpen, isGamesOpen, openCheatsForGame]);

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

        <Styled.PlayButton>
          <Styled.PlayIcon>play_arrow</Styled.PlayIcon>
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
                <Styled.MenuTitle>{t("sidebar.menu")}</Styled.MenuTitle>
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
                                                          onClick={
                                                            handleCheatClick
                                                          }
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
    </>
  );
};
