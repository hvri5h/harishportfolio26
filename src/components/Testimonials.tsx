import { useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { testimonials } from '../data/portfolio';

const Testimonials = () => {
    // Triple the testimonials to ensure smooth infinite loop
    const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

    // Animation state
    const baseX = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Adjust speed: Normal = 0.05, Hover = 0.005 (10x slower)
    const baseSpeed = 0.02;
    const hoverSpeed = 0.005;

    useAnimationFrame((_, delta) => {
        let moveBy = baseSpeed * (delta / 16); // Normalise for 60fps
        if (isHovered) {
            moveBy = hoverSpeed * (delta / 16);
        }

        // Move left
        baseX.set(baseX.get() - moveBy);

        // Reset when scrolled past 25% (one full set of testimonials in the 4x array)
        if (baseX.get() <= -25) {
            baseX.set(0);
        }
    });

    return (
        <section className="py-32 bg-bg relative z-30 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-8 max-sm:px-6 mb-24 text-center">
                <motion.h2
                    className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-6 max-md:text-5xl max-sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Who I've worked with
                </motion.h2>
                <motion.p
                    className="font-display font-medium text-2xl text-text-secondary max-w-[600px] mx-auto max-md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Some important people saying<br />nice things about me.
                </motion.p>
            </div>

            <div className="flex overflow-hidden w-full relative">
                {/* Gradient masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-8 px-4"
                    style={{
                        x: useTransform(baseX, (v) => `${v}%`),
                        minWidth: "fit-content"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {marqueeTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.author}-${index}`}
                            className="w-[400px] shrink-0 p-10 bg-[#f4f4f5] rounded-[24px] flex flex-col justify-between h-[360px] hover:shadow-lg transition-shadow duration-300"
                        >
                            <p className="text-[1.125rem] leading-[1.6] text-text-secondary font-medium">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-4 mt-8">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full object-cover shadow-sm bg-white"
                                />
                                <div className="text-left">
                                    <h4 className="text-[1rem] font-bold text-text leading-tight">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-[0.875rem] text-text-tertiary">
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
