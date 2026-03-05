import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { X as XIcon, ArrowUpRight } from "lucide-react";
import {
  PiCopyDefaultStroke,
  PiCopyCopiedStroke,
  PiEyeOnStroke,
} from "./components/icons/pikaicons-react";
import Spline from "@splinetool/react-spline";
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
  getProjectFolderImages,
  getProjectGridImage,
} from "./lib/projectImages";
import StackingCards, {
  StackingCardItem,
} from "./components/fancy/blocks/stacking-cards";
import { TextShimmer } from "./components/motion-primitives/text-shimmer";

type ActiveImage = {
  id: string;
  src: string;
  isVideo: boolean;
  bgColor: string;
  width?: number;
  height?: number;
};

type WorkRenderItem =
  | {
    kind: "stack";
    project: Project;
    stackImages: string[];
  }
  | {
    kind: "grid";
    project: Project;
    src: string;
    span: 1 | 2;
  };

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

  // Calculate timezone difference
  const melbOffset = (() => {
    const localHour = now.getHours() + now.getMinutes() / 60;
    const melbHour = melb.getHours() + melb.getMinutes() / 60;
    let diff = Math.round(melbHour - localHour);
    if (diff > 12) diff -= 24;
    if (diff < -12) diff += 24;
    return diff;
  })();

  const tooltipText =
    melbOffset === 0
      ? ""
      : melbOffset > 0
        ? `${melbOffset}h ahead of you`
        : `${Math.abs(melbOffset)}h behind you`;

  const dateStr = melb.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "Australia/Melbourne",
  });

  return (
    <span
      className="flex items-center gap-1.5"
      {...(tooltipText ? { "data-cursor-label": tooltipText } : {})}
    >
      <span>{dateStr}</span>
      <span className="text-text-secondary text-[5px]">&bull;</span>
      <span className="font-medium inline-flex items-center gap-px">
        <span className="inline-flex items-center gap-px">
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

type StackProjectSectionProps = {
  project: Project;
  stackImages: string[];
  animateProps: Record<string, unknown>;
  onImageClick: (imageId: string, src: string, isVideoSrc: boolean, width?: number, height?: number) => void;
  onActiveChange: (projectId: string, isActive: boolean) => void;
};

function StackProjectSection({
  project,
  stackImages,
  animateProps,
  onImageClick,
  onActiveChange,
}: StackProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);
  const isSectionInView = useInView(sectionRef, { amount: 0.01 });
  const isSectionInViewRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start tracking when section top enters at viewport 70% (not at viewport
    // top) so the pill can activate on the first scroll-down approach, while
    // cards are already visible in the lower portion of the screen.
    offset: ["start 70%", "end end"],
  });

  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  const evaluateActivationRef = useRef<
    (latest: number, inView: boolean) => void
  >(() => { });
  evaluateActivationRef.current = (latest: number, inView: boolean) => {
    if (!inView) {
      if (isActiveRef.current) {
        isActiveRef.current = false;
        onActiveChangeRef.current(project.id, false);
      }
      return;
    }

    // Asymmetric thresholds: early top-appear without lingering at the bottom.
    const topAppear = 0.05;
    const bottomExit = 0.06;
    const hysteresisGap = 0.02;

    const topDisappear = Math.max(0, topAppear - hysteresisGap);
    const bottomDisappear = Math.max(0, bottomExit - hysteresisGap);

    const enteringRange = latest >= topAppear && latest <= 1 - bottomExit;
    const stayingRange =
      latest >= topDisappear && latest <= 1 - bottomDisappear;
    const nextActive = isActiveRef.current ? stayingRange : enteringRange;

    if (nextActive !== isActiveRef.current) {
      isActiveRef.current = nextActive;
      onActiveChangeRef.current(project.id, nextActive);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    evaluateActivationRef.current(latest, isSectionInViewRef.current);
  });

  useEffect(() => {
    isSectionInViewRef.current = isSectionInView;
    evaluateActivationRef.current(scrollYProgress.get(), isSectionInView);
  }, [isSectionInView, scrollYProgress]);

  useEffect(() => {
    return () => {
      if (isActiveRef.current) {
        onActiveChangeRef.current(project.id, false);
      }
    };
  }, [project.id]);

  return (
    <motion.div
      {...animateProps}
      ref={sectionRef}
      key={`${project.id}-stack`}
      className="col-span-2 relative"
    >
      <StackingCards
        totalCards={stackImages.length}
        className="w-full"
        scaleMultiplier={0.035}
      >
        {stackImages.map((src, index) => (
          <StackingCardItem
            key={`${project.id}-${index}`}
            index={index}
            className="h-[72vh] md:h-[80vh] lg:h-[88vh]"
          >
            <motion.div
              layoutId={`project-image-${project.id}-${index}`}
              data-cursor-magnify="true"
              className="relative w-full h-[82%] rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer"
              style={{
                backgroundColor: project.bgColor,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                willChange: "transform",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                layout: { type: "spring", duration: 0.5, bounce: 0.1 },
                scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={(e) => {
                const video = e.currentTarget.querySelector("video");
                const w = video?.videoWidth;
                const h = video?.videoHeight;
                onImageClick(`${project.id}-${index}`, src, isVideo(src), w, h);
              }}
            >
              {isVideo(src) ? (
                <video
                  src={src}
                  className="w-full h-full object-cover block transform-gpu"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={src}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover block transform-gpu"
                  loading="lazy"
                />
              )}
            </motion.div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </motion.div>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const blurTrigger = {
    heroInViewAmount: 0.2,
    footerInViewAmount: 0.2,
  };
  const blurLayout = {
    heightMobile: 108,
    heightDesktop: 144,
    zIndex: 50,
  };
  const blurVisual = {
    blurPx: 8,
    alphaBottom: 0.08,
    alphaMiddle: 0.04,
    alphaUpper: 0.01,
    maskMiddleAlpha: 0.45,
    maskMiddleStop: 50,
  };
  const blurMotion = {
    fadeInMs: 220,
    fadeOutMs: 160,
    reducedMotionFadeMs: 100,
  };

  const pillMotion = {
    enterYOffset: 120,
    exitYOffset: 140,
    enterScale: 0.94,
    exitScale: 0.94,
    springStiffness: 260,
    springDamping: 26,
    springMass: 0.8,
    reducedMotionFadeMs: 150,
  };
  const pillLayout = {
    bottomOffset: 24,
  };
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
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("work");

  // Track the currently active stacked project ID for the page-level CTA
  const [activeStackedProjectId, setActiveStackedProjectId] = useState<
    string | null
  >(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const isHeroSectionInView = useInView(heroSectionRef, {
    amount: blurTrigger.heroInViewAmount,
  });
  const footerSectionRef = useRef<HTMLElement>(null);
  const isFooterSectionInView = useInView(footerSectionRef, {
    amount: blurTrigger.footerInViewAmount,
  });
  const workSectionRef = useRef<HTMLElement>(null);
  const isWorkSectionInView = useInView(workSectionRef, { amount: 0.01 });
  const showBottomLiquidBlur =
    !isLoading && !isHeroSectionInView && !isFooterSectionInView;
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.isHidden),
    [],
  );
  const workItems = useMemo<WorkRenderItem[]>(
    () =>
      visibleProjects.map((project) => {
        const folderImages = project.slug
          ? getProjectFolderImages(project.slug, { excludeHidden: true })
          : [];
        const shouldStack =
          folderImages.length > 1 && project.modalVariant !== "imageOnly";

        if (shouldStack) {
          return {
            kind: "stack",
            project,
            stackImages: folderImages,
          };
        }

        const src =
          project.gridImage ??
          (project.slug ? getProjectGridImage(project.slug) : undefined) ??
          project.image;

        return {
          kind: "grid",
          project,
          src,
          span: project.gridSpan ?? (project.isMobile ? 1 : 2),
        };
      }),
    [visibleProjects],
  );

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
    if (isLoading || activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, activeImage]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeImage) {
          setActiveImage(null);
        } else {
          setSelectedProject(null);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeImage]);

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
                href="mailto:hello@hari.sh"
                className="hover:text-text transition-colors"
              >
                hello@hari.sh
              </a>
            </div>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-0.5">
            <span>Melbourne, Australia</span>
            <MelbourneClock />
          </div>
        </div>

        {/* Hero Section */}
        <header
          ref={heroSectionRef}
          className="relative flex items-start justify-center pt-[100px] md:pt-[120px] pb-12 max-sm:px-8"
        >
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
                className="mt-6 mb-10 h-[200px] w-[200px] max-md:h-[160px] max-md:w-[160px] overflow-visible"
              >
                <div className="h-[300px] w-[280px] -translate-x-[40px] -translate-y-[55px] max-md:h-[220px] max-md:w-[220px] max-md:-translate-x-[30px] max-md:-translate-y-[30px]">
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
                <TextShimmer
                  as="span"
                  duration={1}
                  className="[--base-color:var(--color-text-secondary)] [--base-gradient-color:var(--color-text)]"
                >
                  AI-native
                </TextShimmer>{" "}
                <span data-cursor-figma>design</span>{" "}
                <span data-cursor-code>engineer</span> for startups that value
                craft and speed.
              </motion.p>
              <motion.a
                href="mailto:hello@hari.sh"
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-6 py-3.5 bg-text text-bg font-semibold text-lg rounded-full shadow-sm"
                data-cursor-dark
              >
                Get in touch
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full mt-14"
              >
                {/* <p className="text-sm font-medium text-text-secondary text-center mb-5">
                  12+ years of shipping digital products
                </p> */}
                <LogoCloud />
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Work Section */}
        <section id="work" ref={workSectionRef} className="pt-2 pb-32 relative">
          <div className="max-w-[1200px] mx-auto px-3 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {workItems.map((item, i) => {
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

                if (item.kind === "stack") {
                  return (
                    <StackProjectSection
                      key={`${item.project.id}-stack`}
                      project={item.project}
                      stackImages={item.stackImages}
                      animateProps={animateProps}
                      onImageClick={(imageId, src, isVideoSrc, width, height) => {
                        setActiveImage({
                          id: imageId,
                          src,
                          isVideo: isVideoSrc,
                          bgColor: item.project.bgColor,
                          width,
                          height,
                        });
                      }}
                      onActiveChange={(id, isActive) => {
                        setActiveStackedProjectId((prev) => {
                          if (isActive) return id;
                          return prev === id ? null : prev;
                        });
                      }}
                    />
                  );
                }

                return (
                  <motion.div
                    {...animateProps}
                    layoutId={`project-image-${item.project.id}`}
                    key={`${item.project.id}-${i}`}
                    data-cursor-magnify="true"
                    className={`relative rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer ${item.span === 2
                      ? "col-span-2"
                      : "col-span-1 aspect-[3/4] md:aspect-[4/5]"
                      }`}
                    style={{
                      backgroundColor: item.project.bgColor,
                      WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                      willChange: "transform",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      layout: {
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.1,
                      },
                      scale: {
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    onClick={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      const w = video?.videoWidth;
                      const h = video?.videoHeight;
                      setActiveImage({
                        id: item.project.id,
                        src: item.src,
                        isVideo: isVideo(item.src),
                        bgColor: item.project.bgColor,
                        width: w,
                        height: h,
                      });
                    }}
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

      {/* Global Context-Aware Pill */}
      <AnimatePresence>
        {isWorkSectionInView && activeStackedProjectId && (
          <motion.div
            key="global-case-study-pill"
            className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none"
            style={{ bottom: pillLayout.bottomOffset }}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                  opacity: 0,
                  y: pillMotion.enterYOffset,
                  scale: pillMotion.enterScale,
                }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                  opacity: 0,
                  y: pillMotion.exitYOffset,
                  scale: pillMotion.exitScale,
                }
            }
            transition={
              shouldReduceMotion
                ? { duration: pillMotion.reducedMotionFadeMs / 1000 }
                : {
                  type: "spring",
                  stiffness: pillMotion.springStiffness,
                  damping: pillMotion.springDamping,
                  mass: pillMotion.springMass,
                }
            }
          >
            <div className="pointer-events-auto">
              <button
                data-cursor-native-pointer
                onClick={() => {
                  const p = projects.find(
                    (p) => p.id === activeStackedProjectId,
                  );
                  if (p) setSelectedProject(p);
                }}
                className="inline-flex items-center gap-2 rounded-[64px] bg-[rgba(0,0,0,0.75)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.12)] px-5 py-3 text-[15px] font-medium text-white shadow-[rgba(0,0,0,0.18)_0px_0.711334px_0.711334px_-0.75px,rgba(0,0,0,0.17)_0px_1.93715px_1.93715px_-1.5px,rgba(0,0,0,0.16)_0px_4.25329px_4.25329px_-2.25px,rgba(0,0,0,0.13)_0px_9.44132px_9.44132px_-3px,rgba(0,0,0,0.06)_0px_24px_24px_-3.75px] transition-transform hover:scale-[1.05] active:scale-[0.97]"
              >
                <span className="tracking-[-0.01em]">View case study</span>
                <PiEyeOnStroke className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom liquid blur overlay (post-hero only) */}
      <AnimatePresence>
        {showBottomLiquidBlur && (
          <motion.div
            key="bottom-liquid-blur"
            className="fixed bottom-0 left-0 right-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: shouldReduceMotion
                  ? blurMotion.reducedMotionFadeMs / 1000
                  : blurMotion.fadeInMs / 1000,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: shouldReduceMotion
                  ? blurMotion.reducedMotionFadeMs / 1000
                  : blurMotion.fadeOutMs / 1000,
              },
            }}
            style={{
              height: `clamp(${blurLayout.heightMobile}px, 14vh, ${blurLayout.heightDesktop}px)`,
              zIndex: blurLayout.zIndex,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blurVisual.blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurVisual.blurPx}px)`,
                background: `linear-gradient(to top, rgba(255,255,255,${blurVisual.alphaBottom}), rgba(255,255,255,${blurVisual.alphaMiddle}), rgba(255,255,255,${blurVisual.alphaUpper}), transparent)`,
                maskImage: `linear-gradient(to top, black 0%, rgba(0,0,0,${blurVisual.maskMiddleAlpha}) ${blurVisual.maskMiddleStop}%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to top, black 0%, rgba(0,0,0,${blurVisual.maskMiddleAlpha}) ${blurVisual.maskMiddleStop}%, transparent 100%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
      <section ref={footerSectionRef}>
        <Footer />
      </section>

      {/* Image Lightbox — backdrop */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            key="lightbox-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.3,
              ease: "easeOut",
            }}
            onClick={() => setActiveImage(null)}
            style={{ willChange: "opacity" }}
          />
        )}
      </AnimatePresence>

      {/* Image Lightbox — expanded image (direct child of AnimatePresence for proper exit) */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            key="lightbox-expanded"
            layoutId={
              shouldReduceMotion ? undefined : `project-image-${activeImage.id}`
            }
            initial={shouldReduceMotion ? { opacity: 0 } : undefined}
            animate={shouldReduceMotion ? { opacity: 1 } : undefined}
            exit={shouldReduceMotion ? { opacity: 0 } : undefined}
            className="fixed inset-0 z-[1000] m-auto w-fit h-fit pointer-events-auto overflow-hidden rounded-[32px] md:rounded-[48px]"
            style={{
              willChange: "transform",
              backgroundColor: activeImage.bgColor,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: "spring", duration: 0.5, bounce: 0.1 }
            }
          >
            {activeImage.isVideo ? (
              <video
                src={activeImage.src}
                className="block max-w-[96vw] max-h-[96vh] w-auto h-auto transform-gpu"
                width={activeImage.width}
                height={activeImage.height}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={activeImage.src}
                alt=""
                className="block max-w-[96vw] max-h-[96vh] w-auto h-auto transform-gpu"
              />
            )}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.15, duration: 0.15 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-md transition-all duration-150 ease-out active:scale-95 sm:hover:scale-105 hover:bg-white z-50 shadow-lg border border-black/5"
              onClick={() => setActiveImage(null)}
              aria-label="Close lightbox"
            >
              <XIcon size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-[1000] pointer-events-none"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0f0f11]/90 backdrop-blur-md pointer-events-auto"
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
                className={`w-full relative z-10 min-h-full flex flex-col items-center ${selectedProject.modalVariant === "imageOnly"
                  ? "justify-center py-12 md:py-24 px-4 md:px-8"
                  : "justify-end md:justify-center px-0 pt-16 md:px-8 md:py-16"
                  }`}
                onClick={() => setSelectedProject(null)}
              >
                {/* Modal Container */}
                <motion.div
                  className={`w-full pointer-events-auto relative overflow-hidden flex flex-col squircle transform-gpu ${selectedProject?.modalVariant === "imageOnly"
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
                          className={`relative flex items-center justify-center overflow-hidden w-full ${selectedProject.modalVariant === "imageOnly"
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
                              className={`block transform-gpu ${selectedProject.modalVariant === "imageOnly"
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
                              className={`block transform-gpu ${selectedProject.modalVariant === "imageOnly"
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
                                    alt={`${selectedProject.title} ${index + 1
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
