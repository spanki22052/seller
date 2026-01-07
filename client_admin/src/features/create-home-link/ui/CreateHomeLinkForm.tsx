import { Form, Input, Button, Switch, InputNumber } from "antd";
import { useCreateHomeLink } from "../hooks/useCreateHomeLink";
import { CreateHomeLinkDto } from "@/entities/home-link";
import * as Styled from "./styled";

interface CreateHomeLinkFormProps {
  onSuccess?: () => void;
}

export function CreateHomeLinkForm({ onSuccess }: CreateHomeLinkFormProps) {
  const [form] = Form.useForm();
  const createHomeLink = useCreateHomeLink();

  const handleSubmit = async (values: {
    title: string;
    url: string;
    description?: string;
    isActive: boolean;
    sortOrder: number;
  }) => {
    try {
      const dto: CreateHomeLinkDto = {
        title: values.title,
        url: values.url,
        description: values.description,
        isActive: values.isActive,
        sortOrder: values.sortOrder,
      };

      await createHomeLink.mutateAsync(dto);
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
        disabled={createHomeLink.isPending}
        initialValues={{
          isActive: true,
          sortOrder: 0,
        }}
      >
        <Form.Item
          name="title"
          label="Название ссылки"
          rules={[{ required: true, message: "Пожалуйста, введите название ссылки" }]}
        >
          <Input placeholder="Введите название ссылки" />
        </Form.Item>

        <Form.Item
          name="url"
          label="URL ссылки"
          rules={[
            { required: true, message: "Пожалуйста, введите URL ссылки" },
            { type: "url", message: "Пожалуйста, введите корректный URL" }
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание (опционально)"
        >
          <Input.TextArea
            placeholder="Введите описание ссылки"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          name="sortOrder"
          label="Порядок сортировки"
        >
          <InputNumber
            min={0}
            placeholder="0"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Активная ссылка"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createHomeLink.isPending}
            block
          >
            Создать ссылку
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
