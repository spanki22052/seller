import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCarouselCategory } from "../hooks/useCreateCarouselCategory";
import { CreateCarouselCategoryDto } from "@/entities/carousel-category";
import * as Styled from "./styled";

export function CreateCarouselCategoryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createCarouselCategory = useCreateCarouselCategory();

  const handleSubmit = async (values: { name: string }) => {
    try {
      const dto: CreateCarouselCategoryDto = {
        name: values.name,
      };

      await createCarouselCategory.mutateAsync(dto);
      form.resetFields();
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
        disabled={createCarouselCategory.isPending}
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
            loading={createCarouselCategory.isPending}
            block
          >
            {t("carouselCategories.createCategory")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
