import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { createGame, CreateGameDto, gameKeys } from "@/entities/game";

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (dto: CreateGameDto) => createGame(dto),
    onSuccess: (newGame) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.lists() });
      queryClient.setQueryData(gameKeys.detail(newGame.id), newGame);
      notification.success({
        message: t("games.notifications.createdSuccess"),
        description: t("games.notifications.createdDescription", { name: newGame.name }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("games.notifications.createFailed"),
        description: error.message || t("games.notifications.unexpectedError"),
      });
    },
  });
};

