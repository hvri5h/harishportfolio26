import { motion } from 'framer-motion';
import {
    Palette,
    Code2,
    MousePointer2,
    Bot,
    Wind,
    Zap,
    Box,
    Globe,
    Cpu
} from 'lucide-react';

const stackItems = [
    { name: 'Cursor', icon: MousePointer2, color: 'bg-blue-500/10 text-blue-600' },
    { name: 'Claude Code', icon: Bot, color: 'bg-orange-500/10 text-orange-600' },
    { name: 'React', icon: Code2, color: 'bg-cyan-500/10 text-cyan-600' },
    { name: 'Tailwind', icon: Wind, color: 'bg-teal-500/10 text-teal-600' },
    { name: 'Figma', icon: Palette, color: 'bg-purple-500/10 text-purple-600' },
    { name: 'Next.js', icon: Globe, color: 'bg-gray-500/10 text-gray-800' },
    { name: 'TypeScript', icon: Box, color: 'bg-blue-600/10 text-blue-700' },
    { name: 'Motion', icon: Zap, color: 'bg-yellow-500/10 text-yellow-600' },
];

const WhatIDo = () => {
    return (
        <section className="py-24 bg-bg relative z-30">
            <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">

                {/* Header content */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.h2
                        className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        What I do
                    </motion.h2>
                    <motion.p
                        className="font-display font-medium text-2xl text-text-secondary max-w-[700px] max-md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        I work across design, code, and product owning everything from concept to implementation.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-8 mb-24 max-md:grid-cols-1">
                    {/* Product Design */}
                    <motion.div
                        className="p-10 bg-surface border border-border-light rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
                            <Palette className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-text mb-4">Product Design</h3>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            Transform ideas into user-centric products that blend aesthetics and functionality. I create bespoke designs that look and feel premium.
                        </p>

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    "Product Strategy", "User Research", "UX/UI Design",
                                    "Design Systems", "Prototyping", "Visual Strategy"
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-bg border border-border rounded-full text-sm font-medium text-text-secondary transition-colors hover:border-text-tertiary hover:text-text cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Software Engineering */}
                    <motion.div
                        className="p-10 bg-surface border border-border-light rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                            <Cpu className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-text mb-4">Software Engineering</h3>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            I build performant, accessible, and maintainable systems from frontend to backend with a focus on polished interactions.
                        </p>

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    "React", "Next.js", "TypeScript", "Tailwind CSS",
                                    "Framer Motion", "GSAP", "API Integration"
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-bg border border-border rounded-full text-sm font-medium text-text-secondary transition-colors hover:border-text-tertiary hover:text-text cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stack */}
                <div className="w-full">
                    <motion.h3
                        className="text-lg font-semibold text-text mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Stack
                    </motion.h3>

                    <div className="grid grid-cols-8 gap-4 max-md:grid-cols-4 max-sm:grid-cols-2">
                        {stackItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                className="group flex flex-col items-center justify-center gap-3 p-6 bg-surface border border-border-light rounded-2xl transition-all duration-300 hover:border-border hover:shadow-lg aspect-square"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + (index * 0.05) }}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                                    <item.icon size={24} />
                                </div>
                                <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIDo;
