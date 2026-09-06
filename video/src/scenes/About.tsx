import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';
import { useLayout } from '../layout';
import { about } from '../content';
import { Backdrop } from '../components/Backdrop';
import { Clip } from '../components/Media';
import { Scene } from '../components/Scene';
import { Eyebrow, Heading, Paragraph, Reveal, Rule } from '../components/Type';

/** Who he is, three factual counters, and the presenting clip in a framed panel. */
export const About: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const { pad, v, portrait } = useLayout();

  const panel = (
    <div
      style={{
        position: 'relative',
        borderRadius: 44,
        overflow: 'hidden',
        border: `2px solid rgba(215, 226, 234, 0.16)`,
        boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
        width: v(620, '100%'),
        height: v(700, 640),
        flexShrink: 0,
      }}
    >
      <Clip name="clipPresent" posterName="shotPresent" playbackRate={0.9} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,12,0) 40%, rgba(12,12,12,0.65) 100%)',
        }}
      />
    </div>
  );

  return (
    <Scene durationInFrames={durationInFrames}>
      <Backdrop bloom={{ x: portrait ? 50 : 24, y: 46 }} />

      <AbsoluteFill
        style={{
          padding: pad,
          display: 'flex',
          flexDirection: portrait ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: v(90, 44),
        }}
      >
        <div
          style={{
            // Landscape shares the row with the clip; portrait stacks, and must
            // not stretch or the stats get pushed off the bottom of the frame.
            flex: v(1, 'none'),
            display: 'flex',
            flexDirection: 'column',
            gap: v(30, 24),
          }}
        >
          <Eyebrow delay={2}>{about.eyebrow}</Eyebrow>
          <Heading text="About me" size={v(132, 96)} delay={8} />
          <div style={{ width: v(320, 240), margin: `${v(6, 4)}px 0 ${v(10, 6)}px` }}>
            <Rule delay={26} />
          </div>
          <Paragraph
            text={about.paragraph}
            delay={24}
            size={v(31, 27)}
            maxWidth={v(720, 900)}
            perWord={1.15}
            color={theme.color.ink}
          />

          <div style={{ display: 'flex', gap: v(56, 40), marginTop: v(28, 20) }}>
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={86 + i * 8} y={26}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: theme.font,
                      fontWeight: 900,
                      fontSize: v(76, 60),
                      lineHeight: 1,
                      color: theme.color.accent,
                      textShadow: '0 0 34px rgba(79,224,255,0.35)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: theme.font,
                      fontWeight: 400,
                      fontSize: v(19, 17),
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: theme.color.inkDim,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={14} y={50} style={{ flexShrink: 0, width: v('auto', '100%') }}>
          {panel}
        </Reveal>
      </AbsoluteFill>
    </Scene>
  );
};
