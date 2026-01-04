"use client";

import React from "react";
import { Plyr } from "plyr-react";
import "plyr/dist/plyr.css";
import "./plyr-custom.css";
import * as Styled from "./styled";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  controls = true,
  className,
}: VideoPlayerProps) {
  const options = {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "pip",
      "airplay",
      "fullscreen",
    ],
    settings: ["captions", "quality", "speed"],
    autoplay,
    clickToPlay: true,
    keyboard: { focused: true, global: false },
    tooltips: { controls: true, seek: true },
    captions: { active: false, language: "auto", update: false },
    fullscreen: { enabled: true, iosNative: false },
    ratio: "16:9",
  };

  return (
    <Styled.PlayerWrapper className={className}>
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src,
              type: "video/mp4",
            },
          ],
          poster,
          title,
        }}
        options={options}
      />
    </Styled.PlayerWrapper>
  );
}
