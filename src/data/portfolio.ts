// import img_0DqW from '../assets/test/0DqWFfs9zfVYPO7PZd8O8bsRtE.avif';
// import img_6SXU from '../assets/test/6SXUv7jMAEkw8PabtmC6TXNIiM.avif';
// import img_8VfS from '../assets/test/8VfS5zuMmDchIpaCf767I8rX7Y.avif';
// import img_Hp4K from '../assets/test/Hp4KG1pwKb6cl66bNB9b2pYWQ3Y.avif';
// import img_KCk7 from '../assets/test/KCk7nP2M4mP1QclNxHPIrT1FvcA.avif';
// import img_cx71 from '../assets/test/cx71XZYYWfIozOc1rn55Bw.avif';
// import vid_QfJE from '../assets/test/QfJEiLDoHB5b7C3TtRfG3xFqCog.mp4';

// import img_0DoF from '../assets/test/0DoFvQInPiH34TWUk6DzVA9JQ.avif';
// import img_3RGr from '../assets/test/3RGrfrckophlAobhfZlqf1MDPd0.avif';
// import img_HnQI from '../assets/test/HnQI4uTAjbgziEmMMInd3R6o9c.avif';
// import img_JUWR from '../assets/test/JUWRJbfPWXb05lTNw0q4p1jewc.avif';
// import img_PruQ from '../assets/test/PruQlxKuftAZHgOh7hJT3jaUbs.avif';
// import img_W1Q8 from '../assets/test/W1Q88PlQfYXaGug9EBkmai9By4.avif';
// import img_gmhd from '../assets/test/gmhdX4XPuJvQqId9jDmFHb7cFE.avif';
// import img_hZ3z from '../assets/test/hZ3ztUHQQ9Tn50mg184gLvKcy4E.avif';
// import img_iR48 from '../assets/test/iR48olgey2UZQ9FFhsWFne27Ag.avif';
// import img_irsy from '../assets/test/irsyTM7kM1DWjcg6fJkQQ1O04s.avif';
// import vid_Ejxm from '../assets/test/EjxmZ2XPUCOqFJumyZ0M8ofWfUA.mp4';
// import vid_m8Z1 from '../assets/test/m8Z1Zg8JHiuWfp5GqAGZylPuYCQ.mp4';
// import vid_vkTX from '../assets/test/vkTXRpatm4bojSpTLqmk0YWz8.mp4';

import lj from '../assets/work/lj-2.png';
import watercoola from '../assets/work/watercoola-2.png';
import audiobook from '../assets/work/audiobook-2.png';
import superbnb from '../assets/work/superbnb-2.png';
import tpb from '../assets/work/tpb-3.png';
import nearmap from '../assets/work/nearmap.png';
import qantas from '../assets/work/qantas-shopping.png';
// import superbnbapp from '../assets/work/superbnbapp.png';
// import timeblockapp from '../assets/work/timeblockapp.png';
// import mfp from '../assets/work/mfp.png';
// import caltrava from '../assets/work/caltrava.png';
import wooflysplash from '../assets/work/woofly-2.png';
import woofly1 from '../assets/work/woofly/1.png';
import woofly2 from '../assets/work/woofly/2.png';
import woofly3 from '../assets/work/woofly/3.png';
import woofly4 from '../assets/work/woofly/4.png';
import reachout from '../assets/work/reachout.png';
import canon from '../assets/work/canon-2.png';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  image: string; // URL string for both images and videos
  type: 'image' | 'video'; // New field
  isMobile: boolean; // New field to guide layout
  year: string;
  logo?: string; // Optional field for project logo
  services?: string[];
  timeline?: string;
  role?: string;
  team?: string;
  collaborators?: string;
  client?: string;
  liveLink?: string;
  subtitle?: string;
  coverImage?: string;
  contentImages?: string[];
}

