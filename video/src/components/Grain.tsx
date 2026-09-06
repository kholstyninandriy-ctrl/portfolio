import React from 'react';
import { AbsoluteFill, random, useCurrentFrame } from 'remotion';

/**
 * A very light film grain laid over the whole film. It is an SVG feTurbulence
 * whose seed steps every other frame, which is enough to break up the flat
 * blacks without shimmering.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.055 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(random(`grain-${Math.floor(frame / 2)}`) * 1000);

  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
