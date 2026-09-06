import { staticFile } from 'remotion';

/**
 * Every AI shot in this presentation was generated on Higgsfield from Andriy's
 * own portrait: four `nano_banana_pro` stills, three of them animated with
 * `seedance_2_5` (omni_reference, 1080p, 5s).
 *
 * The clips live on the Higgsfield CDN. Two ways to use them:
 *
 *   remote (default) -- Remotion streams them straight from the CDN. Needs
 *                       network access while the studio runs or a render is on.
 *   local            -- run `npm run fetch:media` once. It downloads everything
 *                       into `public/media/` and writes `.env` with
 *                       REMOTION_MEDIA_SOURCE=local, so renders are offline,
 *                       reproducible and a good deal faster.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK';

type Asset = { id: string; remote: string };

const asset = (id: string, file: string): Asset => ({ id, remote: `${CDN}/${file}` });

export const assets = {
  // Stills (nano_banana_pro, 16:9, 2k)
  shotHero: asset('shot-hero.png', 'hf_20260906_150214_9f0bfd43-134b-4d6a-b262-c296ea026ab5.png'),
  shotDesk: asset('shot-desk.png', 'hf_20260906_150245_d3a06377-3d7a-4968-865a-be889a49d56c.png'),
  shotPresent: asset(
    'shot-present.png',
    'hf_20260906_150214_ef7a6276-763c-419f-b635-882490ff8c77.png',
  ),
  shotClosing: asset(
    'shot-closing.png',
    'hf_20260906_150213_e6af3bac-0da1-4199-b3b0-9c48986c1b90.png',
  ),
  // Clips (seedance_2_5, 16:9, 1080p, 5s, silent) -- filled in by the generator run.
  clipHero: asset('clip-hero.mp4', 'hf_20260906_150429_912b6ec8-fc47-4d91-9d73-44d36184c0e1.mp4'),
  clipDesk: asset('clip-desk.mp4', 'hf_20260906_150429_5401c522-8ba1-48f9-a69e-7c579a834383.mp4'),
  clipPresent: asset('clip-present.mp4', 'hf_20260906_150429_a3ecadc1-66b9-4fb1-9ecd-147f06ef9946.mp4'),
} satisfies Record<string, Asset>;

export type AssetName = keyof typeof assets;

const source = process.env.REMOTION_MEDIA_SOURCE === 'local' ? 'local' : 'remote';

export const src = (name: AssetName): string => {
  const a = assets[name];
  return source === 'local' ? staticFile(`media/${a.id}`) : a.remote;
};

/** Project screenshots are committed to the repo, so they are always local. */
export const projectImage = (path: string): string => staticFile(path);
