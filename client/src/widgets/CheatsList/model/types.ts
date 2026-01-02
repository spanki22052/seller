export type PriceCurrency = "RUB" | "USD";

export interface CheatPrice {
  amount: number | null; // null for "???" (coming soon)
  currency: PriceCurrency;
}

export interface Cheat {
  id: string;
  name: string;
  image: string;
  price: CheatPrice;
  isNew?: boolean;
  isComingSoon?: boolean;
}

