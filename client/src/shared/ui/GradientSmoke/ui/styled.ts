import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div({
  position: "absolute",
  top: "-30%",
  left: "-30%",
  right: "-30%",
  bottom: "-30%",
  pointerEvents: "none",
  zIndex: 1,
  overflow: "visible",
  width: "160%",
  height: "160%",
});

interface SmokeLayerProps {
  $position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right" | "top-center" | "bottom-center";
}

const positionMap = {
  "top-left": {
    top: "5%",
    left: "5%",
    transform: "translate(-50%, -50%)",
  },
  "top-right": {
    top: "5%",
    right: "5%",
    transform: "translate(50%, -50%)",
  },
  "bottom-left": {
    bottom: "5%",
    left: "5%",
    transform: "translate(-50%, 50%)",
  },
  "bottom-right": {
    bottom: "5%",
    right: "5%",
    transform: "translate(50%, 50%)",
  },
  "center-left": {
    top: "50%",
    left: "0%",
    transform: "translate(-50%, -50%)",
  },
  "center-right": {
    top: "50%",
    right: "0%",
    transform: "translate(50%, -50%)",
  },
  "top-center": {
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "bottom-center": {
    bottom: "0%",
    left: "50%",
    transform: "translate(-50%, 50%)",
  },
};

export const SmokeLayer = styled(motion.div)<SmokeLayerProps>(({ $position }) => {
  const position = positionMap[$position];
  
  return {
    position: "absolute",
    ...position,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: `
      radial-gradient(
        circle at center,
        rgba(139, 92, 246, 0.5) 0%,
        rgba(139, 92, 246, 0.3) 25%,
        rgba(59, 130, 246, 0.2) 45%,
        rgba(59, 130, 246, 0.1) 65%,
        rgba(139, 92, 246, 0.05) 80%,
        transparent 100%
      )
    `,
    filter: "blur(60px)",
    pointerEvents: "none",
  };
});

