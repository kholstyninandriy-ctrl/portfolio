import { useVideoConfig } from 'remotion';

/**
 * The film is authored for 1920x1080 and re-laid-out for 1080x1920. Rather than
 * scaling one design down, each scene asks for the value that suits the frame
 * it is actually rendering into.
 */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;

  return {
    width,
    height,
    portrait,
    /** Outer margin. */
    pad: portrait ? 72 : 120,
    /** Pick a landscape value or a portrait one. */
    v: <A, B = A>(landscape: A, portraitValue: B): A | B =>
      portrait ? portraitValue : landscape,
  };
};

export type Layout = ReturnType<typeof useLayout>;
