export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  image: string;
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

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Finance Dashboard',
    category: 'Product Design & Development',
    description: 'Designed and built a comprehensive financial analytics platform helping teams track metrics, visualize trends, and make data-driven decisions. Full-stack implementation with real-time data sync.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    color: '#0066ff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    year: '2025'
  },
  {
    id: 'project-2',
    title: 'E-commerce Redesign',
    category: 'UX Design & Frontend',
    description: 'Led the complete redesign of a fashion e-commerce platform, increasing conversion by 34%. Implemented a component library and design system from scratch.',
    tags: ['Figma', 'Next.js', 'Shopify', 'CSS'],
    color: '#ff6b6b',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    year: '2025'
  },
  {
    id: 'project-3',
    title: 'Healthcare App',
    category: 'Mobile Design & Development',
    description: 'Designed and developed a patient-facing mobile app for appointment scheduling, health tracking, and telehealth consultations. HIPAA-compliant architecture.',
    tags: ['React Native', 'Figma', 'Firebase', 'Healthcare'],
    color: '#4ecdc4',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-4',
    title: 'AI Writing Assistant',
    category: 'Product Design',
    description: 'Created the end-to-end experience for an AI-powered writing tool. Focused on making complex AI features feel intuitive and approachable for everyday users.',
    tags: ['Product Strategy', 'UX Research', 'Prototyping'],
    color: '#9b59b6',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-5',
    title: 'SaaS Platform',
    category: 'Design System & Development',
    description: 'Built a scalable design system and component library serving 12 product teams. Reduced design-to-development time by 60% through systematic documentation.',
    tags: ['Design Systems', 'React', 'Storybook', 'Tokens'],
    color: '#f39c12',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-6',
    title: 'Developer Tools',
    category: 'Full-Stack Development',
    description: 'Architected and shipped a suite of developer productivity tools including a CLI, VS Code extension, and web dashboard for monitoring deployments.',
    tags: ['Node.js', 'Electron', 'CLI', 'DevTools'],
    color: '#1abc9c',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-7',
    title: 'Brand Identity',
    category: 'Branding & Visual Design',
    description: 'Developed complete brand identity for a climate-tech startup including logo, color system, typography, and brand guidelines. Extended to marketing site design.',
    tags: ['Branding', 'Visual Design', 'Guidelines'],
    color: '#3498db',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-8',
    title: 'Data Visualization',
    category: 'Interactive Design & Dev',
    description: 'Created interactive data stories and visualizations for a research publication, making complex datasets accessible and engaging for general audiences.',
    tags: ['D3.js', 'Scrollytelling', 'Data Viz'],
    color: '#e74c3c',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-9',
    title: 'Marketplace Platform',
    category: 'Product & Engineering',
    description: 'End-to-end design and development of a B2B marketplace connecting service providers with enterprise clients. Built real-time messaging and payment systems.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'WebSockets'],
    color: '#8e44ad',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-10',
    title: 'Mobile Banking',
    category: 'UX/UI Design',
    description: 'Redesigned the mobile banking experience for a regional credit union, improving task completion rates and customer satisfaction scores significantly.',
    tags: ['Mobile UX', 'FinTech', 'Accessibility'],
    color: '#27ae60',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    year: '2022'
  },
  {
    id: 'project-11',
    title: 'Educational Platform',
    category: 'Design & Development',
    description: 'Built an interactive learning platform with video lessons, quizzes, and progress tracking. Focus on engagement and retention for adult learners.',
    tags: ['EdTech', 'Vue.js', 'Video', 'Gamification'],
    color: '#e67e22',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    year: '2022'
  },
  {
    id: 'project-12',
    title: 'IoT Dashboard',
    category: 'Industrial Design & Dev',
    description: 'Designed and implemented monitoring dashboards for industrial IoT systems, handling real-time data from thousands of sensors across multiple facilities.',
    tags: ['IoT', 'Real-time', 'React', 'MQTT'],
    color: '#2c3e50',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    year: '2022'
  },
  // Duplicates for demo purposes to fill columns
  {
    id: 'project-13',
    title: 'Crypto Wallet',
    category: 'Web3 Design',
    description: 'Secure and intuitive wallet interface for managing digital assets.',
    tags: ['Web3', 'React', 'Tailwind'],
    color: '#8e44ad',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-14',
    title: 'Travel App',
    category: 'Mobile UX',
    description: 'Immersive travel planning experience with rich media and itineraries.',
    tags: ['Flutter', 'Dart', 'UX'],
    color: '#e67e22',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    year: '2022'
  },
  {
    id: 'project-15',
    title: 'Restaurant POS',
    category: 'System Design',
    description: 'High-performance point of sale system for fast-paced service environments.',
    tags: ['Hardware', 'Interface', 'Performance'],
    color: '#c0392b',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-16',
    title: 'Fitness Tracker',
    category: 'Wearable UI',
    description: 'Companion app for a next-gen fitness wearable device.',
    tags: ['iOS', 'HealthKit', 'SwiftUI'],
    color: '#2ecc71',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-17',
    title: 'Smart Home Hub',
    category: 'IoT Interface',
    description: 'Centralized control efficiency for modern smart homes.',
    tags: ['HomeKit', 'React', 'Zigbee'],
    color: '#34495e',
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-18',
    title: 'Music Streaming',
    category: 'Media App',
    description: 'Reimagining the music discovery experience with social features.',
    tags: ['Streaming', 'Social', 'Mobile'],
    color: '#9b59b6',
    image: 'https://images.unsplash.com/photo-1614680376593-3b0f39343cc4?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-19',
    title: 'Learning Management',
    category: 'Enterprise SaaS',
    description: 'Corporate training platform focused on employee engagement.',
    tags: ['SaaS', 'B2B', 'Learning'],
    color: '#16a085',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    year: '2022'
  },
  {
    id: 'project-20',
    title: 'Virtual Event Space',
    category: '3D Web',
    description: 'Browser-based 3D environment for virtual conferences and meetups.',
    tags: ['Three.js', 'WebGL', 'Events'],
    color: '#2980b9',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-21',
    title: 'Charity Marketplace',
    category: 'Non-profit',
    description: 'Connecting donors with verified charitable causes transparently.',
    tags: ['Social Impact', 'Design', 'Trust'],
    color: '#e74c3c',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    year: '2024'
  },
  {
    id: 'project-22',
    title: 'Code Editor Theme',
    category: 'Developer Experience',
    description: 'A dark mode theme designed for long coding sessions.',
    tags: ['DX', 'Design', 'Accessibility'],
    color: '#2c3e50',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop',
    year: '2022'
  },
  {
    id: 'project-23',
    title: 'Weather App',
    category: 'Utility',
    description: 'Hyper-local weather forecasting with beautiful visualizations.',
    tags: ['Data', 'Visualization', 'Mobile'],
    color: '#3498db',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    year: '2023'
  },
  {
    id: 'project-24',
    title: 'Recipe Manager',
    category: 'Lifestyle',
    description: 'Organize, plan, and share family recipes with ease.',
    tags: ['Food', 'Social', 'App'],
    color: '#f1c40f',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop',
    year: '2024'
  }
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
    quote: "One of the few designers who can seamlessly move between high-level product strategy and hands-on implementation. A rare combination of skills that made a real impact on our product.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechCorp"
  },
  {
    quote: "Their understanding of both design systems and frontend architecture helped us ship faster without compromising quality. Would work with them again in a heartbeat.",
    author: "Marcus Johnson",
    role: "Engineering Director",
    company: "StartupXYZ"
  },
  {
    quote: "Brought a level of craft and attention to detail that elevated our entire product. The design system they built is still paying dividends years later.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "DesignStudio"
  }
];

export const skills = {
  design: [
    'Product Design',
    'UX Research',
    'Visual Design',
    'Design Systems',
    'Prototyping',
    'Brand Identity',
    'Motion Design',
    'Interaction Design'
  ],
  engineering: [
    'React / Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'GraphQL',
    'AWS / Vercel',
    'React Native',
    'Design Tokens'
  ]
};
