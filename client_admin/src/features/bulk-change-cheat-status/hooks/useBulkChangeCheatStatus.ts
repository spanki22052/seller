import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { bulkUpdateCheatStatus, cheatKeys, CheatStatus } from "@/entities/cheat";

export const useBulkChangeCheatStatus = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: CheatStatus }) =>
      bulkUpdateCheatStatus({ ids, status }),
    onSuccess: (_, { ids }) => {
      queryClient.invalidateQueries({ queryKey: cheatKeys.lists() });
      notification.success({
        message: t("cheats.notifications.bulkStatusUpdatedSuccess"),
        description: t("cheats.notifications.bulkStatusUpdatedDescription", {
          count: ids.length,
        }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("cheats.notifications.bulkStatusUpdateFailed"),
        description: error.message || t("cheats.notifications.unexpectedError"),
      });
    },
  });
};
