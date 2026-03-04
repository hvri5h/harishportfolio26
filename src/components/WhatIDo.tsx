import { motion } from "framer-motion";
import { useState } from "react";
import { useDialKit } from "dialkit";

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
  const p = useDialKit("What I Do", {
    Headings: {
      sectionHeadingSize: [56, 28, 80] as [number, number, number],
      sectionHeadingWeight: [900, 400, 900, 100] as [number, number, number, number],
      cardHeadingSize: [24, 14, 40] as [number, number, number],
      cardHeadingWeight: [600, 400, 900, 100] as [number, number, number, number],
      headingLineHeight: [0.8, 0.6, 1.4, 0.05] as [number, number, number, number],
      headingLetterSpacing: [-0.02, -0.08, 0.04, 0.005] as [number, number, number, number],
    },
    Body: {
      subtitleSize: [24, 14, 40] as [number, number, number],
      subtitleLineHeight: [1.5, 1.0, 2.0, 0.05] as [number, number, number, number],
      bodySize: [17, 12, 24] as [number, number, number],
      bodyWeight: [400, 300, 700, 100] as [number, number, number, number],
      bodyLineHeight: [1.65, 1.0, 2.2, 0.05] as [number, number, number, number],
      bodyLetterSpacing: [0, -0.04, 0.04, 0.005] as [number, number, number, number],
      tagSize: [13, 10, 18] as [number, number, number],
      stackIconSize: [36, 16, 56] as [number, number, number],
    },
    Colors: {
      headingColor: { type: "color" as const, default: "#1a1a1a" },
      secondaryColor: { type: "color" as const, default: "#666666" },
    },
    Typeface: {
      headingTypeface: { type: "select" as const, options: ["Saans", "Inter", "System"], default: "Saans" },
      bodyTypeface: { type: "select" as const, options: ["Saans", "Inter", "System"], default: "Saans" },
    },
  });

  const h = p.Headings as Record<string, number>;
  const b = p.Body as Record<string, number>;
  const c = p.Colors as Record<string, string>;
  const tf = p.Typeface as Record<string, string>;
  const headingFont = fontFamilyMap[tf.headingTypeface] || fontFamilyMap.Saans;
  const bodyFont = fontFamilyMap[tf.bodyTypeface] || fontFamilyMap.Saans;

  return (
    <section id="about" className="py-24 bg-bg relative z-30" style={{ fontFamily: bodyFont }}>
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            className="font-display font-black text-[56px] leading-[0.8] tracking-[-0.02em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
            style={{ fontSize: h.sectionHeadingSize, fontWeight: h.sectionHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            What I do
          </motion.h2>
          <motion.p
            className="font-display font-medium text-2xl leading-[1.35] text-text-secondary max-w-[588px]"
            style={{ fontSize: b.subtitleSize, color: c.secondaryColor, lineHeight: b.subtitleLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
          >
            I work across design, code, and product, owning everything from
            concept to implementation.
          </motion.p>
        </div>

        {/* Bento: Design & Engineering */}
        <div className="grid grid-cols-2 gap-6 mb-6 max-md:grid-cols-1">
          {/* Design */}
          <div className="relative bg-[rgba(26,26,26,0.03)] rounded-[24px] overflow-hidden h-[400px] max-md:h-auto max-md:min-h-[320px]">
            <div className="absolute inset-0 p-10 flex flex-col max-md:relative max-md:p-8">
              <div className="flex flex-col gap-4 mb-auto">
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
              <div className="flex flex-wrap gap-2.5 mt-8 max-w-[340px] max-md:max-w-full">
                {designSkills.map((skill) => (
                  <SkillTag key={skill} label={skill} tagSize={b.tagSize} />
                ))}
              </div>
            </div>
          </div>

          {/* Engineering */}
          <div className="relative bg-[rgba(26,26,26,0.03)] rounded-[24px] overflow-hidden h-[400px] max-md:h-auto max-md:min-h-[320px]">
            <div className="absolute inset-0 p-10 flex flex-col max-md:relative max-md:p-8">
              <div className="flex flex-col gap-4 mb-auto">
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
                  Over a decade of writing code. Frontend is my sweet spot:
                  React, Next.js, animations, the works. I don't just make
                  things look right, I make them work right.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-8 max-w-[340px] max-md:max-w-full">
                {engineeringSkills.map((skill) => (
                  <SkillTag key={skill} label={skill} tagSize={b.tagSize} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="bg-[rgba(26,26,26,0.03)] rounded-[24px] p-10 max-md:p-8 max-sm:p-5">
          <h3
            className="text-2xl font-semibold tracking-[-0.02em] text-text mb-10 max-sm:mb-6"
            style={{ fontSize: h.cardHeadingSize, fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            Stack
          </h3>
          <div className="flex flex-wrap items-center gap-6 max-sm:gap-3">
            {stackItems.map((item) => (
              <Tooltip key={item.name} name={item.name}>
                <div className="relative bg-[rgba(26,26,26,0.04)] hover:bg-[rgba(26,26,26,0.08)] rounded-xl flex-1 min-w-[100px] max-w-[114px] h-[96px] flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 max-sm:min-w-[calc(25%-0.75rem)] max-sm:h-[80px]">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`object-contain mb-3 opacity-60 max-sm:mb-2 ${item.className || ""}`}
                    style={{ width: b.stackIconSize, height: b.stackIconSize }}
                  />
                  <span className="text-sm text-text-secondary font-normal max-sm:text-xs">
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
