import axios from "axios";
import { DigisellerReviewsResponse } from "@/widgets/CheatTestimonials/model/types";

const DIGISELLER_BASE_URL = "https://api.digiseller.ru/api";

export async function getDigisellerReviews(
  sellerId: string,
  productId: string,
  rows: number = 12
): Promise<DigisellerReviewsResponse> {
  const url = `${DIGISELLER_BASE_URL}/reviews?seller_id=${sellerId}&product_id=${productId}&rows=${rows}&format=json&transp=cors`;

  const response = await axios.get<DigisellerReviewsResponse>(url);
  return response.data;
}
