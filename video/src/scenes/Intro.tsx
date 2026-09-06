import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { useLayout } from '../layout';
import { identity } from '../content';
import { Backdrop } from '../components/Backdrop';
import { Clip, Scrim } from '../components/Media';
import { Scene } from '../components/Scene';
import { Eyebrow, Heading, Reveal, Rule } from '../components/Type';

/**
 * Opening title. The Higgsfield portrait clip plays behind the type, held back
 * far enough that the name is what the eye lands on first.
 */
export const Intro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { pad, v, portrait } = useLayout();

  const clipOpacity = interpolate(frame, [0, 30], [0, 0.62], { extrapolateRight: 'clamp' });

  return (
    <Scene durationInFrames={durationInFrames}>
      <Backdrop bloom={{ x: portrait ? 50 : 72, y: portrait ? 30 : 45 }} />

      <AbsoluteFill style={{ opacity: clipOpacity }}>
        <Clip
          name="clipHero"
          posterName="shotHero"
          playbackRate={0.9}
          style={
            portrait
              ? { height: '58%', top: 0 }
              : { left: '38%', width: '62%' }
          }
        />
        <Scrim
          gradient={
            portrait
              ? 'linear-gradient(180deg, rgba(12,12,12,0.35) 0%, rgba(12,12,12,0.2) 40%, #0C0C0C 92%)'
              : 'linear-gradient(90deg, #0C0C0C 18%, rgba(12,12,12,0.55) 48%, rgba(12,12,12,0.15) 100%)'
          }
        />
      </AbsoluteFill>

      {/* Nav strip, echoing the site header. */}
      <AbsoluteFill style={{ padding: pad, justifyContent: 'flex-start' }}>
        <Reveal delay={4} y={-18}>
          <div
            style={{
              display: 'flex',
              gap: v(48, 30),
              fontFamily: theme.font,
              fontWeight: 500,
              fontSize: v(24, 20),
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: theme.color.inkFaint,
            }}
          >
            {identity.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </AbsoluteFill>

      {/* Title block. */}
      <AbsoluteFill
        style={{
          padding: pad,
          justifyContent: portrait ? 'flex-end' : 'center',
          paddingBottom: portrait ? pad * 4 : pad,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: v(28, 22) }}>
          <Eyebrow delay={10}>{identity.role}</Eyebrow>
          <Heading text={identity.firstLine} size={v(78, 62)} delay={16} plainColor={theme.color.inkDim} />
          <Heading text={identity.name} size={v(230, 158)} delay={22} stagger={6} />
          <div style={{ width: v(560, 420), marginTop: v(14, 10) }}>
            <Rule delay={52} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Tagline, bottom-left, exactly as on the site. */}
      <AbsoluteFill style={{ padding: pad, justifyContent: 'flex-end' }}>
        <Reveal delay={62} y={26}>
          <p
            style={{
              margin: 0,
              maxWidth: v(560, 640),
              fontFamily: theme.font,
              fontWeight: 300,
              fontSize: v(30, 27),
              lineHeight: 1.35,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: theme.color.ink,
            }}
          >
            {identity.tagline}
          </p>
        </Reveal>
      </AbsoluteFill>
    </Scene>
  );
};
