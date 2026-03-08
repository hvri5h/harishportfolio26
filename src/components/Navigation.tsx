import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiBurgerMenuThreeStroke } from "./icons/pikaicons-react";
import { X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navigation({
  activeSection,
  onSectionChange,
}: NavigationProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <nav className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex justify-end md:hidden px-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto bg-[#f0f0f0]/50 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden"
          layout
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          style={{ borderRadius: 24 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-end p-2">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative w-10 h-10 flex items-center justify-center bg-transparent cursor-pointer text-text"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <PiBurgerMenuThreeStroke className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Expandable menu items */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 px-3 pb-3.5">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      onClick={() => handleClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.9375rem] font-medium transition-colors bg-transparent cursor-pointer ${activeSection === item.id
                        ? "text-black bg-white/60"
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
