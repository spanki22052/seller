import { GamePage } from "@/compositions/GamePage";
import { getGameWithCheats } from "@/entities/game";

interface GamePageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function Game({ params }: GamePageParams) {
  const { id } = await params;
  const gameWithCheats = await getGameWithCheats(id);
  return <GamePage gameData={gameWithCheats} />;
}
