import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { useLayout } from '../layout';
import { outro, identity } from '../content';
import { Backdrop } from '../components/Backdrop';
import { Shot, Scrim } from '../components/Media';
import { Scene } from '../components/Scene';
import { Heading, Reveal, Rule } from '../components/Type';

/** Closing call to action, over the closing portrait. */
export const Outro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { pad, v, portrait } = useLayout();

  return (
    <Scene durationInFrames={durationInFrames}>
      <Backdrop bloom={{ x: 50, y: 55 }} />

      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [0, 26], [0, 0.5], { extrapolateRight: 'clamp' }),
        }}
      >
        <Shot
          name="shotClosing"
          zoom={[1.12, 1.02]}
          durationInFrames={durationInFrames}
          style={portrait ? { top: '8%', height: '62%' } : {}}
        />
        <Scrim
          gradient={
            portrait
              ? 'linear-gradient(180deg, rgba(12,12,12,0.6) 0%, rgba(12,12,12,0.35) 30%, #0C0C0C 82%)'
              : 'linear-gradient(180deg, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.45) 40%, rgba(12,12,12,0.95) 100%)'
          }
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: pad,
          justifyContent: portrait ? 'flex-end' : 'center',
          alignItems: 'center',
          paddingBottom: portrait ? pad * 3 : pad,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: v(26, 20),
          }}
        >
          <Heading text={outro.heading} size={v(196, 132)} delay={4} stagger={6} align="center" />
          <div style={{ width: v(420, 300) }}>
            <Rule delay={28} />
          </div>
          <Reveal delay={34} y={22}>
            <p
              style={{
                margin: 0,
                maxWidth: v(700, 760),
                fontFamily: theme.font,
                fontWeight: 300,
                fontSize: v(29, 26),
                lineHeight: 1.5,
                color: theme.color.ink,
              }}
            >
              {outro.line}
            </p>
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexDirection: portrait ? 'column' : 'row',
              gap: v(18, 14),
              marginTop: v(24, 18),
              alignItems: 'center',
            }}
          >
            {outro.links.map((link, i) => (
              <Reveal key={link.label} delay={48 + i * 8} y={20}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                    padding: `${v(15, 13)}px ${v(30, 26)}px`,
                    borderRadius: 999,
                    border: '1.5px solid rgba(215, 226, 234, 0.24)',
                    background: 'rgba(215, 226, 234, 0.04)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: theme.font,
                      fontWeight: 500,
                      fontSize: v(17, 16),
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: theme.color.accent,
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: theme.font,
                      fontWeight: 300,
                      fontSize: v(25, 22),
                      color: theme.color.ink,
                    }}
                  >
                    {link.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* Sign-off in the corner. */}
      <AbsoluteFill style={{ padding: pad, justifyContent: 'flex-start' }}>
        <Reveal delay={10} y={-14}>
          <span
            style={{
              fontFamily: theme.font,
              fontWeight: 700,
              fontSize: v(24, 20),
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: theme.color.inkFaint,
            }}
          >
            {identity.name} — {identity.role}
          </span>
        </Reveal>
      </AbsoluteFill>
    </Scene>
  );
};
