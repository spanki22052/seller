import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { updateCheat, cheatKeys, CheatStatus } from "@/entities/cheat";

export const useChangeCheatStatus = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CheatStatus }) =>
      updateCheat(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      notification.success({
        message: t("cheats.notifications.statusUpdatedSuccess"),
        description: t("cheats.notifications.statusUpdatedDescription"),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.statusUpdateFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};
