import React from "react";
import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { updateCategory as updateCategoryApi, categoryKeys, UpdateCategoryDto } from "@/entities/category";
import * as Styled from "./styled";

interface EditCategoryFormProps {
  category: { id: string; name: string };
  onSuccess?: () => void;
}

export function EditCategoryForm({ category, onSuccess }: EditCategoryFormProps) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateCategory = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) => updateCategoryApi(id, dto),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.setQueryData(categoryKeys.detail(updatedCategory.id), updatedCategory);
      notification.success({
        message: t("categories.notifications.updatedSuccess"),
        description: t("categories.notifications.updatedDescription", { name: updatedCategory.name }),
      });
      onSuccess?.();
    },
    onError: (error: { message?: string }) => {
      notification.error({
        message: t("categories.notifications.updateFailed"),
        description: error.message || t("categories.notifications.unexpectedError"),
      });
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      await updateCategory.mutateAsync({
        id: category.id,
        dto: { name: values.name }
      });
    } catch (error) {
      // Error handling is done in the mutation hook
    }
  };

  // Set initial values when category changes
  React.useEffect(() => {
    form.setFieldsValue({ name: category.name });
  }, [category, form]);

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={updateCategory.isPending}
        initialValues={{ name: category.name }}
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
            loading={updateCategory.isPending}
            block
          >
            {t("categories.updateCategory")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
