import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { createCarouselCategory, CreateCarouselCategoryDto, carouselCategoryKeys } from "@/entities/carousel-category";

export const useCreateCarouselCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (dto: CreateCarouselCategoryDto) => createCarouselCategory(dto),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: carouselCategoryKeys.lists() });
      queryClient.setQueryData(carouselCategoryKeys.detail(newCategory.id), newCategory);
      notification.success({
        message: t("carouselCategories.notifications.createdSuccess"),
        description: t("carouselCategories.notifications.createdDescription", { name: newCategory.name }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("carouselCategories.notifications.createFailed"),
        description: error.message || t("carouselCategories.notifications.unexpectedError"),
      });
    },
  });
};
