import { useQuery } from "@tanstack/react-query";
import { getDigisellerReviews } from "@/shared/api/digiseller";
import { DigisellerReview } from "../model/types";

export function useDigisellerReviews(
  sellerId?: string,
  cheatDigitId?: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["digiseller-reviews", sellerId, cheatDigitId],
    queryFn: async (): Promise<DigisellerReview[]> => {
      if (!sellerId || !cheatDigitId) {
        return [];
      }

      const response = await getDigisellerReviews(sellerId, cheatDigitId);
      return response.review || [];
    },
    enabled: enabled && !!sellerId && !!cheatDigitId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
