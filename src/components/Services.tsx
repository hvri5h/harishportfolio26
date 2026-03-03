import { motion } from "framer-motion";
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

const Services = () => {
  return (
    <section className="py-32 bg-bg relative z-30">
      <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 className="font-display font-black text-[56px] leading-[1.1] tracking-[-0.03em] text-text mb-6 max-md:text-5xl max-sm:text-4xl">
            How I work
          </motion.h2>
          <motion.p className="font-display font-medium text-2xl text-text-secondary max-w-[600px]">
            Whether you need a one-person product team or an extra pair of
            hands, here's how I work.
          </motion.p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-surface border border-border-light rounded-2xl p-8 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center mb-5">
                <service.icon className="w-5 h-5 text-text" />
              </div>
              <h3 className="text-base font-bold tracking-[-0.03em] text-text mb-3">
                {service.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
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
