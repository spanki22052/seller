import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { updateHomeLink, UpdateHomeLinkDto, homeLinkKeys } from "@/entities/home-link";

export const useEditHomeLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateHomeLinkDto }) =>
      updateHomeLink(id, dto),
    onSuccess: (updatedHomeLink) => {
      queryClient.invalidateQueries({ queryKey: homeLinkKeys.lists() });
      queryClient.setQueryData(homeLinkKeys.detail(updatedHomeLink.id), updatedHomeLink);
      notification.success({
        message: "Ссылка обновлена",
        description: `Ссылка "${updatedHomeLink.title}" успешно обновлена.`,
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: "Ошибка обновления",
        description: error.message || "Произошла непредвиденная ошибка",
      });
    },
  });
};
