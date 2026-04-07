// import lj from "../assets/work/lj-2.webp";
// import watercoola from "../assets/work/watercoola/1.webp";
// import audiobook from "../assets/work/audiobook/1.webp";
import sbnbBanner from "../assets/work/superbnb/_banner.webp";
// import tpb from "../assets/work/tpb-3.webp";
import nearmap from "../assets/work/nearmap/_banner.webp";
import qantasBanner from "../assets/work/qantas/_banner.webp";
import wooflySplash from "../assets/work/woofly/mob_3.webp";
import wooflyCover from "../assets/work/woofly/_banner.webp";
// import reachout from "../assets/work/reachout.webp";
// import canon from "../assets/work/canon-2.webp";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  bgColor: string;
  image: string;
  type: "image" | "video";
  isMobile: boolean;
  year: string;
  logo?: string;
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
  /** Folder name under src/assets/work/ — images auto-discovered via glob */
  slug?: string;
  /** Choose between standard full modal or simply an enlarged visual */
  modalVariant?: "full" | "imageOnly";
  /** Hide the project from the main grid */
  isHidden?: boolean;
  /** Override which image appears on the home grid */
  gridImage?: string;
  /** Override the grid column span (1 = half row, 2 = full row) */
  gridSpan?: 1 | 2;
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

const createProject = (
  id: string,
  src: string,
  slug: string,
  isMobile: boolean,
  type: "image" | "video",
  title: string,
  description: string,
  services: string[],
  overrides?: Omit<Partial<Project>, "slug">
): Project => ({
  id,
  title,
  category: services[0] || "Design",
  description,
  services,
  tags: ["Design", "Development"],
  color: "#000000",
  bgColor: "#f0f0f0",
  image: src,
  type,
  isMobile,
  year: "2024",
  timeline: "3 Months",
  role: "Lead Designer",
  team: "2 Engineers, 1 Product Manager",
  collaborators: "Alex Rivera, Taylor Swift",
  client: "Confidential Client",
  subtitle: "A closer look at the process and outcomes of this project.",
  slug,
  ...overrides,
});

