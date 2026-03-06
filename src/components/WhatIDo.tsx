import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { getStaggerContainer, getStaggerItem } from "../lib/animations";
import engineeringBg from "../assets/engineering-bento-bg.png";
import designBg from "../assets/design-bento-bg.png";
const designSkills = [
  "Product Design",
  "Visual Design",
  "Interaction Design",
  "Branding",
  "Prototyping",
  "User Research"
];

const engineeringSkills = [
  "HTML/CSS",
  "Javascript",
  "Typescript",
  "Tailwind CSS",
  "Framer Motion",
  "Web Apps",
  "Mobile Apps",
];

type StackItem = {
  name: string;
  icon: string;
  className?: string;
  customSize?: { width: number | string; height: number | string };
};

const stackItems: StackItem[] = [
  { name: "Claude Code", icon: "/icons/claude-logo.png" },
  { name: "Cursor", icon: "/icons/cursor-logo.svg" },
  { name: "Antigravity", icon: "/icons/antigravity-logo.png" },
  { name: "React", icon: "/icons/react-logo.svg" },
  { name: "Next.js", icon: "/icons/nextjs-logo.svg" },
  { name: "Figma", icon: "/icons/figma-logo.svg" },
  { name: "Motion", icon: "/icons/motion.svg", customSize: { width: 54, height: 36 } },
  { name: "Framer", icon: "/icons/framer-logo.svg" },
  { name: "Supabase", icon: "/icons/supabase-logo.svg" },
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

const SkillTag = ({ label, tagSize }: { label: string; tagSize?: number }) => (
  <span
    className="px-5 py-3 bg-white rounded-full text-[13px] font-semibold text-text whitespace-nowrap cursor-default"
    style={tagSize ? { fontSize: tagSize } : undefined}
  >
    {label}
  </span>
);

const fontFamilyMap: Record<string, string> = {
  Saans: "'Saans', sans-serif",
  Inter: "'Inter', sans-serif",
  System: "system-ui, -apple-system, sans-serif",
};

const WhatIDo = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const h = {
    sectionHeadingSize: 56,
    sectionHeadingWeight: 900,
    cardHeadingSize: 24,
    cardHeadingWeight: 600,
    headingLineHeight: 0.8,
    headingLetterSpacing: -0.02,
  };
  const b = {
    subtitleSize: 24,
    subtitleLineHeight: 1.5,
    bodySize: 17,
    bodyWeight: 400,
    bodyLineHeight: 1.65,
    bodyLetterSpacing: 0,
    tagSize: 13,
    stackIconSize: 36,
  };
  const c = {
    headingColor: "#1a1a1a",
    secondaryColor: "#666666",
  };
  const headingFont = fontFamilyMap.Saans;
  const bodyFont = fontFamilyMap.Saans;

  return (
    <section id="about" className="py-24 bg-bg relative z-30" style={{ fontFamily: bodyFont }}>
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={getStaggerContainer()}
        >
          <motion.h2
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-display font-black text-[56px] leading-[0.8] tracking-[-0.02em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
            style={{ fontSize: h.sectionHeadingSize, fontWeight: h.sectionHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            What I do
          </motion.h2>
          <motion.p
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-display font-medium text-2xl leading-[1.35] text-text-secondary max-w-[588px]"
            style={{ fontSize: b.subtitleSize, color: c.secondaryColor, lineHeight: b.subtitleLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
          >
            I work across design, code, and product, owning everything from
            concept to implementation.
          </motion.p>
        </motion.div>

        {/* Bento: Design & Engineering */}
        <motion.div
          className="grid grid-cols-2 gap-6 mb-6 max-md:grid-cols-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={getStaggerContainer()}
        >
          {/* Design */}
          <motion.div
            variants={getStaggerItem(shouldReduceMotion)}
            className="relative bg-[rgba(26,26,26,0.03)] rounded-[24px] overflow-hidden h-[400px] max-md:h-auto max-md:min-h-[320px]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={designBg}
                alt=""
                className="absolute right-0 bottom-0 min-w-full min-h-full object-cover object-bottom"
              />
            </div>
            <div className="absolute inset-0 p-10 flex flex-col max-md:relative max-md:p-8">
              <div className="flex flex-col gap-4 mb-auto relative z-10">
                <h3
                  className="text-2xl font-semibold tracking-[-0.02em] text-text"
                  style={{ fontSize: h.cardHeadingSize, fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
                >
                  Design
                </h3>
                <p
                  className="text-base text-text-secondary leading-relaxed max-w-[90%]"
                  style={{ fontSize: b.bodySize, fontWeight: b.bodyWeight, color: c.secondaryColor, lineHeight: b.bodyLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
                >
                  I design interfaces people actually enjoy using. Real product
                  thinking with attention to craft, typography, and how things
                  feel.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-8 max-w-[340px] max-md:max-w-full relative z-10">
                {designSkills.map((skill) => (
                  <SkillTag key={skill} label={skill} tagSize={b.tagSize} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Engineering */}
          <motion.div
            variants={getStaggerItem(shouldReduceMotion)}
            className="relative bg-[rgba(26,26,26,0.03)] rounded-[24px] overflow-hidden h-[400px] max-md:h-auto max-md:min-h-[320px]"
            data-cursor-code
          >
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={engineeringBg}
                alt=""
                className="absolute right-0 bottom-0 min-w-full min-h-full object-cover object-bottom"
              />
            </div>
            <div className="absolute inset-0 p-10 flex flex-col max-md:relative max-md:p-8">
              <div className="flex flex-col gap-4 mb-auto relative z-10">
                <h3
                  className="text-2xl font-semibold tracking-[-0.02em] text-text"
                  style={{ fontSize: h.cardHeadingSize, fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
                >
                  Engineering
                </h3>
                <p
                  className="text-base text-text-secondary leading-relaxed max-w-[90%]"
                  style={{ fontSize: b.bodySize, fontWeight: b.bodyWeight, color: c.secondaryColor, lineHeight: b.bodyLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
                >
                  Over a decade of writing code. I build what I design with no
                  handoff needed. From frontend to backend, I ship
                  production-ready products.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-8 max-w-[340px] max-md:max-w-full relative z-10">
                {engineeringSkills.map((skill) => (
                  <SkillTag key={skill} label={skill} tagSize={b.tagSize} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stack */}
        <motion.div
          className="bg-[rgba(26,26,26,0.03)] rounded-[24px] p-10 max-md:p-8 max-sm:p-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={getStaggerContainer()}
        >
          <motion.h3
            variants={getStaggerItem(shouldReduceMotion)}
            className="text-2xl font-semibold tracking-[-0.02em] text-text mb-10 max-sm:mb-6"
            style={{ fontSize: h.cardHeadingSize, fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            Stack
          </motion.h3>
          <motion.div variants={getStaggerContainer()} className="flex flex-wrap items-center gap-4 max-sm:gap-3">
            {stackItems.map((item) => (
              <motion.div key={item.name} variants={getStaggerItem(shouldReduceMotion)} className="flex-1">
                <Tooltip name={item.name}>
                  <div className="relative bg-[rgba(26,26,26,0.04)] hover:bg-[rgba(26,26,26,0.08)] rounded-xl w-full min-w-[86px] max-w-[114px] h-[96px] flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 max-sm:min-w-[calc(25%-0.75rem)] max-sm:h-[80px]">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`object-contain mb-3 opacity-60 max-sm:mb-2 ${item.className || ""}`}
                      style={{
                        width: item.customSize?.width ?? b.stackIconSize,
                        height: item.customSize?.height ?? b.stackIconSize
                      }}
                    />
                    <span className="text-[13px] text-text-secondary font-normal max-sm:text-xs">
                      {item.name}
                    </span>
                  </div>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
