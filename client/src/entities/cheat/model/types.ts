export type PriceCurrency = "RUB" | "USD";

export type CheatStatus = "AVAILABLE" | "UPDATING" | "FROZEN";

export interface CheatPrice {
  amount: number | null;
  currency: PriceCurrency;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  sectionId?: string;
}

export interface FunctionCategory {
  id: string;
  name: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: PriceCurrency;
  image?: string;
  isAvailable: boolean;
  redirectUrl?: string;
}

export interface Cheat {
  id: string;
  gameId: string;
  name: string;
  brandName: string;
  title: string;
  description?: string;
  descriptionMarkdown?: string;
  circularText?: string;
  circularImage?: string;
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
