import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
  Linkedin,
  Github,
  X as XIcon,
  Palette,
  Code2,
  Send
} from 'lucide-react';
import { Navigation } from './components/Navigation';
import LogoCloud from './components/LogoCloud';
import { projects, testimonials, skills, type Project } from './data/portfolio';

import memoji from './assets/memoji.png';



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
      <header className="h-auto min-h-[90vh] flex items-start justify-center pt-[200px] pb-16 max-sm:h-[calc(100vh-60px)] max-sm:px-8">
        <div className="max-w-[1200px] mx-auto px-8 w-full">
          <motion.div
            className="max-w-[900px] mx-auto flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-6 drop-shadow-xl max-md:w-[200px]">
              <img src={memoji} alt="Harish" className="w-[250px] h-auto" />
            </div>
            <h1 className="font-display font-black text-[6rem] tracking-[-0.03em] leading-none text-text mb-4 uppercase max-md:text-[clamp(3rem,10vw,4.5rem)] max-sm:text-[1.75rem]">
              HARISH
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

      {/* About Section */}
      <section id="about" className="py-32 bg-bg relative z-30">
        <div className="max-w-[1200px] mx-auto px-12 max-sm:px-6">
          <motion.div
            className="mb-16 max-w-[700px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-text-tertiary mb-4">End-to-end expertise</p>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.3] text-text">
              To every project, I bring generalist range and multi-specialist depth.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-24 mb-32 max-md:grid-cols-1 max-md:gap-16">
            <motion.div
              className="p-12 bg-surface border border-border-light rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 text-text">
                <Palette size={20} className="text-accent" />
                Design
              </h3>
              <p className="text-[0.9375rem] text-text-secondary mb-8 leading-[1.6]">
                From strategy to pixels, I shape products that are both beautiful and deeply functional.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.design.map((skill) => (
                  <span key={skill} className="px-3 py-[6px] bg-bg border border-border rounded-full text-[0.8125rem] text-text-secondary transition-all duration-fast hover:border-text-tertiary hover:text-text">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="p-12 bg-surface border border-border-light rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 text-text">
                <Code2 size={20} className="text-accent" />
                Engineering
              </h3>
              <p className="text-[0.9375rem] text-text-secondary mb-8 leading-[1.6]">
                I build performant, accessible, and maintainable systems from frontend to backend.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.engineering.map((skill) => (
                  <span key={skill} className="px-3 py-[6px] bg-bg border border-border rounded-full text-[0.8125rem] text-text-secondary transition-all duration-fast hover:border-text-tertiary hover:text-text">{skill}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="p-16 bg-gradient-to-br from-[#f0f9f0] to-[#e8f4f8] rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-text-tertiary mb-4">Passion & heart</p>
            <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-medium leading-[1.4] text-text max-w-[700px] mx-auto">
              All my work is infused with relentless focus on customer wellbeing, deep curiosity, and a love for beautiful details.
            </h3>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mt-32 mb-16 max-w-[700px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-text-tertiary mb-4">Trusted partners</p>
            <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.3] text-text">I've built a reputation for results.</h3>
          </motion.div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={index}
                className="p-8 bg-surface border border-border-light rounded-xl transition-all duration-base hover:border-border hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-[0.9375rem] leading-[1.7] text-text-secondary mb-8">"{testimonial.quote}"</p>
                <footer className="flex flex-col">
                  <cite className="font-semibold text-[0.875rem] text-text not-italic">{testimonial.author}</cite>
                  <span className="text-[0.8125rem] text-text-tertiary">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-32 pb-24 bg-bg relative z-30">
        <div className="max-w-[1200px] mx-auto px-12 max-sm:px-6">
          <motion.div
            className="flex items-start gap-12 mb-16 max-sm:flex-col max-sm:items-center max-sm:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="shrink-0">
              <img
                src={memoji}
                alt="Profile"
                className="w-[140px] h-[140px] object-cover rounded-xl grayscale max-sm:w-[120px] max-sm:h-[120px]"
              />
            </div>
            <div className="flex-1">
              <p className="text-base italic text-text-secondary mb-2">I'm always exploring what's next.</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.25] text-text tracking-[-0.01em]">
                You're ready to take your team to the next level. Let's talk.
              </h2>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4 flex-wrap max-sm:flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-[6px] px-4 py-[10px] bg-text text-white border border-text rounded-full text-[0.875rem] font-medium transition-all duration-fast hover:bg-[#333] hover:border-[#333] max-sm:w-full max-sm:justify-center">
              <Send size={16} />
              Get in touch
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] px-4 py-[10px] bg-transparent text-text border border-border rounded-full text-[0.875rem] font-medium transition-all duration-fast hover:bg-surface-hover hover:border-text-tertiary max-sm:w-full max-sm:justify-center">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] px-4 py-[10px] bg-transparent text-text border border-border rounded-full text-[0.875rem] font-medium transition-all duration-fast hover:bg-surface-hover hover:border-text-tertiary max-sm:w-full max-sm:justify-center">
              <Github size={16} />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg border-t border-border-light relative z-30">
        <div className="max-w-[1200px] mx-auto px-12 max-sm:px-6">
          <div className="flex justify-between items-center text-text-tertiary text-[0.8125rem] max-sm:flex-col max-sm:gap-4 max-sm:text-center">
            <p>&copy; {new Date().getFullYear()} Harish</p>
            <p className="text-text-tertiary">Designed & built by me</p>
          </div>
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
