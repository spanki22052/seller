"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { navbarAnimations } from "../lib/animConstants";
import * as Styled from "./styled";

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
  { id: "games", label: "Важно", href: "/needToKnow" },
  { id: "cheats", label: "Поддержка", href: "/support" },
  { id: "about", label: "Аккаунты", href: "/accounts" },
];

export function Navbar({ links = defaultLinks, logo }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const containerVariants = navbarAnimations.container(prefersReducedMotion);
  const linkVariants = navbarAnimations.link(prefersReducedMotion);
  const mobileMenuVariants = navbarAnimations.mobileMenu(prefersReducedMotion);

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
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              variants={linkVariants}
              custom={index}
              whileHover={prefersReducedMotion ? {} : navbarAnimations.hover}
              whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
            >
              <Styled.NavLink href={link.href}>{link.label}</Styled.NavLink>
            </motion.div>
          ))}
        </Styled.DesktopNav>

        <Styled.MobileMenuButton
          onClick={toggleMobileMenu}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : navbarAnimations.hover}
          whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Styled.HamburgerIcon $isOpen={isMobileMenuOpen}>
            <span />
            <span />
            <span />
          </Styled.HamburgerIcon>
        </Styled.MobileMenuButton>
      </Styled.NavContent>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <Styled.MobileMenu
            as={motion.div}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Styled.MobileNav>
              {links.map((link, index) => (
                <motion.div
                  key={link.id}
                  variants={linkVariants}
                  custom={index}
                  whileHover={
                    prefersReducedMotion ? {} : navbarAnimations.hover
                  }
                  whileTap={prefersReducedMotion ? {} : navbarAnimations.tap}
                >
                  <Styled.MobileNavLink
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Styled.MobileNavLink>
                </motion.div>
              ))}
            </Styled.MobileNav>
          </Styled.MobileMenu>
        )}
      </AnimatePresence>
    </Styled.Container>
  );
}
