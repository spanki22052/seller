"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { navbarAnimations } from "../lib/animConstants";
import { SearchBar } from "./SearchBar";
import { getSettings, settingsKeys } from "@/entities/settings";
import * as Styled from "./styled";
import { NavLinkGames } from "./styled";

interface NavLink {
  id: string;
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
  logo?: React.ReactNode;
}

const defaultLinks: NavLink[] = [
  { id: "home", label: "Главная", href: "/" },
  { id: "games", label: "Важно", href: "/faq" },
  { id: "cheats", label: "Поддержка", href: "/support" },
  { id: "about", label: "Игры", href: "/games" },
];

export function Navbar({ links = defaultLinks, logo }: NavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  const { data: settings } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  const containerVariants = navbarAnimations.container(prefersReducedMotion);
  const linkVariants = navbarAnimations.link(prefersReducedMotion);

  // Create dynamic links based on settings
  const dynamicLinks = React.useMemo(() => {
    return defaultLinks.map((link) => {
      if (link.id === "cheats") {
        return {
          ...link,
          href: settings?.supportLink || "/support",
        };
      }
      return link;
    });
  }, [settings?.supportLink]);

  const finalLinks = links.map((link) => {
    if (link.id === "cheats") {
      return dynamicLinks.find((dl) => dl.id === "cheats") || link;
    }
    return link;
  });

  return (
    <Styled.Container
      as={motion.nav}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Styled.NavContent>
        {logo && <Styled.LogoWrapper>{logo}</Styled.LogoWrapper>}

        <Styled.DesktopNav>
          {finalLinks.map((link, index) => (
            <motion.div
              key={link.id}
              variants={linkVariants}
              custom={index}
              whileHover={prefersReducedMotion ? {} : navbarAnimations.hover}
              whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
            >
              {link.id === "cheats" ? (
                <Styled.NavLinkExternal
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </Styled.NavLinkExternal>
              ) : link.id === "about" ? (
                <Styled.NavLinkGames href={link.href}>
                  {link.label}
                </Styled.NavLinkGames>
              ) : (
                <Styled.NavLink href={link.href}>{link.label}</Styled.NavLink>
              )}
            </motion.div>
          ))}
        </Styled.DesktopNav>

        <SearchBar />

        <Styled.SidebarBurgerButton
          onClick={toggleSidebar}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : navbarAnimations.hover}
          whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          <Styled.SidebarHamburgerLine />
          <Styled.SidebarHamburgerLine />
          <Styled.SidebarHamburgerLine />
        </Styled.SidebarBurgerButton>

        <Styled.MobileMenuButton
          onClick={toggleSidebar}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : navbarAnimations.hover}
          whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          <Styled.HamburgerIcon $isOpen={isSidebarOpen}>
            <span />
            <span />
            <span />
          </Styled.HamburgerIcon>
        </Styled.MobileMenuButton>
      </Styled.NavContent>
    </Styled.Container>
  );
}
