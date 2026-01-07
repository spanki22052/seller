import { getApiClient } from "@/shared/api/base";
import { Category } from "../model/types";

export async function getCategories(): Promise<Category[]> {
  const client = getApiClient();
  const response = await client.get<Category[]>("/categories");
  return response.data;
}

