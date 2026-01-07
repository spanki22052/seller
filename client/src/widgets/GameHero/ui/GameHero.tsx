"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { GameWithCheats } from "@/entities/game";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import * as Styled from "./styled";

const GradientSmoke = dynamic(
  () =>
    import("@/shared/ui/GradientSmoke").then((mod) => ({
      default: mod.GradientSmoke,
    })),
  {
    ssr: false,
  }
);

interface GameHeroProps {
  gameData: GameWithCheats;
}

export function GameHero({ gameData }: GameHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device to disable mouse tracking
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error - for older browsers
          navigator.msMaxTouchPoints > 0
      );
    };
    checkTouchDevice();
  }, []);

  useEffect(() => {
    // Disable mouse tracking on touch devices and when reduced motion is preferred
    if (isTouchDevice || prefersReducedMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

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
      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [mouseX, mouseY, prefersReducedMotion, isTouchDevice]);

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
          <Image
            src={cheatarenaLogo}
            alt="CHEATARENA"
            width={180}
            priority
            sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 180px"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 180,
            }}
          />
        </Styled.BrandName>
        <Styled.Title>CHEAT FOR {gameData.name.toUpperCase()}</Styled.Title>
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
          {gameData.backgroundImage ? (
            <Styled.ImageWrapper>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gameData.backgroundImage}
                alt={`${gameData.name} Background`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Styled.ImageWrapper>
          ) : null}
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
