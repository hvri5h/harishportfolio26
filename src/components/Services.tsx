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
        description: "For startups, I function as a one-person product team. I take vague concepts and turn them into shipped, polished products without the overhead of a large team.",
        icon: PiRocketShipStroke
    },
    {
        title: "Fractional Design Engineer",
        description: "I slot seamlessly into existing teams, bridging the gap between designers and developers. I speak both languages to ensure implementation matches the vision.",
        icon: PiGitPullRequestStroke
    },
    {
        title: "AI Native & Craft-Led",
        description: "I use AI as a superpower to amplify my manual craft, not replace it. I can upskill your team, solve AI challenges, and ship high-quality work without the 'slop'.",
        icon: PiSparkleAi01Stroke
    },
    {
        title: "Async & Autonomous",
        description: "I thrive in remote environments. Invite me to Slack, assign tasks, and I'll deliver results. No endless meetings—just high-velocity shipping.",
        icon: PiLightningThunderElectricOnStroke
    },
    {
        title: "Rapid Iteration",
        description: "I learn problem spaces instantly and turn things around quickly. Whether it's a monthly retainer or a sprint, I adapt to your cadence.",
        icon: PiRefreshStroke
    },
    {
        title: "Direct Collaboration",
        description: "No project managers or middlemen. You work directly with me to solve problems, ensuring clear communication and nothing getting lost in translation.",
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        What I can do for you
                    </motion.h2>
                    <motion.p
                        className="font-display font-medium text-2xl text-text-secondary max-w-[600px] max-md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        I collaborate efficiently, solve problems,<br />ship fast, and get sh*t done.
                    </motion.p>
                </div>

                {/* Grid Container with Dotted Border Effect */}
                <div className="relative">
                    <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                className="bg-surface border border-border-light rounded-2xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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
