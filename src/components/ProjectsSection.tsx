import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface Project {
  number: string;
  category: string;
  name: string;
  image: string;
  liveUrl: string;
}

// Real client work. Add more entries here as you ship new projects --
// screenshots live in /public/projects, just drop a new image in and reference it.
const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Website',
    name: 'Snack Bar Menu Site',
    image: '/projects/menu-restaurant.jpg',
    liveUrl: 'https://menu-nossa-senhora-da-graca.netlify.app/',
  },
  {
    number: '02',
    category: 'Website',
    name: 'Caldeira Restaurant',
    image: '/projects/caldeira-restaurant.jpg',
    liveUrl: 'https://papaya-vacherin-ae5d32.netlify.app/',
  },
  {
    number: '03',
    category: 'Website',
    name: 'Solar das Hortênsias Hotel',
    image: '/projects/solar-hotel.jpg',
    liveUrl: 'https://deluxe-belekoy-6a517c.netlify.app/',
  },
  {
    number: '04',
    category: 'Website',
    name: 'Magma Gym',
    image: '/projects/magma-gym.jpg',
    liveUrl: 'https://nimble-kitsune-fae9d4.netlify.app/',
  },
  {
    number: '05',
    category: 'Chatbot Automation',
    name: 'Glam Studio AI Assistant',
    image: '/projects/glam-bot.jpg',
    liveUrl: 'https://glam-bot.netlify.app/',
  },
];

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh]"
      style={{ top: `${index * 28 + 96}px` }}
    >
      <motion.div
        style={{ scale }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 h-full flex flex-col"
      >
        <div
          className="rounded-[36px] sm:rounded-[46px] md:rounded-[56px] h-full flex flex-col p-4 sm:p-6 md:p-8"
          style={{ background: '#0C0C0C' }}
        >
          {/* Top row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className="font-black"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  WebkitTextStroke: '1.5px #D7E2EA',
                  color: 'transparent',
                }}
              >
                {project.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
                  {project.category}
                </span>
                <span className="text-[#D7E2EA] uppercase font-medium text-xl sm:text-2xl md:text-3xl">
                  {project.name}
                </span>
              </div>
            </div>
            <LiveProjectButton href={project.liveUrl} />
          </div>

          {/* Screenshot */}
          <div className="flex-1">
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
