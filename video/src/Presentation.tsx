import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { theme } from './theme';
import { useKanit } from './fonts';
import { Grain } from './components/Grain';
import { Intro } from './scenes/Intro';
import { Positioning } from './scenes/Positioning';
import { About } from './scenes/About';
import { Services } from './scenes/Services';
import { Projects } from './scenes/Projects';
import { Outro } from './scenes/Outro';

/**
 * The edit. Scenes overlap by OVERLAP frames so each one dissolves into the
 * next rather than cutting hard; `TOTAL` below is what Root.tsx uses as the
 * composition length, so the timeline is defined in exactly one place.
 */
const OVERLAP = 10;

const scenes = [
  { id: 'intro', duration: 165, Component: Intro },
  { id: 'positioning', duration: 135, Component: Positioning },
  { id: 'about', duration: 165, Component: About },
  { id: 'services', duration: 285, Component: Services },
  { id: 'projects', duration: 405, Component: Projects },
  { id: 'outro', duration: 180, Component: Outro },
] as const;

export const schedule = scenes.map((scene, i) => ({
  ...scene,
  from: scenes.slice(0, i).reduce((acc, s) => acc + s.duration, 0) - i * OVERLAP,
}));

export const TOTAL_FRAMES =
  scenes.reduce((acc, s) => acc + s.duration, 0) - (scenes.length - 1) * OVERLAP;

export const Presentation: React.FC = () => {
  useKanit();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.bg, fontFamily: theme.font }}>
      {schedule.map(({ id, from, duration, Component }) => (
        <Sequence key={id} from={from} durationInFrames={duration} name={id}>
          <Component durationInFrames={duration} />
        </Sequence>
      ))}
      <Grain />
    </AbsoluteFill>
  );
};