// Reorder projects by moving entries in this array
export const projects: Project[] = [
  createProject(
    "mob-1",
    wooflySplash,
    "woofly",
    true,
    "image",
    "Woofly",
    "A mobile app that helps dog owners find and book trusted walkers nearby. Leaving your dog with a stranger is stressful, so the whole experience is built around verification, reviews, transparent pricing, and detailed walker profiles that give you enough confidence to actually book. I did the user research, branding, and zero to one product design.",
    ["product design", "branding", "user research"],
    {
      subtitle: "Find trusted dog walkers nearby",
      client: "Personal Project",
      team: "Myself",
      year: "2023",
      role: "Product Designer",
      timeline: "8 Weeks",
      bgColor: "#FF6B00",
      gridSpan: 2,
      gridImage: wooflyCover,
    }
  ),
  createProject(
    "desk-1",
    sbnbBanner,
    "superbnb",
    false,
    "image",
    "Superbnb",
    "Superbnb helps digital nomads save money on accommodation by tracking Airbnb prices and sending deal alerts when rates drop. It also offers advanced filtering and search options tailored to long-stay travellers that you won't find on Airbnb itself. I designed the product from zero to one, including the branding, marketing site, and the full web app experience.",
    ["website design", "product design", "branding"],
    {
      subtitle: "Smarter Airbnb search for digital nomads",
      client: "Superbnb",
      team: "Myself, Frontend Engineer",
      year: "2024",
      role: "Lead Designer",
      timeline: "3 Months",
      bgColor: "#F43F5E",
    }
  ),
  // createProject(
  //   "desk-2",
  //   tpb,
  //   "",
  //   false,
  //   "image",
  //   "The Professional Builder",
  //   "A SaaS platform that gives builders a step-by-step system to start and run their own building company, with courses, task management, team tools, and compliance tracking.",
  //   ["product design", "frontend engineering"],
  //   {
  //     subtitle: "Business training and management tools for builders",
  //     client: "The Professional Builder (TBP)",
  //     team: "Myself, Backend Engineer",
  //     year: "2024",
  //     role: "Product Designer & Engineer",
  //     timeline: "6 Months",
  //     bgColor: "#059669",
  //     isHidden: true,
  //   },
  // ),
  createProject(
    "desk-3",
    nearmap,
    "nearmap",
    false,
    "image",
    "Nearmap",
    "A brand refresh for Australia's leading aerial imagery company. I was part of an engineering team that built their new marketing website on Next.js with a custom headless CMS and worked closely with the design team to build out a flexible design system.",
    ["frontend engineering"],
    {
      subtitle: "Turn location data into insightful answers",
      client: "Nearmap",
      team: "3 Engineers, 2 Designers, PM",
      year: "2024",
      role: "Frontend Engineer",
      timeline: "5 Months",
      bgColor: "#0284C7",
      liveLink: "https://www.nearmap.com.au",
    }
  ),
  createProject(
    "desk-4",
    qantasBanner,
    "qantas",
    false,
    "image",
    "Qantas Shopping",
    "A rewards platform that lets Qantas Frequent Flyers earn points through an online shopping mall with 450+ partner brands and a card-linked offers program for in-store purchases. I was part of the team that built this from scratch on Next.js and AWS microservices, integrating with external vendors and credit card providers. We also shipped a Chrome extension to help users earn points while browsing.",
    ["fullstack engineering"],
    {
      subtitle: "Loyalty program shopping portal",
      client: "Qantas Airways",
      team: "5 Engineers, 2 Designers, 2 PMs",
      role: "Fullstack Engineer",
      year: "2023",
      timeline: "8 Months",
      bgColor: "#DC2626",
      liveLink: "https://shopping.qantas.com/",
    }
  ),
  // createProject(
  //   "desk-6",
  //   canon,
  //   "",
  //   false,
  //   "image",
  //   "Canon",
  //   "Photography gear rental platform",
  //   ["frontend engineering"],
  //   {
  //     client: "Canon Australia",
  //     team: "3 Engineers, 1 Designer",
  //     role: "Frontend Engineer",
  //     year: "2024",
  //     timeline: "4 Months",
  //     bgColor: "#EA580C",
  //     isHidden: true,
  //   }
  // ),
  // createProject(
  //   "desk-7",
  //   reachout,
  //   "",
  //   false,
  //   "image",
  //   "Reachout",
  //   "Mental health support network",
  //   ["fullstack engineering"],
  //   {
  //     client: "Reachout Org",
  //     team: "4 Engineers, 2 Designers",
  //     role: "Fullstack Engineer",
  //     year: "2023",
  //     timeline: "6 Months",
  //     bgColor: "#4F46E5",
  //     isHidden: true,
  //   }
  // ),
  // createProject(
  //   "mob-2",
  //   watercoola,
  //   "watercoola", // Optional fallback
  //   true,
  //   "image",
  //   "Watercoola",
  //   "Connecting remote teams asynchronously through immersive virtual environments.",
  //   ["product design", "branding"],
  //   {
  //     client: "Watercoola Inc.",
  //     team: "Myself, 2 Frontend Engineers",
  //     year: "2024",
  //     timeline: "6 Weeks",
  //     bgColor: "#0EA5E9",
  //     modalVariant: "imageOnly",
  //   }
  // ),
  // createProject(
  //   "mob-3",
  //   audiobook,
  //   "audiobook",
  //   true,
  //   "image",
  //   "Audiobook app concept",
  //   "Listen to your favorite books on the go with this modern, accessible player.",
  //   ["product design"],
  //   {
  //     client: "Personal Project",
  //     team: "Myself",
  //     year: "2025",
  //     timeline: "2 Weeks",
  //     bgColor: "#8B5CF6",
  //     modalVariant: "imageOnly",
  //   }
  // ),
  // createProject(
  //   "mob-4",
  //   lj,
  //   "", // Need a generic slug or empty string here
  //   true,
  //   "image",
  //   "LJ Hooker",
  //   "A mobile app that keeps property buyers in the loop with instant notifications on price changes, new listings, and auction updates.",
  //   ["product design"],
  //   {
  //     subtitle: "Real-time property updates for home buyers",
  //     client: "LJ Hooker",
  //     team: "3 Engineers, 1 Designer, PM",
  //     year: "2023",
  //     role: "Product Designer",
  //     timeline: "4 Months",
  //     bgColor: "#1A1A2E",
  //     isHidden: true,
  //   }
  // ),
];

export const clients: Client[] = [
  { name: "Stripe", logo: "stripe" },
  { name: "Vercel", logo: "vercel" },
  { name: "Figma", logo: "figma" },
  { name: "Notion", logo: "notion" },
  { name: "Linear", logo: "linear" },
  { name: "Shopify", logo: "shopify" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "One of the few designers who can seamlessly move between high-level product strategy and hands-on implementation.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Their understanding of both design systems and frontend architecture helped us ship faster without compromising quality.",
    author: "Marcus Johnson",
    role: "Engineering Director",
    company: "StartupXYZ",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Brought a level of craft and attention to detail that elevated our entire product.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "DesignStudio",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export const skills = {
  design: [
    "Product Design",
    "UX Research",
    "Visual Design",
    "Design Systems",
    "Prototyping",
    "Brand Identity",
    "Motion Design",
    "Interaction Design",
  ],
  engineering: [
    "React / Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "AWS / Vercel",
    "React Native",
    "Design Tokens",
  ],
};
