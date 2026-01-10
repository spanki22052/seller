import { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { uploadFile } from "@/entities/file";
import * as Styled from "./styled";

interface VideoUploadProps {
  value?: string;
  onChange?: (url: string | undefined) => void;
}

export function VideoUpload({ value, onChange }: VideoUploadProps) {
  const { t } = useTranslation();
  const [videoUrl, setVideoUrl] = useState<string | undefined>(value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setVideoUrl(value);
  }, [value]);

  const handleUpload = async (file: File) => {
    const isVideo =
      file.type === "video/mp4" ||
      file.type === "video/mpeg" ||
      file.name.toLowerCase().endsWith(".mp4") ||
      file.name.toLowerCase().endsWith(".mpeg");
    if (!isVideo) {
      message.error(
        t("cheats.form.onlyVideoFormatsAllowed") ||
          "Only MP4 and MPEG videos are allowed"
      );
      return false;
    }

    // Check file size (30MB limit)
    const isLt30M = file.size / 1024 / 1024 < 30;
    if (!isLt30M) {
      message.error("Размер видео превышает лимит 30MB");
      return false;
    }

    setUploading(true);
    try {
      const response = await uploadFile(file);
      setVideoUrl(response.url);
      onChange?.(response.url);
      message.success(
        t("cheats.form.videoUploaded") || "Video uploaded successfully"
      );
    } catch (error: any) {
      // Show server error message if available, otherwise show generic error
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Не удалось загрузить видео";
      message.error(errorMessage);
    } finally {
      setUploading(false);
    }

    return false;
  };

  const handleRemove = () => {
    setVideoUrl(undefined);
    onChange?.(undefined);
  };

  return (
    <Styled.VideoUploadWrapper>
      {videoUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Styled.VideoPreview>
            <Styled.VideoContainer>
              <video
                src={videoUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: 400,
                  borderRadius: 8,
                }}
              >
                Your browser does not support the video tag.
              </video>
            </Styled.VideoContainer>
            <Styled.VideoActions>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  disabled={uploading}
                  danger
                  size="small"
                >
                  {t("cheats.form.removeVideo") || "Remove Video"}
                </Button>
              </motion.div>
            </Styled.VideoActions>
          </Styled.VideoPreview>
        </motion.div>
      ) : (
        <Upload.Dragger
          beforeUpload={handleUpload}
          accept="video/mp4,video/mpeg,.mp4,.mpeg"
          showUploadList={false}
          disabled={uploading}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{t("cheats.form.uploadVideo") || "Upload Video (MP4/MPEG)"}</p>
          <p className="ant-upload-hint">{t("cheats.form.dragDropHint", "Перетащите файл сюда или нажмите для выбора")}</p>
        </Upload.Dragger>
      )}
    </Styled.VideoUploadWrapper>
  );
}
