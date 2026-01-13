import styled from "styled-components";

export const PlayerWrapper = styled.div(({ theme }) => ({
  width: "100%",
  borderRadius: theme.borderRadius.md,
  overflow: "hidden",
  backgroundColor: theme.colors.bg.secondary,
  border: `2px solid ${theme.colors.border.accent}`,

  // Additional wrapper styles - main Plyr styles are in plyr-custom.css
  "& .plyr": {
    borderRadius: theme.borderRadius.md,
  },
}));

export const KinescopeIframe = styled.iframe(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: 400,
  border: "none",
  borderRadius: theme.borderRadius.md,
  display: "block",
}));

export const YouTubeIframe = styled.iframe(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: 400,
  border: "none",
  borderRadius: theme.borderRadius.md,
  display: "block",
}));
