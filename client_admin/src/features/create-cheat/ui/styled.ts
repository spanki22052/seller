import styled from "styled-components";
import { Button } from "antd";

export const FormWrapper = styled.div({
  padding: 24,
  backgroundColor: "#fff",
  borderRadius: 8,
});

export const FunctionListsContainer = styled.div({
  width: "100%",
  "& .ant-card": {
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
});

export const PricingPlansContainer = styled.div({
  width: "100%",
  "& .ant-card": {
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
});

export const PriceInputWrapper = styled.div({
  flex: 1,
  "& .ant-input-number": {
    width: "100%",
  },
});

export const DurationInputWrapper = styled.div({
  flex: 1,
  "& .ant-input-number": {
    width: "100%",
  },
});

export const PlanPreview = styled.div({
  padding: 12,
  backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  borderRadius: 6,
  fontSize: 16,
  fontWeight: 500,
  color: "#262626",
  textAlign: "center",
  border: "1px solid #e8e8e8",
});

export const EmptyState = styled.div({
  padding: 32,
  textAlign: "center",
  backgroundColor: "#fafafa",
  borderRadius: 8,
  border: "1px dashed #d9d9d9",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#1890ff",
    backgroundColor: "#f0f7ff",
  },
});

export const ScreenshotsUploadWrapper = styled.div({
  width: "100%",
  "& .ant-upload-select": {
    width: "100%",
  },
  "& .ant-upload-list-picture-card": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 16,
  },
  "& .ant-upload-list-picture-card .ant-upload-list-item": {
    borderRadius: 8,
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  },
});

export const CircularImageUploadWrapper = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
});

export const CircularImagePreview = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export const CircularImageContainer = styled.div({
  width: 200,
  height: 200,
  borderRadius: "50%",
  overflow: "hidden",
  border: "3px solid #1890ff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(24, 144, 255, 0.3)",
    transform: "scale(1.02)",
  },
});

export const CircularImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const ImageActions = styled.div({
  display: "flex",
  gap: 12,
});

export const UploadButton = styled(Button)({
  width: "100%",
});

export const CropModalContent = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: 24,
  gap: 24,
});

export const CropHeader = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CropTitle = styled.h3({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
});

export const CropContainer = styled.div({
  position: "relative",
  width: "100%",
  minHeight: 400,
  maxHeight: 500,
  backgroundColor: "#f5f5f5",
  borderRadius: 8,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .ReactCrop": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  "& .ReactCrop__crop-selection": {
    border: "2px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
  },
});

export const CropControls = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const ZoomLabel = styled.span({
  fontSize: 14,
  fontWeight: 500,
  color: "#666",
});

export const SliderWrapper = styled.div({
  padding: "0 8px",
});

export const CropActions = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
});

export const MarkdownEditorWrapper = styled.div({
  width: "100%",
  "& .rc-md-editor": {
    borderRadius: 8,
    border: "1px solid #d9d9d9",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#40a9ff",
    },
    "&.rc-md-editor--focus": {
      borderColor: "#1890ff",
      boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
    },
  },
  "& .rc-md-editor .rc-md-navigation": {
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #e8e8e8",
    padding: "8px 12px",
  },
  "& .rc-md-editor .editor-container": {
    height: "500px",
  },
  "& .rc-md-editor .editor-container .section-container": {
    height: "100%",
  },
  "& .rc-md-editor .editor-container .section-container .section": {
    height: "100%",
  },
});

export const CheatImageUploadWrapper = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
});

export const CheatImagePreview = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export const CheatImageContainer = styled.div({
  width: "100%",
  maxWidth: 400,
  height: 300,
  borderRadius: 8,
  overflow: "hidden",
  border: "2px solid #1890ff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(24, 144, 255, 0.3)",
    transform: "scale(1.02)",
  },
});

export const CheatImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const VideoUploadWrapper = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
});

export const VideoPreview = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  width: "100%",
});

export const VideoContainer = styled.div({
  width: "100%",
  maxWidth: 600,
  borderRadius: 8,
  overflow: "hidden",
  border: "2px solid #1890ff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(24, 144, 255, 0.3)",
    transform: "scale(1.01)",
  },
});

export const VideoActions = styled.div({
  display: "flex",
  gap: 12,
});

