import React, { useState } from 'react';
import { AbsoluteFill, Img, OffthreadVideo, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { src, type AssetName } from '../media';

/**
 * Shown instead of an AI shot when the file cannot be loaded (no network while
 * using the remote CDN, or `npm run fetch:media` has not been run yet). It is a
 * deliberate, on-brand plate rather than a broken-image box, so the cut always
 * plays through.
 */
const Fallback: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 1.6);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 70% at 50% 45%, rgba(79, 224, 255, ${
          0.1 + pulse * 0.05
        }) 0%, #0C0C0C 72%)`,
      }}
    />
  );
};

/** A generated still, with a Ken Burns move driven by the scene's own frame. */
export const Shot: React.FC<{
  name: AssetName;
  /** Scale at the first frame and at the last frame of the surrounding scene. */
  zoom?: [number, number];
  pan?: [number, number];
  durationInFrames?: number;
  style?: React.CSSProperties;
}> = ({ name, zoom = [1.06, 1.16], pan = [0, 0], durationInFrames, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: total } = useVideoConfig();
  const [failed, setFailed] = useState(false);
  const span = durationInFrames ?? total;
  const t = Math.min(1, Math.max(0, frame / Math.max(1, span - 1)));
  const scale = zoom[0] + (zoom[1] - zoom[0]) * t;
  const x = pan[0] + (pan[1] - pan[0]) * t;

  if (failed) return <Fallback />;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', ...style }}>
      <Img
        src={src(name)}
        onError={() => setFailed(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translateX(${x}%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * A generated clip. The Higgsfield clips are 5s at 30fps; `playbackRate` lets a
 * scene stretch one across a longer beat without freezing on the last frame.
 */
export const Clip: React.FC<{
  name: AssetName;
  /** Still shown if the clip itself will not load. */
  posterName: AssetName;
  playbackRate?: number;
  style?: React.CSSProperties;
}> = ({ name, posterName, playbackRate = 1, style }) => {
  const [failed, setFailed] = useState(false);

  if (failed) return <Shot name={posterName} />;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', ...style }}>
      <OffthreadVideo
        src={src(name)}
        muted
        playbackRate={playbackRate}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};

/** Darkens footage so type stays readable on top of it. */
export const Scrim: React.FC<{
  /** CSS gradient. Defaults to a bottom-weighted scrim. */
  gradient?: string;
}> = ({
  gradient = `linear-gradient(180deg, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.2) 35%, rgba(12,12,12,0.92) 100%)`,
}) => <AbsoluteFill style={{ background: gradient, mixBlendMode: 'multiply' }} />;

export const accentLine = theme.color.accent;