export interface Client {
  name: string;
  logo: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

// Helper to create project entries
const createProject = (
  id: string,
  src: string,
  isMobile: boolean,
  type: 'image' | 'video',
  title: string,
  description: string,
  services: string[],
  overrides?: Partial<Project>
): Project => ({
  id,
  title,
  category: services[0] || 'Design',
  description,
  services,
  tags: ['Design', 'Development'],
  color: '#000000',
  image: src,
  type,
  isMobile,
  year: '2024',
  timeline: '3 Months',
  role: 'Lead Designer',
  team: '2 Engineers, 1 Product Manager',
  collaborators: 'Alex Rivera, Taylor Swift',
  client: 'Confidential Client',
  liveLink: 'https://example.com',
  subtitle: 'A closer look at the process and outcomes of this project.',
  ...overrides
});

export const projects: Project[] = [
  // Mobile Projects (Column 1)
  {
    ...createProject('mob-1', wooflysplash, true, 'image', 'Woofly', 'A mobile app that helps dog owners find, vet, and book reliable walkers in their area, solving the trust problem that keeps people from handing over the leash.', ['product design', 'branding'], {
      subtitle: 'Find trusted dog walkers nearby',
      client: 'Personal Project',
      team: 'Myself',
      year: '2023',
      role: 'Product Designer',
      timeline: '8 Weeks'
    }),
    coverImage: woofly1,
    contentImages: [woofly2, woofly3, woofly4],
  },
  createProject('mob-4', lj, true, 'image', 'LJ Hooker', 'A mobile app that keeps property buyers in the loop with instant notifications on price changes, new listings, and auction updates.', ['product design'], {
    subtitle: 'Real-time property updates for home buyers',
    client: 'LJ Hooker',
    team: '3 Engineers, 1 Designer, PM',
    year: '2023',
    role: 'Product Designer',
    timeline: '4 Months'
  }),
  createProject('mob-2', watercoola, true, 'image', 'Watercoola', 'Connecting remote teams asynchronously through immersive virtual environments.', ['product design', 'branding'], {
    client: 'Watercoola Inc.',
    team: 'Myself, 2 Frontend Engineers',
    year: '2024',
    timeline: '6 Weeks'
  }),
  createProject('mob-3', audiobook, true, 'image', 'Audiobook app concept', 'Listen to your favorite books on the go with this modern, accessible player.', ['product design'], {
    client: 'Personal Project',
    team: 'Myself',
    year: '2025',
    timeline: '2 Weeks'
  }),

  // Desktop Projects (Other Columns)
  createProject('desk-1', superbnb, false, 'image', 'Superbnb', "A tool for digital nomads to find the best Airbnbs by price and location, with AI-powered filters and deal alerts you won't find on Airbnb itself.", ['website design', 'product design'], {
    subtitle: 'Smarter Airbnb search for digital nomads',
    client: 'Solo founder',
    team: 'Myself, Frontend Engineer',
    year: '2024',
    role: 'Lead Designer',
    timeline: '3 Months'
  }),
  createProject('desk-2', tpb, false, 'image', 'The Professional Builder', 'A SaaS platform that gives builders a step-by-step system to start and run their own building company, with courses, task management, team tools, and compliance tracking.', ['product design', 'frontend engineering'], {
    subtitle: 'Business training and management tools for builders',
    client: 'The Professional Builder (TBP)',
    team: 'Myself, Backend Engineer',
    year: '2024',
    role: 'Product Designer & Engineer',
    timeline: '6 Months'
  }),
  createProject('desk-3', nearmap, false, 'image', 'Nearmap', "A brand refresh for Australia's leading aerial imagery company — new marketing website and a scalable design system to support future work.", ['frontend engineering'], {
    subtitle: 'Brand refresh and marketing website',
    client: 'Nearmap',
    team: '3 Engineers, 2 Designers, PM',
    year: '2024',
    role: 'Frontend Engineer',
    timeline: '5 Months'
  }),
  createProject('desk-4', qantas, false, 'image', 'Qantas', 'Loyalty program shopping portal', ['fullstack engineering'], {
    client: 'Qantas Airways',
    team: '5 Engineers, 2 Designers, 1 PM',
    role: 'Fullstack Engineer',
    year: '2023',
    timeline: '8 Months'
  }),
  createProject('desk-6', canon, false, 'image', 'Canon', 'Photography gear rental platform', ['frontend engineering'], {
    client: 'Canon Australia',
    team: '3 Engineers, 1 Designer',
    role: 'Frontend Engineer',
    year: '2024',
    timeline: '4 Months'
  }),
  createProject('desk-7', reachout, false, 'image', 'Reachout', 'Mental health support network', ['fullstack engineering'], {
    client: 'Reachout Org',
    team: '4 Engineers, 2 Designers',
    role: 'Fullstack Engineer',
    year: '2023',
    timeline: '6 Months'
  }),
];

export const clients: Client[] = [
  { name: 'Stripe', logo: 'stripe' },
  { name: 'Vercel', logo: 'vercel' },
  { name: 'Figma', logo: 'figma' },
  { name: 'Notion', logo: 'notion' },
  { name: 'Linear', logo: 'linear' },
  { name: 'Shopify', logo: 'shopify' },
];

export const testimonials: Testimonial[] = [
  {
    quote: "One of the few designers who can seamlessly move between high-level product strategy and hands-on implementation.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "Their understanding of both design systems and frontend architecture helped us ship faster without compromising quality.",
    author: "Marcus Johnson",
    role: "Engineering Director",
    company: "StartupXYZ",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "Brought a level of craft and attention to detail that elevated our entire product.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "DesignStudio",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const skills = {
  design: [
    'Product Design', 'UX Research', 'Visual Design', 'Design Systems',
    'Prototyping', 'Brand Identity', 'Motion Design', 'Interaction Design'
  ],
  engineering: [
    'React / Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
    'GraphQL', 'AWS / Vercel', 'React Native', 'Design Tokens'
  ]
};
