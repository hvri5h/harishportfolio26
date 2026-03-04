import { motion } from "framer-motion";
import { useDialKit } from "dialkit";
import {
  PiRocketShipStroke,
  PiSparkleAi01Stroke,
  PiLightningThunderElectricOnStroke,
  PiRefreshStroke,
  PiChatChattingStroke,
  PiGitPullRequestStroke,
} from "./icons/pikaicons-react";

const services = [
  {
    title: "Zero to One",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiRocketShipStroke,
  },
  {
    title: "AI-Native",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiSparkleAi01Stroke,
  },
  {
    title: "Craft obsessed",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiGitPullRequestStroke,
  },
  {
    title: "Async & Autonomous",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiLightningThunderElectricOnStroke,
  },
  {
    title: "Rapid Iteration",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiRefreshStroke,
  },
  {
    title: "Direct Collaboration",
    description:
      "I design interfaces people actually enjoy using. Real product thinking with attention to craft, typography, and how things feel.",
    icon: PiChatChattingStroke,
  },
];

const fontFamilyMap: Record<string, string> = {
  Saans: "'Saans', sans-serif",
  Inter: "'Inter', sans-serif",
  System: "system-ui, -apple-system, sans-serif",
};

const Services = () => {
  const p = useDialKit("How I Work", {
    Headings: {
      sectionHeadingSize: [56, 28, 80] as [number, number, number],
      sectionHeadingWeight: [900, 400, 900, 100] as [number, number, number, number],
      cardHeadingSize: [22, 14, 40] as [number, number, number],
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
      iconSize: [36, 16, 64] as [number, number, number],
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
    <section className="py-32 bg-bg relative z-30" style={{ fontFamily: bodyFont }}>
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            className="font-display font-black text-[56px] leading-[0.8] tracking-[-0.02em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
            style={{ fontSize: h.sectionHeadingSize, fontWeight: h.sectionHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            How I work
          </motion.h2>
          <motion.p
            className="font-display font-medium text-2xl leading-[1.35] text-text-secondary max-w-[538px]"
            style={{ fontSize: b.subtitleSize, color: c.secondaryColor, lineHeight: b.subtitleLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
          >
            Whether you need a one-person product team or an extra pair of
            hands, here's how I work.
          </motion.p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[rgba(26,26,26,0.03)] rounded-[24px] p-10 flex flex-col gap-6 max-sm:p-7"
            >
              <service.icon
                className="text-text/70"
                style={{ width: b.iconSize, height: b.iconSize }}
              />
              <h3
                className="text-2xl font-semibold tracking-[-0.02em] text-text"
                style={{ fontSize: h.cardHeadingSize, fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
              >
                {service.title}
              </h3>
              <p
                className="text-base text-text-secondary leading-relaxed"
                style={{ fontSize: b.bodySize, fontWeight: b.bodyWeight, color: c.secondaryColor, lineHeight: b.bodyLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
