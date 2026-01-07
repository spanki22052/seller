import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { CreateCategoryDto } from "@/entities/category";
import * as Styled from "./styled";

export function CreateCategoryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createCategory = useCreateCategory();

  const handleSubmit = async (values: { name: string }) => {
    try {
      const dto: CreateCategoryDto = {
        name: values.name,
      };

      await createCategory.mutateAsync(dto);
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hook
    }
  };

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createCategory.isPending}
      >
        <Form.Item
          name="name"
          label={t("categories.form.categoryName")}
          rules={[{ required: true, message: t("categories.form.categoryNameRequired") }]}
        >
          <Input placeholder={t("categories.form.categoryNamePlaceholder")} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createCategory.isPending}
            block
          >
            {t("categories.createCategory")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
