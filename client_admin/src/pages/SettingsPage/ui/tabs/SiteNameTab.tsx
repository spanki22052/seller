import { Card, Form, Button, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SiteNameTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { siteName?: string }) => void;
  isUpdating: boolean;
}

export function SiteNameTab({ form, settings, onSubmit, isUpdating }: SiteNameTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("settings.siteNameTab", "Название сайта")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          siteName: settings?.siteName || "",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.siteName", "Название сайта")}
          name="siteName"
          rules={[
            {
              required: false,
              message: t("settings.siteNameRequired", "Введите название сайта"),
            },
          ]}
        >
          <Input
            placeholder={t("settings.siteNamePlaceholder", "Введите название сайта")}
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
