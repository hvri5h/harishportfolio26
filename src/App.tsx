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
import { projects, testimonials, skills, type Project } from './data/portfolio';
import './App.css';

import memoji from './assets/memoji.png';

const clientLogos = [
  'Stripe',
  'Vercel',
  'Figma',
  'Notion',
  'Linear',
  'Shopify'
];

const Column = ({ projects, scrollY, offset, className = '', setSelectedProject }: { projects: Project[], scrollY: MotionValue<number>, offset: number, className?: string, setSelectedProject: (p: Project) => void }) => {
  const y = useTransform(scrollY, [0, 3000], [0, offset]);

  return (
    <motion.div style={{ y }} className={`masonry-column ${className}`}>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="work-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          onClick={() => setSelectedProject(project)}
        >
          {project.type === 'video' ? (
            <video
              src={project.image}
              className="work-item-image"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="work-item-image"
              loading="lazy"
            />
          )}
          <div className="work-item-overlay">
            <span className="work-item-category">{project.category}</span>
            <h3 className="work-item-title">{project.title}</h3>
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
    <div className="app">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="hero-avatar">
              <img src={memoji} alt="Harish" />
            </div>
            <h1 className="hero-title">
              HARISH
            </h1>
            <p className="hero-subtitle">
              Independent Design Engineer with 10+ years designing and building digital products for startups and agencies.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Work Section */}
      <section id="work" className="section work-section">
        <div className="container-fluid">
          <div className="work-masonry">
            {columns().map((colProjects, colIndex) => {
              const offset = parallaxOffsets[colIndex % parallaxOffsets.length];
              const isSlim = numColumns >= 6 && (colIndex === 1 || colIndex === 4);

              return (
                <Column
                  key={colIndex}
                  projects={colProjects}
                  scrollY={scrollY}
                  offset={offset}
                  className={`${isSlim ? 'masonry-column-slim' : 'masonry-column-wide'}`}
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Proven effectiveness</p>
            <h2 className="section-title">
              For 8+ years, I've shaped and shipped industry-leading products at every scale and phase.
            </h2>
          </motion.div>
          <motion.div
            className="clients-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {clientLogos.map((client) => (
              <div key={client} className="client-logo">
                <span>{client}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">End-to-end expertise</p>
            <h2 className="section-title">
              To every project, I bring generalist range and multi-specialist depth.
            </h2>
          </motion.div>

          <div className="skills-grid">
            <motion.div
              className="skills-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <Palette size={20} />
                Design
              </h3>
              <p className="skills-description">
                From strategy to pixels, I shape products that are both beautiful and deeply functional.
              </p>
              <div className="skills-list">
                {skills.design.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="skills-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>
                <Code2 size={20} />
                Engineering
              </h3>
              <p className="skills-description">
                I build performant, accessible, and maintainable systems from frontend to backend.
              </p>
              <div className="skills-list">
                {skills.engineering.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="skills-philosophy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Passion & heart</p>
            <h3 className="philosophy-text">
              All my work is infused with relentless focus on customer wellbeing, deep curiosity, and a love for beautiful details.
            </h3>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="testimonials-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Trusted partners</p>
            <h3 className="section-title">I've built a reputation for results.</h3>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <footer className="testimonial-author">
                  <cite className="testimonial-name">{testimonial.author}</cite>
                  <span className="testimonial-role">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.div
            className="contact-layout"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-image">
              {/* Just use a placeholder or memoji again if no profile pic yet */}
              <img
                src={memoji}
                alt="Profile"
                className="contact-memoji"
              />
            </div>
            <div className="contact-text">
              <p className="contact-label">I'm always exploring what's next.</p>
              <h2 className="contact-title">
                You're ready to take your team to the next level. Let's talk.
              </h2>
            </div>
          </motion.div>
          <motion.div
            className="contact-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="mailto:hello@example.com" className="contact-link contact-link-primary">
              <Send size={16} />
              Get in touch
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Github size={16} />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Harish</p>
            <p className="footer-note">Designed & built by me</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <XIcon size={20} />
              </button>
              {selectedProject.type === 'video' ? (
                <video
                  src={selectedProject.image}
                  className="modal-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-image"
                />
              )}
              <div className="modal-content">
                <p className="modal-category">{selectedProject.category}</p>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>
                <div className="modal-tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
                <div className="modal-meta">
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
