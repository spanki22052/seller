import { useQuery } from "@tanstack/react-query";
import { getSeoPage } from "./seoApi";
import { seoKeys } from "../model/keys";
import { SeoPageType } from "../model/types";

export function useSeoPage(pageType: SeoPageType) {
  return useQuery({
    queryKey: seoKeys.page(pageType),
    queryFn: () => getSeoPage(pageType),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
