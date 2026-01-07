import { Form, Input, Button, Switch, InputNumber } from "antd";
import { useEffect } from "react";
import { useEditFaq } from "../hooks/useEditFaq";
import { UpdateFaqDto, Faq } from "@/entities/faq";
import * as Styled from "./styled";

interface EditFaqFormProps {
  faq: Faq;
  onSuccess?: () => void;
}

export function EditFaqForm({ faq, onSuccess }: EditFaqFormProps) {
  const [form] = Form.useForm();
  const editFaq = useEditFaq();

  useEffect(() => {
    if (faq) {
      form.setFieldsValue({
        question: faq.question,
        answer: faq.answer,
        isActive: faq.isActive,
        sortOrder: faq.sortOrder,
      });
    }
  }, [faq, form]);

  const handleSubmit = async (values: {
    question: string;
    answer: string;
    isActive: boolean;
    sortOrder: number;
  }) => {
    try {
      const dto: UpdateFaqDto = {
        question: values.question,
        answer: values.answer,
        isActive: values.isActive,
        sortOrder: values.sortOrder,
      };

      await editFaq.mutateAsync({ id: faq.id, dto });
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
        disabled={editFaq.isPending}
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
            loading={editFaq.isPending}
            block
          >
            Обновить FAQ
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
