import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { updateCarouselCategory, UpdateCarouselCategoryDto, carouselCategoryKeys } from "@/entities/carousel-category";

export const useEditCarouselCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCarouselCategoryDto }) =>
      updateCarouselCategory(id, dto),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: carouselCategoryKeys.lists() });
      queryClient.setQueryData(carouselCategoryKeys.detail(updatedCategory.id), updatedCategory);
      notification.success({
        message: t("carouselCategories.notifications.updatedSuccess"),
        description: t("carouselCategories.notifications.updatedDescription", { name: updatedCategory.name }),
      });
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("carouselCategories.notifications.updateFailed"),
        description: error.message || t("carouselCategories.notifications.unexpectedError"),
      });
    },
  });
};
