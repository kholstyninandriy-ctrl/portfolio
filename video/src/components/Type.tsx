import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme, gradientText } from '../theme';

/** Standard spring for anything that slides or scales into place. */
export const useEnter = (delay: number, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 }, durationInFrames: 28 });
};

/** Fades and lifts a block in, and (optionally) back out at the scene's end. */
export const Reveal: React.FC<{
  delay?: number;
  y?: number;
  x?: number;
  out?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 40, x = 0, out, children, style }) => {
  const frame = useCurrentFrame();
  const t = useEnter(delay);
  const exit =
    out === undefined ? 1 : interpolate(frame, [out, out + 14], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity: t * exit,
        transform: `translate(${(1 - t) * x}px, ${(1 - t) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * The big display heading, in the site's `.hero-heading` gradient. Each word
 * clips up from behind its own mask, which is what gives the film its opening
 * beat.
 */
export const Heading: React.FC<{
  text: string;
  size: number;
  delay?: number;
  stagger?: number;
  align?: 'left' | 'center';
  plainColor?: string;
}> = ({ text, size, delay = 0, stagger = 5, align = 'left', plainColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `0 ${size * 0.24}px`,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {words.map((word, i) => {
        const t = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 200, mass: 0.8 },
          durationInFrames: 30,
        });
        return (
          <span key={`${word}-${i}`} style={{ overflow: 'hidden', display: 'block', paddingBottom: size * 0.14 }}>
            <span
              style={{
                display: 'block',
                fontFamily: theme.font,
                fontWeight: 900,
                fontSize: size,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                transform: `translateY(${(1 - t) * 100}%)`,
                ...(plainColor ? { color: plainColor } : gradientText),
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** A small uppercase label with the cyan dot the site uses on its eyebrows. */
export const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number; color?: string }> = ({
  children,
  delay = 0,
  color = theme.color.inkDim,
}) => (
  <Reveal delay={delay} y={16}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: theme.font,
        fontWeight: 500,
        fontSize: 22,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: theme.color.accent,
          boxShadow: `0 0 16px ${theme.color.accent}`,
        }}
      />
      {children}
    </div>
  </Reveal>
);

/** A cyan rule that draws itself left-to-right. */
export const Rule: React.FC<{ delay?: number; width?: number | string; thickness?: number }> = ({
  delay = 0,
  width = '100%',
  thickness = 2,
}) => {
  const t = useEnter(delay, 220);
  return (
    <div style={{ width, height: thickness, background: 'rgba(215,226,234,0.14)', overflow: 'hidden' }}>
      <div
        style={{
          width: `${t * 100}%`,
          height: '100%',
          background: theme.color.accent,
          boxShadow: `0 0 14px ${theme.color.accent}`,
        }}
      />
    </div>
  );
};

/** Reveals a paragraph word by word, the video answer to the site's AnimatedText. */
export const Paragraph: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  maxWidth?: number;
  perWord?: number;
}> = ({ text, delay = 0, size = 30, color = theme.color.ink, maxWidth = 900, perWord = 1.6 }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <p
      style={{
        margin: 0,
        maxWidth,
        fontFamily: theme.font,
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1.5,
        color,
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            opacity: interpolate(frame, [delay + i * perWord, delay + i * perWord + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  );
};
