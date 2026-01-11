import { useQuery } from "@tanstack/react-query";
import { getDigisellerReviews } from "@/shared/api/digiseller";
import { DigisellerReview, ReviewDigitalSeller } from "../model/types";

export function useDigisellerReviews(
  reviewDigitalSeller?: ReviewDigitalSeller[],
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["digiseller-reviews", reviewDigitalSeller],
    queryFn: async (): Promise<DigisellerReview[]> => {
      if (!reviewDigitalSeller || reviewDigitalSeller.length === 0) {
        return [];
      }

      // Send multiple requests in parallel using Promise.all
      const responses = await Promise.all(
        reviewDigitalSeller.map(({ sellerId, productId }) =>
          getDigisellerReviews(sellerId, productId)
        )
      );

      // Flatten all reviews into a single array
      const allReviews = responses.flatMap(response => response.review || []);
      return allReviews;
    },
    enabled: enabled && !!reviewDigitalSeller && reviewDigitalSeller.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
