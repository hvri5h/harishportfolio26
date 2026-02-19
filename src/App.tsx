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





const Column = ({
  projects,
  scrollY,
  offset,
  isNarrow,
  setSelectedProject
}: {
  projects: Project[],
  scrollY: MotionValue<number>,
  offset: number,
  isNarrow: boolean,
  setSelectedProject: (p: Project) => void
}) => {
  const y = useTransform(scrollY, [0, 3000], [0, offset]);

  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col gap-3 min-w-0 ${isNarrow ? 'flex-[0.6]' : 'flex-1'}`}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="relative w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:z-10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          onClick={() => setSelectedProject(project)}
        >
          <div className="flex flex-col gap-3 p-3 bg-[#f0f0f0]/50 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 rounded-3xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05)] transition-all duration-base hover:bg-[#f5f5f5]/80 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.05)]">
            <div className="rounded-2xl overflow-hidden relative w-full bg-black/5">
              {project.type === 'video' ? (
                <video
                  src={project.image}
                  className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex flex-col px-2 pb-2 gap-1">
              <h3 className="font-display font-semibold text-lg text-black/90 leading-tight">{project.title}</h3>
              <p className="text-sm text-text-secondary font-medium">{project.category}</p>
            </div>
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

  // Determine number of columns based on width - 5 columns on desktop, min 2 on mobile
  const numColumns = size.width > 1200 ? 5 : size.width > 900 ? 4 : size.width > 640 ? 3 : 2;

  // Column configuration: which columns are narrow (for mobile content)
  // Pattern for 5 cols: [Wide, Narrow, Wide, Narrow, Wide]
  const narrowColumns = numColumns === 5 ? [1, 3] : numColumns === 4 ? [1, 2] : [];

  // Split projects into columns - mobile to narrow, desktop to wide
  const columns = useCallback(() => {
    // Initialize columns and height trackers
    const cols: Project[][] = Array.from({ length: numColumns }, () => []);
    const colHeights = new Array(numColumns).fill(0);

    // Height weights for balancing
    const MOBILE_HEIGHT = 1.8;
    const DESKTOP_HEIGHT = 1.0;

    // For 2-3 columns (mobile/tablet): distribute ALL projects evenly across all columns
    if (numColumns <= 3) {
      projects.forEach(project => {
        // Find the shortest column
        let minH = Infinity;
        let targetCol = 0;

        for (let i = 0; i < numColumns; i++) {
          if (colHeights[i] < minH) {
            minH = colHeights[i];
            targetCol = i;
          }
        }

        cols[targetCol].push(project);
        colHeights[targetCol] += project.isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
      });

      return cols;
    }

    // For 4+ columns: separate mobile and desktop content
    const mobileProjects = projects.filter(p => p.isMobile);
    const desktopProjects = projects.filter(p => !p.isMobile);

    // Get indices for narrow and wide columns
    const narrowIndices = narrowColumns;
    const wideIndices = Array.from({ length: numColumns }, (_, i) => i).filter(i => !narrowIndices.includes(i));

    // Distribute mobile projects to narrow columns
    mobileProjects.forEach(project => {
      const targetIndices = narrowIndices.length > 0 ? narrowIndices : wideIndices;
      let minH = Infinity;
      let targetCol = targetIndices[0];

      targetIndices.forEach(idx => {
        if (colHeights[idx] < minH) {
          minH = colHeights[idx];
          targetCol = idx;
        }
      });

      cols[targetCol].push(project);
      colHeights[targetCol] += MOBILE_HEIGHT;
    });

    // Distribute desktop projects to wide columns
    desktopProjects.forEach(project => {
      let minH = Infinity;
      let targetCol = wideIndices[0];

      wideIndices.forEach(idx => {
        if (colHeights[idx] < minH) {
          minH = colHeights[idx];
          targetCol = idx;
        }
      });

      cols[targetCol].push(project);
      colHeights[targetCol] += DESKTOP_HEIGHT;
    });

    return cols;
  }, [numColumns, narrowColumns, projects]);

  // Parallax offsets for 5 columns - subtle staggered effect
  const parallaxOffsets = [0, 80, -40, 60, -60];
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
              <a href="mailto:htiruna@gmail.com" className="hover:text-text transition-colors">htiruna@gmail.com</a>
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
                <Spline scene="https://prod.spline.design/zy5bc6-NJcpDwB1Y/scene.splinecode" />
              </div>
            </div>
            <h1 className="font-display font-black text-[6rem] tracking-[-0.03em] leading-none text-text mb-4 max-md:text-[clamp(3rem,10vw,4.5rem)] max-sm:text-[1.75rem] z-10">
              Harish
            </h1>
            <p className="font-display font-medium text-2xl text-text-secondary leading-[1.4] max-w-[450px] max-md:text-xl">
              Design + Engineering partner for startups and agencies who value craft and speed. </p>
          </motion.div>
        </div>
      </header>



      {/* Work Section */}
      <section id="work" className="pt-0 pb-32 mt-0 relative">
        <div className="max-w-[1800px] mx-auto px-3 md:px-4">
          <div className="flex gap-3 items-start justify-center w-full">
            {columns().map((colProjects, colIndex) => {
              const offset = parallaxOffsets[colIndex % parallaxOffsets.length];
              const isNarrow = narrowColumns.includes(colIndex);

              return (
                <Column
                  key={colIndex}
                  projects={colProjects}
                  scrollY={scrollY}
                  offset={offset}
                  isNarrow={isNarrow}
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
          </div>
        </div>
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
      <footer className="w-full max-w-[1200px] mx-auto px-8 py-8 hidden md:flex justify-between items-center text-sm font-medium text-text-secondary">
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
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
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
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}

export default App;
