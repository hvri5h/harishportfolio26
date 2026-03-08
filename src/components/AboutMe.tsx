import me from "../assets/me.png";
import { motion, useReducedMotion } from "framer-motion";
import { getStaggerContainer, getStaggerItem } from "../lib/animations";

const AboutMe = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-32 bg-bg relative z-30">
      <div className="max-w-[575px] mx-auto px-6">
        {/* Avatar */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative w-[230px] h-[250px] max-sm:w-[250px] rounded-[42px] overflow-hidden bg-white/10">
            <img src={me} alt="Harish" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={getStaggerContainer()}
        >
          <motion.h2
            variants={getStaggerItem(shouldReduceMotion)}
            className="font-serif font-bold text-[56px] leading-[1.1] tracking-[-0.03em] text-text mb-12 text-center max-md:text-5xl max-sm:text-4xl"
          >
            Oh btw... I'm Harish
          </motion.h2>

          {/* Bio */}
          <div className="space-y-6 font-medium">
            {/* <p className="text-lg text-text-secondary leading-relaxed">
              I like to make things — apps, websites, brands, animations. I focus
              on consumer products because I spend a lot of time thinking about
              people.
            </p> */}

            <motion.p variants={getStaggerItem(shouldReduceMotion)} className="text-lg text-text-secondary leading-relaxed">
              I'm a Design Engineer based in Australia, originally from New
              Zealand. I spent over a decade as a software engineer shipping
              products across the full stack. Along the way I kept getting pulled
              toward design: how things look, how they feel, why certain
              interfaces just work. So I made the jump.
            </motion.p>

            <motion.p variants={getStaggerItem(shouldReduceMotion)} className="text-lg text-text-secondary leading-relaxed">
              Now I do both. I design and build end-to-end, using AI tools to move
              fast without cutting corners. I've been reading and writing code
              long enough to understand what's happening under the hood, which
              means the AI helps me move quicker, not think less.
            </motion.p>

            <motion.p variants={getStaggerItem(shouldReduceMotion)} className="text-lg text-text-secondary leading-relaxed">
              I work best with startups and small teams who care about craft and
              speed. If that sounds like you, I'd love to hear about what you're
              building.
            </motion.p>
          </div>
        </motion.div>

        {/* Animated signature */}
        <div className="mt-16 flex justify-center text-text">
          <motion.svg
            viewBox="0 0 600 280"
            className="w-[320px] h-[150px] max-sm:w-[280px] max-sm:h-[130px]"
            fill="none"
            aria-label="Handwritten signature saying Harish"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* H left vertical stroke */}
            <motion.path
              d="M 58 250 C 62 190, 80 100, 100 35"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
            {/* H right vertical + arish + trailing line */}
            <motion.path
              d="M 155 28 C 165 65, 150 130, 138 175 C 125 215, 112 242, 130 255 C 148 265, 175 242, 195 225 C 210 210, 222 205, 235 212 C 245 216, 250 204, 262 200 C 272 197, 274 214, 286 210 C 298 206, 308 194, 318 194 C 332 194, 322 214, 338 208 C 354 202, 378 138, 405 92 C 418 70, 402 158, 390 200 C 382 228, 410 212, 435 198 C 478 178, 530 160, 575 148"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{
                duration: 1.5,
                delay: shouldReduceMotion ? 0 : 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
            />
            {/* H crossbar - sweeping diagonal */}
            <motion.path
              d="M 55 210 C 95 180, 180 110, 280 70"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            />
            {/* i dot */}
            <motion.circle
              cx="280"
              cy="182"
              r="2.5"
              fill="currentColor"
              variants={{
                hidden: { scale: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                duration: 0.3,
                delay: shouldReduceMotion ? 0 : 1.5,
                ease: [0.23, 1, 0.32, 1],
              }}
            />
          </motion.svg>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
