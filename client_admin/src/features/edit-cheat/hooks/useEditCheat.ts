import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { updateCheat, UpdateCheatDto, cheatKeys } from "@/entities/cheat";

export const useEditCheat = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCheatDto }) =>
      updateCheat(id, dto),
    onSuccess: (updatedCheat) => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      queryClient.setQueryData(cheatKeys.detail(updatedCheat.id), updatedCheat);
      notification.success({
        message: t("cheats.notifications.updatedSuccess"),
        description: t("cheats.notifications.updatedDescription", {
          name: updatedCheat.name,
        }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.updateFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};

