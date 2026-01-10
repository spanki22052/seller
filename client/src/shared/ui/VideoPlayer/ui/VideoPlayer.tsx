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
  // Check if it's a Kinescope embed URL
  const isKinescopeEmbed = src.includes('kinescope.io/embed/') || src.includes('kinescope.io/') && src.split('/').length === 4;

  // If it's a Kinescope video, use iframe embed instead of Plyr
  if (isKinescopeEmbed) {
    // Convert public kinescope.io URL to embed URL if needed
    const embedUrl = src.includes('/embed/') ? src : `https://kinescope.io/embed/${src.split('/').pop()}`;

    return (
      <Styled.PlayerWrapper className={className}>
        <Styled.KinescopeIframe
          src={embedUrl}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          title={title}
        />
      </Styled.PlayerWrapper>
    );
  }

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
