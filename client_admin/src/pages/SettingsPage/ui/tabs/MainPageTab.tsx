import { Card, Form, Button, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface MainPageTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { mainPageTitle?: string; mainPageDescription?: string }) => void;
  isUpdating: boolean;
}

export function MainPageTab({ form, settings, onSubmit, isUpdating }: MainPageTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("settings.mainPageTab", "Главная страница")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          mainPageTitle: settings?.mainPageTitle || "",
          mainPageDescription: settings?.mainPageDescription || "",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.mainPageTitle", "Заголовок главной страницы")}
          name="mainPageTitle"
          rules={[
            {
              required: false,
              message: t("settings.mainPageTitleRequired", "Введите заголовок главной страницы"),
            },
          ]}
        >
          <Input
            placeholder={t("settings.mainPageTitlePlaceholder", "Введите заголовок главной страницы")}
          />
        </Form.Item>

        <Form.Item
          label={t("settings.mainPageDescription", "Описание главной страницы")}
          name="mainPageDescription"
          rules={[
            {
              required: false,
              message: t("settings.mainPageDescriptionRequired", "Введите описание главной страницы"),
            },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("settings.mainPageDescriptionPlaceholder", "Введите описание главной страницы")}
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
