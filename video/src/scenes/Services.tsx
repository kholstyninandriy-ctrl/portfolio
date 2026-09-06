import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { useLayout } from '../layout';
import { services } from '../content';
import { Scene } from '../components/Scene';

const ROW_ENTER = 18;
const ROW_STAGGER = 11;
const FOCUS_START = 76;
const FOCUS_LENGTH = 48;

/**
 * The white panel from the site, brought over one-for-one: numbered rows on a
 * white ground. In the video a cyan marker walks the list so each service gets
 * a beat of its own instead of all four sitting there statically.
 */
export const Services: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { pad, v, portrait } = useLayout();

  const focused = Math.min(
    services.length - 1,
    Math.max(0, Math.floor((frame - FOCUS_START) / FOCUS_LENGTH)),
  );
  const titleIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: theme.color.panel }} />

      {/* Faint cyan wash so the white panel still belongs to the film. */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(70% 90% at 88% 8%, rgba(79,224,255,0.16) 0%, transparent 62%)',
        }}
      />

      <AbsoluteFill style={{ padding: pad, justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 40,
            marginBottom: v(46, 44),
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <h2
              style={{
                margin: 0,
                // The mask needs more room than the 0.9 line box, or the
                // baseline of a 150px cap-height gets shaved off.
                paddingBottom: v(150, 128) * 0.16,
                fontFamily: theme.font,
                fontWeight: 900,
                fontSize: v(150, 128),
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: theme.color.onPanel,
                transform: `translateY(${(1 - titleIn) * 100}%)`,
              }}
            >
              Services
            </h2>
          </div>
          <span
            style={{
              fontFamily: theme.font,
              fontWeight: 500,
              fontSize: v(22, 20),
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(12, 12, 12, 0.45)',
              paddingBottom: v(28, 24),
              opacity: titleIn,
            }}
          >
            What I do
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, i) => {
            const enter = spring({
              frame: frame - ROW_ENTER - i * ROW_STAGGER,
              fps,
              config: { damping: 200, mass: 0.8 },
              durationInFrames: 28,
            });
            const isFocused = i === focused && frame >= FOCUS_START;
            const focusT = interpolate(
              frame,
              [FOCUS_START + i * FOCUS_LENGTH, FOCUS_START + i * FOCUS_LENGTH + 12],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            const dim = isFocused ? 1 : 0.42;

            return (
              <div
                key={service.number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: v(40, 34),
                  padding: `${v(26, 34)}px 0`,
                  borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                  borderBottom:
                    i === services.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                  opacity: enter * dim,
                  transform: `translateX(${(1 - enter) * 60}px)`,
                  position: 'relative',
                }}
              >
                {/* Cyan focus marker. */}
                <div
                  style={{
                    position: 'absolute',
                    left: v(-pad / 2, -pad / 2.4),
                    top: '18%',
                    bottom: '18%',
                    width: 5,
                    borderRadius: 4,
                    background: theme.color.accent,
                    boxShadow: `0 0 18px ${theme.color.accent}`,
                    opacity: isFocused ? focusT : 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: theme.font,
                    fontWeight: 900,
                    fontSize: v(96, 88),
                    lineHeight: 1,
                    color: isFocused ? theme.color.accent : theme.color.onPanel,
                    flexShrink: 0,
                    minWidth: v(150, 128),
                  }}
                >
                  {service.number}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: v(10, 12) }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: theme.font,
                      fontWeight: 500,
                      fontSize: v(40, 40),
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      color: theme.color.onPanel,
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: v(1180, 880),
                      fontFamily: theme.font,
                      fontWeight: 300,
                      fontSize: v(23, 26),
                      lineHeight: 1.45,
                      color: 'rgba(12, 12, 12, 0.6)',
                      // Descriptions only read on the focused row; portrait
                      // frames keep them all visible because there is room.
                      opacity: portrait || isFocused ? 1 : 0.75,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
