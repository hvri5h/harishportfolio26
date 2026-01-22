import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
  X as XIcon,
  Check,
  Copy,
} from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { Navigation } from './components/Navigation';
import LogoCloud from './components/LogoCloud';
import WhatIDo from './components/WhatIDo';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import AboutMe from './components/AboutMe';
import { projects, type Project } from './data/portfolio';





const Column = ({ projects, scrollY, offset, className = '', setSelectedProject }: { projects: Project[], scrollY: MotionValue<number>, offset: number, className?: string, setSelectedProject: (p: Project) => void }) => {
  const y = useTransform(scrollY, [0, 3000], [0, offset]);

  return (
    <motion.div style={{ y }} className={`flex flex-col gap-3 min-w-0 ${className}`}>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface transition-transform duration-base mb-0 block hover:-translate-y-1 hover:shadow-2xl hover:z-10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          onClick={() => setSelectedProject(project)}
        >
          {project.type === 'video' ? (
            <video
              src={project.image}
              className="w-full h-auto block object-cover transition-transform duration-slow group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto block object-cover transition-transform duration-slow group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-base flex flex-col justify-end p-6 group-hover:opacity-100">
            <span className="text-[0.6875rem] uppercase tracking-[0.05em] text-white/70 mb-1">{project.category}</span>
            <h3 className="text-base font-semibold text-white">{project.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('work');
  const size = useWindowSize();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@hari.sh');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Determine number of columns based on width
  const numColumns = size.width > 1600 ? 6 : size.width > 1200 ? 4 : size.width > 768 ? 3 : size.width > 480 ? 2 : 1;

  // Split projects into columns
  const columns = useCallback(() => {
    if (numColumns < 6) {
      // For smaller screens, fall back to simple distribution
      if (numColumns === 1) return [projects];

      const cols = Array.from({ length: numColumns }, () => [] as Project[]);
      projects.forEach((project, i) => {
        cols[i % numColumns].push(project);
      });
      return cols;
    }

    // For desktop (6 columns): Pattern [Wide, Slim, Wide, Wide, Slim, Wide]
    // Indices: 0(W), 1(S), 2(W), 3(W), 4(S), 5(W)
    const mobileProjects = projects.filter(p => p.isMobile);
    const desktopProjects = projects.filter(p => !p.isMobile);

    // Initialize columns and height trackers
    const cols = Array.from({ length: 6 }, () => [] as Project[]);
    const colHeights = new Array(6).fill(0);

    // Heuristics for visual height to balance columns
    // Mobile (Slim): width=1 unit, aspect~16:9 tall => height ≈ 1.8
    // Desktop (Wide): width=1.8 unit, aspect~16:9 wide => height ≈ 1.0
    const MOBILE_HEIGHT_WEIGHT = 1.8;
    const DESKTOP_HEIGHT_WEIGHT = 1.0;

    // Helper: Add project to the shortest column among allowed indices
    const addToShortest = (project: Project, allowedIndices: number[], heightWeight: number) => {
      let minH = Infinity;
      let targetColIndex = allowedIndices[0];

      allowedIndices.forEach(idx => {
        if (colHeights[idx] < minH) {
          minH = colHeights[idx];
          targetColIndex = idx;
        }
      });

      cols[targetColIndex].push(project);
      colHeights[targetColIndex] += heightWeight;
    };

    // Balance Mobile Projects between columns 1 and 4
    mobileProjects.forEach(p => addToShortest(p, [1, 4], MOBILE_HEIGHT_WEIGHT));

    // Balance Desktop Projects between columns 0, 2, 3, 5
    desktopProjects.forEach(p => addToShortest(p, [0, 2, 3, 5], DESKTOP_HEIGHT_WEIGHT));

    return cols;
  }, [projects, numColumns]);

  // Parallax offsets
  const parallaxOffsets = [0, 100, -50, 60, -80, 20];
  const { scrollY } = useScroll();

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Hero Section */}
      <header className="relative h-auto min-h-[90vh] flex items-start justify-center pt-[200px] pb-16 max-sm:h-[calc(100vh-60px)] max-sm:px-8">
        {/* Header Content - Top Frame */}
        <div className="absolute top-8 left-0 right-0 max-w-[1200px] mx-auto px-8 hidden md:flex justify-between items-center h-[54px] text-sm font-medium text-text-secondary pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-[14px]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
              </div>
              <span>Available for work Feb 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center w-[14px] text-text-secondary hover:text-text transition-colors focus:outline-none"
                title="Copy email address"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <a href="mailto:hello@hari.sh" className="hover:text-text transition-colors">hello@hari.sh</a>
            </div>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-1">
            <span>Melbourne, Australia</span>
            <span>{new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(/,/g, '')}</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 w-full">
          <motion.div
            className="max-w-[900px] mx-auto flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-6 h-[250px] w-[250px] max-md:h-[200px] max-md:w-[200px] overflow-visible">
              <div className="h-[350px] w-[320px] -translate-x-[35px] -translate-y-[60px] max-md:h-[260px] max-md:w-[260px] max-md:-translate-x-[30px] max-md:-translate-y-[30px]">
                <Spline scene="https://prod.spline.design/zy5bc6-NJcpDwB1Y/scene.splinecode" onWheel={(e) => e.stopPropagation()} />
              </div>
            </div>
            <h1 className="font-display font-black text-[6rem] tracking-[-0.03em] leading-none text-text mb-4 max-md:text-[clamp(3rem,10vw,4.5rem)] max-sm:text-[1.75rem] z-10">
              Harish
            </h1>
            <p className="font-display font-medium text-2xl text-text-secondary leading-[1.4] max-w-[450px] max-md:text-xl">
              Independent Design Engineer with 10+ years designing and building digital products for startups and agencies.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Work Section */}
      <section id="work" className="pt-0 pb-32 mt-0 relative check-mt-target mb-[-200px] xl:mb-[-500px]">
        <div className="max-w-full px-4">
          <div className="flex gap-3 items-start justify-center w-full">
            {columns().map((colProjects, colIndex) => {
              const offset = parallaxOffsets[colIndex % parallaxOffsets.length];
              const isSlim = numColumns >= 6 && (colIndex === 1 || colIndex === 4);

              return (
                <Column
                  key={colIndex}
                  projects={colProjects}
                  scrollY={scrollY}
                  offset={offset}
                  className={numColumns >= 6
                    ? (isSlim ? 'flex-1' : 'flex-[1.8]') // Desktop ratios
                    : 'flex-1' // Fallback
                  }
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-[200px] xl:bottom-[500px] left-0 w-full h-[500px] bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none z-10" />
      </section>

      {/* Clients Section */}
      <LogoCloud />

      {/* What I Do Section */}
      <WhatIDo />

      {/* Services Section */}
      <Services />

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Me Section */}
      <AboutMe />

      {/* Footer */}
      <footer className="w-full max-w-[1200px] mx-auto px-8 py-8 flex justify-between items-center text-sm font-medium text-text-secondary hidden md:flex">
        <div className="flex items-center gap-1">
          <span>&copy; 2026 - Harish Tirunahari</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Have a nice {new Date().toLocaleDateString(undefined, { weekday: 'long' })} :)</span>
        </div>
      </footer>




      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[1000] flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-surface rounded-xl max-w-[800px] w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-text transition-all duration-fast z-10 shadow-md hover:bg-white hover:scale-105"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <XIcon size={20} />
              </button>
              {selectedProject.type === 'video' ? (
                <video
                  src={selectedProject.image}
                  className="w-full aspect-video object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-12">
                <p className="text-[0.8125rem] text-accent mb-1 uppercase tracking-[0.03em] font-medium">{selectedProject.category}</p>
                <h2 className="text-2xl font-bold mb-6 text-text">{selectedProject.title}</h2>
                <p className="text-base text-text-secondary leading-[1.7] mb-8">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-[6px] bg-surface-hover rounded-full text-[0.8125rem] text-text-secondary">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between mt-8 pt-8 border-t border-border-light text-[0.8125rem] text-text-tertiary">
                  <span>Year: {selectedProject.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
