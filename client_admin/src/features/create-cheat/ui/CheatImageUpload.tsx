import { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { uploadCheatImage } from "@/entities/file";
import * as Styled from "./styled";

interface CheatImageUploadProps {
  value?: string;
  onChange?: (url: string | undefined) => void;
}

export function CheatImageUpload({ value, onChange }: CheatImageUploadProps) {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleUpload = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("cheats.form.onlyImagesAllowed"));
      return false;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error(t("cheats.form.fileSizeLimit"));
      return false;
    }

    setUploading(true);
    try {
      const response = await uploadCheatImage(file);
      setImageUrl(response.url);
      onChange?.(response.url);
      message.success(t("cheats.form.imageUploaded") || "Image uploaded successfully");
    } catch (error) {
      message.error(t("cheats.form.uploadFailed"));
    } finally {
      setUploading(false);
    }

    return false;
  };

  const handleRemove = () => {
    setImageUrl(undefined);
    onChange?.(undefined);
  };

  return (
    <Styled.CheatImageUploadWrapper>
      {imageUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Styled.CheatImagePreview>
            <Styled.CheatImageContainer>
              <Styled.CheatImage src={imageUrl} alt="Cheat image" />
            </Styled.CheatImageContainer>
            <Styled.ImageActions>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  disabled={uploading}
                  danger
                  size="small"
                >
                  {t("cheats.form.removeImage")}
                </Button>
              </motion.div>
            </Styled.ImageActions>
          </Styled.CheatImagePreview>
        </motion.div>
      ) : (
        <Upload
          beforeUpload={handleUpload}
          accept="image/*"
          showUploadList={false}
          disabled={uploading}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Styled.UploadButton
              htmlType="button"
              icon={<UploadOutlined />}
              loading={uploading}
              disabled={uploading}
            >
              {t("cheats.form.uploadImage") || "Upload cheat image"}
            </Styled.UploadButton>
          </motion.div>
        </Upload>
      )}
    </Styled.CheatImageUploadWrapper>
  );
}

