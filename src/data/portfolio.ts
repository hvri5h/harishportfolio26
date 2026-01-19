import img_0DqW from '../assets/test/0DqWFfs9zfVYPO7PZd8O8bsRtE.avif';
import img_6SXU from '../assets/test/6SXUv7jMAEkw8PabtmC6TXNIiM.avif';
import img_8VfS from '../assets/test/8VfS5zuMmDchIpaCf767I8rX7Y.avif';
import img_Hp4K from '../assets/test/Hp4KG1pwKb6cl66bNB9b2pYWQ3Y.avif';
import img_KCk7 from '../assets/test/KCk7nP2M4mP1QclNxHPIrT1FvcA.avif';
import img_cx71 from '../assets/test/cx71XZYYWfIozOc1rn55Bw.avif';
import vid_QfJE from '../assets/test/QfJEiLDoHB5b7C3TtRfG3xFqCog.mp4';

import img_0DoF from '../assets/test/0DoFvQInPiH34TWUk6DzVA9JQ.avif';
import img_3RGr from '../assets/test/3RGrfrckophlAobhfZlqf1MDPd0.avif';
import img_HnQI from '../assets/test/HnQI4uTAjbgziEmMMInd3R6o9c.avif';
import img_JUWR from '../assets/test/JUWRJbfPWXb05lTNw0q4p1jewc.avif';
import img_PruQ from '../assets/test/PruQlxKuftAZHgOh7hJT3jaUbs.avif';
import img_W1Q8 from '../assets/test/W1Q88PlQfYXaGug9EBkmai9By4.avif';
import img_gmhd from '../assets/test/gmhdX4XPuJvQqId9jDmFHb7cFE.avif';
import img_hZ3z from '../assets/test/hZ3ztUHQQ9Tn50mg184gLvKcy4E.avif';
import img_iR48 from '../assets/test/iR48olgey2UZQ9FFhsWFne27Ag.avif';
import img_irsy from '../assets/test/irsyTM7kM1DWjcg6fJkQQ1O04s.avif';
import vid_Ejxm from '../assets/test/EjxmZ2XPUCOqFJumyZ0M8ofWfUA.mp4';
import vid_m8Z1 from '../assets/test/m8Z1Zg8JHiuWfp5GqAGZylPuYCQ.mp4';
import vid_vkTX from '../assets/test/vkTXRpatm4bojSpTLqmk0YWz8.mp4';

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
}

// Helper to create project entries
const createProject = (
  id: string,
  src: string,
  isMobile: boolean,
  type: 'image' | 'video',
  title: string,
  category: string
): Project => ({
  id,
  title,
  category,
  description: 'A showcased project demonstrating design and engineering capabilities.',
  tags: ['Design', 'Development'],
  color: '#000000',
  image: src,
  type,
  isMobile,
  year: '2025'
});

export const projects: Project[] = [
  // Mobile Projects (Column 1)
  createProject('mob-1', img_0DqW, true, 'image', 'Mobile Analytics', 'Mobile App'),
  createProject('mob-2', img_6SXU, true, 'image', 'Social Connect', 'iOS Design'),
  createProject('mob-3', img_8VfS, true, 'image', 'Health Tracker', 'Product Design'),
  createProject('mob-4', img_Hp4K, true, 'image', 'Finance Flow', 'Mobile UX'),
  createProject('mob-5', img_KCk7, true, 'image', 'E-Reader', 'App Design'),
  createProject('mob-6', img_cx71, true, 'image', 'Travel Companion', 'Mobile Interface'),
  createProject('mob-7', vid_QfJE, true, 'video', 'Interaction Demo', 'Prototype'),

  // Desktop Projects (Other Columns)
  createProject('desk-1', img_0DoF, false, 'image', 'Dashboard UI', 'Web App'),
  createProject('desk-2', img_3RGr, false, 'image', 'Design System', 'System'),
  createProject('desk-3', img_HnQI, false, 'image', 'Marketing Site', 'Web Design'),
  createProject('desk-4', img_JUWR, false, 'image', 'SaaS Platform', 'Product'),
  createProject('desk-5', img_PruQ, false, 'image', 'Analytics Tool', 'Dashboard'),
  createProject('desk-6', img_W1Q8, false, 'image', 'Portfolio V1', 'Web'),
  createProject('desk-7', img_gmhd, false, 'image', 'E-Commerce', 'Shopify'),
  createProject('desk-8', img_hZ3z, false, 'image', 'Brand Guidelines', 'Branding'),
  createProject('desk-9', img_iR48, false, 'image', 'Documentation', 'DevTools'),
  createProject('desk-10', img_irsy, false, 'image', 'Landing Page', 'Web'),
  createProject('desk-11', vid_Ejxm, false, 'video', 'Motion Study', 'Animation'),
  createProject('desk-12', vid_m8Z1, false, 'video', 'Interface Demo', 'Prototyping'),
  createProject('desk-13', vid_vkTX, false, 'video', 'User Flow', 'UX Research'),
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
    company: "TechCorp"
  },
  {
    quote: "Their understanding of both design systems and frontend architecture helped us ship faster without compromising quality.",
    author: "Marcus Johnson",
    role: "Engineering Director",
    company: "StartupXYZ"
  },
  {
    quote: "Brought a level of craft and attention to detail that elevated our entire product.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "DesignStudio"
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
