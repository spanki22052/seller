import { CheatPage } from "@/compositions/CheatPage";

interface CheatPageParams {
  params: Promise<{
    id: string;
    cheatId: string;
  }>;
}

export default async function Cheat({ params }: CheatPageParams) {
  const { id, cheatId } = await params;
  return <CheatPage gameId={id} cheatId={cheatId} />;
}
