import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Business Websites',
    description:
      'Lead-generation websites for hotels, beauty studios, gyms, and local service businesses -- built to sell and take bookings 24/7.',
  },
  {
    number: '02',
    name: 'Chatbot Automation',
    description:
      'A chatbot that answers questions, books appointments, and follows up with clients around the clock, so you never miss a lead.',
  },
  {
    number: '03',
    name: 'Branding',
    description:
      'A clear, memorable visual identity -- logo, colors, and brand system -- that helps your business stand out from competitors.',
  },
  {
    number: '04',
    name: 'Premium UX Design',
    description:
      'Scroll-stopping design and layout that keeps visitors on the page and pushes them to actually buy, not just look.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom:
                  i === SERVICES.length - 1 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
              }}
            >
              <span
                className="font-black flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 sm:gap-4 justify-center">
                <h3
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
