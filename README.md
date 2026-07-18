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

## Notes

- All copy, colors, and asset URLs are as specified in the design brief.
- The `Magnet`, `FadeIn`, and `AnimatedText` components in `src/components/` are custom, reusable motion primitives used throughout the page.
- Reduced-motion preference is respected globally via a `prefers-reduced-motion` media query in `src/index.css`.
# portfolio
