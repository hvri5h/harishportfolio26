export type SiteMode = "freelance" | "professional";

export function getSiteMode(): SiteMode {
  if (typeof window === "undefined") return "freelance";

  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  if (modeParam === "professional" || modeParam === "freelance")
    return modeParam;

  const hostname = window.location.hostname;
  if (hostname === "htiruna.com" || hostname === "www.htiruna.com")
    return "professional";

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
        "Design + Engineering partner for startups that value craft and speed.",
      useCustomCursors: true,
    },
    footer: {
      heading: "Let's connect",
      subheading:
        "Have a project in mind that you think could use my help? I'd love to hear from you :)",
      showBookCall: true,
    },
    meta: {
      title: "Harish — Portfolio",
      description: "Designer + Engineer",
      ogUrl: "https://hari.sh/",
      ogDescription:
        "Independent Designer & Engineer based in Australia working across design, code, and product.",
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
      title: "Harish Tirunahari — Design Engineer",
      description: "Design Engineer based in Australia",
      ogUrl: "https://htiruna.com/",
      ogDescription:
        "Design Engineer based in Australia with 12+ years across design, code, and product.",
    },
  },
};

export const siteConfig: SiteConfig = configs[getSiteMode()];
