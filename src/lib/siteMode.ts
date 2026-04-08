export type SiteMode = "freelance" | "professional" | "design";

export function getSiteMode(): SiteMode {
  if (typeof window === "undefined") return "freelance";

  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  if (modeParam === "professional" || modeParam === "freelance" || modeParam === "design")
    return modeParam;

  const hostname = window.location.hostname;
  if (hostname === "htiruna.com" || hostname === "www.htiruna.com")
    return "professional";
  if (hostname === "harish.design" || hostname === "www.harish.design")
    return "design";

  return "freelance";
}

type SiteConfig = {
  mode: SiteMode;
  showAvailableBadge: boolean;
  showServices: boolean;
  hero: {
    subtitle: string;
    useCustomCursors: boolean;
  };
  footer: {
    heading: string;
    subheading: string;
    showBookCall: boolean;
  };
  meta: {
    title: string;
    description: string;
    ogUrl: string;
    ogDescription: string;
  };
};

const configs: Record<SiteMode, SiteConfig> = {
  freelance: {
    mode: "freelance",
    showAvailableBadge: true,
    showServices: true,
    hero: {
      subtitle:
        "Design + Engineering partner for early-stage startups that value craft and speed.",
      useCustomCursors: true,
    },
    footer: {
      heading: "Let's connect",
      subheading:
        "Have a project in mind that you think could use my help? I'd love to hear from you :)",
      showBookCall: true,
    },
    meta: {
      title: "Harish Tirunahari — Portfolio",
      description: "Designer + Engineer",
      ogUrl: "https://hari.sh/",
      ogDescription:
        "Designer & Engineer based in Australia working across design, code, and product.",
    },
  },
  professional: {
    mode: "professional",
    showAvailableBadge: false,
    showServices: false,
    hero: {
      subtitle:
        "Design Engineer with 12+ years of experience working across design, code, and product.",
      useCustomCursors: false,
    },
    footer: {
      heading: "Get in touch",
      subheading:
        "I'm always open to connecting with new people and exploring interesting opportunities.",
      showBookCall: false,
    },
    meta: {
      title: "Harish Tirunahari — Portfolio",
      description: "Design Engineer based in Australia",
      ogUrl: "https://htiruna.com/",
      ogDescription:
        "Design Engineer based in Australia with 12+ years across design, code, and product.",
    },
  },
  design: {
    mode: "design",
    showAvailableBadge: false,
    showServices: false,
    hero: {
      subtitle:
        "Product Designer who ships fast while obsessing over details.",
      useCustomCursors: false,
    },
    footer: {
      heading: "Get in touch",
      subheading:
        "I'm always open to connecting with new people and exploring interesting opportunities.",
      showBookCall: false,
    },
    meta: {
      title: "Harish Tirunahari — Product Designer",
      description:
        "Product Designer who builds what he designs. Design, code, and craft.",
      ogUrl: "https://harish.design/",
      ogDescription:
        "AI-native Product Designer. 12 years shipping polished interfaces across mobile, web, and enterprise.",
    },
  },
};

export const siteConfig: SiteConfig = configs[getSiteMode()];
