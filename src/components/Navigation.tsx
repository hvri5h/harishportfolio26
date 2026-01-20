import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
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

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      className="fixed top-8 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center bg-[#f0f0f0]/50 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 rounded-full p-[6px] gap-1 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-auto transition-all duration-base hover:bg-[#f5f5f5]/80 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative px-6 py-2 text-[0.9375rem] font-medium text-black/60 rounded-full transition-colors duration-fast z-10 bg-transparent cursor-pointer leading-normal hover:text-black/90 ${activeSection === item.id ? 'text-black font-semibold' : ''
              }`}
            onClick={() => handleClick(item.id)}
          >
            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] -z-10"
                layoutId="nav-highlight"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
