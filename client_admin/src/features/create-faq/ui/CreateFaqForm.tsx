import { Form, Input, Button, Switch, InputNumber } from "antd";
import { useCreateFaq } from "../hooks/useCreateFaq";
import { CreateFaqDto } from "@/entities/faq";
import * as Styled from "./styled";

interface CreateFaqFormProps {
  onSuccess?: () => void;
}

export function CreateFaqForm({ onSuccess }: CreateFaqFormProps) {
  const [form] = Form.useForm();
  const createFaq = useCreateFaq();

  const handleSubmit = async (values: {
    question: string;
    answer: string;
    isActive: boolean;
    sortOrder: number;
  }) => {
    try {
      const dto: CreateFaqDto = {
        question: values.question,
        answer: values.answer,
        isActive: values.isActive,
        sortOrder: values.sortOrder,
      };

      await createFaq.mutateAsync(dto);
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
        disabled={createFaq.isPending}
        initialValues={{
          isActive: true,
          sortOrder: 0,
        }}
      >
        <Form.Item
          name="question"
          label="Вопрос"
          rules={[{ required: true, message: "Пожалуйста, введите вопрос" }]}
        >
          <Input placeholder="Введите вопрос FAQ" />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Ответ"
          rules={[{ required: true, message: "Пожалуйста, введите ответ" }]}
        >
          <Input.TextArea
            placeholder="Введите ответ на вопрос"
            rows={6}
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
          label="Активный FAQ"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createFaq.isPending}
            block
          >
            Создать FAQ
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
