import { getApiClient } from "@/shared/api/base";
import { Game } from "../model/types";

export interface CreateGameDto {
  name: string;
  color: string;
  categoryId?: string;
  image?: string;
  backgroundImage?: string;
  icon?: string;
}

export interface UpdateGameDto extends Partial<CreateGameDto> {}

export async function getGames(): Promise<Game[]> {
  const response = await getApiClient().get<Game[]>("/games");
  return response.data;
}

export async function getGameById(id: string): Promise<Game> {
  const response = await getApiClient().get<Game>(`/games/${id}`);
  return response.data;
}

export async function createGame(dto: CreateGameDto): Promise<Game> {
  const response = await getApiClient().post<Game>("/games", dto);
  return response.data;
}

export async function updateGame(
  id: string,
  dto: UpdateGameDto
): Promise<Game> {
  const response = await getApiClient().put<Game>(`/games/${id}`, dto);
  return response.data;
}

export async function deleteGame(id: string): Promise<void> {
  await getApiClient().delete(`/games/${id}`);
}

