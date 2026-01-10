import styled from "styled-components";

export const FormWrapper = styled.div({
  padding: 24,
  backgroundColor: "#fff",
  borderRadius: 8,
});

export const ModalContent = styled.div({
  padding: 24,
});

export const DragDropArea = styled.div({
  width: "100%",
  "& .ant-upload-drag": {
    width: "100%",
    height: 150,
    border: "2px dashed #d9d9d9",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#1890ff",
      backgroundColor: "#f0f7ff",
    },
    "&.ant-upload-drag-hover": {
      borderColor: "#1890ff",
      backgroundColor: "#f0f7ff",
    },
  },
  "& .ant-upload-drag-container": {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  "& .ant-upload-text": {
    fontSize: 16,
    fontWeight: 500,
    color: "#666",
  },
  "& .ant-upload-hint": {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});

