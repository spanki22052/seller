import { PricingPlan } from "../model/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "1-day",
    duration: "1 ДЕНЬ",
    durationDays: 1,
    price: 600,
    currency: "RUB",
    image: "/images/battlefield-soldier.png",
    isAvailable: true,
  },
  {
    id: "14-days",
    duration: "14 ДНЕЙ",
    durationDays: 14,
    price: 2200,
    currency: "RUB",
    image: "/images/battlefield-soldier.png",
    isAvailable: true,
  },
  {
    id: "30-days",
    duration: "30 ДНЕЙ",
    durationDays: 30,
    price: 3700,
    currency: "RUB",
    image: "/images/battlefield-soldier.png",
    isAvailable: true,
  },
  {
    id: "other",
    duration: "ДРУГОЙ СРОК",
    durationDays: 0,
    price: 0,
    currency: "RUB",
    image: "/images/other-term.png",
    isAvailable: false,
  },
];

