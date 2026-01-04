import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { createCheat, CreateCheatDto, cheatKeys } from "@/entities/cheat";

export const useCreateCheat = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (dto: CreateCheatDto) => createCheat(dto),
    onSuccess: (newCheat) => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      queryClient.setQueryData(cheatKeys.detail(newCheat.id), newCheat);
      notification.success({
        message: t("cheats.notifications.createdSuccess"),
        description: t("cheats.notifications.createdDescription", { name: newCheat.name }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.createFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};

