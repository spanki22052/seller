import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, ColorPicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { useEditGame } from "../hooks/useEditGame";
import { UpdateGameDto, Game } from "@/entities/game";
import { uploadFile } from "@/entities/file";
import { CropIconModal } from "@/features/crop-icon-image";
import * as Styled from "./styled";

interface EditGameFormProps {
  game: Game;
  onSuccess?: () => void;
}

export function EditGameForm({ game, onSuccess }: EditGameFormProps) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const editGame = useEditGame();
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<UploadFile | null>(null);
  const [iconFile, setIconFile] = useState<UploadFile | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [iconPreviewSrc, setIconPreviewSrc] = useState<string>("");

  useEffect(() => {
    form.setFieldsValue({
      name: game.name,
      color: game.color,
    });
  }, [game, form]);

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
      const dto: UpdateGameDto = {
        name: values.name,
        color: values.color,
      };

      // Upload files if they exist
      if (imageFile) {
        dto.image = await handleFileUpload(imageFile.originFileObj as File);
      }
      if (backgroundImageFile) {
        dto.backgroundImage = await handleFileUpload(
          backgroundImageFile.originFileObj as File
        );
      }
      if (iconFile) {
        dto.icon = await handleFileUpload(iconFile.originFileObj as File);
      }

      await editGame.mutateAsync({ id: game.id, dto });
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
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(t("games.form.onlyImagesAllowed"));
        return Upload.LIST_IGNORE;
      }
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        message.error(t("games.form.fileSizeLimit"));
        return Upload.LIST_IGNORE;
      }
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
        disabled={editGame.isPending || uploading}
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
          getValueFromEvent={(color) => color.toHexString()}
        >
          <ColorPicker showText format="hex" />
        </Form.Item>

        <Form.Item
          label={t("games.form.image")}
          tooltip={t("games.form.imageTooltip")}
        >
          {game.image && !imageFile && (
            <div style={{ marginBottom: 8 }}>
              <img
                src={game.image}
                alt="Current"
                style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
              />
            </div>
          )}
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
          {game.backgroundImage && !backgroundImageFile && (
            <div style={{ marginBottom: 8 }}>
              <img
                src={game.backgroundImage}
                alt="Current"
                style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
              />
            </div>
          )}
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
            <Button icon={<UploadOutlined />}>
              {t("games.form.selectBackgroundImage")}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label={t("games.form.icon")} tooltip={t("games.form.iconTooltip")}>
          {game.icon && !iconFile && (
            <div style={{ marginBottom: 8 }}>
              <img
                src={game.icon}
                alt="Current"
                style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
              />
            </div>
          )}
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
            loading={editGame.isPending || uploading}
            block
          >
            {t("games.updateGame")}
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

