import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="text-text">
      <motion.line
        x1="3" x2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { y1: 10, y2: 10, rotate: 45 } : { y1: 7, y2: 7, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.line
        x1="3" x2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { y1: 10, y2: 10, rotate: -45 } : { y1: 13, y2: 13, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ originX: "50%", originY: "50%" }}
      />
    </svg>
  );
}

export function Navigation({
  activeSection,
  onSectionChange,
}: NavigationProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!mobileOpen) return;
    const handleTouch = (e: TouchEvent | MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("touchstart", handleTouch);
    document.addEventListener("mousedown", handleTouch);
    return () => {
      document.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("mousedown", handleTouch);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -20% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onSectionChange(entry.target.id);
        }
      });
    }, options);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onSectionChange]);

  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const highlightTarget = hoveredSection ?? activeSection;

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  const springConfig = { type: "spring" as const, stiffness: 400, damping: 30 };
  const exitConfig = { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const };

  return (
    <>
      {/* Desktop pill nav */}
      <motion.nav className="fixed top-8 left-0 right-0 z-[100] hidden md:flex justify-center pointer-events-none">
        <div
          className="flex items-center bg-[#f0f0f0]/50 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 rounded-full p-[6px] gap-1 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-auto transition-all duration-base hover:bg-[#f5f5f5]/80"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`relative px-6 py-2 text-[0.9375rem] font-medium rounded-full transition-colors duration-fast z-10 bg-transparent cursor-pointer leading-normal hover:text-black ${highlightTarget === item.id ? "text-black" : "text-text-secondary"
                }`}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHoveredSection(item.id)}
            >
              {highlightTarget === item.id && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] -z-10"
                  layoutId="nav-highlight"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile hamburger nav */}
      <nav className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex md:hidden px-4 pointer-events-none justify-end">
        <motion.div
          ref={mobileMenuRef}
          className="pointer-events-auto bg-[#f0f0f0]/50 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden"
          animate={{
            width: mobileOpen ? "100%" : 44,
            borderRadius: mobileOpen ? 20 : 20,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : mobileOpen ? springConfig : exitConfig}
        >
          {/* Top bar */}
          <div className="flex items-center justify-end p-1.5">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative w-8 h-8 flex items-center justify-center bg-transparent cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>

          {/* Expandable menu items */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1, transition: shouldReduceMotion ? { duration: 0 } : springConfig }}
                exit={{ height: 0, opacity: 0, transition: shouldReduceMotion ? { duration: 0 } : exitConfig }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 px-3 pb-3.5">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      animate={{
                        opacity: 1, x: 0, transition: shouldReduceMotion ? { duration: 0 } : {
                          delay: i * 0.04,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }
                      }}
                      exit={{ opacity: 0, x: 8, transition: { duration: 0.12 } }}
                      onClick={() => handleClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.9375rem] font-medium transition-colors bg-transparent cursor-pointer ${activeSection === item.id
                        ? "text-black bg-white/80"
                        : "text-text-secondary"
                        }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </>
  );
}
