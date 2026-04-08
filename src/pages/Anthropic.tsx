import { useState, useEffect, useRef, useCallback } from "react";

/* ─── SVG Icons ─────────────────────────────────────────────────── */

function ClaudeWordmark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 16" height="16" fill="currentColor" aria-label="Claude" style={{ display: "block", color: "var(--c-text-100)" }}>
      <path d="M7.98 15.73C6.507 15.73 5.177 15.437 3.99 14.85C2.81 14.257 1.88 13.417 1.2 12.33C.527 11.237.19 9.963.19 8.51.19 7.01.527 5.673 1.2 4.5 1.873 3.327 2.8 2.417 3.98 1.77 5.167 1.117 6.493.79 7.96.79c.927 0 1.857.107 2.79.32 .94.213 1.753.53 2.44.95V5.36h-.9c-.24-1.133-.703-1.997-1.39-2.59-.687-.593-1.66-.89-2.92-.89-1.127 0-2.067.273-2.82.82-.753.54-1.313 1.283-1.68 2.23-.36.94-.54 2.017-.54 3.23 0 1.213.207 2.313.62 3.3.413.98 1.017 1.757 1.81 2.33.793.567 1.74.85 2.84.85.767 0 1.427-.167 1.98-.5.56-.34 1.027-.787 1.4-1.34.38-.553.747-1.233 1.1-2.04h.94l-.64 3.67c-.64.427-1.427.75-2.33.97-.907.22-1.8.33-2.68.33zM15.15 14.63c.333-.047.593-.1.78-.16.187-.06.333-.153.44-.28.107-.133.16-.317.16-.55V2.96l-1.38-.65V1.65L18.12.26h.79V13.64c0 .233.053.417.16.55.107.127.253.22.44.28.187.06.45.113.79.16v.87h-5.15v-.87zM24.44 15.73c-.553 0-1.05-.113-1.49-.34-.44-.233-.783-.553-1.03-.96-.24-.407-.36-.873-.36-1.4 0-.767.237-1.407.71-1.92.48-.513 1.2-.907 2.16-1.18l3.44-.97V7.56c0-.707-.167-1.243-.5-1.61-.327-.367-.807-.55-1.44-.55-.56 0-1 .177-1.32.53-.313.347-.47.827-.47 1.44v.98h-1.67c-.187-.12-.333-.287-.44-.5-.1-.213-.15-.447-.15-.7 0-.473.18-.91.54-1.31.36-.407.843-.727 1.45-.96.613-.233 1.29-.35 2.03-.35.913 0 1.693.143 2.34.43.653.287 1.15.707 1.49 1.26.347.553.52 1.217.52 1.99v5.29c0 .233.04.413.12.54.08.127.217.227.41.3.2.073.483.137.85.19v.86c-.533.207-1.067.31-1.6.31-.593 0-1.073-.14-1.44-.42-.36-.28-.583-.68-.67-1.2-.48.54-1.013.95-1.6 1.23-.587.28-1.213.42-1.88.42zm1.18-1.6c.387 0 .777-.087 1.17-.26.393-.18.753-.427 1.08-.74V9.87l-2.44.74c-.507.147-.887.38-1.14.7-.247.313-.37.717-.37 1.21 0 .307.073.583.22.83.147.24.35.43.61.57.26.14.55.21.87.21zM36.56 15.73c-1.08 0-1.88-.283-2.4-.85-.513-.567-.77-1.35-.77-2.35V6.91l-1.38-.54V5.7L34.98 4.53h.79v7.59c0 .633.153 1.103.46 1.41.313.307.783.46 1.41.46.413 0 .843-.093 1.29-.28.453-.193.87-.44 1.25-.74V6.91l-1.38-.54V5.7L41.77 4.53h.79v8.38c0 .26.053.46.16.6.113.14.263.243.45.31.187.06.447.113.78.16v.86l-2.98.85h-.79v-1.73c-.513.533-1.093.963-1.74 1.29-.64.32-1.267.48-1.88.48zM49.61 15.73c-.873 0-1.653-.22-2.34-.66-.687-.447-1.223-1.1-1.61-1.86-.38-.76-.57-1.6-.57-2.52 0-1.173.227-2.23.68-3.17.453-.94 1.103-1.68 1.95-2.22.853-.547 1.857-.82 3.01-.82.347 0 .7.037 1.06.11.36.067.707.17 1.04.31V2.96l-1.38-.65V1.65L54.42.26h.79v12.65c0 .26.053.46.16.6.113.14.263.243.45.31.187.06.447.113.78.16v.86l-2.98.85h-.79v-1.3c-.447.427-.943.757-1.49.99-.547.233-1.123.35-1.73.35zm.99-1.61c.387 0 .773-.073 1.16-.22.387-.153.743-.363 1.07-.63V6.38c-.573-.46-1.213-.69-1.92-.69-.733 0-1.353.2-1.86.6-.5.393-.883.923-1.12 1.59-.24.667-.36 1.403-.36 2.21 0 .767.107 1.453.32 2.06.22.607.557 1.087 1.01 1.44.453.353 1.02.53 1.7.53zM62.93 15.73c-.987 0-1.877-.233-2.67-.7-.787-.473-1.403-1.127-1.85-1.96-.447-.833-.67-1.77-.67-2.81 0-1.08.227-2.057.68-2.93.46-.873 1.09-1.557 1.89-2.05.807-.5 1.707-.75 2.7-.75.76 0 1.457.157 2.09.47.633.313 1.157.76 1.57 1.34.42.58.7 1.25.84 2.01l-7.37 2.31c.193.96.587 1.72 1.18 2.28.6.553 1.35.83 2.25.83.74 0 1.407-.197 2-.59.6-.4 1.13-1 1.59-1.8l.77.25c-.167.813-.49 1.53-1.01 2.15-.473.62-1.06 1.1-1.76 1.44-.693.34-1.45.51-2.27.51zm2.02-7.7c-.093-.473-.257-.89-.49-1.25-.233-.36-.52-.64-.86-.84-.333-.2-.697-.3-1.09-.3-.5 0-.94.153-1.32.46-.327.3-.617.73-.87 1.29-.207.56-.31 1.21-.31 1.95 0 .127.003.223.01.29l4.93-1.6z"/>
    </svg>
  );
}

/* Exact plus icon from Claude */
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M10 3a.5.5 0 0 1 .5.5v6h6l.1.01a.5.5 0 0 1 0 .98l-.1.01h-6v6a.5.5 0 0 1-1 0v-6h-6a.5.5 0 0 1 0-1h6v-6A.5.5 0 0 1 10 3"/>
  </svg>
);
const SidebarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z"/>
  </svg>
);
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M4.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"/></svg>
);
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.5 13a.5.5 0 0 1 .5.5v2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5v-2a.5.5 0 0 1 1 0v2a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 .5-.5M10 3a.5.5 0 0 1 .5.5v8.686l3.126-3.518a.5.5 0 0 1 .748.664l-4 4.5-.08.071a.5.5 0 0 1-.668-.071l-4-4.5-.059-.082A.5.5 0 0 1 6.3 8.6l.075.068L9.5 12.186V3.5A.5.5 0 0 1 10 3"/></svg>
);
const ChevronUpDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"/></svg>
);
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
/* Exact voice icon from Claude – 1px-wide rects */
const VoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <rect x="0" y="7.5" height="6" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
    <rect x="4" y="5.5" height="10" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
    <rect x="8" y="2.5" height="16" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
    <rect x="12" y="5.5" height="10" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
    <rect x="16" y="2.5" height="16" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
    <rect x="20" y="7.5" height="6" fill="currentColor" fillOpacity="1" width="1" rx="0.5" ry="0.5"/>
  </svg>
);
/* Action icons row: copy, thumbs up, thumbs down, refresh */
const ActionIcons = () => (
  <div className="cm-actions">
    <button className="cm-action-btn" data-tooltip="Copy"><CopyIcon /></button>
    <button className="cm-action-btn" data-tooltip="Good response"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg></button>
    <button className="cm-action-btn" data-tooltip="Bad response"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg></button>
    <button className="cm-action-btn" data-tooltip="Retry"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></button>
  </div>
);

/* ─── Conversation data ────────────────────────────────────────── */
type Conversation = {
  id: string;
  sidebarTitle: string;
  headerTitle: string;
  starred?: boolean;
  hasArtifact?: boolean;
};

const CONVERSATIONS: Conversation[] = [
  { id: "portfolio", sidebarTitle: "Converting case studies into interac...", headerTitle: "Converting case studies into interactive design portfolio", hasArtifact: true, starred: true },
  { id: "interview-prep", sidebarTitle: "Anthropic Product Designer role — interview prep ...", headerTitle: "Anthropic Product Designer role — interview prep study guide" },
  { id: "cover-letter", sidebarTitle: "Draft a cover letter angle for Anth...", headerTitle: "Draft a cover letter angle for Anthropic" },
  { id: "anthropic-values", sidebarTitle: "What does Anthropic value in design...", headerTitle: "What does Anthropic value in designers?" },
  { id: "design-challenge", sidebarTitle: "What would a design exercise at Ant...", headerTitle: "What would a design exercise at Anthropic look like?" },
  { id: "sf-move", sidebarTitle: "Convince me to move to San Francisc...", headerTitle: "Convince me to move to San Francisco" },
];

/* ─── Main page ─────────────────────────────────────────────────── */
/* ─── Code string for code view ────────────────────────────────── */
const ARTIFACT_CODE = `import { useState, useEffect, useCallback } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: number;
}

const PROJECTS: Project[] = [
  {
    id: "woofly",
    title: "Woofly",
    subtitle: "AI-powered pet care platform",
    tags: ["Product Design", "Design Systems", "Mobile"],
    year: 2025,
  },
  {
    id: "superbnb",
    title: "Superbnb",
    subtitle: "Reimagining short-term rental discovery",
    tags: ["UX Research", "Interaction Design", "Web"],
    year: 2024,
  },
  {
    id: "nearmap",
    title: "Nearmap",
    subtitle: "Geospatial imagery analysis tools",
    tags: ["Data Visualization", "Enterprise", "Desktop"],
    year: 2024,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        window.location.hash = project.id;
      }
    },
    [project.id]
  );

  return (
    <article
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={\`View \${project.title} case study\`}
    >
      <div className="project-meta">
        <span className="project-year">{project.year}</span>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const filtered = filter
    ? PROJECTS.filter((p) => p.tags.includes(filter))
    : PROJECTS;

  return (
    <main className="portfolio">
      <header className="portfolio-header">
        <h1>Selected Work</h1>
        <p>Design engineering at the intersection of craft and systems.</p>
      </header>
      <section className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}`;

/* ─── Simple syntax tokenizer ─────────────────────────────────── */
type TokenType = "keyword" | "string" | "comment" | "number" | "operator" | "property" | "variable" | "punctuation" | "default";

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "rgb(204, 123, 244)",
  variable: "rgb(251, 173, 96)",
  string: "rgb(155, 233, 99)",
  property: "rgb(244, 123, 133)",
  number: "rgb(94, 237, 237)",
  comment: "rgb(129, 136, 152)",
  operator: "rgb(234, 236, 240)",
  punctuation: "inherit",
  default: "var(--c-text-100)",
};

const KEYWORDS = new Set([
  "import", "export", "const", "let", "var", "function", "return", "from",
  "default", "if", "else", "new", "type", "interface", "extends", "implements",
  "class", "this", "null", "undefined", "true", "false", "typeof", "instanceof",
]);

