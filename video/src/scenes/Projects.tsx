import React from 'react';
import { AbsoluteFill, Img, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme, gradientText } from '../theme';
import { useLayout } from '../layout';
import { projects, type Project } from '../content';
import { projectImage } from '../media';
import { Backdrop } from '../components/Backdrop';
import { Scene } from '../components/Scene';
import { Heading, Rule } from '../components/Type';

const HEADER = 58;
const CARD = 70;

/** One shipped project: the real screenshot, its number, name and live URL. */
const Card: React.FC<{ project: Project; durationInFrames: number }> = ({
  project,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { pad, v, portrait } = useLayout();

  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const t = frame / Math.max(1, durationInFrames - 1);
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8 }, durationInFrames: 26 });

  return (
    <AbsoluteFill
      style={{ opacity, padding: pad, paddingTop: v(pad * 1.4, pad), justifyContent: 'center' }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          // Landscape lets the card fill the frame; the screenshots are 2:1 so
          // a 1680x800-ish card barely crops them. Portrait instead pins the
          // screenshot to its own ratio and centres the card, otherwise a 9:16
          // render would show a narrow vertical slice of the site.
          ...(portrait ? { flex: 'none', width: '100%' } : { flex: 1 }),
          borderRadius: v(56, 32),
          overflow: 'hidden',
          border: '2px solid rgba(215, 226, 234, 0.18)',
          background: theme.color.bg,
          boxShadow: '0 50px 140px rgba(0,0,0,0.65)',
          transform: `scale(${0.965 + enter * 0.035})`,
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            ...(portrait ? { aspectRatio: '1565 / 784' } : { flex: 1, minHeight: 0 }),
          }}
        >
          <Img
            src={projectImage(project.image)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `center ${interpolate(t, [0, 1], [0, portrait ? 10 : 30])}%`,
              transform: `scale(${interpolate(t, [0, 1], [1.03, 1.09])})`,
            }}
          />
          {/* Screenshots are busy and bright, so the meta gets its own chrome
              rather than floating on whatever happens to be underneath. */}
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(180deg, rgba(12,12,12,0.6) 0%, rgba(12,12,12,0) 24%, rgba(12,12,12,0) 58%, rgba(12,12,12,0.5) 82%, rgba(12,12,12,0.9) 100%)',
            }}
          />

          {/* Number chip, top-left. */}
          <AbsoluteFill style={{ padding: v(40, 26) }}>
            <div
              style={{
                alignSelf: 'flex-start',
                padding: `${v(6, 4)}px ${v(22, 16)}px`,
                borderRadius: 999,
                border: '1.5px solid rgba(215, 226, 234, 0.35)',
                background: 'rgba(12, 12, 12, 0.55)',
                backdropFilter: 'blur(10px)',
                fontFamily: theme.font,
                fontWeight: 900,
                fontSize: v(46, 34),
                lineHeight: 1.25,
                color: theme.color.ink,
                transform: `translateY(${(1 - enter) * 20}px)`,
              }}
            >
              {project.number}
            </div>
          </AbsoluteFill>
        </div>

        {/* Lower third. Landscape floats it over the foot of the screenshot;
            portrait gives it a row of its own so nothing is covered. */}
        <div
          style={
            portrait
              ? { position: 'relative' }
              : { position: 'absolute', left: 0, right: 0, bottom: 0 }
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: portrait ? 'column' : 'row',
              alignItems: portrait ? 'flex-start' : 'center',
              gap: v(24, 18),
              padding: `${v(32, 28)}px ${v(46, 32)}px`,
              background: 'rgba(9, 9, 9, 0.82)',
              backdropFilter: 'blur(18px)',
              borderTop: '1px solid rgba(215, 226, 234, 0.14)',
              transform: `translateY(${(1 - enter) * 100}%)`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{
                  fontFamily: theme.font,
                  fontWeight: 500,
                  fontSize: v(20, 18),
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: theme.color.accent,
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontFamily: theme.font,
                  fontWeight: 500,
                  fontSize: v(46, 36),
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  color: theme.color.ink,
                }}
              >
                {project.name}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexShrink: 0,
                padding: `${v(14, 12)}px ${v(28, 22)}px`,
                borderRadius: 999,
                border: `1.5px solid ${theme.color.accent}`,
                opacity: interpolate(frame, [16, 32], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: theme.color.accent,
                  boxShadow: `0 0 14px ${theme.color.accent}`,
                }}
              />
              <span
                style={{
                  fontFamily: theme.font,
                  fontWeight: 400,
                  fontSize: v(23, 20),
                  letterSpacing: '0.03em',
                  color: theme.color.ink,
                }}
              >
                {project.url}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** The work reel: a short title beat, then every shipped project in turn. */
export const Projects: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { pad, v, portrait } = useLayout();

  // The header slides away as the first card arrives.
  const headerOut = interpolate(frame, [HEADER - 18, HEADER + 6], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // A persistent counter in the corner, so the reel reads as a set.
  const index = Math.min(
    projects.length,
    Math.max(1, Math.floor((frame - HEADER) / CARD) + 1),
  );

  return (
    <Scene durationInFrames={durationInFrames}>
      <Backdrop grid={0.6} bloom={{ x: 50, y: 50 }} />

      {frame < HEADER + 8 ? (
        <AbsoluteFill
          style={{ padding: pad, justifyContent: 'center', opacity: headerOut }}
        >
          <span
            style={{
              fontFamily: theme.font,
              fontWeight: 500,
              fontSize: v(24, 20),
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: theme.color.accent,
              marginBottom: 18,
            }}
          >
            Selected work
          </span>
          <Heading text="Projects" size={v(190, 128)} delay={2} stagger={6} />
          <div style={{ width: v(480, 340), marginTop: 22 }}>
            <Rule delay={16} />
          </div>
        </AbsoluteFill>
      ) : null}

      {portrait && frame >= HEADER ? (
        <AbsoluteFill style={{ padding: pad, justifyContent: 'flex-start' }}>
          <div
            style={{
              opacity: interpolate(frame, [HEADER, HEADER + 16], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: theme.font,
                fontWeight: 500,
                fontSize: 20,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: theme.color.accent,
                marginBottom: 14,
              }}
            >
              Selected work
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: theme.font,
                fontWeight: 900,
                fontSize: 116,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                ...gradientText,
              }}
            >
              Projects
            </span>
          </div>
        </AbsoluteFill>
      ) : null}

      {projects.map((project, i) => (
        <Sequence key={project.number} from={HEADER + i * CARD} durationInFrames={CARD + 12}>
          <Card project={project} durationInFrames={CARD + 12} />
        </Sequence>
      ))}

      {/* Counter. */}
      <AbsoluteFill
        style={{
          padding: pad,
          alignItems: 'flex-end',
          justifyContent: portrait ? 'flex-end' : 'flex-start',
          opacity: interpolate(frame, [HEADER, HEADER + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span
          style={{
            fontFamily: theme.font,
            fontWeight: 700,
            fontSize: v(28, 22),
            letterSpacing: '0.16em',
            ...gradientText,
          }}
        >
          {String(index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </AbsoluteFill>
    </Scene>
  );
};
