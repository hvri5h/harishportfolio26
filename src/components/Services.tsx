import { motion, useReducedMotion } from "framer-motion";
import { getStaggerContainer, getStaggerItem } from "../lib/animations";
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
  const shouldReduceMotion = useReducedMotion() ?? false;
  const h = {
    sectionHeadingSize: 56,
    sectionHeadingWeight: 900,
    cardHeadingSize: 22,
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
    iconSize: 36,
  };
  const c = {
    headingColor: "#1a1a1a",
    secondaryColor: "#666666",
  };
  const headingFont = fontFamilyMap.Saans;
  const bodyFont = fontFamilyMap.Saans;

  return (
    <section className="py-32 bg-bg relative z-30" style={{ fontFamily: bodyFont }}>
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
            What I can do for you
          </motion.h2>
          <motion.p
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-display font-medium text-2xl leading-[1.35] text-text-secondary max-w-[538px]"
            style={{ fontSize: b.subtitleSize, color: c.secondaryColor, lineHeight: b.subtitleLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
          >
            Whether you need a one-person product team or an extra pair of
            hands, here's how I work.
          </motion.p>
        </motion.div>

        {/* 3x2 Grid */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={getStaggerContainer()}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={getStaggerItem(shouldReduceMotion)}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
