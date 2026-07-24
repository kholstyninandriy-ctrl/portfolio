import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

// TODO: double-check these are the channels you want shown publicly
const LINKS = [
  { label: 'Telegram', href: 'https://t.me/kholstynin' },
  { label: 'Instagram', href: 'https://instagram.com/visualtrap200' },
  { label: 'Email', href: 'mailto:kholstyninandriy@gmail.com' },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center gap-10 sm:gap-12"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p className="text-[#D7E2EA] font-light text-center max-w-[420px] leading-relaxed">
          Got a business that needs a website or a chatbot that actually books clients? Reach out.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <ContactButton />
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/70 uppercase tracking-widest text-xs sm:text-sm hover:text-[#4FE0FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
