import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { reorderCheats, cheatKeys } from "@/entities/cheat";

export const useReorderCheats = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (cheatIds: string[]) => reorderCheats({ cheatIds }),
    onSuccess: (reorderedCheats) => {
      // Update the cheats list with new order
      queryClient.setQueryData(cheatKeys.lists(), reorderedCheats);
      notification.success({
        message: t("cheats.notifications.reorderSuccess"),
        description: t("cheats.notifications.reorderDescription"),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.reorderFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};
