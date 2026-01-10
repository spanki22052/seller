import { Card, Form, Button, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface AdminSettingsTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { sellerId?: string }) => void;
  isUpdating: boolean;
}

export function AdminSettingsTab({ form, settings, onSubmit, isUpdating }: AdminSettingsTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("settings.adminSettings", "Настройки админа")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          sellerId: settings?.sellerId || "",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.sellerId", "ID продавца")}
          name="sellerId"
          rules={[
            {
              required: false,
              message: t("settings.sellerIdRequired", "Введите ID продавца"),
            },
          ]}
        >
          <Input
            placeholder={t("settings.sellerIdPlaceholder", "Введите ID продавца")}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={isUpdating}
            size="large"
          >
            {t("settings.saveSettings")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