function tokenizeLine(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  let i = 0;

  while (i < line.length) {
    // Whitespace
    if (/\s/.test(line[i])) {
      let start = i;
      while (i < line.length && /\s/.test(line[i])) i++;
      tokens.push({ text: line.slice(start, i), color: TOKEN_COLORS.default });
      continue;
    }
    // Line comments
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ text: line.slice(i), color: TOKEN_COLORS.comment });
      break;
    }
    // Strings (double, single, backtick)
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) {
        if (line[j] === "\\") j++;
        j++;
      }
      j = Math.min(j + 1, line.length);
      tokens.push({ text: line.slice(i, j), color: TOKEN_COLORS.string });
      i = j;
      continue;
    }
    // Numbers
    if (/[0-9]/.test(line[i]) && (i === 0 || !/[a-zA-Z_$]/.test(line[i - 1]))) {
      let start = i;
      while (i < line.length && /[0-9.]/.test(line[i])) i++;
      tokens.push({ text: line.slice(start, i), color: TOKEN_COLORS.number });
      continue;
    }
    // Operators
    if (/[=<>!&|+\-*/%?:]/.test(line[i])) {
      let start = i;
      while (i < line.length && /[=<>!&|+\-*/%?:]/.test(line[i])) i++;
      tokens.push({ text: line.slice(start, i), color: TOKEN_COLORS.operator });
      continue;
    }
    // Punctuation
    if (/[{}()\[\];,.]/.test(line[i])) {
      tokens.push({ text: line[i], color: TOKEN_COLORS.punctuation });
      i++;
      continue;
    }
    // Words (identifiers/keywords)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let start = i;
      while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) i++;
      const word = line.slice(start, i);
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, color: TOKEN_COLORS.keyword });
      } else if (i < line.length && line[i] === "(") {
        tokens.push({ text: word, color: TOKEN_COLORS.variable });
      } else if (start > 0 && line[start - 1] === ".") {
        tokens.push({ text: word, color: TOKEN_COLORS.property });
      } else if (word[0] === word[0].toUpperCase() && /[a-z]/.test(word.slice(1))) {
        tokens.push({ text: word, color: TOKEN_COLORS.variable });
      } else {
        tokens.push({ text: word, color: TOKEN_COLORS.default });
      }
      continue;
    }
    // Fallback
    tokens.push({ text: line[i], color: TOKEN_COLORS.default });
    i++;
  }

  return tokens;
}

