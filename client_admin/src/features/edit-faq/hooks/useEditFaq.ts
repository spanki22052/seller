import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { updateFaq, UpdateFaqDto, faqKeys } from "@/entities/faq";

export const useEditFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFaqDto }) =>
      updateFaq(id, dto),
    onSuccess: (updatedFaq) => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      queryClient.setQueryData(faqKeys.detail(updatedFaq.id), updatedFaq);
      notification.success({
        message: "FAQ обновлен",
        description: `FAQ "${updatedFaq.question}" успешно обновлен.`,
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
