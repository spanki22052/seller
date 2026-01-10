"use client";

import React from "react";
import { motion } from "framer-motion";
import { Select } from "antd";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useCheatPurchaseSelector } from "../hooks/useCheatPurchaseSelector";
import { CheatPurchaseSelectorProps } from "../model/types";
import {
  SELECTOR_ANIMATION,
  SELECTOR_ANIMATION_REDUCED,
  getDaysText,
} from "../model/constants";
import * as Styled from "./styled";

export function CheatPurchaseSelector({ cheatId }: CheatPurchaseSelectorProps) {
  const prefersReducedMotion = useReducedMotion();
  const {
    cheat,
    isLoading,
    selectedPlan,
    setSelectedPlan,
    handlePurchase,
    availablePlans,
    hasAvailablePlans,
  } = useCheatPurchaseSelector(cheatId);

  if (isLoading || !cheat) {
    return (
      <Styled.Container>
        <Styled.LoadingCard />
      </Styled.Container>
    );
  }

  if (!hasAvailablePlans) {
    return null;
  }

  const containerVariants = prefersReducedMotion
    ? SELECTOR_ANIMATION_REDUCED
    : SELECTOR_ANIMATION;

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <Styled.Card>
        <Styled.Header>
          <Styled.Title>Выберите план подписки</Styled.Title>
          <Styled.Subtitle>
            Самый дешевый план выбран по умолчанию
          </Styled.Subtitle>
        </Styled.Header>

        <Styled.Content>
          <Styled.SelectWrapper>
            <Styled.StyledSelect
              value={selectedPlan?.id}
              onChange={(value) => {
                const plan = availablePlans.find((p) => p.id === value);
                setSelectedPlan(plan || null);
              }}
              placeholder="Выберите план"
              suffixIcon={<Styled.DropdownIcon>▼</Styled.DropdownIcon>}
              optionLabelProp="label"
            >
              {availablePlans.map((plan) => (
                <Select.Option
                  key={plan.id}
                  value={plan.id}
                  label={
                    <Styled.OptionContent>
                      <Styled.OptionLeft>
                        <Styled.OptionTitle>{plan.duration}</Styled.OptionTitle>
                      </Styled.OptionLeft>
                      <Styled.OptionPrice>
                        {plan.price.toLocaleString()} {plan.currency}
                      </Styled.OptionPrice>
                    </Styled.OptionContent>
                  }
                >
                  <Styled.OptionContent>
                    <Styled.OptionLeft>
                      <Styled.OptionTitle>{plan.duration}</Styled.OptionTitle>
                      {plan.description && (
                        <Styled.OptionDescription>
                          {plan.description}
                        </Styled.OptionDescription>
                      )}
                    </Styled.OptionLeft>
                    <Styled.OptionPrice>
                      {plan.price.toLocaleString()} {plan.currency}
                    </Styled.OptionPrice>
                  </Styled.OptionContent>
                </Select.Option>
              ))}
            </Styled.StyledSelect>
          </Styled.SelectWrapper>

          {selectedPlan && (
            <Styled.PlanInfo>
              <Styled.PlanDetails>
                <Styled.PlanPrice>
                  {selectedPlan.price.toLocaleString()} {selectedPlan.currency}
                </Styled.PlanPrice>
                {selectedPlan.description && (
                  <Styled.PlanDescription>
                    {selectedPlan.description}
                  </Styled.PlanDescription>
                )}
              </Styled.PlanDetails>

              {selectedPlan.durationDays && (
                <Styled.PlanDays>
                  {getDaysText(selectedPlan.durationDays)} доступа
                </Styled.PlanDays>
              )}
            </Styled.PlanInfo>
          )}

          <Styled.PurchaseButton
            onClick={handlePurchase}
            disabled={!selectedPlan}
          >
            <Styled.ButtonText>Купить сейчас</Styled.ButtonText>
            <Styled.ButtonGlow />
          </Styled.PurchaseButton>
        </Styled.Content>

        <Styled.Footer>
          <Styled.FooterText>
            После оплаты ссылки и инструкция будут в личном кабинете
          </Styled.FooterText>
        </Styled.Footer>
      </Styled.Card>
    </Styled.Container>
  );
}
