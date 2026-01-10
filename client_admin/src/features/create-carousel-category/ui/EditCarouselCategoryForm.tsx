import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useEditCarouselCategory } from "../hooks/useEditCarouselCategory";
import { CarouselCategory, UpdateCarouselCategoryDto } from "@/entities/carousel-category";
import * as Styled from "./styled";

interface EditCarouselCategoryFormProps {
  category: CarouselCategory | null;
  onSuccess?: () => void;
}

export function EditCarouselCategoryForm({ category, onSuccess }: EditCarouselCategoryFormProps) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const editCarouselCategory = useEditCarouselCategory();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category, form]);

  const handleSubmit = async (values: { name: string }) => {
    if (!category) return;

    try {
      const dto: UpdateCarouselCategoryDto = {
        name: values.name,
      };

      await editCarouselCategory.mutateAsync({ id: category.id, dto });
      onSuccess?.();
    } catch {
      // Error handling is done in the mutation hook
    }
  };

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={editCarouselCategory.isPending}
      >
        <Form.Item
          name="name"
          label={t("carouselCategories.form.categoryName")}
          rules={[{ required: true, message: t("carouselCategories.form.categoryNameRequired") }]}
        >
          <Input placeholder={t("carouselCategories.form.categoryNamePlaceholder")} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={editCarouselCategory.isPending}
            block
          >
            {t("carouselCategories.updateCategory")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
