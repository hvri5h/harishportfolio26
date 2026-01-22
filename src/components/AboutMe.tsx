import { motion } from 'framer-motion';
import avatar from '../assets/avatar.jpg';

const AboutMe = () => {
    return (
        <section id="contact" className="pt-20 pb-48 bg-bg relative z-30">
            <div className="max-w-[800px] mx-auto px-6 text-center">
                <motion.h2
                    className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-12 max-md:text-5xl max-sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Who I am
                </motion.h2>

                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <img
                        src={avatar}
                        alt="Harish"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p className="font-display font-medium text-xl text-text-secondary leading-relaxed max-md:text-xl max-w-[500px] mx-auto">
                    I'm Harish — an Independent Design Engineer originally from New Zealand, but currently based in Australia.
                    </p>

                    <p className="font-sans text-xl text-text-secondary leading-relaxed max-w-[600px] mx-auto max-md:text-lg">
                    I work best with startups and agencies who value craft and momentum. If you're looking for someone who can own both design and development and ship fast without compromising quality, I'd love to hear about your project.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center justify-center px-10 py-4 bg-text text-white rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-black shadow-lg hover:shadow-xl"
                    >
                        Get in touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
