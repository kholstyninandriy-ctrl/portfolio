import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme, gradientText } from '../theme';
import { useLayout } from '../layout';
import { positioning } from '../content';
import { Clip, Scrim } from '../components/Media';
import { Scene } from '../components/Scene';

/**
 * The value proposition, as kinetic type over the desk b-roll. Each line wipes
 * up from its own mask on a 9-frame stagger; the last line is the one that gets
 * the cyan.
 */
export const Positioning: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { pad, v, portrait } = useLayout();

  const size = v(112, 82);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: theme.color.bg }}>
        <Clip name="clipDesk" posterName="shotDesk" playbackRate={0.95} />
        <Scrim gradient="linear-gradient(90deg, rgba(12,12,12,0.96) 0%, rgba(12,12,12,0.9) 40%, rgba(12,12,12,0.66) 74%, rgba(12,12,12,0.45) 100%)" />
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: pad, justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {positioning.map((line, i) => {
            const t = spring({
              frame: frame - 8 - i * 9,
              fps,
              config: { damping: 200, mass: 0.8 },
              durationInFrames: 30,
            });
            const isLast = i === positioning.length - 1;
            return (
              <span
                key={line}
                style={{ display: 'block', overflow: 'hidden', paddingBottom: size * 0.04 }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: theme.font,
                    fontWeight: 900,
                    fontSize: size,
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    transform: `translateY(${(1 - t) * 100}%)`,
                    ...(isLast
                      ? { color: theme.color.accent, textShadow: `0 0 42px rgba(79,224,255,0.4)` }
                      : gradientText),
                  }}
                >
                  {line}
                </span>
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* A thin cyan sweep that crosses the frame under the type. */}
      <AbsoluteFill style={{ padding: pad, justifyContent: 'flex-end' }}>
        <div
          style={{
            height: 2,
            width: `${interpolate(frame, [46, 96], [0, 100], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}%`,
            background: theme.color.accent,
            boxShadow: `0 0 18px ${theme.color.accent}`,
            opacity: portrait ? 0.9 : 1,
          }}
        />
      </AbsoluteFill>
    </Scene>
  );
};
