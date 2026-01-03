"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import * as Styled from "./styled";

const GradientSmoke = dynamic(() => import("@/shared/ui/GradientSmoke").then((mod) => ({ default: mod.GradientSmoke })), {
  ssr: false,
});

interface GameHeroProps {
  gameId: string;
}

export function GameHero({ gameId }: GameHeroProps) {
  // gameId will be used for future game-specific data fetching
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;

      // Throttle updates using requestAnimationFrame
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const rect = containerRef.current!.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          
          // Only update if change is significant (reduces unnecessary updates)
          if (Math.abs(x - lastX) > 0.01 || Math.abs(y - lastY) > 0.01) {
            mouseX.set(x - 0.5);
            mouseY.set(y - 0.5);
            lastX = x;
            lastY = y;
          }
          
          rafId = null;
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [mouseX, mouseY, prefersReducedMotion]);

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

  return (
    <Styled.Container ref={containerRef}>
      <Styled.LeftSection
        as={motion.div}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.BrandName>
          <Image src={cheatarenaLogo} alt="CHEATARENA" width={180} priority />
        </Styled.BrandName>
        <Styled.Title>CHEAT FOR APEX LEGENDS</Styled.Title>
        <Styled.Description>
          Врывайтесь в игру заряженным по полной. Перед покупкой внимательно
          читайте требования к читу, следите за нашим сайтов чтоб быть одним из
          первых играя с новыми приватными читами!
        </Styled.Description>
        <Styled.ButtonGroup>
          <Styled.SocialButton>DS</Styled.SocialButton>
          <Styled.SocialButton>TG</Styled.SocialButton>
          <Styled.SocialButton>VK</Styled.SocialButton>
        </Styled.ButtonGroup>
        <Styled.AdditionalText>
          Подписывайтесь на <Styled.TelegramLink>Telegram</Styled.TelegramLink>{" "}
          это важно потому что все статусы и новости о читах именно там
        </Styled.AdditionalText>
      </Styled.LeftSection>
      <Styled.RightSection
        as={motion.div}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.CharacterWrapper>
          <Image
            src="/images/apex-character.png"
            alt="Apex Legends Character"
            width={600}
            height={800}
            priority
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 600,
              objectFit: "contain",
              filter: "drop-shadow(0 0 40px rgba(139, 92, 246, 0.5))",
            }}
          />
        </Styled.CharacterWrapper>
        <GradientSmoke
          mouseX={springX}
          mouseY={springY}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Styled.RightSection>
    </Styled.Container>
  );
}
