import { motion } from "framer-motion";
import avatar from "../assets/avatar.webp";

const AboutMe = () => {
  return (
    <section className="pt-20 pb-32 bg-bg relative z-30">
      <div className="max-w-[500px] mx-auto px-6">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <img
            src={avatar}
            alt="Harish"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>

        {/* Heading */}
        <h2 className="font-serif font-bold text-[56px] leading-[1.1] tracking-[-0.01em] text-text mb-8 text-center max-md:text-5xl max-sm:text-4xl">
          Hi I'm Harish
        </h2>

        {/* Bio */}
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            I like to make things — apps, websites, brands, animations. I focus
            on consumer products because I spend a lot of time thinking about
            people.
          </p>

          <p className="text-base text-text-secondary leading-relaxed">
            I'm a design engineer based in Australia, originally from New
            Zealand. I spent over a decade as a software engineer shipping
            products across the full stack. Along the way I kept getting pulled
            toward design: how things look, how they feel, why certain interfaces
            just work. So I made the jump.
          </p>

          <p className="text-base text-text-secondary leading-relaxed">
            Now I do both. I design and build end-to-end, using AI tools to move
            fast without cutting corners. I've been reading and writing code long
            enough to understand what's happening under the hood, which means the
            AI helps me move quicker, not think less.
          </p>

          <p className="text-base text-text-secondary leading-relaxed">
            I work best with startups and small teams who care about craft and
            speed. If that sounds like you, I'd love to hear about what you're
            building.
          </p>
        </div>

        {/* Autograph placeholder */}
        <div className="mt-16 flex justify-center">
          <div className="w-48 h-16" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
