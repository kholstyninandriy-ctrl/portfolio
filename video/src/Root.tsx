import React from 'react';
import { Composition } from 'remotion';
import { Presentation, TOTAL_FRAMES } from './Presentation';

const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
    {/* Landscape master -- portfolio hero, YouTube, email, pitch decks. */}
    <Composition
      id="Presentation"
      component={Presentation}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    {/* Vertical cut -- Instagram Reels, TikTok, Telegram. Same edit, relaid out. */}
    <Composition
      id="PresentationVertical"
      component={Presentation}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
