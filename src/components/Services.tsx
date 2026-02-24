import { motion } from 'framer-motion';
import {
    PiRocketShipStroke,
    PiGitPullRequestStroke,
    PiSparkleAi01Stroke,
    PiLightningThunderElectricOnStroke,
    PiRefreshStroke,
    PiChatChattingStroke,
} from './icons/pikaicons-react';

const services = [
    {
        title: "Zero to One",
        description: "A one-person product team for startups. Vague concept to shipped product, without the overhead.",
        icon: PiRocketShipStroke
    },
    {
        title: "Fractional Design Engineer",
        description: "I slot into your existing team on a part-time basis. I speak both design and code, so nothing gets lost between Figma and production.",
        icon: PiGitPullRequestStroke
    },
    {
        title: "AI-Native",
        description: "I use AI across design and development to move faster, with enough experience to catch the slop and keep the quality high.",
        icon: PiSparkleAi01Stroke
    },
    {
        title: "Async & Autonomous",
        description: "I work well with a clear brief and minimal oversight. Slack over meetings, progress over process.",
        icon: PiLightningThunderElectricOnStroke
    },
    {
        title: "Rapid Iteration",
        description: "Whether it's a retainer or a sprint, I match your pace. Real progress in days, not weeks.",
        icon: PiRefreshStroke
    },
    {
        title: "Direct Collaboration",
        description: "You work with me directly. No layers in between, so communication stays clear and things move faster.",
        icon: PiChatChattingStroke
    }
];

const Services = () => {
    return (
        <section className="py-32 bg-bg relative z-30">
            <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">

                {/* Header content */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.h2
                        className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
                    >
                        What I can do for you
                    </motion.h2>
                    <motion.p
                        className="font-display font-medium text-2xl text-text-secondary max-w-[600px] max-md:text-xl"
                    >
                        Whether you need a one-person product team or an extra pair of hands, here's how I work.
                    </motion.p>
                </div>

                {/* Grid Container with Dotted Border Effect */}
                <div className="relative">
                    <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {services.map((service) => (
                            <motion.div
                                key={service.title}
                                className="bg-surface border border-border-light rounded-2xl p-10 flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-surface-hover flex items-center justify-center mb-6 text-text transition-colors duration-300">
                                    <service.icon className="w-6 h-6 text-text" />
                                </div>
                                <h3 className="text-xl font-bold text-text mb-4">{service.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;
