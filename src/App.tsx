import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon, Check, Copy, ArrowUpRight } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { projects, type Project } from "./data/portfolio";
import { Navigation } from "./components/Navigation";
import LogoCloud from "./components/LogoCloud";
import {
  isVideo,
  useProjectGrid,
  getAllProjectFolderImages,
} from "./lib/projectImages";

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("work");
  const gridItems = useProjectGrid(projects);

  useEffect(() => {
    if (!isLoading) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += (99 - currentProgress) * 0.05;
      setProgress(Math.round(currentProgress));
    }, 50);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const handleSplineLoad = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("htiruna@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
          >
            <div className="relative font-display font-black text-7xl md:text-9xl text-text tracking-tighter">
              {progress}
              <span className="inline-block ml-2 text-4xl md:text-6xl text-text">
                %
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

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
              <span>Available for work Mar 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center w-[14px] text-text-secondary hover:text-text transition-colors focus:outline-none"
                title="Copy email address"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <a
                href="mailto:htiruna@gmail.com"
                className="hover:text-text transition-colors"
              >
                htiruna@gmail.com
              </a>
            </div>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-1">
            <span>Melbourne, Australia</span>
            <span>
              {new Date()
                .toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(/,/g, "")}
            </span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 w-full">
          <motion.div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <div className="mb-6 h-[250px] w-[250px] max-md:h-[200px] max-md:w-[200px] overflow-visible">
              <div className="h-[350px] w-[320px] -translate-x-[35px] -translate-y-[60px] max-md:h-[260px] max-md:w-[260px] max-md:-translate-x-[30px] max-md:-translate-y-[30px]">
                <Spline
                  scene="https://prod.spline.design/zy5bc6-NJcpDwB1Y/scene.splinecode"
                  onLoad={handleSplineLoad}
                />
              </div>
            </div>
            <h1 className="font-display font-black text-[6rem] tracking-[-0.03em] leading-none text-text mb-4 max-md:text-[clamp(3rem,10vw,4.5rem)] max-sm:text-[1.75rem] z-10">
              Harish
            </h1>
            <p className="font-display font-medium text-2xl text-text-secondary leading-[1.4] max-w-[500px] max-md:text-xl mb-10">
              Design + Engineering partner for startups and agencies who value
              craft and speed.
            </p>
            <a
              href="mailto:htiruna@gmail.com"
              className="inline-flex items-center px-6 py-3 text-[0.9375rem] font-medium text-white bg-[#1a1a1a] rounded-full transition-colors hover:bg-black"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </header>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Work Section */}
      <section id="work" className="pt-8 pb-32 relative">
        <div className="max-w-[1200px] mx-auto px-3 md:px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {gridItems?.map((item, i) => (
              <div
                key={`${item.project.id}-${i}`}
                className={`cursor-pointer rounded-[16px] md:rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] ${
                  item.span === 2 ? "col-span-2" : "col-span-1"
                }`}
                onClick={() => setSelectedProject(item.project)}
              >
                {isVideo(item.src) ? (
                  <video
                    src={item.src}
                    className="w-full h-auto object-cover block"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${item.project.title} screen`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-[1200px] mx-auto px-8 py-8 hidden md:flex justify-between items-center text-sm font-medium text-text-secondary">
        <div className="flex items-center gap-1">
          <span>&copy; 2026 - Harish Tirunahari</span>
        </div>
        <div className="flex items-center gap-1">
          <span>
            Have a nice{" "}
            {new Date().toLocaleDateString(undefined, { weekday: "long" })} :)
          </span>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] pointer-events-none">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0f0f11]/90 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ willChange: "opacity" }}
            />

            {/* Scrollable Container */}
            <div
              className="absolute inset-0 overflow-y-auto w-full pointer-events-auto overscroll-contain"
              onClick={() => setSelectedProject(null)}
            >
              <div className="min-h-full flex flex-col justify-end md:justify-center items-center w-full relative z-10 px-0 pt-16 md:px-8 md:py-16">
                {/* Modal Container */}
                <motion.div
                  className="w-full max-w-[1120px] mt-auto md:m-auto pointer-events-auto relative overflow-hidden bg-white rounded-t-[32px] md:rounded-[32px] shadow-2xl flex flex-col"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ willChange: "transform, opacity" }}
                >
                  {(() => {
                    const allImages = selectedProject.slug
                      ? getAllProjectFolderImages(selectedProject.slug)
                      : [];
                    const coverSrc =
                      allImages[0] ||
                      selectedProject.coverImage ||
                      selectedProject.image;
                    const contentSrcs =
                      allImages.length > 1
                        ? allImages.slice(1)
                        : selectedProject.contentImages || [];

                    return (
                      <>
                        {/* Cover Image/Video */}
                        <div className="w-full relative flex items-center justify-center overflow-hidden">
                          {isVideo(coverSrc) ? (
                            <video
                              src={coverSrc}
                              className="w-full h-auto aspect-[1120/630] object-cover block scale-[1.01] transform-gpu"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={coverSrc}
                              alt={selectedProject.title}
                              className="w-full h-auto aspect-[1120/630] object-cover block scale-[1.01] transform-gpu"
                            />
                          )}
                          <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white z-50 shadow-sm"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close modal"
                          >
                            <XIcon size={20} />
                          </button>
                        </div>

                        {/* Detail Content Block */}
                        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-16 p-8 md:p-12 lg:p-16">
                          <div className="w-full md:w-[200px] lg:w-[250px] flex-shrink-0 flex flex-col gap-8 md:gap-10">
                            <div className="flex flex-col gap-6">
                              {selectedProject.client && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[13px] font-bold text-text-secondary">
                                    Client
                                  </span>
                                  <span className="text-[15px] text-text">
                                    {selectedProject.client}
                                  </span>
                                </div>
                              )}
                              {selectedProject.services &&
                                selectedProject.services.length > 0 && (
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-[13px] font-bold text-text-secondary">
                                      Services
                                    </span>
                                    <span className="text-[15px] text-text capitalize">
                                      {selectedProject.services.join(", ")}
                                    </span>
                                  </div>
                                )}
                            </div>
                            {selectedProject.liveLink && (
                              <a
                                href={selectedProject.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-white border border-black/10 text-black font-medium text-[14px] rounded-full transition-all duration-300 hover:scale-[1.02] hover:bg-black/5 shadow-sm self-start"
                              >
                                Live link <ArrowUpRight size={16} />
                              </a>
                            )}
                          </div>
                          <div className="flex-grow flex flex-col items-start min-w-0">
                            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.5rem] tracking-tight text-text mb-1 md:mb-2 leading-tight">
                              {selectedProject.title}
                            </h2>
                            <h3 className="text-xl md:text-2xl text-text-secondary mb-8 md:mb-10 leading-snug">
                              {selectedProject.subtitle}
                            </h3>
                            <div className="text-[15px] md:text-base text-text leading-relaxed whitespace-pre-line max-w-[650px]">
                              {selectedProject.description}
                            </div>
                          </div>
                        </div>

                        {/* Content Images */}
                        {contentSrcs.length > 0 && (
                          <div className="w-full flex flex-col gap-6 md:gap-10 px-6 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                            {contentSrcs.map((img, index) => (
                              <div
                                key={index}
                                className="w-full rounded-[16px] md:rounded-[24px] overflow-hidden flex items-center justify-center"
                              >
                                {isVideo(img) ? (
                                  <video
                                    src={img}
                                    className="w-full h-auto object-contain block scale-[1.01] transform-gpu"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  />
                                ) : (
                                  <img
                                    src={img}
                                    alt={`${selectedProject.title} ${
                                      index + 1
                                    }`}
                                    className="w-full h-auto object-contain block scale-[1.01] transform-gpu"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
