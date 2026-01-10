import { useState } from "react";
import { Form, Select, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Cheat, CheatStatus } from "@/entities/cheat";
import { useChangeCheatStatus } from "../hooks/useChangeCheatStatus";

const { Option } = Select;

interface ChangeCheatStatusFormProps {
  cheat: Cheat;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChangeCheatStatusForm({
  cheat,
  onSuccess,
  onCancel,
}: ChangeCheatStatusFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const changeStatusMutation = useChangeCheatStatus();

  const [selectedStatus, setSelectedStatus] = useState<CheatStatus>(cheat.status);

  const statusOptions = [
    { value: "AVAILABLE", label: t("cheats.available") },
    { value: "UPDATING", label: t("cheats.updating") },
    { value: "FROZEN", label: t("cheats.frozen") },
    { value: "DRAFT", label: t("cheats.draft") },
  ];

  const handleSubmit = () => {
    if (selectedStatus === cheat.status) {
      onCancel();
      return;
    }

    changeStatusMutation.mutate(
      { id: cheat.id, status: selectedStatus },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ status: cheat.status }}
    >
      <Form.Item
        label={t("cheats.changeStatus.selectStatus")}
        name="status"
        rules={[{ required: true, message: t("common.requiredField") }]}
      >
        <Select
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder={t("cheats.changeStatus.selectStatusPlaceholder")}
          size="large"
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={onCancel} size="large">
            {t("common.cancel")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={changeStatusMutation.isPending}
            disabled={selectedStatus === cheat.status}
            size="large"
          >
            {t("common.save")}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
