import { Card, Form, Button, Upload, Input, message } from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { uploadFile } from "@/entities/file";

interface TutorialTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { howToBuyVideoUrl?: string; howToBuyVideoThumbnail?: string }) => void;
  isUpdating: boolean;
}

export function TutorialTab({ form, settings, onSubmit, isUpdating }: TutorialTabProps) {
  const { t } = useTranslation();

  const handleVideoUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      form.setFieldsValue({ howToBuyVideoUrl: response.url });
      message.success(t("settings.videoUploaded"));
      return false; // Prevent default upload
    } catch {
      message.error(t("settings.videoUploadFailed"));
      return false;
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      form.setFieldsValue({ howToBuyVideoThumbnail: response.url });
      message.success(t("settings.thumbnailUploaded"));
      return false; // Prevent default upload
    } catch {
      message.error(t("settings.thumbnailUploadFailed"));
      return false;
    }
  };

  return (
    <Card title={t("settings.tutorialSettings")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          howToBuyVideoUrl: settings?.howToBuyVideoUrl,
          howToBuyVideoThumbnail: settings?.howToBuyVideoThumbnail,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("settings.howToBuyVideo")}
          name="howToBuyVideoUrl"
          rules={[
            {
              required: true,
              message: t("settings.videoRequired"),
            },
          ]}
        >
          <Input placeholder={t("settings.videoUrl")} disabled />
        </Form.Item>

        <Form.Item label={t("settings.uploadVideo")}>
          <Upload
            accept="video/mp4,video/mpeg"
            beforeUpload={handleVideoUpload}
            fileList={[]}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              {t("settings.selectVideo")}
            </Button>
          </Upload>
        </Form.Item>

        {settings?.howToBuyVideoUrl && (
          <Form.Item
            label={t("settings.videoPreview") || "Предпросмотр видео"}
          >
            <video
              src={settings.howToBuyVideoUrl}
              controls
              style={{ width: "100%", maxWidth: "100%", borderRadius: 8 }}
            />
          </Form.Item>
        )}

        <Form.Item
          label={t("settings.videoThumbnail")}
          name="howToBuyVideoThumbnail"
        >
          <Input placeholder={t("settings.thumbnailUrl")} disabled />
        </Form.Item>

        <Form.Item label={t("settings.uploadThumbnail")}>
          <Upload
            accept="image/jpeg,image/jpg,image/png,image/webp"
            beforeUpload={handleThumbnailUpload}
            fileList={[]}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              {t("settings.selectImage")}
            </Button>
          </Upload>
        </Form.Item>

        {settings?.howToBuyVideoThumbnail && (
          <Form.Item
            label={
              t("settings.thumbnailPreview") || "Предпросмотр миниатюры"
            }
          >
            <img
              src={settings.howToBuyVideoThumbnail}
              alt="Thumbnail"
              style={{
                maxWidth: "100%",
                width: "auto",
                maxHeight: 300,
                borderRadius: 8,
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
            {t("settings.saveSettings")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
