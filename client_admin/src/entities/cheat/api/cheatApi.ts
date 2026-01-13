import { getApiClient } from "@/shared/api/base";
import { Cheat, CheatStatus } from "../model/types";

export type PriceCurrency = "RUB" | "USD";

export interface CheatPriceDto {
  amount: number | null;
  currency: PriceCurrency;
}

export interface BreadcrumbItemDto {
  label: string;
  href?: string;
  sectionId?: string;
}

export interface FunctionCategoryDto {
  id: string;
  name: string;
  features: string[];
}

export interface PricingPlanDto {
  id: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: PriceCurrency;
  image: string;
  isAvailable: boolean;
  redirectUrl?: string;
  description?: string;
}

export interface ReviewDigitalSellerDto {
  sellerId: string;
  productId: string;
}

export interface CreateCheatDto {
  gameId: string;
  name?: string;
  brandId: string;
  cheatDigitId?: string;
  reviewDigitalSeller?: ReviewDigitalSellerDto[];
  description?: string;
  descriptionMarkdown?: string;
  seoText?: string;
  circularText?: string;
  image?: string;
  circularImage?: string;
  backgroundImage?: string;
  price: CheatPriceDto;
  productName: string;
  windowsVersion?: string;
  gameVersion?: string;
  gameMode?: string;
  processors?: string;
  supportedSystems?: string[];
  buttonText?: string;
  breadcrumbs: BreadcrumbItemDto[];
  videoUrl?: string;
  videoThumbnail?: string;
  screenshots?: string[];
  functions?: FunctionCategoryDto[];
  pricingPlans?: PricingPlanDto[];
  isNew?: boolean;
  isComingSoon?: boolean;
  status?: CheatStatus;
}

export interface UpdateCheatDto extends Partial<CreateCheatDto> {
  status?: CheatStatus;
}

export interface BulkUpdateCheatStatusDto {
  ids: string[];
  status: CheatStatus;
}

export interface ReorderCheatsDto {
  cheatIds: string[];
}

export async function getCheats(): Promise<Cheat[]> {
  const response = await getApiClient().get<Cheat[]>("/cheats");
  return response.data;
}

export async function getCheatById(id: string): Promise<Cheat> {
  const response = await getApiClient().get<Cheat>(`/cheats/${id}`);
  return response.data;
}

export async function createCheat(dto: CreateCheatDto): Promise<Cheat> {
  const response = await getApiClient().post<Cheat>("/cheats", dto);
  return response.data;
}

export async function updateCheat(
  id: string,
  dto: UpdateCheatDto
): Promise<Cheat> {
  const response = await getApiClient().put<Cheat>(`/cheats/${id}`, dto);
  return response.data;
}

export async function deleteCheat(id: string): Promise<void> {
  await getApiClient().delete(`/cheats/${id}`);
}

export async function duplicateCheat(id: string): Promise<Cheat> {
  const response = await getApiClient().post<Cheat>(`/cheats/duplicate/${id}`);
  return response.data;
}

export async function bulkUpdateCheatStatus(
  dto: BulkUpdateCheatStatusDto
): Promise<Cheat[]> {
  const response = await getApiClient().put<Cheat[]>(
    "/cheats/bulk-status",
    dto
  );
  return response.data;
}

export async function reorderCheats(dto: ReorderCheatsDto): Promise<Cheat[]> {
  const response = await getApiClient().put<Cheat[]>("/cheats/reorder", dto);
  return response.data;
}
