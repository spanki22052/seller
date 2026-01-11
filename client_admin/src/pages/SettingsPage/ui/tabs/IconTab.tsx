import { Card, Form, Button, Upload, Input, message } from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { uploadFile } from "@/entities/file";

interface IconTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { iconUrl?: string }) => void;
  isUpdating: boolean;
}

export function IconTab({ form, settings, onSubmit, isUpdating }: IconTabProps) {
  const { t } = useTranslation();

  const handleIconUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      form.setFieldsValue({ iconUrl: response.url });
      message.success(t("settings.iconUploaded", "Иконка загружена"));
      return false; // Prevent default upload
    } catch {
      message.error(t("settings.iconUploadFailed", "Ошибка загрузки иконки"));
      return false;
    }
  };

  return (
    <Card title={t("settings.iconSettings", "Настройки иконки")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          iconUrl: settings?.iconUrl,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.iconUrl", "URL иконки")}
          name="iconUrl"
        >
          <Input placeholder={t("settings.iconUrlPlaceholder", "URL иконки")} disabled />
        </Form.Item>

        <Form.Item label={t("settings.uploadIcon", "Загрузить иконку")}>
          <Upload
            accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
            beforeUpload={handleIconUpload}
            fileList={[]}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              {t("settings.selectIcon", "Выбрать иконку")}
            </Button>
          </Upload>
        </Form.Item>

        {settings?.iconUrl && (
          <Form.Item
            label={t("settings.iconPreview", "Предпросмотр иконки")}
          >
            <img
              src={settings.iconUrl}
              alt="Icon"
              style={{
                maxWidth: "100%",
                width: "auto",
                maxHeight: 200,
                borderRadius: 8,
                objectFit: "contain",
              }}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={isUpdating}
            size="large"
          >
            {t("settings.saveSettings", "Сохранить настройки")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
