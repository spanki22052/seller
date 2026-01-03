import { GamePage } from "@/compositions/GamePage";

interface GamePageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function Game({ params }: GamePageParams) {
  const { id } = await params;
  return <GamePage gameId={id} />;
}
