/**
 * All copy in the presentation. Every line here mirrors what is already on the
 * live portfolio (src/components/*.tsx) -- keep the two in sync rather than
 * inventing claims for the video.
 */

export const identity = {
  firstLine: "Hi, I'm",
  name: 'Andriy',
  role: 'Web design & chatbot automation',
  tagline: 'Websites & chatbot automation that turn visitors into paying clients',
  nav: ['About', 'Services', 'Projects', 'Contact'],
};

export const positioning = [
  'Websites',
  '& chatbot automation',
  'that turn visitors',
  'into paying clients',
];

export const about = {
  heading: 'About me',
  eyebrow: "Who you're working with",
  paragraph:
    'I build websites and chatbot automation for small businesses — hotels, beauty studios, gyms, and local service brands. My focus is simple: turn visitors into clients, cut down manual work, and make sure you never lose a lead again.',
  stats: [
    { value: '05', label: 'Live projects' },
    { value: '04', label: 'Services' },
    { value: '24/7', label: 'Bookings handled' },
  ],
};

export const services = [
  {
    number: '01',
    name: 'Business Websites',
    description:
      'Lead-generation websites for hotels, beauty studios, gyms and local service businesses — built to sell and take bookings 24/7.',
  },
  {
    number: '02',
    name: 'Chatbot Automation',
    description:
      'A chatbot that answers questions, books appointments and follows up with clients around the clock, so you never miss a lead.',
  },
  {
    number: '03',
    name: 'Branding',
    description:
      'A clear, memorable visual identity — logo, colors and brand system — that helps your business stand out from competitors.',
  },
  {
    number: '04',
    name: 'Premium UX Design',
    description:
      'Scroll-stopping design and layout that keeps visitors on the page and pushes them to actually buy, not just look.',
  },
];

export type Project = {
  number: string;
  category: string;
  name: string;
  image: string;
  url: string;
};

export const projects: Project[] = [
  {
    number: '01',
    category: 'Website',
    name: 'Snack Bar Menu Site',
    image: 'projects/menu-restaurant.jpg',
    url: 'menu-nossa-senhora-da-graca.netlify.app',
  },
  {
    number: '02',
    category: 'Website',
    name: 'Caldeira Restaurant',
    image: 'projects/caldeira-restaurant.jpg',
    url: 'papaya-vacherin-ae5d32.netlify.app',
  },
  {
    number: '03',
    category: 'Website',
    name: 'Solar das Hortênsias Hotel',
    image: 'projects/solar-hotel.jpg',
    url: 'deluxe-belekoy-6a517c.netlify.app',
  },
  {
    number: '04',
    category: 'Website',
    name: 'Magma Gym',
    image: 'projects/magma-gym.jpg',
    url: 'nimble-kitsune-fae9d4.netlify.app',
  },
  {
    number: '05',
    category: 'Chatbot Automation',
    name: 'Glam Studio AI Assistant',
    image: 'projects/glam-bot.jpg',
    url: 'glam-bot.netlify.app',
  },
];

export const outro = {
  heading: "Let's talk",
  line: 'Got a business that needs a website or a chatbot that actually books clients? Reach out.',
  links: [
    { label: 'Telegram', value: '@kholstynin' },
    { label: 'Instagram', value: '@visualtrap200' },
    { label: 'Email', value: 'kholstyninandriy@gmail.com' },
  ],
};
