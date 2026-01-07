import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { createCategory, CreateCategoryDto, categoryKeys } from "@/entities/category";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => createCategory(dto),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.setQueryData(categoryKeys.detail(newCategory.id), newCategory);
      notification.success({
        message: t("categories.notifications.createdSuccess"),
        description: t("categories.notifications.createdDescription", { name: newCategory.name }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("categories.notifications.createFailed"),
        description: error.message || t("categories.notifications.unexpectedError"),
      });
    },
  });
};
