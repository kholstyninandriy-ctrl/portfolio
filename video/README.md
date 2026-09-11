# Video presentation — Andriy

A ~43-second showreel built in [Remotion](https://remotion.dev), cut from the
same copy, colours and typeface as the portfolio site in the repository root,
with the on-camera footage generated on [Higgsfield](https://higgsfield.ai) from
one portrait photo.

Two compositions, one edit:

| Composition | Size | For |
| --- | --- | --- |
| `Presentation` | 1920×1080 | site hero, YouTube, email, pitch decks |
| `PresentationVertical` | 1080×1920 | Reels, TikTok, Telegram |

## Run it

```bash
cd video
npm install
npm run fetch:media   # pulls the AI shots/clips into public/media (recommended)
npm run studio        # opens the Remotion studio
```

Render:

```bash
npm run build             # → out/presentation.mp4 (1920×1080)
npm run build:vertical    # → out/presentation-vertical.mp4 (1080×1920)
npm run still             # → out/cover.png, a poster frame
```

## The cut

| Scene | Length | What is on screen |
| --- | --- | --- |
| `Intro` | 5.5s | name, role, tagline over the portrait clip |
| `Positioning` | 4.5s | the value proposition as kinetic type over the desk clip |
| `About` | 5.5s | the bio, three counters, the presenting clip in a panel |
| `Services` | 9.5s | the site's white panel; a cyan marker walks the four services |
| `Projects` | 13.5s | all five shipped projects, real screenshots and live URLs |
| `Outro` | 6s | "Let's talk" and the three contact channels |

Scenes are scheduled in `src/Presentation.tsx` with a 10-frame overlap, so each
one dissolves into the next. Change a duration there and the composition length
follows — `TOTAL_FRAMES` is derived from the same table.

## Where things live

- `src/content.ts` — every word in the film. It mirrors the site's own copy;
  when the site changes, change it here too.
- `src/theme.ts` — colours and the heading gradient, lifted from `src/index.css`
  in the repo root.
- `src/media.ts` — the Higgsfield shots and clips, and how they are resolved.
- `src/layout.ts` — `v(landscape, portrait)`, how the two aspect ratios differ.
- `src/scenes/` — one file per scene.
- `src/components/` — the backdrop, grain, media wrappers and type primitives.

## Media

Four stills were generated with `nano_banana_pro` from Andriy's portrait, and
three of them animated with `seedance_2_5` (omni_reference, 1080p, 5s, silent).
They are served from the Higgsfield CDN by default, so `npm run studio` works
with no setup as long as you are online.

`npm run fetch:media` downloads them into `public/media/` and writes
`.env` with `REMOTION_MEDIA_SOURCE=local`, which makes renders offline,
reproducible and noticeably faster. Neither the media nor the `.env` is
committed; `src/media.ts` holds the URLs to fetch them from.

To swap in a different shot, generate it, put its filename in `src/media.ts`,
and re-run `npm run fetch:media --force`.

Project screenshots are copied from the site's own `public/projects/` into
`video/public/projects/` (Remotion serves `staticFile` from one public dir, and
404 KB of JPEGs is cheaper than the indirection). They are committed, so they
never need fetching — but when you replace a screenshot on the site, copy it
here too.

## Fonts

Kanit is vendored as `.woff2` in `public/fonts/` and registered in `src/fonts.ts`
behind `delayRender`, rather than being pulled from Google at render time. A
render therefore needs no font network access and never captures a frame in a
fallback face.

## No soundtrack

The film is cut silent, so it plays cleanly muted (how it will autoplay on the
site and in feeds). To add music, drop a track in `public/` and put
`<Audio src={staticFile('...')} />` in `Presentation.tsx` next to `<Grain />`.
