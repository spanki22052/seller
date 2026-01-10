import { Card, Form, Button, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SupportLinkTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { supportLink?: string }) => void;
  isUpdating: boolean;
}

export function SupportLinkTab({
  form,
  settings,
  onSubmit,
  isUpdating,
}: SupportLinkTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("Настройки ссылки поддержки в навигационной панели")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          supportLink: settings?.supportLink || "",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.supportLink", "Ссылка поддержки")}
          name="supportLink"
          rules={[
            {
              required: false,
              type: "url",
              message: t(
                "settings.supportLinkInvalid",
                "Введите корректную ссылку"
              ),
            },
          ]}
        >
          <Input
            placeholder={t(
              "settings.supportLinkPlaceholder",
              "https://discord.gg/support"
            )}
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
