import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { deleteCheat, cheatKeys } from "@/entities/cheat";

export const useDeleteCheat = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string) => deleteCheat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      notification.success({
        message: t("cheats.notifications.deletedSuccess"),
        description: t("cheats.notifications.deletedDescription"),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.deleteFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};
