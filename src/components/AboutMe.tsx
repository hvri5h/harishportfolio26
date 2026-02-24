import { motion } from "framer-motion";
import avatar from "../assets/avatar.webp";

const AboutMe = () => {
  return (
    <section id="contact" className="pt-20 pb-48 bg-bg relative z-30">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.h2 className="font-display font-black text-[60px] leading-[1.1] tracking-[-0.01em] text-text mb-12 max-md:text-5xl max-sm:text-4xl">
          Who I am
        </motion.h2>

        <motion.div className="mb-8 flex justify-center">
          <img
            src={avatar}
            alt="Harish"
            className="w-32 h-32 rounded-full object-cover"
          />
        </motion.div>

        <motion.div className="space-y-6">
          <p className="font-display font-medium text-xl text-text-secondary leading-relaxed max-md:text-xl max-w-[600px] mx-auto">
            I'm Harish — a design engineer based in Australia, originally from
            New Zealand.
          </p>

          <p className="font-sans text-xl text-text-secondary leading-relaxed max-w-[600px] mx-auto max-md:text-lg">
            I spent over a decade as a software engineer shipping products
            across the full stack. Along the way I kept getting pulled toward
            design: how things look, how they feel, why certain interfaces just
            work. So I made the jump.
          </p>

          <p className="font-sans text-xl text-text-secondary leading-relaxed max-w-[600px] mx-auto max-md:text-lg">
            Now I do both. I design and build end-to-end, using AI tools to move
            fast without cutting corners. I've been reading and writing code
            long enough to understand what's happening under the hood, which
            means the AI helps me move quicker, not think less.
          </p>

          <p className="font-sans text-xl text-text-secondary leading-relaxed max-w-[600px] mx-auto max-md:text-lg">
            I work best with startups and small teams who care about craft and
            speed. If that sounds like you, I'd love to hear about what you're
            building.
          </p>
        </motion.div>

        <motion.div className="mt-12">
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
