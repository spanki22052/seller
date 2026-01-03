"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { pricingPlans } from "../lib/constants";
import {
  buttonAnimations,
  telegramButtonAnimations,
} from "../lib/animConstants";
import * as Styled from "./styled";

interface CheatPricingProps {
  cheatId: string;
}

export function CheatPricing({ cheatId }: CheatPricingProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container>
      <Styled.Title>Безопасная покупка</Styled.Title>
      <Styled.CarouselWrapper
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.NavButton
          onClick={() => handleScroll("left")}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        >
          <Styled.LeftArrowIcon>‹</Styled.LeftArrowIcon>
        </Styled.NavButton>

        <Styled.CardsContainer ref={scrollContainerRef}>
          {pricingPlans.map((plan) => (
            <Styled.Card
              key={plan.id}
              as={motion.div}
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
            >
              <Styled.ImageWrapper>
                <Image
                  src={plan.image}
                  alt={plan.duration}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </Styled.ImageWrapper>
              <Styled.CardContent>
                <Styled.PriceText>
                  {plan.isAvailable
                    ? `${plan.price} ${plan.currency} - НА ${plan.duration}`
                    : plan.duration}
                </Styled.PriceText>
                {plan.isAvailable ? (
                  <>
                    <Styled.Description>
                      Рекомендуем подписаться на Telegram все статусы и новости
                      публикуются именно там! Тех помощь в Discord
                    </Styled.Description>
                    <Styled.ButtonGroup>
                      <Styled.BuyButton
                        as={motion.button}
                        whileHover={
                          prefersReducedMotion
                            ? buttonAnimations.reducedMotion.hover
                            : buttonAnimations.hover
                        }
                        whileTap={
                          prefersReducedMotion
                            ? buttonAnimations.reducedMotion.tap
                            : buttonAnimations.tap
                        }
                      >
                        Купить
                      </Styled.BuyButton>
                      <Styled.TelegramButton
                        as={motion.button}
                        whileHover={
                          prefersReducedMotion
                            ? telegramButtonAnimations.reducedMotion.hover
                            : telegramButtonAnimations.hover
                        }
                        whileTap={
                          prefersReducedMotion
                            ? telegramButtonAnimations.reducedMotion.tap
                            : telegramButtonAnimations.tap
                        }
                      >
                        Telegram
                      </Styled.TelegramButton>
                    </Styled.ButtonGroup>
                  </>
                ) : (
                  <>
                    <Styled.Description>
                      В данном блоке будет другой срок покупки но только тогда
                      когда появится в продажи! Сейчас товар отсутствует.
                    </Styled.Description>
                    <Styled.ButtonGroup>
                      <Styled.TelegramButton
                        as={motion.button}
                        whileHover={
                          prefersReducedMotion
                            ? telegramButtonAnimations.reducedMotion.hover
                            : telegramButtonAnimations.hover
                        }
                        whileTap={
                          prefersReducedMotion
                            ? telegramButtonAnimations.reducedMotion.tap
                            : telegramButtonAnimations.tap
                        }
                      >
                        Telegram
                      </Styled.TelegramButton>
                    </Styled.ButtonGroup>
                  </>
                )}
              </Styled.CardContent>
            </Styled.Card>
          ))}
        </Styled.CardsContainer>

        <Styled.NavButton
          onClick={() => handleScroll("right")}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        >
          <Styled.ArrowIcon>›</Styled.ArrowIcon>
        </Styled.NavButton>
      </Styled.CarouselWrapper>
    </Styled.Container>
  );
}
