import { FONT_FAMILY } from './fonts';

/**
 * Design tokens lifted straight from the live portfolio (src/index.css,
 * ServicesSection, HeroSection) so the video and the site read as one brand.
 */
export const theme = {
  font: `'${FONT_FAMILY}', sans-serif`,
  color: {
    bg: '#0C0C0C',
    panel: '#FFFFFF',
    ink: '#D7E2EA',
    inkDim: 'rgba(215, 226, 234, 0.6)',
    inkFaint: 'rgba(215, 226, 234, 0.32)',
    accent: '#4FE0FF',
    onPanel: '#0C0C0C',
  },
  // The `.hero-heading` gradient from index.css.
  headingGradient: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
} as const;

export const gradientText = {
  backgroundImage: theme.headingGradient,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
} as const;
