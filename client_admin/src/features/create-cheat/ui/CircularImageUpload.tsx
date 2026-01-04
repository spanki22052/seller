import { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { uploadFile } from "@/entities/file";
import { CropCircularModal } from "./CropCircularModal";
import * as Styled from "./styled";

interface CircularImageUploadProps {
  value?: string;
  onChange?: (url: string | undefined) => void;
}

export function CircularImageUpload({ value, onChange }: CircularImageUploadProps) {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleFileSelect = (file: File) => {
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

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setTempImageSrc(src);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleCropComplete = async (croppedFile: File) => {
    setUploading(true);
    try {
      const response = await uploadFile(croppedFile);
      setImageUrl(response.url);
      onChange?.(response.url);
      message.success(t("cheats.form.circularImageUploaded"));
    } catch (error) {
      message.error(t("cheats.form.uploadFailed"));
    } finally {
      setUploading(false);
      setCropModalOpen(false);
      setTempImageSrc("");
    }
  };

  const handleRemove = () => {
    setImageUrl(undefined);
    onChange?.(undefined);
  };

  const handleEdit = () => {
    if (imageUrl) {
      setTempImageSrc(imageUrl);
      setCropModalOpen(true);
    }
  };

  return (
    <>
      <Styled.CircularImageUploadWrapper>
        {imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Styled.CircularImagePreview>
            <Styled.CircularImageContainer>
              <Styled.CircularImage src={imageUrl} alt="Circular cheat image" />
            </Styled.CircularImageContainer>
            <Styled.ImageActions>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  disabled={uploading}
                  size="small"
                >
                  {t("cheats.form.editImage")}
                </Button>
              </motion.div>
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
            </Styled.CircularImagePreview>
          </motion.div>
        ) : (
          <Upload
            beforeUpload={handleFileSelect}
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
                {t("cheats.form.uploadCircularImage")}
              </Styled.UploadButton>
            </motion.div>
          </Upload>
        )}
      </Styled.CircularImageUploadWrapper>

      <CropCircularModal
        open={cropModalOpen}
        imageSrc={tempImageSrc}
        onClose={() => {
          setCropModalOpen(false);
          setTempImageSrc("");
        }}
        onCropComplete={handleCropComplete}
      />
    </>
  );
}

