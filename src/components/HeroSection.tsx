import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact'];

// Stylized non-photographic 3D-render avatar (toon-shaded, game/Pixar-style),
// generated from Andriy's real photo -- replaces the earlier photo-realistic version.
// Other variants to try instead:
// https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK/hf_20260724_213216_3101b362-7e5d-4385-9d35-56e4ebe3be18.png
// https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK/hf_20260724_213216_4b86a5fb-a4f3-4788-8cb8-a20515080540.png
const PORTRAIT_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK/hf_20260724_213217_31c77cc7-bbe7-454e-ad4a-e5688ab8ca0d.png';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
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
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m andriy
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px]"
      >
        <FadeIn delay={0.6} y={30}>
          <img
            src={PORTRAIT_URL}
            alt="Andriy, web design & automation specialist portrait"
            className="w-full h-auto rounded-full select-none pointer-events-none"
            style={{ boxShadow: '0 0 60px rgba(79, 224, 255, 0.35)' }}
            draggable={false}
          />
        </FadeIn>
      </Magnet>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
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
