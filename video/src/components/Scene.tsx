import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

/**
 * Wraps a scene in its own dissolve. Scenes are scheduled with a 15-frame
 * overlap in Presentation.tsx, so one fades up while the previous fades down.
 */
export const Scene: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  fade?: number;
  style?: React.CSSProperties;
}> = ({ durationInFrames, children, fade = 10, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, fade, durationInFrames - fade, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return <AbsoluteFill style={{ opacity, ...style }}>{children}</AbsoluteFill>;
};
