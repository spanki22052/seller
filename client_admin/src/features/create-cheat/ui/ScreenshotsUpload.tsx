import { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { UploadFile, UploadProps } from "antd";
import { uploadFile } from "@/entities/file";
import * as Styled from "./styled";

interface ScreenshotsUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
}

export function ScreenshotsUpload({ value = [], onChange }: ScreenshotsUploadProps) {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setFileList(
        value.map((url, index) => ({
          uid: `screenshot-${index}`,
          name: `screenshot-${index + 1}.jpg`,
          status: "done" as const,
          url,
        }))
      );
    } else {
      setFileList([]);
    }
  }, [value]);

  const handleUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadFile(file);
      return response.url;
    } catch (error) {
      message.error(t("cheats.form.uploadFailed"));
      throw error;
    }
  };

  const uploadProps: UploadProps = {
    disabled: uploading,
    beforeUpload: async (file) => {
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
        const url = await handleUpload(file);
        const newFile: UploadFile = {
          uid: `screenshot-${Date.now()}`,
          name: file.name,
          status: "done" as const,
          url,
        };
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        onChange?.(updatedList.map((f) => f.url || "").filter(Boolean));
      } catch (error) {
        message.error(t("cheats.form.uploadFailed"));
      } finally {
        setUploading(false);
      }

      return false;
    },
    accept: "image/*",
    fileList,
    onRemove: (file) => {
      const updatedList = fileList.filter((f) => f.uid !== file.uid);
      setFileList(updatedList);
      onChange?.(updatedList.map((f) => f.url || "").filter(Boolean));
      return true;
    },
    listType: "picture-card",
    maxCount: 20,
  };

  return (
    <Styled.ScreenshotsUploadWrapper>
      <Upload {...uploadProps}>
        {fileList.length < 20 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "20px 0" }}>
              <PlusOutlined style={{ fontSize: 24, color: "#999" }} />
              <div style={{ marginTop: 8, color: "#999" }}>
                {t("cheats.form.addScreenshot")}
              </div>
            </div>
          </motion.div>
        )}
      </Upload>
    </Styled.ScreenshotsUploadWrapper>
  );
}

