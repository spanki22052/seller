import { getApiClient } from "@/shared/api/base";
import { CarouselCategory } from "../model/types";

export const getCarouselCategories = (): Promise<CarouselCategory[]> => {
  return getApiClient().get<CarouselCategory[]>("/carousel-categories").then(res => res.data);
};
