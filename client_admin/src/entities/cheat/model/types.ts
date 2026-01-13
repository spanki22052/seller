import { PricingPlanDto, FunctionCategoryDto } from "../api/cheatApi";

export type CheatStatus = "AVAILABLE" | "UPDATING" | "FROZEN" | "DRAFT";

export interface ReviewDigitalSeller {
  sellerId: string;
  productId: string;
}

export interface Cheat {
  id: string;
  name: string;
  brandName?: string;
  cheatDigitId?: string;
  reviewDigitalSeller?: ReviewDigitalSeller[];
  gameId: string;
  gameName: string;
  price: number | { amount: number | null; currency: string };
  pricingPlans?: PricingPlanDto[];
  functions?: FunctionCategoryDto[];
  orderId?: number;
  status: CheatStatus;
  salesCount?: number; // Optional - not returned by API currently
  rating?: number; // Optional - not returned by API currently
  image?: string; // Cheat image (jpg, jpeg, png)
  circularImage?: string; // Circular cheat image (jpg, jpeg, png) - cropped to circle
  backgroundImage?: string; // Background image (jpg, jpeg, png)
  screenshots?: string[]; // Screenshots list (jpg, jpeg, png)
  videoUrl?: string; // Video link (mp4)
  description?: string; // Plain text description
  descriptionMarkdown?: string; // Markdown description
  seoText?: string; // SEO keywords for search engines
  supportedSystems?: string[]; // Supported operating systems
  createdAt: string;
  updatedAt: string;
}

export interface CheatStats {
  total: number;
  available: number;
  updating: number;
  frozen: number;
  totalSales: number;
  totalRevenue: number;
}
