import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { updateGame, UpdateGameDto, gameKeys } from "@/entities/game";

export const useEditGame = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateGameDto }) =>
      updateGame(id, dto),
    onSuccess: (updatedGame) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.lists() });
      queryClient.setQueryData(gameKeys.detail(updatedGame.id), updatedGame);
      notification.success({
        message: t("games.notifications.updatedSuccess"),
        description: t("games.notifications.updatedDescription", {
          name: updatedGame.name,
        }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("games.notifications.updateFailed"),
        description: error.message || t("games.notifications.unexpectedError"),
      });
    },
  });
};

