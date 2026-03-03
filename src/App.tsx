import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X as XIcon, ArrowUpRight } from "lucide-react";
import {
  PiCopyDefaultStroke,
  PiCopyCopiedStroke,
} from "./components/icons/pikaicons-react";
import Spline from "@splinetool/react-spline";
import { PiSparkleAi02Stroke } from "./components/icons/pikaicons-react";
import { projects, type Project } from "./data/portfolio";
import { Navigation } from "./components/Navigation";
import LogoCloud from "./components/LogoCloud";
import WhatIDo from "./components/WhatIDo";
import Services from "./components/Services";
import AboutMe from "./components/AboutMe";
import { CustomCursor } from "./components/CustomCursor";
import Footer from "./components/Footer";
import { SlidingNumber } from "./components/ui/sliding-number";
import { BasicNumberTicker } from "./components/ui/basic-number-ticker";
import {
  isVideo,
  useProjectGrid,
  getProjectFolderImages,
} from "./lib/projectImages";

function MelbourneClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const melb = new Date(
    now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" }),
  );
  const hours = melb.getHours();
  const minutes = melb.getMinutes();
  const seconds = melb.getSeconds();
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;

  return (
    <span className="flex items-center">
      <span className="font-mono font-medium text-[0.9em] inline-flex items-center gap-0.5">
        <span className="inline-flex items-center gap-0.5">
          <SlidingNumber value={h12} />
          <span className="text-text-secondary">:</span>
          <SlidingNumber value={minutes} padStart />
          <span className="text-text-secondary">:</span>
          <SlidingNumber value={seconds} padStart />
        </span>
        <span>{period}</span>
      </span>
    </span>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const modalEnterSpring = {
    type: "spring",
    duration: 0.6,
    bounce: 0.08,
  } as const;
  const modalExitSpring = {
    type: "spring",
    duration: 0.45,
    bounce: 0.05,
  } as const;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("work");
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.isHidden),
    [],
  );
  const gridItems = useProjectGrid(visibleProjects);

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

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
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
      <CustomCursor />

      {/* Navigation — hidden while loading */}
      {!isLoading && (
        <Navigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      )}

      {/* Main content wrapper — sits above the footer for reveal effect */}
      <div className="relative z-10 bg-bg">
        {/* Top blur overlay */}
        <div className="fixed top-0 left-0 right-0 h-40 pointer-events-none z-[5] backdrop-blur-[12px] [mask-image:linear-gradient(to_top,transparent,black)]" />

        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
            >
              <div className="relative font-display font-black text-7xl md:text-9xl text-text tracking-tighter tabular-nums">
                <BasicNumberTicker
                  from={0}
                  target={progress}
                  transition={{
                    duration: 0.35,
                    type: "tween",
                    ease: "easeOut",
                  }}
                  className="text-text"
                />
                <span className="inline-block ml-2 text-4xl md:text-6xl text-text">
                  %
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Content - Top Frame */}
        <div className="absolute top-8 left-0 right-0 z-[10] max-w-[1200px] mx-auto px-8 hidden md:flex justify-between items-center h-[54px] text-sm font-medium text-text-secondary pointer-events-none">
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
                {isCopied ? (
                  <PiCopyCopiedStroke className="w-4 h-4" />
                ) : (
                  <PiCopyDefaultStroke className="w-4 h-4" />
                )}
              </button>
              <a
                href="mailto:htiruna@gmail.com"
                className="hover:text-text transition-colors"
              >
                htiruna@gmail.com
              </a>
            </div>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-0.5">
            <span>Melbourne, Australia</span>
            <MelbourneClock />
          </div>
        </div>

        {/* Hero Section */}
        <header className="relative h-auto min-h-[85vh] flex items-start justify-center pt-[160px] pb-16 max-sm:h-[calc(100vh-60px)] max-sm:px-8">
          <div className="max-w-[1200px] mx-auto px-8 w-full">
            <motion.div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-6 h-[250px] w-[250px] max-md:h-[200px] max-md:w-[200px] overflow-visible"
              >
                <div className="h-[350px] w-[320px] -translate-x-[35px] -translate-y-[60px] max-md:h-[260px] max-md:w-[260px] max-md:-translate-x-[30px] max-md:-translate-y-[30px]">
                  <Spline
                    scene="https://prod.spline.design/zy5bc6-NJcpDwB1Y/scene.splinecode"
                    onLoad={handleSplineLoad}
                  />
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-black text-[5rem] tracking-[-0.03em] leading-none text-text mb-4 max-md:text-[clamp(2.5rem,8vw,4rem)] max-sm:text-[1.75rem] z-10"
                data-cursor-label="hah-REESH"
              >
                Harish
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-medium text-2xl text-text-secondary leading-[1.4] max-w-[400px] mb-6"
              >
                <span className="relative inline-block">
                  <span
                    data-cursor-label="AI-native"
                    className="absolute -left-5 -top-3 inline-flex items-center"
                  >
                    <PiSparkleAi02Stroke className="w-6 h-6 text-text-secondary" />
                  </span>
                  <span data-cursor-figma>Design</span>
                </span>{" "}
                + <span data-cursor-code>Engineering</span> partner for startups
                that value craft and speed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                <LogoCloud />
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Work Section */}
        <section id="work" className="pt-8 pb-32 relative">
          <div className="max-w-[1200px] mx-auto px-3 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {gridItems?.map((item, i) => {
                const animateProps =
                  i === 0
                    ? {
                        initial: { opacity: 0 },
                        animate: !isLoading ? { opacity: 1 } : {},
                        transition: {
                          duration: 0.8,
                          delay: 0.5,
                          ease: [0.16, 1, 0.3, 1] as const,
                        },
                      }
                    : {};

                return (
                  <motion.div
                    {...animateProps}
                    key={`${item.project.id}-${i}`}
                    data-cursor-label={
                      item.project.modalVariant === "imageOnly"
                        ? "View image"
                        : "View case study"
                    }
                    className={`relative rounded-[32px] md:rounded-[48px] overflow-hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] ${
                      item.span === 2
                        ? "col-span-2"
                        : "col-span-1 aspect-[3/4] md:aspect-[4/5]"
                    }`}
                    style={{
                      backgroundColor: item.project.bgColor,
                      WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    }}
                    onClick={() => setSelectedProject(item.project)}
                  >
                    {isVideo(item.src) ? (
                      <video
                        src={item.src}
                        className={
                          item.span === 2
                            ? "w-full h-auto block transform-gpu"
                            : "absolute inset-0 w-full h-full object-cover block transform-gpu"
                        }
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`${item.project.title} screen`}
                        className={
                          item.span === 2
                            ? "w-full h-auto block transform-gpu"
                            : "absolute inset-0 w-full h-full object-cover block transform-gpu"
                        }
                        loading="lazy"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <WhatIDo />
        <Services />
        {/* <Testimonials /> */}
        <AboutMe />

        {/* Contact scroll sentinel for nav observer */}
        <div id="contact" />

        {/* Close main content wrapper */}
      </div>

      {/* Curved edge — overlaps the footer top */}
      <div className="relative z-10 -mb-[200px] pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-[200px] block"
        >
          <path
            d="M0,0 L0,200 C360,40 1080,40 1440,200 L1440,0 Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>

      {/* Footer — revealed from behind as you scroll */}
      <Footer />

      {/* Top blur overlay - moved to inside content wrapper */}

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-[1000] pointer-events-none"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0f0f11]/90 pointer-events-auto"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, transition: modalEnterSpring }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transition: modalExitSpring }
              }
              style={{ willChange: "opacity" }}
            />

            {/* Scrollable Container */}
            <div
              className="absolute inset-0 w-full pointer-events-auto overflow-y-auto overscroll-contain"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className={`w-full relative z-10 min-h-full flex flex-col items-center ${
                  selectedProject.modalVariant === "imageOnly"
                    ? "justify-center py-12 md:py-24 px-4 md:px-8"
                    : "justify-end md:justify-center px-0 pt-16 md:px-8 md:py-16"
                }`}
                onClick={() => setSelectedProject(null)}
              >
                {/* Modal Container */}
                <motion.div
                  className={`w-full pointer-events-auto relative overflow-hidden flex flex-col squircle transform-gpu ${
                    selectedProject?.modalVariant === "imageOnly"
                      ? "max-w-[1120px] bg-transparent justify-center items-center cursor-pointer"
                      : "mt-auto md:m-auto rounded-t-[48px] md:rounded-[56px] max-w-[1120px] bg-white shadow-2xl"
                  }`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          transform: "translate3d(0, 100vh, 0)",
                          opacity: 1,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          transform: "translate3d(0, 0, 0)",
                          opacity: 1,
                          transition: modalEnterSpring,
                        }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          transform: "translate3d(0, 100vh, 0)",
                          opacity: 1,
                          transition: modalExitSpring,
                        }
                  }
                  onClick={(e) => {
                    // Only prevent propagation for the standard modal wrapper, or let the inner actual content stop propagation for imageOnly
                    if (selectedProject?.modalVariant !== "imageOnly") {
                      e.stopPropagation();
                    } else {
                      setSelectedProject(null);
                    }
                  }}
                  style={
                    selectedProject?.modalVariant !== "imageOnly"
                      ? {
                          willChange: "transform, opacity",
                          WebkitMaskImage:
                            "-webkit-radial-gradient(white, black)",
                        }
                      : { willChange: "transform, opacity" }
                  }
                >
                  {(() => {
                    const allImages = selectedProject.slug
                      ? getProjectFolderImages(selectedProject.slug)
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
                        <div
                          className={`relative flex items-center justify-center overflow-hidden w-full ${
                            selectedProject.modalVariant === "imageOnly"
                              ? "mx-auto rounded-[32px] md:rounded-[48px] squircle shadow-2xl cursor-default"
                              : ""
                          }`}
                          style={
                            selectedProject.modalVariant === "imageOnly"
                              ? {
                                  WebkitMaskImage:
                                    "-webkit-radial-gradient(white, black)",
                                }
                              : {}
                          }
                          onClick={(e) => {
                            if (selectedProject?.modalVariant === "imageOnly") {
                              e.stopPropagation(); // Stop clicking the image from closing
                            }
                          }}
                        >
                          {isVideo(coverSrc) ? (
                            <video
                              src={coverSrc}
                              className={`block transform-gpu ${
                                selectedProject.modalVariant === "imageOnly"
                                  ? "w-full h-auto object-contain"
                                  : "w-full h-auto aspect-[21/9] object-cover scale-[1.01]"
                              }`}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={coverSrc}
                              alt={selectedProject.title}
                              className={`block transform-gpu ${
                                selectedProject.modalVariant === "imageOnly"
                                  ? "w-full h-auto object-contain"
                                  : "w-full h-auto aspect-[21/9] object-cover scale-[1.01]"
                              }`}
                            />
                          )}
                          <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-md transition-all duration-150 ease-out active:scale-95 sm:hover:scale-105 hover:bg-white z-50 shadow-lg border border-black/5"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close modal"
                          >
                            <XIcon size={20} />
                          </button>
                        </div>

                        {/* Detail Content Block */}
                        {selectedProject.modalVariant !== "imageOnly" && (
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
                              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.5rem] tracking-[-0.03em] text-text mb-1 md:mb-2 leading-tight">
                                {selectedProject.title}
                              </h2>
                              <h3 className="text-xl md:text-2xl tracking-[-0.03em] text-text-secondary mb-8 md:mb-10 leading-snug">
                                {selectedProject.subtitle}
                              </h3>
                              <div className="text-[15px] md:text-base text-text leading-relaxed whitespace-pre-line max-w-[650px]">
                                {selectedProject.description}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Content Images */}
                        {contentSrcs.length > 0 && (
                          <div className="w-full flex flex-col gap-6 md:gap-10 px-6 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                            {contentSrcs.map((img, index) => (
                              <div
                                key={index}
                                className="w-full rounded-[32px] md:rounded-[48px] overflow-hidden flex items-center justify-center squircle"
                                style={{
                                  WebkitMaskImage:
                                    "-webkit-radial-gradient(white, black)",
                                }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
