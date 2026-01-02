import { GamePage } from "@/compositions/GamePage";

interface GamePageParams {
  params: {
    id: string;
  };
}

export default function Game({ params }: GamePageParams) {
  return <GamePage gameId={params.id} />;
}

