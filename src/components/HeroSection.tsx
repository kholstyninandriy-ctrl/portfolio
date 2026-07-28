import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact'];

// Poster image shown while the 3D model loads (also used as fallback if the
// model fails to load).
const PORTRAIT_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK/hf_20260724_213217_31c77cc7-bbe7-454e-ad4a-e5688ab8ca0d.png';

// Interactive 3D avatar (GLB). Auto-rotates slowly and can be dragged
// horizontally; vertical tilt is locked so it always reads as a natural
// head-and-shoulders turn.
const MODEL_URL =
  'https://d3u0tzju9qaucj.cloudfront.net/7d051b5a-7bfe-49fe-a484-24e7b3a9458a/92cf1d83-a5d7-473c-ac8d-93f500f2f18f.glb';

export default function HeroSection() {
  const has3d = MODEL_URL.startsWith('https');
  return (
    <section className="relative h-screen flex flex-col" style={{ overflow: 'clip' }}>
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden mt-8 sm:mt-4 md:-mt-5 px-5 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.92] sm:leading-none whitespace-normal break-words sm:whitespace-nowrap w-full text-[15vw] sm:text-[12.5vw] md:text-[13.5vw] lg:text-[14.5vw]">
            Hi, i&apos;m andriy
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait: interactive 3D avatar, cropped to bust height so nothing
          below the shoulders is ever visible -- centered on mobile, off to the
          side on larger screens. */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 md:right-10 lg:right-16 bottom-0 sm:bottom-36 md:bottom-40 lg:bottom-44 z-10 w-[300px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[460px]"
      >
        <FadeIn delay={0.6} y={30}>
          <div
            className="relative w-full overflow-hidden"
            style={{ height: 'clamp(260px, 42vw, 440px)' }}
          >
            {has3d ? (
              <model-viewer
                src={MODEL_URL}
                poster={PORTRAIT_URL}
                alt="Andriy, web design & automation specialist -- 3D avatar"
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="18deg"
                camera-controls
                disable-zoom
                interaction-prompt="none"
                shadow-intensity="0"
                exposure="1.1"
                min-camera-orbit="-180deg 78deg auto"
                max-camera-orbit="180deg 92deg auto"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '160%',
                  filter: 'drop-shadow(0 0 40px rgba(79, 224, 255, 0.45))',
                }}
              />
            ) : (
              <img
                src={PORTRAIT_URL}
                alt="Andriy, web design & automation specialist portrait"
                className="absolute top-0 left-0 w-full h-[160%] object-cover object-top select-none pointer-events-none"
                style={{ filter: 'drop-shadow(0 0 40px rgba(79, 224, 255, 0.45))' }}
                draggable={false}
              />
            )}
          </div>
        </FadeIn>
      </Magnet>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end pb-6 sm:pb-8 md:pb-10 px-5 md:px-10 relative z-20 gap-3">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.9rem, 3.2vw, 1.5rem)' }}
          >
            websites & chatbot automation that turn visitors into paying clients
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
