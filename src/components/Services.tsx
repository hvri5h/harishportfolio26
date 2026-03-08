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
      "You have an idea but no product yet. I'll take it from concept to shipped including design, code, and everything in between.",
    icon: PiRocketShipStroke,
  },
  {
    title: "AI-Native",
    description:
      "I use AI as a tool to amplify my manual craft, not replace it. I can upskill your team, solve AI challenges, and ship high-quality work without the 'slop'.",
    icon: PiSparkleAi01Stroke,
  },
  {
    title: "Craft obsessed",
    description:
      "I design interfaces people actually enjoy using. I pay attention to details and how things feel so your product always feels considered and polished.",
    icon: PiGitPullRequestStroke,
  },
  {
    title: "Async & Autonomous",
    description:
      "Point me at a problem and I'll figure it out. I take initiative, figure things out, and keep you updated without needing to be managed.",
    icon: PiLightningThunderElectricOnStroke,
  },
  {
    title: "Rapid Iteration",
    description:
      "I learn problem spaces instantly and turn things around quickly. I turn things around quickly whether it's a retainer, a sprint, or a one-off project.",
    icon: PiRefreshStroke,
  },
  {
    title: "Direct Collaboration",
    description:
      "You work directly with me to solve problems, ensuring clear communication and nothing getting lost in translation.",
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
    <section className="py-12 md:py-32 bg-bg relative z-30" style={{ fontFamily: bodyFont }}>
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-10 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={getStaggerContainer()}
        >
          <motion.h2
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-display font-black text-[56px] leading-[0.8] tracking-[-0.02em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
            style={{ fontWeight: h.sectionHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
          >
            What I can do for you
          </motion.h2>
          <motion.p
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-display font-medium text-2xl max-md:text-xl leading-[1.35] text-text-secondary max-w-[538px]"
            style={{ color: c.secondaryColor, lineHeight: b.subtitleLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
          >
            I communicate efficiently, get sh*t done, and ship fast without compromising on quality.
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
              className="bg-[rgba(26,26,26,0.03)] rounded-[24px] p-10 flex flex-col gap-6 max-sm:p-7 max-sm:gap-4"
            >
              <service.icon
                className="text-text/70 w-9 h-9"
              />
              <h3
                className="text-[22px] max-sm:text-xl font-semibold tracking-[-0.02em] text-text"
                style={{ fontWeight: h.cardHeadingWeight, color: c.headingColor, fontFamily: headingFont, lineHeight: h.headingLineHeight, letterSpacing: `${h.headingLetterSpacing}em` }}
              >
                {service.title}
              </h3>
              <p
                className="text-[17px] max-sm:text-base text-text-secondary leading-relaxed"
                style={{ fontWeight: b.bodyWeight, color: c.secondaryColor, lineHeight: b.bodyLineHeight, letterSpacing: `${b.bodyLetterSpacing}em` }}
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
