import { motion } from "framer-motion";
import { useState } from "react";

const designSkills = [
  "Visual Design",
  "Branding",
  "Interaction Design",
  "User Experience",
  "Prototyping",
  "Product Design",
];

const engineeringSkills = [
  "Javascript",
  "Typescript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Next.js",
  "React.js",
];

const stackItems = [
  { name: "React", icon: "/icons/react-logo.svg" },
  {
    name: "Next.js",
    icon: "/icons/nextjs-logotype-light-background.svg",
    className: "scale-150",
  },
  { name: "TypeScript", icon: "/icons/typescript-logo.svg" },
  { name: "Tailwind", icon: "/icons/tailwindcss-logo.svg" },
  { name: "Figma", icon: "/icons/figma-logo.svg" },
  { name: "Supabase", icon: "/icons/supabase-logo.svg" },
  { name: "Motion", icon: "/icons/motion.svg" },
];

interface TooltipProps {
  name: string;
  children: React.ReactNode;
}

const Tooltip = ({ name, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none">
          <div className="bg-[#1a1a1a] text-white px-3.5 py-2 rounded-xl shadow-xl whitespace-nowrap">
            <div className="text-[13px] font-semibold">{name}</div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a1a1a]" />
          </div>
        </div>
      )}
    </div>
  );
};

const SkillTag = ({ label }: { label: string }) => (
  <span className="px-4 py-2 bg-bg border border-border rounded-full text-sm font-medium text-text-secondary transition-colors hover:border-text-tertiary hover:text-text cursor-default">
    {label}
  </span>
);

const WhatIDo = () => {
  return (
    <section id="about" className="py-24 bg-bg relative z-30">
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 className="font-display font-black text-[56px] leading-[1.1] tracking-[-0.01em] text-text mb-6 max-md:text-5xl max-sm:text-4xl">
            What I do
          </motion.h2>
          <motion.p className="font-display font-medium text-2xl text-text-secondary max-w-[500px]">
            I work across design, code, and product, owning everything from
            concept to implementation.
          </motion.p>
        </div>

        {/* Bento: Design & Engineering */}
        <div className="grid grid-cols-2 gap-6 mb-6 max-md:grid-cols-1">
          {/* Design */}
          <div className="p-8 bg-surface border border-border-light rounded-2xl flex flex-col min-h-[280px]">
            <h3 className="text-xl font-bold text-text mb-3">Design</h3>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              I design interfaces people actually enjoy using. Real product
              thinking with attention to craft, typography, and how things feel.
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {designSkills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </div>

          {/* Engineering */}
          <div className="p-8 bg-surface border border-border-light rounded-2xl flex flex-col min-h-[280px]">
            <h3 className="text-xl font-bold text-text mb-3">Engineering</h3>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Over a decade of writing code. Frontend is my sweet spot: React,
              Next.js, animations, the works. I don't just make things look
              right, I make them work right.
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {engineeringSkills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="p-8 bg-surface border border-border-light rounded-2xl">
          <h3 className="text-lg font-bold text-text mb-8">Stack</h3>
          <div className="flex items-center justify-between max-sm:grid max-sm:grid-cols-4 max-sm:gap-6">
            {stackItems.map((item) => (
              <Tooltip key={item.name} name={item.name}>
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-border-light bg-bg transition-all duration-300 group-hover:border-border group-hover:shadow-sm">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`w-6 h-6 object-contain ${item.className || ""}`}
                    />
                  </div>
                  <span className="text-xs text-text-secondary font-medium">
                    {item.name}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
