export interface Game {
  id: string;
  name: string;
  color: string;
  image?: string;
  backgroundImage?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheatPrice {
  amount: number | null;
  currency: "RUB" | "USD";
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface FunctionCategory {
  name: string;
  functions: string[];
}

export interface PricingPlan {
  id: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: "RUB" | "USD";
  image?: string;
  isAvailable: boolean;
}

export type CheatStatus = "AVAILABLE" | "UPDATING" | "FROZEN";

export interface Cheat {
  id: string;
  gameId: string;
  name: string;
  brandName: string;
  title: string;
  description?: string;
  circularText?: string;
  image?: string;
  backgroundImage?: string;
  price: CheatPrice;
  productName: string;
  windowsVersion?: string;
  gameVersion?: string;
  gameMode?: string;
  processors?: string;
  buttonText?: string;
  breadcrumbs: BreadcrumbItem[];
  videoUrl?: string;
  videoThumbnail?: string;
  screenshots?: string[];
  functions?: FunctionCategory[];
  pricingPlans?: PricingPlan[];
  isNew?: boolean;
  isComingSoon?: boolean;
  status: CheatStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GameWithCheats extends Game {
  cheats: Cheat[];
}

