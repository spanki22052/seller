import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { createHomeLink, CreateHomeLinkDto, homeLinkKeys } from "@/entities/home-link";

export const useCreateHomeLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateHomeLinkDto) => createHomeLink(dto),
    onSuccess: (newHomeLink) => {
      queryClient.invalidateQueries({ queryKey: homeLinkKeys.lists() });
      queryClient.setQueryData(homeLinkKeys.detail(newHomeLink.id), newHomeLink);
      notification.success({
        message: "Ссылка создана",
        description: `Ссылка "${newHomeLink.title}" успешно добавлена.`,
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: "Ошибка создания",
        description: error.message || "Произошла непредвиденная ошибка",
      });
    },
  });
};
