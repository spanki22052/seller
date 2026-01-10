import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCheat } from "../hooks/useCreateCheat";
import { CreateCheatDto } from "@/entities/cheat";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys } from "@/entities/game";
import { getBrands, brandKeys } from "@/entities/brand";
import { uploadFile } from "@/entities/file";
import * as Styled from "./styled";

interface CreateCheatFormValues {
  gameId: string;
  brandId: string;
  cheatDigitId?: string;
  price: number;
  description?: string;
}

const { TextArea } = Input;

export function CreateCheatForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createCheat = useCreateCheat();
  const [uploading, setUploading] = useState(false);

  // File states
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [circularImageFile, setCircularImageFile] = useState<UploadFile | null>(
    null
  );
  const [backgroundImageFile, setBackgroundImageFile] =
    useState<UploadFile | null>(null);
  const [videoThumbnailFile, setVideoThumbnailFile] =
    useState<UploadFile | null>(null);
  const [screenshotsFiles, setScreenshotsFiles] = useState<UploadFile[]>([]);

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrands,
  });

  const handleFileUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadFile(file);
      return response.url;
    } catch (error) {
      message.error(t("cheats.form.uploadFailed"));
      throw error;
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => {
      return false; // Prevent auto upload
    },
    maxCount: 1,
    accept: "image/*",
  };

  const screenshotsUploadProps: UploadProps = {
    beforeUpload: () => {
      return false; // Prevent auto upload
    },
    multiple: true,
    accept: "image/*",
  };

  const handleSubmit = async (values: CreateCheatFormValues) => {
    setUploading(true);
    try {
      // Find selected brand
      const selectedBrand = brands.find((brand) => brand.id === values.brandId);
      if (!selectedBrand) {
        throw new Error(t("cheats.form.selectedBrandNotFound"));
      }

      // Automatically generate name from brand name
      const dto: CreateCheatDto = {
        gameId: values.gameId,
        brandId: values.brandId,
        cheatDigitId: values.cheatDigitId,
        description: values.description,
        name: selectedBrand.name, // Use brand name as cheat name
        productName: selectedBrand.name, // Use brand name as product name
        price: {
          amount: values.price,
          currency: "USD",
        },
        breadcrumbs: [], // Empty breadcrumbs for simple form
      };

      // Upload files if they exist
      if (imageFile) {
        dto.image = await handleFileUpload(imageFile.originFileObj as File);
      }
      if (circularImageFile) {
        dto.circularImage = await handleFileUpload(
          circularImageFile.originFileObj as File
        );
      }
      if (backgroundImageFile) {
        dto.backgroundImage = await handleFileUpload(
          backgroundImageFile.originFileObj as File
        );
      }
      if (videoThumbnailFile) {
        dto.videoThumbnail = await handleFileUpload(
          videoThumbnailFile.originFileObj as File
        );
      }
      if (screenshotsFiles.length > 0) {
        const screenshotUrls = await Promise.all(
          screenshotsFiles.map((file) =>
            handleFileUpload(file.originFileObj as File)
          )
        );
        dto.screenshots = screenshotUrls;
      }

      await createCheat.mutateAsync(dto);
      form.resetFields();

      // Reset file states
      setImageFile(null);
      setCircularImageFile(null);
      setBackgroundImageFile(null);
      setVideoThumbnailFile(null);
      setScreenshotsFiles([]);

      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hook
    } finally {
      setUploading(false);
    }
  };

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createCheat.isPending || uploading}
      >
        <Form.Item
          name="gameId"
          label={t("cheats.form.game")}
          rules={[{ required: true, message: t("cheats.form.gameRequired") }]}
        >
          <Select
            placeholder={t("cheats.form.gamePlaceholder")}
            loading={gamesLoading}
            showSearch
            optionFilterProp="children"
          >
            {games.map((game) => (
              <Select.Option key={game.id} value={game.id}>
                {game.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="brandId"
          label={t("cheats.form.brandName")}
          rules={[
            { required: true, message: t("cheats.form.brandNameRequired") },
          ]}
        >
          <Select
            placeholder={t("cheats.form.brandNamePlaceholder")}
            loading={brandsLoading}
            showSearch
            optionFilterProp="children"
          >
            {brands.map((brand) => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="cheatDigitId" label={t("cheats.form.cheatDigitId")}>
          <Input placeholder={t("cheats.form.cheatDigitIdPlaceholder")} />
        </Form.Item>

        <Form.Item
          name="price"
          label={t("cheats.form.price")}
          rules={[{ required: true, message: t("cheats.form.priceRequired") }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            placeholder={t("cheats.form.pricePlaceholder")}
            style={{ width: "100%" }}
            prefix="$"
          />
        </Form.Item>

        <Form.Item name="description" label={t("cheats.form.description")}>
          <TextArea
            rows={4}
            placeholder={t("cheats.form.descriptionPlaceholder")}
          />
        </Form.Item>

        <Form.Item
          label={t("cheats.form.image")}
          tooltip={t("cheats.form.imageTooltip")}
        >
          <Styled.DragDropArea>
            <Upload.Dragger
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
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t("cheats.form.selectImage")}</p>
              <p className="ant-upload-hint">
                {t(
                  "cheats.form.dragDropHint",
                  "Перетащите файл сюда или нажмите для выбора"
                )}
              </p>
            </Upload.Dragger>
          </Styled.DragDropArea>
        </Form.Item>

        <Form.Item
          label={t("cheats.form.circularImage")}
          tooltip={t("cheats.form.circularImageTooltip")}
        >
          <Styled.DragDropArea>
            <Upload.Dragger
              {...uploadProps}
              fileList={circularImageFile ? [circularImageFile] : []}
              onChange={(info) => {
                if (info.fileList.length > 0) {
                  setCircularImageFile(info.fileList[0]);
                } else {
                  setCircularImageFile(null);
                }
              }}
              onRemove={() => {
                setCircularImageFile(null);
                return true;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("cheats.form.selectCircularImage")}
              </p>
              <p className="ant-upload-hint">
                {t(
                  "cheats.form.dragDropHint",
                  "Перетащите файл сюда или нажмите для выбора"
                )}
              </p>
            </Upload.Dragger>
          </Styled.DragDropArea>
        </Form.Item>

        <Form.Item
          label={t("cheats.form.backgroundImage")}
          tooltip={t("cheats.form.backgroundImageTooltip")}
        >
          <Styled.DragDropArea>
            <Upload.Dragger
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
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("cheats.form.selectBackgroundImage")}
              </p>
              <p className="ant-upload-hint">
                {t(
                  "cheats.form.dragDropHint",
                  "Перетащите файл сюда или нажмите для выбора"
                )}
              </p>
            </Upload.Dragger>
          </Styled.DragDropArea>
        </Form.Item>

        <Form.Item
          label={t("cheats.form.videoThumbnail")}
          tooltip={t("cheats.form.videoThumbnailTooltip")}
        >
          <Styled.DragDropArea>
            <Upload.Dragger
              {...uploadProps}
              fileList={videoThumbnailFile ? [videoThumbnailFile] : []}
              onChange={(info) => {
                if (info.fileList.length > 0) {
                  setVideoThumbnailFile(info.fileList[0]);
                } else {
                  setVideoThumbnailFile(null);
                }
              }}
              onRemove={() => {
                setVideoThumbnailFile(null);
                return true;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("cheats.form.selectVideoThumbnail")}
              </p>
              <p className="ant-upload-hint">
                {t(
                  "cheats.form.dragDropHint",
                  "Перетащите файл сюда или нажмите для выбора"
                )}
              </p>
            </Upload.Dragger>
          </Styled.DragDropArea>
        </Form.Item>

        <Form.Item
          label={t("cheats.form.screenshots")}
          tooltip={t("cheats.form.screenshotsTooltip")}
        >
          <Styled.ScreenshotsUploadWrapper>
            <Upload.Dragger
              {...screenshotsUploadProps}
              fileList={screenshotsFiles}
              onChange={(info) => {
                setScreenshotsFiles(info.fileList);
              }}
              onRemove={(file) => {
                setScreenshotsFiles(
                  screenshotsFiles.filter((f) => f.uid !== file.uid)
                );
                return true;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("cheats.form.selectScreenshots")}
              </p>
              <p className="ant-upload-hint">
                {t(
                  "cheats.form.dragDropHint",
                  "Перетащите файлы сюда или нажмите для выбора"
                )}
              </p>
            </Upload.Dragger>
          </Styled.ScreenshotsUploadWrapper>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createCheat.isPending || uploading}
            block
          >
            {t("cheats.createCheat")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}