/* ─── Main page ─────────────────────────────────────────────────── */
export default function Anthropic() {
  const [sb, setSb] = useState(false);
  const [activeChat, setActiveChat] = useState("portfolio");
  const [artifactWidth, setArtifactWidth] = useState(50); // percentage
  const [isResizing, setIsResizing] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [mobilePanel, setMobilePanel] = useState<"chat" | "artifact">("artifact");
  const [showArtifact, setShowArtifact] = useState(true);
  const activeConv = CONVERSATIONS.find(c => c.id === activeChat) || CONVERSATIONS[1];
  const panelsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.title = `${activeConv.headerTitle} - Claude`;
    if (window.innerWidth < 768) setSb(false);
    // Set initial artifact width to 900px equivalent
    const sidebarWidth = 49; // collapsed
    const available = window.innerWidth - sidebarWidth;
    const target = window.innerWidth >= 1440 ? 1100 : 900;
    setArtifactWidth(Math.min(80, Math.max(30, (target / available) * 100)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = artifactWidth;
    const panelsEl = panelsRef.current;
    if (!panelsEl) return;
    const panelsWidth = panelsEl.getBoundingClientRect().width;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dPct = (dx / panelsWidth) * 100;
      const chatMinPx = 340;
      const maxPct = ((panelsWidth - chatMinPx) / panelsWidth) * 100;
      const newWidth = Math.max(20, Math.min(maxPct, startWidth - dPct));
      setArtifactWidth(newWidth);
    };
    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [artifactWidth]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,360;0,400;0,600;1,360&display=swap" rel="stylesheet" />

      <div className="cr">
        {/* ── Sidebar ── */}
        <nav className={`cs ${sb ? "cs-open" : "cs-closed"}`} aria-label="Sidebar">
          {/* Expanded content */}
          <div className={`cs-expanded ${sb ? "cs-visible" : "cs-hidden"}`}>
            <div className="cs-header">
              <div className="cs-header-logo">
                <a href="/anthropic" aria-label="Home" tabIndex={0}>
                  <ClaudeWordmark />
                </a>
              </div>
              <button className="cs-sidebar-toggle" onClick={() => setSb(false)} style={{ position: 'absolute', right: '8px', top: '8px' }} data-tooltip="Close sidebar">
                <SidebarIcon />
              </button>
            </div>
            <div className="cs-ex-nav">
              <div className="cs-ex-primary">
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><div className="cs-newchat-pill"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 .077 1.496l-.077.004h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3"/></svg></div></div>
                  <span>New chat</span>
                </a>
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 2a6.5 6.5 0 0 1 4.935 10.728l4.419 4.419.064.078a.5.5 0 0 1-.693.693l-.079-.064-4.419-4.42A6.5 6.5 0 1 1 8.5 2m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11"/></svg></div>
                  <span>Search</span>
                </a>
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M12.5 3A1.5 1.5 0 0 1 14 4.5V6h.5A3.5 3.5 0 0 1 18 9.5v6a1.5 1.5 0 0 1-1.5 1.5h-13a1.5 1.5 0 0 1-1.492-1.347L2 15.5v-6A3.5 3.5 0 0 1 5.5 6H6V4.5A1.5 1.5 0 0 1 7.5 3zM3 15.5l.01.1a.5.5 0 0 0 .49.4h13a.5.5 0 0 0 .5-.5V12h-4v.5a.5.5 0 0 1-1 0V12H8v.5a.5.5 0 0 1-1 0V12H3zM5.5 7A2.5 2.5 0 0 0 3 9.5V11h4v-.5a.5.5 0 0 1 1 0v.5h4v-.5a.5.5 0 0 1 1 0v.5h4V9.5A2.5 2.5 0 0 0 14.5 7zm2-3a.5.5 0 0 0-.5.5V6h6V4.5a.5.5 0 0 0-.5-.5z"/></svg></div>
                  <span>Customize</span>
                </a>
              </div>
              <div className="cs-ex-secondary">
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.99962 2C12.3133 2 14.9996 4.68629 14.9996 8C14.9996 11.3137 12.3133 14 8.99962 14H2.49962C2.30105 13.9998 2.12113 13.8821 2.04161 13.7002C1.96224 13.5181 1.99835 13.3058 2.1334 13.1602L3.93516 11.2178C3.34317 10.2878 2.99962 9.18343 2.99962 8C2.99962 4.68643 5.68609 2.00022 8.99962 2ZM8.99962 3C6.23838 3.00022 3.99961 5.23871 3.99961 8C3.99961 9.11212 4.36265 10.1386 4.97618 10.9688C5.11884 11.1621 5.1035 11.4293 4.94004 11.6055L3.64512 13H8.99962C11.761 13 13.9996 10.7614 13.9996 8C13.9996 5.23858 11.761 3 8.99962 3Z"/><path d="M16.5445 9.72754C16.4182 9.53266 16.1678 9.44648 15.943 9.53418C15.7183 9.62215 15.5932 9.85502 15.6324 10.084L15.7369 10.3955C15.9073 10.8986 16.0006 11.438 16.0006 12C16.0006 13.1123 15.6376 14.1386 15.024 14.9687C14.8811 15.1621 14.8956 15.4302 15.0592 15.6064L16.3531 17H11.0006C9.54519 17 8.23527 16.3782 7.32091 15.3848L7.07091 15.1103C6.88996 14.9645 6.62535 14.9606 6.43907 15.1143C6.25267 15.2682 6.20668 15.529 6.31603 15.7344L6.58458 16.0625C7.68048 17.253 9.25377 18 11.0006 18H17.5006C17.6991 17.9998 17.8791 17.8822 17.9586 17.7002C18.038 17.5181 18.0018 17.3058 17.8668 17.1602L16.0631 15.2178C16.6554 14.2876 17.0006 13.1837 17.0006 12C17.0006 11.3271 16.8891 10.6792 16.6842 10.0742L16.5445 9.72754Z"/></svg></div>
                  <span>Chats</span>
                </a>
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M15.8198 7C16.6885 7.00025 17.3624 7.73158 17.3178 8.57617L17.2993 8.74707L16.1332 15.7471C16.0126 16.4699 15.3865 16.9996 14.6538 17H5.34711C4.6142 16.9998 3.98833 16.47 3.86762 15.7471L2.7016 8.74707C2.54922 7.83277 3.25418 7 4.18109 7H15.8198ZM4.18109 8C3.87216 8 3.63722 8.27731 3.68793 8.58203L4.85394 15.582C4.89413 15.8229 5.10291 15.9998 5.34711 16H14.6538C14.8978 15.9996 15.1068 15.8228 15.1469 15.582L16.3129 8.58203L16.3188 8.46973C16.3036 8.21259 16.0899 8.00023 15.8198 8H4.18109Z"/><path d="M16.0004 5.5C16.0004 5.224 15.7764 5.00024 15.5004 5H4.50043C4.22428 5 4.00043 5.22386 4.00043 5.5C4.00043 5.77614 4.22428 6 4.50043 6H15.5004C15.7764 5.99976 16.0004 5.776 16.0004 5.5Z"/><path d="M14.5004 3.5C14.5004 3.224 14.2764 3.00024 14.0004 3H6.00043C5.72428 3 5.50043 3.22386 5.50043 3.5C5.50043 3.77614 5.72428 4 6.00043 4H14.0004C14.2764 3.99976 14.5004 3.776 14.5004 3.5Z"/></svg></div>
                  <span>Projects</span>
                </a>
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M6.35352 3.1464L9.35352 6.14642C9.43935 6.25103 9.5 6.36003 9.5 6.50091C9.4998 6.6332 9.44704 6.75988 9.35352 6.85346L6.35352 9.85347C6.14584 10.0609 5.85611 10.0243 5.64648 9.85347L2.64648 6.85346C2.55296 6.75988 2.5002 6.6332 2.5 6.50091C2.5 6.36841 2.55285 6.24017 2.64648 6.14642L5.64648 3.1464C5.8552 2.97421 6.14635 2.93936 6.35352 3.1464ZM6 8.79194L3.70703 6.49994L6 4.20696L8.29297 6.49994L6 8.79194Z"/><path d="M16.8984 3.7509C16.9875 3.90632 16.986 4.09826 16.8955 4.25286L15.5791 6.49994L16.8955 8.74702C16.986 8.90159 16.9874 9.09354 16.8984 9.24898C16.8093 9.40436 16.643 9.49996 16.4638 9.49996H11.5C11.3198 9.49996 11.1532 9.4028 11.0644 9.24605C10.976 9.08949 10.9789 8.89736 11.0713 8.74312L12.417 6.49994L11.0713 4.25676C10.9789 4.1025 10.976 3.91037 11.0644 3.75383C11.1532 3.59717 11.3199 3.49992 11.5 3.49992H16.4638C16.6429 3.51309 16.8055 3.58909 16.8984 3.7509ZM13.4287 6.2431C13.5152 6.4107 13.5166 6.58638 13.4287 6.75678L12.3828 8.49995H15.5918L14.5683 6.75287C14.477 6.59683 14.477 6.40303 14.5683 6.24701L15.5918 4.49993H12.3828L13.4287 6.2431Z"/><path fillRule="evenodd" clipRule="evenodd" d="M7.25293 10.9668C7.40708 10.8793 7.59647 10.8801 7.75 10.9687C7.90356 11.0574 7.99869 11.2211 8 11.3984L8.01074 12.8388L9.30762 13.6054C9.42811 13.6994 9.49994 13.8448 9.5 14C9.5 14.1773 9.40587 14.3418 9.25293 14.4316L8.01074 15.1601L7.99512 16.667C7.97406 16.8184 7.88446 16.9536 7.75 17.0312C7.59642 17.1199 7.40713 17.1207 7.25293 17.0332L6 16.3203L4.74707 17.0332C4.59287 17.1207 4.40358 17.1199 4.25 17.0312C4.09643 16.9425 4.00124 16.7789 4 16.6015L3.99023 15.1601L2.74707 14.4316C2.59413 14.3418 2.5 14.1773 2.5 14C2.50006 13.8448 2.57188 13.6994 2.69238 13.6054L3.99023 12.8388L4 11.3984C4.00131 11.2211 4.09644 11.0574 4.25 10.9687C4.40353 10.8801 4.59292 10.8793 4.74707 10.9668L6 11.6787L7.25293 10.9668ZM4.99512 12.2568L5.75293 12.6884C5.90608 12.7754 6.09392 12.7754 6.24707 12.6884L7.00586 12.2568L7.01172 13.1308C7.01308 13.3068 7.10706 13.4695 7.25879 13.5586L8.01172 14L7.25879 14.4414C7.10706 14.5304 7.01315 14.6932 7.01172 14.8691L7.00586 15.7422L6.24707 15.3115C6.09397 15.2246 5.90603 15.2246 5.75293 15.3115L4.99512 15.7422L4.98828 14.8691C4.98703 14.7152 4.91459 14.5716 4.79492 14.4785L3.98926 14L4.74121 13.5586C4.87421 13.4805 4.96267 13.3457 4.9834 13.1953L4.99512 12.2568Z"/><path fillRule="evenodd" clipRule="evenodd" d="M14 11C15.6568 11 16.9999 12.3432 17 14C17 15.6568 15.6569 17 14 17C12.3431 17 11 15.6568 11 14C11.0001 12.3432 12.3432 11 14 11ZM12 14C12.0001 12.8955 12.8955 12 14 12C15.1045 12 15.9999 12.8955 16 14C16 15.1045 15.1046 16 14 16C12.8954 16 12 15.1045 12 14Z"/></svg></div>
                  <span>Artifacts</span>
                </a>
                <a className="cs-ex-item">
                  <div className="cs-ex-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M11.6318 4.01757C11.898 4.09032 12.055 4.36555 11.9824 4.63183L8.98242 15.6318C8.90966 15.8981 8.63449 16.0551 8.36816 15.9824C8.10193 15.9097 7.94495 15.6345 8.01758 15.3682L11.0176 4.36816C11.0904 4.102 11.3656 3.94497 11.6318 4.01757Z"/><path d="M13.124 6.17089C13.3059 5.96325 13.6213 5.9423 13.8291 6.12402L17.8291 9.62402L17.9014 9.70215C17.9647 9.78754 18 9.89182 18 10C18 10.1441 17.9375 10.281 17.8291 10.376L13.8291 13.876L13.7471 13.9346C13.5449 14.0498 13.2833 14.011 13.124 13.8291C12.9649 13.6472 12.9606 13.3824 13.1016 13.1973L13.1709 13.124L16.7412 10L13.1709 6.87597C12.9632 6.69411 12.9422 6.37866 13.124 6.17089Z"/><path d="M6.25293 6.06542C6.45509 5.95025 6.71675 5.98908 6.87598 6.17089C7.03513 6.35279 7.03933 6.6176 6.89844 6.80273L6.8291 6.87597L3.25879 10L6.8291 13.124C7.03682 13.3059 7.05771 13.6213 6.87598 13.8291C6.69413 14.0369 6.37869 14.0578 6.1709 13.876L2.1709 10.376L2.09863 10.2979C2.03528 10.2124 2 10.1082 2 10C2.00005 9.85591 2.06247 9.71893 2.1709 9.62402L6.1709 6.12402L6.25293 6.06542Z"/></svg></div>
                  <span>Code</span>
                </a>
              </div>
            </div>
            <div className="cs-recents">
              <div className="cs-label">Starred</div>
              {CONVERSATIONS.filter(c => c.starred).map(c => (
                <a key={c.id} className={`cs-chat-item${activeChat === c.id ? " cs-chat-active" : ""}`} onClick={() => { setActiveChat(c.id); setShowArtifact(!!c.hasArtifact); if (window.innerWidth < 768) { setSb(false); setMobilePanel("chat"); } }}>
                  <span>{c.sidebarTitle}</span>
                  {activeChat === c.id && <span className="cs-chat-more"><MoreIcon /></span>}
                </a>
              ))}
              <div className="cs-label">Recents</div>
              {CONVERSATIONS.filter(c => !c.starred).map(c => (
                <a key={c.id} className={`cs-chat-item${activeChat === c.id ? " cs-chat-active" : ""}`} onClick={() => { setActiveChat(c.id); setShowArtifact(!!c.hasArtifact); if (window.innerWidth < 768) { setSb(false); setMobilePanel("chat"); } }}>
                  <span>{c.sidebarTitle}</span>
                  {activeChat === c.id && <span className="cs-chat-more"><MoreIcon /></span>}
                </a>
              ))}
            </div>
            <div className="cs-footer">
              <button className="cs-user">
                <div className="cs-avatar">H</div>
                <div className="cs-user-info">
                  <span className="cs-user-name">Harish</span>
                  <span className="cs-user-plan">Max plan</span>
                </div>
                <div className="cs-footer-icons">
                  <button className="cs-footer-icon-btn"><DownloadIcon /></button>
                  <ChevronUpDown />
                </div>
              </button>
            </div>
          </div>

          {/* Collapsed content */}
          <div className={`cs-collapsed-inner ${!sb ? "cs-visible" : "cs-hidden"}`}>
            <div className="cs-c-top">
              <button className="cs-sidebar-toggle" onClick={() => setSb(true)} aria-label="Expand sidebar" data-tooltip="Open sidebar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.5 4A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM7 15h9.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H6V5z"/></svg>
              </button>
              <button className="cs-c-newchat" aria-label="New chat" data-tooltip="New chat">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 .077 1.496l-.077.004h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3"/></svg>
              </button>
              <button className="cs-c-btn" aria-label="Search" data-tooltip="Search">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 2a6.5 6.5 0 0 1 4.935 10.728l4.419 4.419.064.078a.5.5 0 0 1-.693.693l-.079-.064-4.419-4.42A6.5 6.5 0 1 1 8.5 2m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11"/></svg>
              </button>
              <button className="cs-c-btn" aria-label="Customize" data-tooltip="Customize Claude">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M12.5 3A1.5 1.5 0 0 1 14 4.5V6h.5A3.5 3.5 0 0 1 18 9.5v6a1.5 1.5 0 0 1-1.5 1.5h-13a1.5 1.5 0 0 1-1.492-1.347L2 15.5v-6A3.5 3.5 0 0 1 5.5 6H6V4.5A1.5 1.5 0 0 1 7.5 3zM3 15.5l.01.1a.5.5 0 0 0 .49.4h13a.5.5 0 0 0 .5-.5V12h-4v.5a.5.5 0 0 1-1 0V12H8v.5a.5.5 0 0 1-1 0V12H3zM5.5 7A2.5 2.5 0 0 0 3 9.5V11h4v-.5a.5.5 0 0 1 1 0v.5h4v-.5a.5.5 0 0 1 1 0v.5h4V9.5A2.5 2.5 0 0 0 14.5 7zm2-3a.5.5 0 0 0-.5.5V6h6V4.5a.5.5 0 0 0-.5-.5z"/></svg>
              </button>
              <div className="cs-c-divider" />
              <button className="cs-c-btn" aria-label="Chats" data-tooltip="Chats">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.99962 2C12.3133 2 14.9996 4.68629 14.9996 8C14.9996 11.3137 12.3133 14 8.99962 14H2.49962C2.30105 13.9998 2.12113 13.8821 2.04161 13.7002C1.96224 13.5181 1.99835 13.3058 2.1334 13.1602L3.93516 11.2178C3.34317 10.2878 2.99962 9.18343 2.99962 8C2.99962 4.68643 5.68609 2.00022 8.99962 2ZM8.99962 3C6.23838 3.00022 3.99961 5.23871 3.99961 8C3.99961 9.11212 4.36265 10.1386 4.97618 10.9688C5.11884 11.1621 5.1035 11.4293 4.94004 11.6055L3.64512 13H8.99962C11.761 13 13.9996 10.7614 13.9996 8C13.9996 5.23858 11.761 3 8.99962 3Z"/><path d="M16.5445 9.72754C16.4182 9.53266 16.1678 9.44648 15.943 9.53418C15.7183 9.62215 15.5932 9.85502 15.6324 10.084L15.7369 10.3955C15.9073 10.8986 16.0006 11.438 16.0006 12C16.0006 13.1123 15.6376 14.1386 15.024 14.9687C14.8811 15.1621 14.8956 15.4302 15.0592 15.6064L16.3531 17H11.0006C9.54519 17 8.23527 16.3782 7.32091 15.3848L7.07091 15.1103C6.88996 14.9645 6.62535 14.9606 6.43907 15.1143C6.25267 15.2682 6.20668 15.529 6.31603 15.7344L6.58458 16.0625C7.68048 17.253 9.25377 18 11.0006 18H17.5006C17.6991 17.9998 17.8791 17.8822 17.9586 17.7002C18.038 17.5181 18.0018 17.3058 17.8668 17.1602L16.0631 15.2178C16.6554 14.2876 17.0006 13.1837 17.0006 12C17.0006 11.3271 16.8891 10.6792 16.6842 10.0742L16.5445 9.72754Z"/></svg>
              </button>
              <button className="cs-c-btn" aria-label="Projects" data-tooltip="Projects">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M15.8198 7C16.6885 7.00025 17.3624 7.73158 17.3178 8.57617L17.2993 8.74707L16.1332 15.7471C16.0126 16.4699 15.3865 16.9996 14.6538 17H5.34711C4.6142 16.9998 3.98833 16.47 3.86762 15.7471L2.7016 8.74707C2.54922 7.83277 3.25418 7 4.18109 7H15.8198ZM4.18109 8C3.87216 8 3.63722 8.27731 3.68793 8.58203L4.85394 15.582C4.89413 15.8229 5.10291 15.9998 5.34711 16H14.6538C14.8978 15.9996 15.1068 15.8228 15.1469 15.582L16.3129 8.58203L16.3188 8.46973C16.3036 8.21259 16.0899 8.00023 15.8198 8H4.18109Z"/><path d="M16.0004 5.5C16.0004 5.224 15.7764 5.00024 15.5004 5H4.50043C4.22428 5 4.00043 5.22386 4.00043 5.5C4.00043 5.77614 4.22428 6 4.50043 6H15.5004C15.7764 5.99976 16.0004 5.776 16.0004 5.5Z"/><path d="M14.5004 3.5C14.5004 3.224 14.2764 3.00024 14.0004 3H6.00043C5.72428 3 5.50043 3.22386 5.50043 3.5C5.50043 3.77614 5.72428 4 6.00043 4H14.0004C14.2764 3.99976 14.5004 3.776 14.5004 3.5Z"/></svg>
              </button>
              <button className="cs-c-btn" aria-label="Artifacts" data-tooltip="Artifacts">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M6.35352 3.1464L9.35352 6.14642C9.43935 6.25103 9.5 6.36003 9.5 6.50091C9.4998 6.6332 9.44704 6.75988 9.35352 6.85346L6.35352 9.85347C6.14584 10.0609 5.85611 10.0243 5.64648 9.85347L2.64648 6.85346C2.55296 6.75988 2.5002 6.6332 2.5 6.50091C2.5 6.36841 2.55285 6.24017 2.64648 6.14642L5.64648 3.1464C5.8552 2.97421 6.14635 2.93936 6.35352 3.1464ZM6 8.79194L3.70703 6.49994L6 4.20696L8.29297 6.49994L6 8.79194Z"/><path d="M16.8984 3.7509C16.9875 3.90632 16.986 4.09826 16.8955 4.25286L15.5791 6.49994L16.8955 8.74702C16.986 8.90159 16.9874 9.09354 16.8984 9.24898C16.8093 9.40436 16.643 9.49996 16.4638 9.49996H11.5C11.3198 9.49996 11.1532 9.4028 11.0644 9.24605C10.976 9.08949 10.9789 8.89736 11.0713 8.74312L12.417 6.49994L11.0713 4.25676C10.9789 4.1025 10.976 3.91037 11.0644 3.75383C11.1532 3.59717 11.3199 3.49992 11.5 3.49992H16.4638C16.6429 3.51309 16.8055 3.58909 16.8984 3.7509ZM13.4287 6.2431C13.5152 6.4107 13.5166 6.58638 13.4287 6.75678L12.3828 8.49995H15.5918L14.5683 6.75287C14.477 6.59683 14.477 6.40303 14.5683 6.24701L15.5918 4.49993H12.3828L13.4287 6.2431Z"/><path fillRule="evenodd" clipRule="evenodd" d="M7.25293 10.9668C7.40708 10.8793 7.59647 10.8801 7.75 10.9687C7.90356 11.0574 7.99869 11.2211 8 11.3984L8.01074 12.8388L9.30762 13.6054C9.42811 13.6994 9.49994 13.8448 9.5 14C9.5 14.1773 9.40587 14.3418 9.25293 14.4316L8.01074 15.1601L7.99512 16.667C7.97406 16.8184 7.88446 16.9536 7.75 17.0312C7.59642 17.1199 7.40713 17.1207 7.25293 17.0332L6 16.3203L4.74707 17.0332C4.59287 17.1207 4.40358 17.1199 4.25 17.0312C4.09643 16.9425 4.00124 16.7789 4 16.6015L3.99023 15.1601L2.74707 14.4316C2.59413 14.3418 2.5 14.1773 2.5 14C2.50006 13.8448 2.57188 13.6994 2.69238 13.6054L3.99023 12.8388L4 11.3984C4.00131 11.2211 4.09644 11.0574 4.25 10.9687C4.40353 10.8801 4.59292 10.8793 4.74707 10.9668L6 11.6787L7.25293 10.9668ZM4.99512 12.2568L5.75293 12.6884C5.90608 12.7754 6.09392 12.7754 6.24707 12.6884L7.00586 12.2568L7.01172 13.1308C7.01308 13.3068 7.10706 13.4695 7.25879 13.5586L8.01172 14L7.25879 14.4414C7.10706 14.5304 7.01315 14.6932 7.01172 14.8691L7.00586 15.7422L6.24707 15.3115C6.09397 15.2246 5.90603 15.2246 5.75293 15.3115L4.99512 15.7422L4.98828 14.8691C4.98703 14.7152 4.91459 14.5716 4.79492 14.4785L3.98926 14L4.74121 13.5586C4.87421 13.4805 4.96267 13.3457 4.9834 13.1953L4.99512 12.2568Z"/><path fillRule="evenodd" clipRule="evenodd" d="M14 11C15.6568 11 16.9999 12.3432 17 14C17 15.6568 15.6569 17 14 17C12.3431 17 11 15.6568 11 14C11.0001 12.3432 12.3432 11 14 11ZM12 14C12.0001 12.8955 12.8955 12 14 12C15.1045 12 15.9999 12.8955 16 14C16 15.1045 15.1046 16 14 16C12.8954 16 12 15.1045 12 14Z"/></svg>
              </button>
              <button className="cs-c-btn" aria-label="Code" data-tooltip="Code">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M11.6318 4.01757C11.898 4.09032 12.055 4.36555 11.9824 4.63183L8.98242 15.6318C8.90966 15.8981 8.63449 16.0551 8.36816 15.9824C8.10193 15.9097 7.94495 15.6345 8.01758 15.3682L11.0176 4.36816C11.0904 4.102 11.3656 3.94497 11.6318 4.01757Z"/><path d="M13.124 6.17089C13.3059 5.96325 13.6213 5.9423 13.8291 6.12402L17.8291 9.62402L17.9014 9.70215C17.9647 9.78754 18 9.89182 18 10C18 10.1441 17.9375 10.281 17.8291 10.376L13.8291 13.876L13.7471 13.9346C13.5449 14.0498 13.2833 14.011 13.124 13.8291C12.9649 13.6472 12.9606 13.3824 13.1016 13.1973L13.1709 13.124L16.7412 10L13.1709 6.87597C12.9632 6.69411 12.9422 6.37866 13.124 6.17089Z"/><path d="M6.25293 6.06542C6.45509 5.95025 6.71675 5.98908 6.87598 6.17089C7.03513 6.35279 7.03933 6.6176 6.89844 6.80273L6.8291 6.87597L3.25879 10L6.8291 13.124C7.03682 13.3059 7.05771 13.6213 6.87598 13.8291C6.69413 14.0369 6.37869 14.0578 6.1709 13.876L2.1709 10.376L2.09863 10.2979C2.03528 10.2124 2 10.1082 2 10C2.00005 9.85591 2.06247 9.71893 2.1709 9.62402L6.1709 6.12402L6.25293 6.06542Z"/></svg>
              </button>
            </div>
            <div className="cs-c-bottom">
              <div className="cs-c-avatar">H</div>
            </div>
          </div>
        </nav>

        {/* ── Chat + Artifact panels ── */}
        <div className={`cx-panels ${isResizing ? "cx-resizing" : ""}`} ref={panelsRef}>
          {/* Chat panel */}
          <div className={`cx-chat ${mobilePanel === "chat" ? "cx-mobile-active" : "cx-mobile-hidden"}`} style={{ width: showArtifact ? `${100 - artifactWidth}%` : '100%' }}>
            <header className="cx-head">
              <div className="cx-head-blur" />
              <div className="cx-head-inner">
                <div className="cx-head-left">
                  <button className="cx-head-sidebar-toggle" onClick={() => setSb(true)} aria-label="Open sidebar" data-tooltip="Open sidebar">
                    <SidebarIcon />
                  </button>
                  <div className="cx-title-group">
                    <button className="cx-title-btn">
                      <div className="cx-title-text">{activeConv.headerTitle}</div>
                    </button><div className="cx-title-sep" /><button className="cx-title-chevron" aria-label="More options">
                      <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg>
                      </div>
                    </button>
                  </div>
                </div>
                <div className={`cx-head-right ${mobilePanel === "artifact" ? "cx-head-right-hidden" : ""}`}>
                  <button className="cx-head-action" aria-label="Open sidebar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M11.586 2a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V16.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.492-1.347L4 16.5v-13A1.5 1.5 0 0 1 5.5 2zM5.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h-2.5A1.5 1.5 0 0 1 11 5.5V3zm7.04 10.304a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696m0-4a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696M12 5.5a.5.5 0 0 0 .5.5h2.293L12 3.207z"/></svg>
                  </button>
                  <button className="cx-head-share">Share</button>
                </div>
              </div>
            </header>

            <div className="cx-scroll">
              <div className="cx-msgs">

                {activeChat === "portfolio" && (<>
                {/* File attachment */}
                <div className="cm cm-user">
                  <div className="cm-file">
                    <div className="cm-file-card">
                      <span className="cm-file-name">case-studies.md</span>
                      <span className="cm-file-type">MD</span>
                    </div>
                  </div>
                  <div className="cm-bubble">
                    <p className="cb-text-user">Hey Claude, could you transform the following md file of all my design projects into an interactive portfolio site that I can use to submit a job application to work at Anthropic?</p>
                    <p className="cb-text-user" style={{ marginTop: 12 }}>Direction:</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Clean white canvas. The project imagery brings all the color, not the container</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Large, high-quality images that fill the frame. Each project gets its own bold accent and card size — mix of mobile and desktop at different scales</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Images should tease continuation so you want to click into the full project</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— 3D memoji in the hero that tracks the cursor. Name, one-liner, straight into work</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Scroll-driven stacking animations for the project deep-dives</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Typography needs to be sharp — display font for headings, clean sans for body. This is the first thing people will judge</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Personal about section with a handwritten signature. Not a corporate bio</p>
                    <p className="cb-text-user" style={{ marginTop: 4 }}>— Client logo cloud. Keep it subtle</p>
                    <p className="cb-text-user" style={{ marginTop: 12 }}>React, Tailwind, Framer Motion. Single page, smooth scroll.</p>
                  </div>
                </div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Planning image-led portfolio layout with per-project accent system and scroll-driven reveals</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">Strong direction — image-forward, gallery feel, let the craft speak. I'll build this so the work hits before anyone reads a word.</p>
                  <div className="cm-thinking-wrap" style={{ marginBottom: 4 }}><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Composing project grid with cursor-tracking 3D hero and stacking card animations</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">Here's your portfolio, Harish. The whole thing is designed so the work lands before anyone reads a single word — large project imagery on a clean white canvas, each card filling the frame with its own bold accent color.</p>
                  <p className="cb-text">The 3D memoji tracks the cursor to grab attention in the hero. Below that it's name, positioning, and straight into the project grid — mixed card sizes at mobile and desktop scale so the layout has rhythm. Each card teases the project with cropped imagery that makes you want to click in. Opening a project triggers a scroll-driven stacking animation into the full set of images.</p>
                  <p className="cb-text">Typography is tight — display font for headings, clean sans for body, consistent hierarchy throughout. About section is personal with your handwritten signature. Logo cloud sits above the footer for social proof. Everything is responsive and smooth on mobile.</p>
                  <div className="cm-artifact-wrap"><div className="cm-artifact-card" role="button" tabIndex={0} aria-label="Portfolio. Open artifact." onClick={() => { setShowArtifact(true); setMobilePanel("artifact"); }}><div className="cm-artifact-inner"><div className="cm-artifact-left"><div className="cm-artifact-thumb-area"><div className="cm-artifact-thumb"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M67.84,92.61,25.37,128l42.47,35.39a6,6,0,1,1-7.68,9.22l-48-40a6,6,0,0,1,0-9.22l48-40a6,6,0,0,1,7.68,9.22Zm176,30.78-48-40a6,6,0,1,0-7.68,9.22L230.63,128l-42.47,35.39a6,6,0,1,0,7.68,9.22l48-40a6,6,0,0,0,0-9.22Zm-81.79-89A6,6,0,0,0,154.36,38l-64,176A6,6,0,0,0,94,221.64a6.15,6.15,0,0,0,2,.36,6,6,0,0,0,5.64-3.95l64-176A6,6,0,0,0,162.05,34.36Z"/></svg></div></div><div className="cm-artifact-info"><div className="cm-artifact-title">Portfolio</div><div className="cm-artifact-type">Code<span className="cm-artifact-dot"> · </span>JSX&nbsp;</div></div></div><div className="cm-artifact-actions"><button className="cm-artifact-download" type="button" aria-label="Download">Download</button></div></div></div></div>
                  <ActionIcons />
                </div></div>
                </>)}

                {activeChat === "cover-letter" && (<>
                <div className="cm cm-user"><div className="cm-bubble">
                  <p className="cb-text-user">I need to write a cover letter for Anthropic's Product Designer role. I've already written a first draft but it feels generic — like it could be for any design role at any tech company. I want it to feel specific to Anthropic and specific to me.</p>
                  <p className="cb-text-user" style={{ marginTop: 12 }}>Their AI guidance says to write the first draft myself and then use Claude to refine it, which is what I'm doing. Can you help me figure out which parts of my experience to emphasise that'll resonate most with what they're looking for?</p>
                </div></div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Identifying strongest cover letter angles based on Anthropic's JD and design team values</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">Good instinct to follow their guidance — the fact that you're using Claude to refine (not generate) already signals you read it. Here's what I'd lean into:</p>
                  <p className="cb-text"><strong>Lead with why Anthropic specifically, not why design generally.</strong> They read hundreds of "I'm passionate about design" cover letters. What they don't hear often is someone who can articulate why designing for AI trust is fundamentally different from designing for engagement — and why that excites you. If you have a point of view on how AI should feel when people use it, put that up front.</p>
                  <p className="cb-text"><strong>Show that you ship in ambiguity.</strong> Their JD repeats this theme: "fast-paced, often ambiguous, resource-constrained." Don't just say you're comfortable with ambiguity — give a one-sentence example of a time you made a design decision without complete information and it worked. That's more convincing than any adjective.</p>
                  <p className="cb-text"><strong>Mention your AI workflow naturally.</strong> They want people who are "AI-native in how you work." If you're already using Claude in your design process, mention it briefly — not as a flex, but as context for how you think about the tools you'd be designing.</p>
                  <p className="cb-text"><strong>Keep it short.</strong> Three paragraphs max. Why Anthropic, what you bring, and one specific thing about the role that excites you. Hiring managers at companies like this are scanning, not reading — make every sentence earn its spot.</p>
                  <ActionIcons />
                </div></div>
                </>)}

                {activeChat === "anthropic-values" && (<>
                <div className="cm cm-user"><div className="cm-bubble">
                  <p className="cb-text-user">I've been reading everything I can find about Anthropic's design team. The job descriptions, the blog posts, the product updates. I want to make sure my application actually speaks to what they care about — not what I assume they care about based on other tech companies.</p>
                  <p className="cb-text-user" style={{ marginTop: 12 }}>What patterns do you see in what they value? Be specific.</p>
                </div></div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Analyzing Anthropic's public design philosophy and hiring signals across JDs and product updates</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">A few clear patterns stand out from how Anthropic talks about design publicly:</p>
                  <p className="cb-text"><strong>Craft at speed, not craft instead of speed.</strong> Their JDs consistently pair "polish" with "ship fast." They want designers who obsess over details but don't use that as an excuse to slow down. The tension between these two is the signal — they want people who can hold both.</p>
                  <p className="cb-text"><strong>Designing for trust, not delight.</strong> Most product companies optimize for engagement. Anthropic's language centers on trust, safety, and reliability. When Claude "feels like a collaborator," that's a design outcome — and it's very different from "delightful micro-interactions." Their design philosophy seems rooted in: does this make the AI feel more trustworthy?</p>
                  <p className="cb-text"><strong>Comfort with ambiguity.</strong> They're explicit about this — "designing around capabilities that are emerging in real-time." This isn't a mature product with established patterns. They want designers who can make decisions with incomplete information and iterate without anxiety.</p>
                  <p className="cb-text"><strong>AI-native workflow.</strong> Not just "uses AI" but uses it as a genuine creative partner. They name Claude Code specifically. This is a company that expects its designers to extend what they can build by using the tools they're making.</p>
                  <p className="cb-text"><strong>Small team, high ownership.</strong> The design team is explicitly described as small. That means broad scope per designer, direct collaboration with engineers and researchers, and no hiding behind process. They want people who can own a problem end-to-end.</p>
                  <ActionIcons />
                </div></div>
                </>)}

                {activeChat === "design-challenge" && (<>
                <div className="cm cm-user"><div className="cm-bubble">
                  <p className="cb-text-user">If I get to the design exercise stage at Anthropic, what kind of challenge do you think they'd give me? I want to practice but I don't want to prep for the wrong thing.</p>
                  <p className="cb-text-user" style={{ marginTop: 12 }}>Based on the JD — they mention Claude Cowork, Claude Code, Growth, Developer Platform, and Consumer as team areas. What would a design exercise for this role actually look like?</p>
                </div></div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Anticipating Anthropic design exercise format based on role scope and team areas</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">Based on how Anthropic talks about design and the team areas in the JD, here's what I'd expect:</p>
                  <p className="cb-text"><strong>Most likely format:</strong> An open-ended design prompt around an AI interaction problem — not a typical "redesign this screen" exercise. Something like "Design an experience where Claude helps a user accomplish [task] across multiple sessions" or "How would you help new users understand what Claude can do without overwhelming them?" The ambiguity is the point — they want to see how you scope and make decisions, not whether you can push perfect pixels in 4 hours.</p>
                  <p className="cb-text"><strong>What they're evaluating:</strong> How you think about trust (when should the AI ask permission vs. act?), progressive disclosure (how much capability do you reveal upfront?), and failure states (what happens when Claude gets something wrong?). These are the unique design problems at an AI company that don't have established conventions yet — which is exactly what the JD means by "rethinking the basics."</p>
                  <p className="cb-text"><strong>How to stand out:</strong> Don't just deliver mockups. Show your decision framework — what you considered, what you rejected and why, where you'd want to test with real users. They value "product intuition" paired with craft. A thoughtful low-fi concept with clear rationale will beat a polished screen with no reasoning.</p>
                  <p className="cb-text"><strong>Practice exercise:</strong> Pick any Claude feature (artifacts, projects, the system prompt) and redesign the first-time experience for it. Walk through it as if you're presenting to a product team — 5 minutes, clear problem statement, 2-3 design directions, and your recommendation with trade-offs. That's basically what the real exercise will feel like.</p>
                  <ActionIcons />
                </div></div>
                </>)}

                {activeChat === "sf-move" && (<>
                <div className="cm cm-user"><div className="cm-bubble">
                  <p className="cb-text-user">Ok so hypothetically if I got this job I'd have to move to SF. I've been in Melbourne for years and I genuinely love it here. The coffee is better, the weather is better (fight me), and I don't have to explain what a flat white is to anyone.</p>
                  <p className="cb-text-user" style={{ marginTop: 12 }}>Give me your best pitch. Why should I uproot my entire life and move to San Francisco?</p>
                </div></div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Building a case for relocating from Melbourne to San Francisco</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">I'm not going to fight you on the coffee — Melbourne wins that easily and you know it. But here's the case anyway:</p>
                  <p className="cb-text"><strong>You'd be designing the future of human-AI interaction.</strong> Not metaphorically. Literally. Claude is used by millions of people daily and the design decisions you'd make would directly shape how people experience AI. That's not a line you get to put on many resumes. Melbourne has great studios and startups, but this is a once-in-a-generation technology shift and Anthropic is at the center of it.</p>
                  <p className="cb-text"><strong>The density of people who care about this stuff.</strong> In Melbourne, you're probably the most AI-obsessed designer in your circle. In SF, you'd be surrounded by hundreds of people who think about these problems all day. That proximity compounds — hallway conversations, weekend projects, the energy of being in a room where everyone's building something that matters.</p>
                  <p className="cb-text"><strong>The timing.</strong> You've spent 12 years building the exact skill set they're looking for — design + engineering + AI fluency. That combination is rare right now. In 3 years, half the design industry will have caught up. This is the window where your background is a genuine differentiator.</p>
                  <p className="cb-text"><strong>And honestly?</strong> You can always come back. Melbourne isn't going anywhere. The flat whites will wait. But an opportunity to work on Claude at this stage of the company probably won't.</p>
                  <p className="cb-text">Also — the burritos in the Mission District are legitimately better than anything in Melbourne. I said what I said.</p>
                  <ActionIcons />
                </div></div>
                </>)}

                {activeChat === "interview-prep" && (<>
                <div className="cm cm-user"><div className="cm-bubble">
                  <p className="cb-text-user">Alright, let's say I get past the portfolio screen (fingers crossed). I need to be ready. Can you put together a study guide specifically for the Anthropic Product Designer role?</p>
                  <p className="cb-text-user" style={{ marginTop: 12 }}>I want to nail the AI safety concepts, understand their research focus, and be ready for both the design critique and behavioral rounds. Don't give me generic interview advice — make it specific to this company and this role.</p>
                </div></div>
                <div className="cm cm-assistant"><div className="cm-content">
                  <div className="cm-thinking-wrap"><button className="cm-thinking" aria-expanded="false"><div className="cm-thinking-inner"><span className="cm-thinking-text">Creating targeted study guide for Anthropic Product Designer interview across design, technical, and behavioral rounds</span><span className="cm-thinking-chevron"><div className="cm-thinking-chevron-wrap"><svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg></div></span></div></button></div>
                  <p className="cb-text">Here's a focused study guide broken into the areas they'll likely probe:</p>
                  <p className="cb-text"><strong>1. AI Safety Concepts (know the landscape)</strong></p>
                  <p className="cb-text">You don't need to be a researcher, but you should be able to discuss: Constitutional AI (Anthropic's alignment approach), RLHF and how it shapes model behavior, the alignment problem in plain language, why "helpful, harmless, and honest" is harder than it sounds, and what responsible scaling means. Read Anthropic's core research page and their RSP (Responsible Scaling Policy). Be able to explain why a Product Designer at an AI safety company is different from a PD at any other tech company.</p>
                  <p className="cb-text"><strong>2. Design Critique Prep</strong></p>
                  <p className="cb-text">They'll likely give you a design exercise around AI interaction patterns. Practice thinking through: how do you design for output uncertainty (Claude might be wrong), progressive disclosure of AI capabilities, trust calibration (when should users trust vs. verify), and the tension between making AI feel capable vs. making it feel safe. Walk through Claude's current UI and form opinions — what works, what you'd change, and why.</p>
                  <p className="cb-text"><strong>3. Behavioral / Values Fit</strong></p>
                  <p className="cb-text">Prepare specific stories for: shipping fast under ambiguity (startup experience), making hard trade-offs between polish and speed, collaborating with engineers on technical constraints, and taking ownership of a problem end-to-end. For each, have the situation, your specific contribution, and the measurable outcome ready. They value intellectual honesty — be ready to talk about something you shipped that you'd do differently now.</p>
                  <p className="cb-text"><strong>4. Your Unique Angle</strong></p>
                  <p className="cb-text">Your biggest differentiator is that you design AND build, and you already use their tools. Prepare a story about how using Claude Code or Cursor changed your design process — not just made you faster, but changed the decisions you made. That's the AI-native signal they're screening for.</p>
                  <ActionIcons />
                </div></div>
                </>)}

                {/* Claude blob */}
                <div className="cm-blob">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32" fill="currentColor">
                    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Input – exact match to Claude markup */}
            <div className="cx-input-area">
              <div className="cx-input-box">
                <div className="cx-input-content">
                  <div className="cx-input-textarea">
                    <div className="cx-input-placeholder">Reply...</div>
                  </div>
                  <div className="cx-input-toolbar">
                    <div className="cx-input-toolbar-left">
                      <button className="cx-btn-plus" aria-label="Add files, connectors, and more" data-tooltip="Add content">
                        <PlusIcon />
                      </button>
                    </div>
                    <button className="cx-btn-model">
                      <div className="cx-model-inner">
                        <div className="cx-model-name">Opus 4.6</div>
                        <span className="cx-model-ext">Extended</span>
                      </div>
                      <div className="cx-model-chevron">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, opacity: 0.75 }}>
                          <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/>
                        </svg>
                      </div>
                    </button>
                    <div className="cx-btn-voice-wrap">
                      <button className="cx-btn-voice" aria-label="Use voice mode" data-tooltip="Use voice mode">
                        <VoiceIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="cx-disclaimer">Claude is AI and can make mistakes. Please double-check responses.</p>
            </div>
          </div>

          {/* ── Resize handle ── */}
          {showArtifact && <div className="cx-resize" onMouseDown={handleMouseDown}>
            <div className="cx-resize-line" />
            <div className="cx-resize-handle" />
          </div>}

          {/* ── Artifact Panel (right) ── */}
          {showArtifact && <div className={`ca-panel ${mobilePanel === "artifact" ? "cx-mobile-active" : "cx-mobile-hidden"}`} style={{ width: `${artifactWidth}%` }}>
            <div className="ca-bar">
              <div className="ca-bar-left">
                {/* Segmented control */}
                <div className="ca-segmented" role="group">
                  <button className="ca-seg-btn" data-state={viewMode === "preview" ? "on" : "off"} aria-label="Preview" onClick={() => setViewMode("preview")}>
                    <div className="ca-seg-icon-wrap"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M10 4c4.028 0 6.643 3.306 7.66 4.866l.08.133a2.06 2.06 0 0 1 0 2.002l-.08.133C16.643 12.694 14.028 16 10 16c-3.777 0-6.311-2.906-7.451-4.555l-.21-.311a2.07 2.07 0 0 1 0-2.268l.21-.311C3.689 6.905 6.223 4 10 4m0 1C6.747 5 4.476 7.53 3.38 9.11l-.202.302a1.07 1.07 0 0 0 0 1.176l.203.302C4.476 12.47 6.747 15 10 15c3.47 0 5.822-2.878 6.822-4.412l.077-.14a1.06 1.06 0 0 0 0-.896l-.077-.14C15.822 7.878 13.47 5 10 5m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg></div>
                  </button>
                  <button className="ca-seg-btn" data-state={viewMode === "code" ? "on" : "off"} aria-label="Code" onClick={() => setViewMode("code")}>
                    <div className="ca-seg-icon-wrap"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M11.632 4.018a.5.5 0 0 1 .35.614l-3 11a.5.5 0 0 1-.964-.264l3-11a.5.5 0 0 1 .614-.35m1.492 2.153a.5.5 0 0 1 .705-.047l4 3.5.072.078a.5.5 0 0 1-.072.674l-4 3.5-.082.059a.5.5 0 0 1-.645-.738l.069-.073L16.74 10l-3.57-3.124a.5.5 0 0 1-.047-.705m-6.871-.106a.5.5 0 0 1 .645.738l-.069.073L3.26 10l3.57 3.124a.5.5 0 1 1-.658.752l-4-3.5-.072-.078a.5.5 0 0 1 .072-.674l4-3.5z"/></svg></div>
                  </button>
                  {/* Sliding indicator */}
                  <div className="ca-seg-indicator" aria-hidden="true">
                    <div className="ca-seg-indicator-inner" style={{ clipPath: viewMode === "preview" ? 'inset(0px 50% 0px 0% round 8px)' : 'inset(0px 0% 0px 50% round 8px)' }}>
                      <div className="ca-seg-indicator-item">
                        <div className="ca-seg-icon-wrap"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M10 4c4.028 0 6.643 3.306 7.66 4.866l.08.133a2.06 2.06 0 0 1 0 2.002l-.08.133C16.643 12.694 14.028 16 10 16c-3.777 0-6.311-2.906-7.451-4.555l-.21-.311a2.07 2.07 0 0 1 0-2.268l.21-.311C3.689 6.905 6.223 4 10 4m0 1C6.747 5 4.476 7.53 3.38 9.11l-.202.302a1.07 1.07 0 0 0 0 1.176l.203.302C4.476 12.47 6.747 15 10 15c3.47 0 5.822-2.878 6.822-4.412l.077-.14a1.06 1.06 0 0 0 0-.896l-.077-.14C15.822 7.878 13.47 5 10 5m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg></div>
                      </div>
                      <div className="ca-seg-indicator-item">
                        <div className="ca-seg-icon-wrap"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M11.632 4.018a.5.5 0 0 1 .35.614l-3 11a.5.5 0 0 1-.964-.264l3-11a.5.5 0 0 1 .614-.35m1.492 2.153a.5.5 0 0 1 .705-.047l4 3.5.072.078a.5.5 0 0 1-.072.674l-4 3.5-.082.059a.5.5 0 0 1-.645-.738l.069-.073L16.74 10l-3.57-3.124a.5.5 0 0 1-.047-.705m-6.871-.106a.5.5 0 0 1 .645.738l-.069.073L3.26 10l3.57 3.124a.5.5 0 1 1-.658.752l-4-3.5-.072-.078a.5.5 0 0 1 .072-.674l4-3.5z"/></svg></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="ca-bar-title">Portfolio<span className="ca-bar-sep"> · </span><span className="ca-bar-type">JSX</span></h2>
              </div>
              <div className="ca-bar-right">
                {/* Split copy button */}
                <div className="ca-copy-group">
                  <button className="ca-copy-btn">Copy</button>
                  <button className="ca-copy-chevron">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/></svg>
                  </button>
                </div>
                {/* Refresh */}
                <button className="ca-bar-icon" data-tooltip="Refresh" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10.386 2.51A7.5 7.5 0 1 1 5.499 4H3a.5.5 0 0 1 0-1h3.5a.5.5 0 0 1 .49.402L7 3.5V7a.5.5 0 0 1-1 0V4.879a6.5 6.5 0 1 0 4.335-1.37L10 3.5l-.1-.01a.5.5 0 0 1 .1-.99z"/></svg>
                </button>
                {/* Close */}
                <button className="ca-bar-icon" aria-label="Go back" onClick={() => { setShowArtifact(false); setMobilePanel("chat"); }} data-tooltip="Close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M15.147 4.146a.5.5 0 0 1 .707.707L10.707 10l5.147 5.147a.5.5 0 0 1-.63.771l-.078-.064L10 10.707l-5.146 5.147a.5.5 0 0 1-.708-.707L9.293 10 4.146 4.853a.5.5 0 0 1 .708-.707L10 9.293z"/></svg>
                </button>
              </div>
            </div>
            <div className="ca-content">
              {viewMode === "preview" ? (
                <iframe
                  ref={iframeRef}
                  src="/?mode=design"
                  className="ca-iframe"
                  title="Portfolio"
                />
              ) : (
                <div className="ca-code-view">
                  {ARTIFACT_CODE.split("\n").map((line, i) => (
                    <div className="ca-code-line" key={i}>
                      <span className="ca-code-ln">{i + 1}</span>
                      <span className="ca-code-spacer" />
                      <span className="ca-code-content">
                        {line === "" ? "\n" : tokenizeLine(line).map((tok, j) => (
                          <span key={j} style={tok.color !== "inherit" ? { color: tok.color } : undefined}>{tok.text}</span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>}
        </div>
      </div>

      <style>{`
:root {
  --c-bg: hsl(60, 3%, 15%);
  --c-sb: hsl(40, 4%, 14%);
  --c-bg-100: hsl(40, 4%, 14%);
  --c-bg-000: #30302e;
  --c-bg-200: rgba(194,192,182,1);
  --c-bg-300: #141413;
  --c-text-100: #faf9f5;
  --c-text-200: #c2c0b6;
  --c-text-300: #c2c0b6;
  --c-text-400: #9c9a92;
  --c-text-500: #7a7872;
  --c-brand: #D97757;
  --c-border: rgba(222,220,209,0.12);
  --c-border-300: rgba(222,220,209,0.15);
  --c-border-strong: rgba(222,220,209,0.3);
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
}

.cr, .cr *, .cr *::before, .cr *::after {
  box-sizing: border-box; margin: 0; padding: 0;
  cursor: inherit;
}
.cr { cursor: default; }
.cr ::selection { background: rgba(255,255,255,0.15); color: inherit; }
.cr {
  display: flex; height: 100vh; width: 100vw; overflow: hidden;
  font-family: var(--font-sans);
  font-size: 16px; line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background: var(--c-bg); color: var(--c-text-100);
}

/* ═══ SIDEBAR ═══ */
.cs {
  background: var(--c-sb);
  border-right: 0.5px solid var(--c-border-300);
  display: flex; flex-direction: column;
  overflow: hidden;
  height: 100vh;
  position: relative;
  transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1),
              min-width 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.cs.cs-open { width: 18rem; min-width: 18rem; overflow: visible; }
.cs.cs-closed { width: 49px; min-width: 49px; overflow: visible; }
/* Expanded/collapsed content visibility */
.cs-expanded {
  display: flex; flex-direction: column;
  height: 100%; width: 18rem;
  position: absolute; top: 0; left: 0;
  transition: opacity 150ms ease;
}
.cs-collapsed-inner {
  display: flex; flex-direction: column;
  height: 100%; width: 49px;
  position: absolute; top: 0; left: 0;
  transition: opacity 150ms ease;
}
.cs-visible { opacity: 1; pointer-events: auto; }
.cs-hidden { opacity: 0; pointer-events: none; }
.cs-c-top {
  display: flex; flex-direction: column; align-items: center;
  padding: 8px 0 0; gap: 2px; flex: 1;
}
.cs-c-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; background: none; border: none;
  color: var(--c-text-100); border-radius: 8px;
  transition: background-color 150ms;
  flex-shrink: 0; cursor: pointer !important;
}
.cs-c-btn:hover { background: var(--c-bg-300); }

/* Tooltips — default (below) */
.cr [data-tooltip] { position: relative; }
.cr [data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  background: var(--c-bg-300); color: var(--c-text-100);
  font-family: var(--c-font); font-size: 12px; font-weight: 500; line-height: 1;
  padding: 5px 8px; border-radius: 6px;
  white-space: nowrap; pointer-events: none;
  opacity: 0; transition: opacity 100ms ease;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  left: 50%; top: calc(100% + 6px); transform: translateX(-50%);
}
.cr [data-tooltip]:hover::after { opacity: 1; }

/* Tooltip — right (all sidebar toggles + sidebar items) */
.cs [data-tooltip]::after,
.cx-head-sidebar-toggle[data-tooltip]::after {
  left: calc(100% + 10px); top: 50%; transform: translateY(-50%);
}

.cs-c-newchat {
  display: flex; align-items: center; justify-content: center;
  width: 1.4rem; height: 1.4rem;
  background: rgba(156,154,146,0.15);
  border: none; border-radius: 50%;
  color: var(--c-text-200); transition: background 35ms, color 35ms;
  flex-shrink: 0; margin: 4px 0; cursor: pointer !important;
}
.cs-c-newchat:hover { background: rgba(156,154,146,0.25); color: var(--c-text-100); }
.cs-c-divider {
  width: 24px; height: 1px;
  background: var(--c-border); margin: 4px 0;
}
.cs-c-bottom {
  display: flex; flex-direction: column; align-items: center;
  padding: 8px 0 16px; gap: 4px;
}
.cs-c-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--c-text-200); color: var(--c-sb);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 600; flex-shrink: 0;
  user-select: none;
}
.cs-sidebar-toggle {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; background: none; border: none;
  color: #9c9a92 !important; border-radius: 8px;
  transition: background-color 150ms, color 150ms;
  cursor: pointer !important;
}
.cs-sidebar-toggle:hover { background: var(--c-bg-300); color: var(--c-text-100) !important; }
/* Expanded nav header */
.cs-header {
  position: relative;
  display: flex; width: 100%; align-items: center;
  padding: 8px; padding-top: 8px;
}
.cs-header-logo {
  display: flex; align-items: center; gap: 6px;
  padding-left: 8px; height: 32px;
  overflow: clip; transition: opacity 150ms; opacity: 1;
}
.cs-header-logo a {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
  text-decoration: none;
}
/* Expanded nav items */
.cs-ex-nav { padding: 8px 0 0; }
.cs-ex-primary, .cs-ex-secondary { display: flex; flex-direction: column; gap: 1px; padding: 0 8px; }
.cs-ex-secondary { padding-top: 8px; margin-top: 8px; border-top: 1px solid var(--c-border); }
.cs-ex-item {
  display: flex; align-items: center; gap: 12px;
  height: 32px; border-radius: 8px;
  padding: 6px 8px;
  color: var(--c-text-100); font-size: 14px;
  text-decoration: none;
  transition: background-color 150ms;
  cursor: pointer !important;
}
.cs-ex-item:hover { background: rgba(255,255,255,0.05); }
.cs-ex-icon {
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; flex-shrink: 0;
  color: var(--c-text-100);
}
.cs-ex-icon svg { flex-shrink: 0; }
.cs-newchat-pill {
  width: 1.4rem; height: 1.4rem;
  border-radius: 50%;
  background: rgba(156,154,146,0.15);
  display: flex; align-items: center; justify-content: center;
  margin: -0.2rem;
}
.cs-newchat-pill svg { width: 16px; height: 16px; }
.cs-recents {
  flex: 1; overflow-y: auto; padding: 0 8px 8px;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.cs-label {
  font-size: 12px; font-weight: 500; color: var(--c-text-400);
  padding: 0 8px 8px; margin-top: 16px;
  text-transform: none; letter-spacing: 0;
}
.cs-chat-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px; border-radius: 8px; cursor: pointer;
  color: var(--c-text-200); font-size: 14px;
  text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: background 35ms; height: 32px; line-height: 20px;
}
.cs-chat-item > span:first-child {
  overflow: hidden; flex: 1; min-width: 0; white-space: nowrap;
  -webkit-mask-image: linear-gradient(to right, #000 78%, transparent 95%);
  mask-image: linear-gradient(to right, #000 78%, transparent 95%);
  mask-size: 100% 100%;
}
.cs-chat-item:hover { background: rgba(255,255,255,0.04); }
.cs-chat-item .cs-chat-more { opacity: 0; transition: opacity 35ms; }
.cs-chat-item:hover .cs-chat-more { opacity: 1; }
.cs-chat-active { background: var(--c-bg-300) !important; color: var(--c-text-100); }
.cs-chat-active .cs-chat-more { opacity: 1; }
.cs-chat-more {
  color: var(--c-text-400); flex-shrink: 0; margin-left: 4px;
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 4px;
}
.cs-chat-more:hover { background: var(--c-bg-300); }
.cs-footer { padding: 8px 12px; border-top: 1px solid var(--c-border); }
.cs-user {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 4px 4px; background: none; border: none;
  color: var(--c-text-200); text-align: left; font-size: 14px;
  border-radius: 8px; transition: background 35ms;
}
.cs-user:hover { background: rgba(255,255,255,0.04); }
.cs-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--c-text-200); color: var(--c-sb);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 600; flex-shrink: 0;
  user-select: none;
}
.cs-user-info { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.cs-user-name { font-size: 14px; font-weight: 500; color: var(--c-text-100); }
.cs-user-plan { font-size: 12px; color: var(--c-text-400); }
.cs-footer-icons { display: flex; gap: 4px; align-items: center; color: var(--c-text-400); }
.cs-footer-icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; background: none; border: none;
  color: var(--c-text-400); border-radius: 6px; transition: background 35ms;
}
.cs-footer-icon-btn:hover { background: var(--c-bg-300); color: var(--c-text-200); }

/* ═══ PANELS (chat + artifact) ═══ */
.cx-panels { flex: 1; display: flex; min-width: 0; position: relative; }
.cx-panels.cx-resizing { cursor: col-resize !important; }
.cx-panels.cx-resizing * { cursor: col-resize !important; pointer-events: none !important; }
.cx-panels.cx-resizing .cx-resize { pointer-events: auto !important; }
.cx-chat {
  display: flex; flex-direction: column; min-width: 340px; flex-shrink: 0;
  overflow: hidden;
}
.cx-head {
  position: sticky; top: 0; z-index: 20;
  width: 100%; height: 48px; flex-shrink: 0;
  background: var(--c-bg);
}
.cx-head-blur {
  pointer-events: none; position: absolute;
  inset: 0; bottom: -20px; z-index: -1;
  background: linear-gradient(to bottom, var(--c-bg), var(--c-bg) 65%, transparent);
  filter: blur(4px);
}
.cx-head-inner {
  display: flex; width: 100%; align-items: center;
  justify-content: space-between; gap: 24px;
  padding: 12px 12px 12px 16px; height: 100%;
}
.cx-head-left { display: flex; min-width: 0; flex: 1; align-items: center; gap: 4px; }
.cx-head-sidebar-toggle {
  display: none; align-items: center; justify-content: center;
  width: 32px; height: 32px; border: none; background: none;
  color: #9c9a92; border-radius: 6px;
  transition: background-color 150ms, color 150ms;
  cursor: pointer !important; flex-shrink: 0;
}
.cx-head-sidebar-toggle:hover { background: var(--c-bg-300); color: var(--c-text-100); }
.cx-head-right {
  display: none; align-items: center; gap: 8px; flex-shrink: 0;
}
.cx-head-right-hidden { display: none !important; }
.cx-head-action {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border: none; background: none;
  color: var(--c-text-400); border-radius: 6px;
  transition: background-color 150ms, color 150ms;
  cursor: pointer !important;
}
.cx-head-action:hover { background: var(--c-bg-300); color: var(--c-text-200); }
.cx-head-share {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 0 12px; min-width: 4rem;
  border: 0.5px solid rgba(222,220,209,0.25); border-radius: 6px;
  background: none; color: var(--c-text-100);
  font-size: 12px; font-weight: 500; white-space: nowrap;
  transition: background-color 100ms;
  cursor: pointer !important;
}
.cx-head-share:hover { background: var(--c-bg-300); }
.cx-title-group {
  display: flex; align-items: center;
}
.cx-title-group:hover .cx-title-btn,
.cx-title-group:hover .cx-title-chevron {
  background: var(--c-bg-300);
}
.cx-title-btn {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative; flex-shrink: 1; min-width: 0;
  border: none; background: none; border-radius: 8px 0 0 8px;
  padding: 0 8px; height: 28px;
  color: var(--c-text-200); font-size: 14px; font-weight: 500;
  transition: background-color 300ms, color 300ms;
  cursor: pointer !important;
}
.cx-title-btn:hover { color: var(--c-text-100); }
.cx-title-btn:active { background: var(--c-bg-300) !important; }
.cx-title-text {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 14px; font-weight: 500;
}
.cx-title-sep { width: 1.5px; height: 28px; flex-shrink: 0; }
.cx-title-chevron {
  display: inline-flex; align-items: center; justify-content: center;
  border: none; background: none; border-radius: 0 8px 8px 0;
  height: 28px; width: 28px; flex-shrink: 0;
  color: var(--c-text-200);
  transition: background-color 300ms, color 300ms;
  cursor: pointer !important;
}
.cx-title-chevron:hover { color: var(--c-text-100); }
.cx-title-chevron:active { background: var(--c-bg-300) !important; }
.cx-scroll {
  flex: 1; overflow-y: auto; overflow-x: hidden; min-width: 0;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.cx-scroll::-webkit-scrollbar { width: 6px; }
.cx-scroll::-webkit-scrollbar-track { background: transparent; }
.cx-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
.cx-msgs { max-width: 48rem; margin: 0 auto; padding: 40px 24px 48px; min-width: 0; }

/* ═══ MESSAGES ═══ */
.cm { margin-bottom: 20px; }
.cm-user { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.cm-bubble {
  background: var(--c-bg-300); border-radius: 12px;
  padding: 10px 16px; max-width: 80%;
}
.cb-text-user { font-family: var(--font-sans); font-size: 16px; line-height: 22.4px; font-weight: 400; color: var(--c-text-100); }
.cm-file { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.cm-file-card {
  display: flex; flex-direction: column; justify-content: space-between;
  width: 120px; height: 120px; min-width: 120px;
  background: var(--c-bg-000); border: 0.5px solid rgba(222,220,209,0.25);
  border-radius: 8px; padding: 8px 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  cursor: pointer; transition: all 150ms;
}
.cm-file-card:hover { border-color: rgba(222,220,209,0.5); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.cm-file-name { font-size: 12px; color: var(--c-text-100); word-break: break-word; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.cm-file-type {
  font-size: 11px; line-height: 13px; color: var(--c-text-400); text-transform: uppercase; font-weight: 500;
  background: rgba(48,48,46,0.7); backdrop-filter: blur(8px);
  padding: 2px 4px; border: 0.5px solid rgba(222,220,209,0.25); border-radius: 4px; align-self: flex-start;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.cm-assistant { min-width: 0; }
.cm-content { min-width: 0; }

/* Thinking */
.cm-thinking-wrap {
  display: flex; min-width: 0; padding: 6px 0;
}
.cm-thinking {
  display: flex; align-items: center; gap: 8px;
  background: none; border: none;
  color: var(--c-text-400); font-family: var(--font-sans); font-size: 14px; font-weight: 430;
  line-height: 1.4;
  padding: 4px 0; width: 100%;
  text-align: left; min-width: 0;
  transition: color 150ms; cursor: pointer !important;
}
.cm-thinking:hover { color: var(--c-text-200); }
.cm-thinking-inner {
  display: flex; align-items: center; gap: 4px; min-width: 0; width: 100%;
}
.cm-thinking-text {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 14px; font-weight: 430; line-height: 1.4;
  min-width: 0; flex: 1;
}
.cm-thinking-chevron {
  display: inline-flex; flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform 200ms;
}
.cm-thinking-chevron-wrap {
  width: 12px; height: 12px;
  display: flex; align-items: center; justify-content: center;
}

/* Response text */
.cb-text {
  font-family: var(--font-serif); font-size: 16px; font-weight: 360;
  line-height: 24px; color: var(--c-text-100); margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.cb-text strong { font-weight: 600; }

/* Artifact card */
.cm-artifact-wrap { display: flex; flex-direction: column; gap: 8px; padding: 8px 0; }
.cm-artifact-card {
  display: flex; text-align: left;
  border-radius: 8px; overflow: hidden;
  border: 0.5px solid rgba(222,220,209,0.15);
  transition: background-color 300ms, border-color 300ms;
  cursor: pointer !important;
  width: 100%; padding: 0 16px;
}
.cm-artifact-card:hover {
  background: rgba(48,48,46,0.5);
  border-color: rgba(222,220,209,0.25);
}
.cm-artifact-inner {
  display: flex; flex: 1; align-items: center;
  justify-content: space-between; width: 100%;
}
.cm-artifact-left {
  display: flex; flex: 1; gap: 8px; min-width: 0;
}
.cm-artifact-thumb-area {
  display: flex; align-items: flex-end; width: 68px;
  position: relative; flex-shrink: 0;
}
.cm-artifact-thumb {
  position: absolute; right: 8px;
  display: flex; flex: 1; overflow: hidden;
  width: 52px; height: 71px;
  border-radius: 8px 8px 0 0;
  border: 0.5px solid rgba(222,220,209,0.25);
  user-select: none;
  transform: scale(1) rotate(-0.1rad);
  transition: transform 300ms ease-out;
  backface-visibility: hidden;
  will-change: transform;
  translate: 0 19%;
  background: linear-gradient(to bottom, var(--c-bg-000), rgba(48,48,46,0));
  padding-top: 16px;
  align-items: flex-start; justify-content: center;
  height: 100%;
  color: var(--c-text-500);
}
.cm-artifact-card:hover .cm-artifact-thumb {
  transform: scale(1.035) rotate(-0.065rad);
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0,0.9,0.5,1.35);
}
.cm-artifact-info {
  display: flex; flex-direction: column; gap: 4px;
  padding: 16px 0; min-width: 0; flex: 1;
}
.cm-artifact-title {
  line-height: 1.25; font-size: 14px;
  overflow: hidden; display: -webkit-box;
  -webkit-box-orient: vertical; -webkit-line-clamp: 1;
  color: var(--c-text-100);
}
.cm-artifact-type {
  font-size: 12px; color: var(--c-text-400);
  overflow: hidden; display: -webkit-box;
  -webkit-box-orient: vertical; -webkit-line-clamp: 1;
  opacity: 1; transition: opacity 200ms;
}
.cm-artifact-dot { opacity: 0.5; }
.cm-artifact-actions {
  display: flex; min-width: 0; align-items: center;
  justify-content: center; gap: 8px; flex-shrink: 0;
}
.cm-artifact-download {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative; isolation: isolate; flex-shrink: 0;
  user-select: none;
  font-size: 14px; font-weight: 500;
  border: 0.5px solid rgba(222,220,209,0.25);
  overflow: hidden; transition: all 100ms;
  backface-visibility: hidden;
  height: 36px; padding: 8px 16px;
  border-radius: 8px; min-width: 5rem;
  white-space: nowrap;
  background: transparent; color: var(--c-text-100);
}
.cm-artifact-download:hover {
  background: var(--c-bg-300);
  border-color: rgba(222,220,209,0.3);
}
.cm-artifact-download:active:not(:disabled) {
  transform: scale(0.96);
}

/* Action icons */
.cm-actions { display: flex; gap: 4px; padding: 4px 0; }
.cm-action-btn {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; background: none; border: none;
  color: var(--c-text-400); border-radius: 6px;
}
.cm-action-btn:hover { color: var(--c-text-200); background: rgba(255,255,255,0.04); }

/* Claude blob */
.cm-blob {
  margin-left: 4px; margin-top: 24px;
  color: var(--c-brand);
  display: flex; align-items: center;
}

/* ═══ INPUT – pixel-matched to Claude ═══ */
.cx-input-area { padding: 0 8px 0; flex-shrink: 0; }
.cx-input-box {
  max-width: 48rem; margin: 0 auto;
  background: var(--c-bg-000);
  border-radius: 20px;
  border: 1px solid transparent;
  box-shadow:
    0 0.25rem 1.25rem hsla(0,0%,0%,3.5%),
    0 0 0 0.5px hsla(51,16.5%,84.5%,0.15);
  transition: box-shadow 0.2s;
}
.cx-input-box:hover {
  box-shadow:
    0 0.25rem 1.25rem hsla(0,0%,0%,3.5%),
    0 0 0 0.5px hsla(51,16.5%,84.5%,0.3);
}
.cx-input-content {
  display: flex; flex-direction: column;
  margin: 14px; gap: 12px; /* m-3.5 = 14px, gap-3 = 12px */
}
.cx-input-textarea {
  width: 100%; overflow-y: auto;
  max-height: 384px; min-height: 24px; /* min-h-[1.5rem], max-h-96 */
  padding-left: 6px; padding-top: 6px; /* pl-[6px] pt-[6px] */
}
.cx-input-placeholder {
  color: var(--c-text-400); font-size: 16px;
  white-space: nowrap;
}
.cx-input-toolbar {
  display: flex; align-items: center; gap: 8px;
  width: 100%;
}
.cx-input-toolbar-left {
  flex: 1; display: flex; align-items: center; min-width: 0; gap: 4px;
}
.cx-btn-plus {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; /* h-8 w-8 */
  border-radius: 8px; /* rounded-lg */
  background: none; border: none;
  color: var(--c-text-200);
  margin-left: 2px; /* ml-[2px] */
  transition: background 0.3s;
}
.cx-btn-plus:hover { background: var(--c-bg-300); }
.cx-btn-model {
  display: flex; align-items: center; gap: 4px; /* gap-1 */
  height: 32px; /* h-8 */
  border-radius: 6px; /* rounded-md */
  padding: 0 8px 0 10px; /* pl-2.5 pr-2 */
  background: none; border: none;
  color: var(--c-text-200);
  white-space: nowrap;
  transition: background 0.3s;
}
.cx-btn-model:hover { background: var(--c-bg-300); }
.cx-model-inner {
  display: inline-flex; gap: 6px; /* gap-1.5 */
  font-size: 14px; line-height: 14px; /* text-[14px] h-[14px] */
  align-items: baseline;
}
.cx-model-name { white-space: nowrap; user-select: none; }
.cx-model-ext { color: var(--c-text-500); }
.cx-model-chevron {
  display: flex; align-items: center; justify-content: center;
  width: 12px; height: 12px; opacity: 0.75;
}
.cx-btn-voice-wrap {
  flex-shrink: 0; display: flex; align-items: center;
  width: 32px; justify-content: flex-end; z-index: 10;
}
.cx-btn-voice {
  height: 32px; border-radius: 8px; /* rounded-lg */
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  background: none; border: none;
  color: var(--c-text-200);
  padding: 0 6px; /* padding-left:6px padding-right:6px */
  transition: background 0.2s;
}
.cx-btn-voice:hover { background: var(--c-bg-300); }
.cx-disclaimer {
  text-align: center; font-size: 12px;
  color: var(--c-text-400); padding: 8px 0;
}

/* ═══ RESIZE HANDLE ═══ */
.cx-resize {
  position: relative; width: 8px; margin-right: -4px; flex-shrink: 0;
  z-index: 30; cursor: col-resize !important;
  display: grid; place-items: center;
}
.cx-resize * { cursor: col-resize !important; }
.cx-resize-line {
  position: absolute; top: 0; bottom: 0; right: 4px;
  width: 0.5px; background: var(--c-border-300);
  transition: all 200ms;
}
.cx-resize:hover .cx-resize-line,
.cx-resizing .cx-resize-line {
  background: #5b9aff; width: 1px; transform: translateX(0.5px);
}
.cx-resize-handle {
  width: 8px; height: 24px; position: relative;
  border-radius: 9999px; border: 0.5px solid var(--c-border-300);
  background: var(--c-bg-100);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: all 200ms;
}
.cx-resize:hover .cx-resize-handle,
.cx-resizing .cx-resize-handle {
  background: #5b9aff; border-color: #5b9aff;
}

/* invisible wider hit area */
.cx-resize::before {
  content: ""; position: absolute;
  top: 0; bottom: 0; left: -4px; right: -4px;
  cursor: col-resize !important;
}

/* ═══ ARTIFACT PANEL ═══ */
.ca-panel {
  min-width: 300px; flex-shrink: 0;
  display: flex; flex-direction: column;
  background: #fff;
}
/* Bar – dark bg matching Claude's artifact header (bg-bg-000) */
.ca-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 8px; gap: 8px;
  background: var(--c-bg-000); /* hsl(60, 2%, 18%) = #30302e */
  flex-shrink: 0;
}
.ca-bar-left {
  display: flex; align-items: center; gap: 8px;
  flex: 1; overflow: hidden; padding-left: 4px;
}
.ca-bar-right {
  display: flex; align-items: center; gap: 4px; flex-shrink: 0;
}
/* Segmented control – bg-bg-300 with rounded-[.625rem] and p-0.5 */
.ca-segmented {
  position: relative; display: inline-flex; width: fit-content;
  height: 32px; font-size: 14px; font-weight: 500;
  background: var(--c-bg-300); padding: 2px;
  user-select: none; border-radius: 0.625rem;
}
.ca-seg-btn {
  display: flex; align-items: center; justify-content: center;
  height: 28px; min-width: 28px; gap: 6px;
  padding: 0 4px; border-radius: 8px;
  border: none; background: none;
  white-space: nowrap; cursor: pointer !important;
  color: var(--c-text-500);
  transition: color 250ms;
}
.ca-seg-btn:hover { color: var(--c-text-200); }
.ca-seg-btn[data-state="on"] { color: var(--c-text-100); }
.ca-seg-icon-wrap {
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
}
.ca-seg-indicator {
  pointer-events: none; position: absolute;
  inset: 0; padding: 2px;
  transition: opacity 250ms; border-radius: 0.625rem;
  filter: drop-shadow(0px 0px 0.5px rgba(194,192,182,0.3));
}
.ca-seg-indicator-inner {
  position: relative; display: flex;
  background: var(--c-bg-000);
  transition: clip-path 250ms ease;
}
.ca-seg-indicator-item {
  display: flex; align-items: center; justify-content: center;
  height: 28px; min-width: 28px; gap: 6px;
  padding: 0 4px; border-radius: 8px;
  white-space: nowrap; color: var(--c-text-100);
}
/* Title – text-sm font-normal text-text-200, separator in text-text-400 opacity-50 */
.ca-bar-title {
  font-size: 14px; font-weight: 400;
  color: var(--c-text-200);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  flex: 1; min-width: 0;
}
.ca-bar-sep { color: var(--c-text-400); opacity: 0.5; }
.ca-bar-type { color: var(--c-text-400); }
/* Split copy button – border-0.5 border-border-200, bg-bg-000, rounded-l-lg / rounded-r-lg */
.ca-copy-group {
  display: flex; height: 32px; white-space: nowrap;
}
.ca-copy-btn {
  font-weight: 600; font-size: 12px;
  border-radius: 8px 0 0 8px;
  background: var(--c-bg-000);
  height: 100%; display: flex; align-items: center; justify-content: center;
  padding: 0 8px;
  border: 0.5px solid hsla(51,16.5%,84.5%,0.3);
  border-right: none;
  color: var(--c-text-100);
  transition: background 0.15s;
}
.ca-copy-btn:hover { background: var(--c-bg-300); }
.ca-copy-chevron {
  background: var(--c-bg-000);
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
  border-radius: 0 8px 8px 0;
  border: 0.5px solid hsla(51,16.5%,84.5%,0.3);
  color: var(--c-text-200);
  transition: background 0.15s;
}
.ca-copy-chevron:hover { background: var(--c-bg-300); }
/* Icon buttons – h-9 w-9 (36px) */
.ca-bar-icon {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; flex-shrink: 0;
  background: none; border: none; border-radius: 6px;
  color: var(--c-text-400);
  transition: background 0.15s;
}
.ca-bar-icon:hover { background: var(--c-bg-300); }

.ca-content { flex: 1; min-height: 0; overflow: hidden; }

/* ═══ CODE VIEW ═══ */
.ca-code-view {
  flex: 1; min-height: 0; overflow: auto;
  background: var(--c-bg-000);
  height: 100%;
  padding: 12px 0;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.ca-code-view::-webkit-scrollbar { width: 6px; height: 6px; }
.ca-code-view::-webkit-scrollbar-track { background: transparent; }
.ca-code-view::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
.ca-code-line {
  display: flex; flex-direction: row;
  line-height: 1.375rem; min-height: 1.375rem;
}
.ca-code-ln {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 12px; line-height: 1.375rem; min-height: 1.375rem;
  color: var(--c-text-400);
  text-align: right; width: 2.3rem; flex-shrink: 0;
  border-right: 1px solid rgba(222,220,209,0.12);
  padding-right: 8px;
  user-select: none;
}
.ca-code-spacer {
  width: 0.75rem; flex-shrink: 0;
}
.ca-code-content {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 12px; line-height: 1.375rem; min-height: 1.375rem;
  white-space: pre-wrap; word-break: break-all;
  color: var(--c-text-100);
  flex: 1; min-width: 0;
}
.ca-iframe {
  width: 100%; height: 100%; border: none;
  background: #fff;
}

/* ═══ TABLET / MOBILE ═══ */
@media (max-width: 1024px) {
  .cs {
    position: fixed; left: 0; top: 0; bottom: 0; z-index: 50;
    width: 18rem !important; min-width: 18rem !important;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cs.cs-open {
    transform: translateX(0);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -4px rgba(0,0,0,0.2);
  }
  .cs.cs-closed {
    transform: translateX(-100%);
    pointer-events: none;
  }
}
@media (max-width: 768px) {
  .cx-panels { flex-direction: column; }
  .cx-chat, .ca-panel {
    width: 100% !important; flex: none;
  }
  .cx-chat { height: auto; }
  .cx-chat.cx-mobile-hidden { display: flex !important; flex-direction: column; }
  .cx-chat.cx-mobile-hidden .cx-scroll,
  .cx-chat.cx-mobile-hidden .cx-input-area { display: none !important; }
  .ca-panel.cx-mobile-hidden { display: none !important; }
  .ca-panel.cx-mobile-active { display: flex !important; flex: 1; }
  .cx-chat.cx-mobile-active { flex: 1; }
  .cx-resize { display: none !important; }
  .cx-msgs { padding: 8px 24px 48px; }
  .cx-head-inner { padding-left: 12px; }
  .cx-head-sidebar-toggle { display: flex !important; }
  .cx-head-right { display: flex !important; }
  .cx-head-right-hidden { display: none !important; }
  .cx-chat.cx-mobile-hidden .cx-title-group { filter: blur(8px); -webkit-filter: blur(8px); }
  .cx-chat.cx-mobile-hidden .cx-head-blur { display: none; }
  .ca-bar { border-top: 0.5px solid var(--c-border-300); }
}
@media (min-width: 769px) {
  .cx-mobile-hidden, .cx-mobile-active { display: flex !important; }
}
@media (min-width: 1025px) {
  .cs { box-shadow: none; }
}
      `}</style>
    </>
  );
}
