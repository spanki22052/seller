import { getApiClient } from "@/shared/api/base";
import { LoginDto, LoginResponseDto } from "../model/types";

export async function login(dto: LoginDto): Promise<LoginResponseDto> {
  const response = await getApiClient().post<LoginResponseDto>(
    "/auth/login",
    dto
  );
  return response.data;
}
