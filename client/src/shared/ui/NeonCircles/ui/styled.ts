import styled from "styled-components";

export const Container = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  zIndex: 3,
  overflow: "visible",
});

export const CircleWrapper = styled.div({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
});

