import { useState } from "react";
import { Form, Select, Button, Space, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { CheatStatus } from "@/entities/cheat";
import { useBulkChangeCheatStatus } from "../hooks/useBulkChangeCheatStatus";

const { Option } = Select;

interface BulkChangeCheatStatusFormProps {
  cheatIds: string[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function BulkChangeCheatStatusForm({
  cheatIds,
  onSuccess,
  onCancel,
}: BulkChangeCheatStatusFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const bulkChangeStatusMutation = useBulkChangeCheatStatus();

  const [selectedStatus, setSelectedStatus] = useState<CheatStatus | null>(null);

  const statusOptions = [
    { value: "AVAILABLE", label: t("cheats.available") },
    { value: "UPDATING", label: t("cheats.updating") },
    { value: "FROZEN", label: t("cheats.frozen") },
    { value: "DRAFT", label: t("cheats.draft") },
  ];

  const handleSubmit = () => {
    if (!selectedStatus) {
      return;
    }

    bulkChangeStatusMutation.mutate(
      { ids: cheatIds, status: selectedStatus },
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
    >
      <Alert
        message={t("cheats.bulkChange.warningTitle")}
        description={t("cheats.bulkChange.warningDescription", {
          count: cheatIds.length,
        })}
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />

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
            loading={bulkChangeStatusMutation.isPending}
            disabled={!selectedStatus}
            size="large"
          >
            {t("cheats.bulkChange.confirmButton")}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
