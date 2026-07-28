import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact'];

// Stylized 3D-render head, background removed so only the head/bust floats on the
// page (no disc/background), then reacts to the cursor via the Magnet wrapper below.
const PORTRAIT_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GS39WHsImW1V5vojZo1mA0uRMK/hf_20260727_153849_e687f2f5-f63a-4edb-b9db-7f04679ff595.png';

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
      <div className="overflow-hidden mt-8 sm:mt-4 md:-mt-5 px-5 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.92] sm:leading-none whitespace-normal break-words sm:whitespace-nowrap w-full text-[15vw] sm:text-[12.5vw] md:text-[13.5vw] lg:text-[14.5vw]">
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
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px]"
      >
        <FadeIn delay={0.6} y={30}>
          <img
            src={PORTRAIT_URL}
            alt="Andriy, web design & automation specialist portrait"
            className="w-full h-auto select-none pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 40px rgba(79, 224, 255, 0.45))' }}
            draggable={false}
          />
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
