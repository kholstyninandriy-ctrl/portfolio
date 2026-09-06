import { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Kanit is the portfolio's typeface. The .woff2 files are vendored into
 * public/fonts rather than pulled from Google at render time, so renders are
 * offline, reproducible, and never flash a fallback face on a slow frame.
 */
const WEIGHTS = [300, 400, 500, 700, 900] as const;
const SUBSETS = ['latin', 'latin-ext'] as const;

export const FONT_FAMILY = 'Kanit';

const loadKanit = () =>
  Promise.all(
    WEIGHTS.flatMap((weight) =>
      SUBSETS.map(async (subset) => {
        const face = new FontFace(
          FONT_FAMILY,
          `url(${staticFile(`fonts/Kanit-${weight}-${subset}.woff2`)}) format('woff2')`,
          { weight: String(weight), style: 'normal', display: 'block' },
        );
        await face.load();
        document.fonts.add(face);
      }),
    ),
  );

/** Holds the render back until every weight is in document.fonts. */
export const useKanit = () => {
  const [handle] = useState(() => delayRender('Loading Kanit'));

  useEffect(() => {
    loadKanit()
      .catch(() => undefined)
      .finally(() => continueRender(handle));
  }, [handle]);
};
