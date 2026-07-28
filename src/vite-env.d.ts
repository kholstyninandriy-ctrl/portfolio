/// <reference types="vite/client" />

// <model-viewer> web component (loaded from CDN in index.html)
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        exposure?: string;
        'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string;
        'rotation-per-second'?: string;
        'camera-controls'?: boolean;
        'disable-zoom'?: boolean;
        'interaction-prompt'?: string;
        'shadow-intensity'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'camera-orbit'?: string;
      },
      HTMLElement
    >;
  }
}
