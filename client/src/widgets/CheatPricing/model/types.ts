export interface PricingPlan {
  id: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: "RUB" | "USD";
  image: string;
  isAvailable: boolean;
}

