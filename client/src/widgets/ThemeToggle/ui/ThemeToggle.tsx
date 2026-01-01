"use client";

import React from "react";
import { useThemeActions, useThemeState } from "@/shared/contexts/ThemeContext";
import * as Styled from "./styled";

export const ThemeToggle = () => {
  const { isDark } = useThemeState();
  const { toggleTheme } = useThemeActions();

  return (
    <Styled.ToggleButton onClick={toggleTheme}>
      {isDark ? (
        <Styled.Icon>dark_mode</Styled.Icon>
      ) : (
        <Styled.Icon>light_mode</Styled.Icon>
      )}
    </Styled.ToggleButton>
  );
};

