# Jack -- 3D Creator Portfolio

A dark-themed, single-page 3D creator portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Sections

1. **Hero** -- full-screen intro with a magnetic-hover portrait and gradient headline
2. **Marquee** -- two rows of project preview GIFs that scroll horizontally with page scroll
3. **About** -- bio with a character-by-character scroll-reveal paragraph
4. **Services** -- a 5-item list of offerings on a white panel
5. **Projects** -- three sticky, stacking project cards with a scale-down scroll effect

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

To build for production:

```bash
npm run build
npm run preview
```

## Video presentation

`video/` holds a Remotion project that renders a ~43-second showreel from the
same copy, colors and typeface as this site — in 1920x1080 and 1080x1920. The
on-camera footage was generated on Higgsfield from a single portrait photo. See
`video/README.md`.

```bash
cd video && npm install && npm run studio
```

## Notes

- All copy, colors, and asset URLs are as specified in the design brief.
- The `Magnet`, `FadeIn`, and `AnimatedText` components in `src/components/` are custom, reusable motion primitives used throughout the page.
- Reduced-motion preference is respected globally via a `prefers-reduced-motion` media query in `src/index.css`.
