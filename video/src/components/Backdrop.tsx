import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

/**
 * The shared dark canvas: base colour, a slowly drifting technical grid, a
 * breathing cyan bloom and a vignette. Every dark scene sits on top of this so
 * cuts never feel like they change rooms.
 */
export const Backdrop: React.FC<{
  /** 0 = no grid, 1 = full grid. */
  grid?: number;
  /** Position of the cyan bloom, in percent of the frame. */
  bloom?: { x: number; y: number };
}> = ({ grid = 1, bloom = { x: 78, y: 40 } }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = (frame / fps) * 6;
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 1.1);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.bg }}>
      <AbsoluteFill
        style={{
          opacity: 0.5 * grid,
          backgroundImage: `linear-gradient(${theme.color.accent}22 1px, transparent 1px), linear-gradient(90deg, ${theme.color.accent}22 1px, transparent 1px)`,
          backgroundSize: '96px 96px',
          backgroundPosition: `${drift}px ${drift * 0.6}px`,
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 78%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(46% 62% at ${bloom.x}% ${bloom.y}%, rgba(79, 224, 255, ${
            0.14 + pulse * 0.06
          }) 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0, 0, 0, 0.72) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
