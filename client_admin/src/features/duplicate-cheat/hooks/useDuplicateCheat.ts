import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { duplicateCheat, cheatKeys } from "@/entities/cheat";

export const useDuplicateCheat = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string) => duplicateCheat(id),
    onSuccess: (duplicatedCheat) => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      queryClient.setQueryData(cheatKeys.detail(duplicatedCheat.id), duplicatedCheat);
      notification.success({
        message: t("cheats.notifications.duplicatedSuccess"),
        description: t("cheats.notifications.duplicatedDescription", {
          name: duplicatedCheat.name,
        }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.duplicateFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};
