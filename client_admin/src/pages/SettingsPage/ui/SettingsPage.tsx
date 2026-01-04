import { useState } from "react";
import { Card, Form, Button, Upload, message, Input, Spin } from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings, settingsKeys } from "@/entities/settings";
import { uploadFile } from "@/entities/file";
import * as Styled from "./styled";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function SettingsPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  const updateMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      message.success(t("settings.settingsUpdated"));
    },
    onError: () => {
      message.error(t("settings.settingsUpdateFailed"));
    },
  });

  const handleVideoUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      form.setFieldsValue({ howToBuyVideoUrl: response.url });
      setVideoFile(null);
      message.success(t("settings.videoUploaded"));
      return false; // Prevent default upload
    } catch (error) {
      message.error(t("settings.videoUploadFailed"));
      return false;
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      form.setFieldsValue({ howToBuyVideoThumbnail: response.url });
      setThumbnailFile(null);
      message.success(t("settings.thumbnailUploaded"));
      return false; // Prevent default upload
    } catch (error) {
      message.error(t("settings.thumbnailUploadFailed"));
      return false;
    }
  };

  const handleSubmit = async (values: any) => {
    updateMutation.mutate({
      howToBuyVideoUrl: values.howToBuyVideoUrl,
      howToBuyVideoThumbnail: values.howToBuyVideoThumbnail,
    });
  };

  if (isLoading) {
    return (
      <Styled.Container>
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: "#8c8c8c" }}>
            {t("settings.loading")}
          </div>
        </div>
      </Styled.Container>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <Styled.Container>
        <Styled.SettingsCard>
          <Card title={t("settings.title") || "Настройки"}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              howToBuyVideoUrl: settings?.howToBuyVideoUrl,
              howToBuyVideoThumbnail: settings?.howToBuyVideoThumbnail,
            }}
            onFinish={handleSubmit}
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
                beforeUpload={(file) => {
                  handleVideoUpload(file);
                  return false;
                }}
                fileList={videoFile ? [videoFile as any] : []}
                onChange={(info) => {
                  if (info.file.originFileObj) {
                    setVideoFile(info.file.originFileObj);
                  }
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>{t("settings.selectVideo")}</Button>
              </Upload>
            </Form.Item>

            {settings?.howToBuyVideoUrl && (
              <Form.Item label={t("settings.videoPreview") || "Предпросмотр видео"}>
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
                beforeUpload={(file) => {
                  handleThumbnailUpload(file);
                  return false;
                }}
                fileList={thumbnailFile ? [thumbnailFile as any] : []}
                onChange={(info) => {
                  if (info.file.originFileObj) {
                    setThumbnailFile(info.file.originFileObj);
                  }
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>{t("settings.selectImage")}</Button>
              </Upload>
            </Form.Item>

            {settings?.howToBuyVideoThumbnail && (
              <Form.Item label={t("settings.thumbnailPreview") || "Предпросмотр миниатюры"}>
                <img
                  src={settings.howToBuyVideoThumbnail}
                  alt="Thumbnail"
                  style={{ maxWidth: "100%", width: "auto", maxHeight: 300, borderRadius: 8 }}
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={updateMutation.isPending}
                size="large"
              >
                {t("settings.saveSettings")}
              </Button>
            </Form.Item>
          </Form>
          </Card>
        </Styled.SettingsCard>
      </Styled.Container>
    </motion.div>
  );
}

