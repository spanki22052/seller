import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { createFaq, CreateFaqDto, faqKeys } from "@/entities/faq";

export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateFaqDto) => createFaq(dto),
    onSuccess: (newFaq) => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      queryClient.setQueryData(faqKeys.detail(newFaq.id), newFaq);
      notification.success({
        message: "FAQ создан",
        description: `FAQ "${newFaq.question}" успешно добавлен.`,
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
