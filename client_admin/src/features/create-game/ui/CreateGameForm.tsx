import { useState } from "react";
import { Form, Input, Button, Upload, message, ColorPicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateGame } from "../hooks/useCreateGame";
import { CreateGameDto } from "@/entities/game";
import { uploadFile } from "@/entities/file";
import { CropIconModal } from "@/features/crop-icon-image";
import * as Styled from "./styled";

export function CreateGameForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createGame = useCreateGame();
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<UploadFile | null>(null);
  const [iconFile, setIconFile] = useState<UploadFile | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [iconPreviewSrc, setIconPreviewSrc] = useState<string>("");

  const handleFileUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadFile(file);
      return response.url;
    } catch (error) {
      message.error(t("games.form.uploadFailed"));
      throw error;
    }
  };

  const handleSubmit = async (values: { name: string; color: string }) => {
    setUploading(true);
    try {
      const dto: CreateGameDto = {
        name: values.name,
        color: values.color,
      };

      // Upload files if they exist
      if (imageFile) {
        dto.image = await handleFileUpload(imageFile.originFileObj as File);
      }
      if (backgroundImageFile) {
        dto.backgroundImage = await handleFileUpload(backgroundImageFile.originFileObj as File);
      }
      if (iconFile) {
        dto.icon = await handleFileUpload(iconFile.originFileObj as File);
      }

      await createGame.mutateAsync(dto);
      form.resetFields();
      setImageFile(null);
      setBackgroundImageFile(null);
      setIconFile(null);
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hook
    } finally {
      setUploading(false);
    }
  };

  const handleIconFileSelect = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("games.form.onlyImagesAllowed"));
      return;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error(t("games.form.fileSizeLimit"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setIconPreviewSrc(src);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleIconCropComplete = (croppedFile: File) => {
    const uploadFile: UploadFile = {
      uid: `icon-${Date.now()}`,
      name: croppedFile.name,
      status: "done",
      originFileObj: croppedFile as any,
    };
    setIconFile(uploadFile);
    setCropModalOpen(false);
    setIconPreviewSrc("");
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => {
      return false; // Prevent auto upload
    },
    maxCount: 1,
    accept: "image/*",
  };

  const iconUploadProps: UploadProps = {
    ...uploadProps,
    beforeUpload: (file) => {
      handleIconFileSelect(file);
      return false; // Prevent auto upload
    },
  };

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createGame.isPending || uploading}
      >
        <Form.Item
          name="name"
          label={t("games.form.gameName")}
          rules={[{ required: true, message: t("games.form.gameNameRequired") }]}
        >
          <Input placeholder={t("games.form.gameNamePlaceholder")} />
        </Form.Item>

        <Form.Item
          name="color"
          label={t("games.form.color")}
          rules={[{ required: true, message: t("games.form.colorRequired") }]}
          initialValue="#1890ff"
          getValueFromEvent={(color) => color.toHexString()}
        >
          <ColorPicker showText format="hex" />
        </Form.Item>

        <Form.Item
          label={t("games.form.image")}
          tooltip={t("games.form.imageTooltip")}
        >
          <Upload
            {...uploadProps}
            fileList={imageFile ? [imageFile] : []}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                setImageFile(info.fileList[0]);
              } else {
                setImageFile(null);
              }
            }}
            onRemove={() => {
              setImageFile(null);
              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>{t("games.form.selectImage")}</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={t("games.form.backgroundImage")}
          tooltip={t("games.form.backgroundImageTooltip")}
        >
          <Upload
            {...uploadProps}
            fileList={backgroundImageFile ? [backgroundImageFile] : []}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                setBackgroundImageFile(info.fileList[0]);
              } else {
                setBackgroundImageFile(null);
              }
            }}
            onRemove={() => {
              setBackgroundImageFile(null);
              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>{t("games.form.selectBackgroundImage")}</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={t("games.form.icon")}
          tooltip={t("games.form.iconTooltip")}
        >
          <Upload
            {...iconUploadProps}
            fileList={iconFile ? [iconFile] : []}
            onRemove={() => {
              setIconFile(null);
              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>{t("games.form.selectIcon")}</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createGame.isPending || uploading}
            block
          >
            {t("games.createGame")}
          </Button>
        </Form.Item>
      </Form>

      <CropIconModal
        open={cropModalOpen}
        imageSrc={iconPreviewSrc}
        onClose={() => {
          setCropModalOpen(false);
          setIconPreviewSrc("");
        }}
        onCropComplete={handleIconCropComplete}
      />
    </Styled.FormWrapper>
  );
}

