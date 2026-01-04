import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalContent = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  padding: 24,
  gap: 24,
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Title = styled.h3({
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

export const Controls = styled.div({
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

export const Actions = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
});

