import { motion } from 'framer-motion';
import { useState } from 'react';
import {
} from './icons/pikaicons-react';

const stackItems = [
    { name: 'React', icon: '/icons/react-logo.svg', description: 'JavaScript library' },
    { name: 'Next.js', icon: '/icons/nextjs-logotype-light-background.svg', description: 'React framework' },
    { name: 'TypeScript', icon: '/icons/typescript-logo.svg', description: 'Typed JavaScript' },
    { name: 'Tailwind', icon: '/icons/tailwindcss-logo.svg', description: 'CSS framework' },
    { name: 'Figma', icon: '/icons/figma-logo.svg', description: 'Design software' },
    { name: 'Supabase', icon: '/icons/supabase-logo.svg', description: 'Backend platform' },
    { name: 'Motion', icon: '/icons/motion.svg', description: 'Animation library' },
];

interface TooltipProps {
    name: string;
    description: string;
    children: React.ReactNode;
}

const Tooltip = ({ name, description, children }: TooltipProps) => {
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
                    <div className="bg-[#1a1a1a] text-white px-3.5 py-2.5 rounded-xl shadow-xl whitespace-nowrap">
                        <div className="text-[13px] font-semibold">{name}</div>
                        <div className="text-[11px] text-gray-400">{description}</div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a1a1a]" />
                    </div>
                </div>
            )}
        </div>
    );
};

const WhatIDo = () => {
    return (
        <section id="about" className="py-24 bg-bg relative z-30">
            <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6">

                {/* Header content */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.h2
                        className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
                    >
                        What I do
                    </motion.h2>
                    <motion.p
                        className="font-display font-medium text-2xl text-text-secondary max-w-[700px] max-md:text-xl"
                    >
                        I work across design, code, and product owning everything from concept to implementation.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-8 mb-8 max-md:grid-cols-1">
                    {/* Product Design */}
                    <motion.div
                        className="p-10 bg-surface border border-border-light rounded-2xl flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            {/* <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center flex-shrink-0">
                            </div> */}
                            <h3 className="text-2xl font-bold text-text">Product Design</h3>
                        </div>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            Transform ideas into user-centric products that blend aesthetics and functionality. I create bespoke designs that look and feel premium.
                        </p>

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    "Product Strategy", "User Research", "UX/UI Design",
                                    "Design Systems", "Prototyping", "Design Direction"
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
                    >
                        <div className="flex items-center gap-4 mb-6">
                            {/* <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center flex-shrink-0">
                            </div> */}
                            <h3 className="text-2xl font-bold text-text">Software Engineering</h3>
                        </div>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            I build performant, accessible, and maintainable systems from frontend to backend with a focus on polished interactions.
                        </p>

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    "React", "Next.js", "TypeScript", "Tailwind CSS",
                                    "Framer Motion", "API Integration", "Mobile App Development"
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
                <motion.div
                    className="p-10 bg-surface border border-border-light rounded-2xl"
                >
                    <div className="flex items-center gap-4 mb-8">
                        {/* <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center flex-shrink-0">
                        </div> */}
                        <h3 className="text-2xl font-bold text-text">Stack</h3>
                    </div>

                    <div className="grid grid-cols-7 gap-4 max-lg:grid-cols-4 max-sm:grid-cols-3">
                        {stackItems.map((item) => (
                            <Tooltip key={item.name} name={item.name} description={item.description}>
                                <motion.div
                                    className="group flex items-center justify-center p-5 bg-bg border border-border-light rounded-xl transition-all duration-300 hover:border-border hover:shadow-md aspect-square cursor-pointer"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                </motion.div>
                            </Tooltip>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatIDo;
