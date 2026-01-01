"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "@/features/Search";
import * as Styled from "./styled";
import logoImage from "@/shared/assets/CHEATARENA.png";

export const Navbar = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Styled.Header>
      <Search />
      <Styled.LogoWrapper
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogoClick}
      >
        <Image
          src={logoImage}
          alt="CHEATARENA"
          height={32}
          width={200}
          priority
          style={{
            height: "100%",
            width: "200px",
          }}
        />
      </Styled.LogoWrapper>
    </Styled.Header>
  );
};
