import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import footerBranding from "../assets/footer.svg";
import {
  PiLinkedinStroke,
  PiXComStroke,
  PiCopyDefaultStroke,
  PiCheckTickSingleStroke,
  PiCalendarDefaultStroke,
} from "./icons/pikaicons-react";

const EMAIL = "htiruna@gmail.com";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/htiruna",
    icon: PiLinkedinStroke,
  },
  {
    label: "X",
    href: "https://x.com/hvri5h",
    icon: PiXComStroke,
  },
  // {
  //   label: "YouTube",
  //   href: "https://youtube.com/@hvri5h",
  //   icon: PiYoutubeStroke,
  // },
];

const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <footer
      className="bg-[#141414] text-white"
      data-cursor-dark
    >
      <div className="flex flex-col max-w-[1200px] mx-auto px-8 max-sm:px-6 pt-32 md:pt-56 pb-10">
        {/* CTA section */}
        <div className="flex flex-col items-center pb-16 text-center">
          <h2 className="font-display font-semibold text-[56px] leading-[1.1] tracking-[-0.03em] text-white mb-6 max-md:text-5xl max-sm:text-4xl">
            Let's connect
          </h2>
          <p className="font-display font-medium text-2xl max-md:text-xl text-[rgba(255,255,255,0.5)] max-w-[400px] mb-16 leading-[1.55]">
            Have a project in mind that could use my help? I'd love to hear from you :)
          </p>

          {/* Email pill + Social icons row */}
          <div className="flex items-center gap-3 max-sm:flex-col max-sm:gap-4">
            {/* Email pill with copy */}
            <button
              type="button"
              onClick={async () => {
                try {
                  if (navigator?.clipboard?.writeText) {
                    await navigator.clipboard.writeText(EMAIL);
                  }
                } catch (err) {
                  console.error("Failed to copy:", err);
                }
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="flex items-center bg-white rounded-full pl-6 pr-2 py-2 gap-1 relative z-10"
              data-cursor-label="Copy email"
            >
              <span className="font-display font-semibold text-xl text-[#141414] tracking-[-0.02em]">
                {EMAIL}
              </span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#141414]/50 relative">
                <AnimatePresence initial={false}>
                  {isCopied ? (
                    <motion.div
                      key="check"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    >
                      <PiCheckTickSingleStroke className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    >
                      <PiCopyDefaultStroke className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Book a call */}
            <a
              href="https://cal.com/htiruna/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 h-[56px] px-6 rounded-full border border-[rgba(255,255,255,0.2)] font-display font-medium text-lg text-[rgba(255,255,255,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.5)] transition-colors"
            >
              <PiCalendarDefaultStroke className="w-5 h-5" />
              Book a call
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(255,255,255,0.5)] transition-colors"
                  title={s.label}
                >
                  <s.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Watermark image with dark fade overlay */}
        <div className="relative select-none pointer-events-none mt-6 mb-4 overflow-hidden">
          <img
            src={footerBranding}
            alt=""
            className="w-full max-sm:w-[140%] max-sm:mx-auto max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2"
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end text-sm text-[rgba(255,255,255,0.3)] max-sm:flex-col max-sm:items-center max-sm:gap-0 max-sm:text-center max-sm:leading-relaxed">
          <span>
            &copy; 2026 Harish Tirunahari
            <span className="max-sm:hidden"> &middot; </span>
            <br className="sm:hidden" />
            Vibe coded with Claude Code & Antigravity
          </span>
          <span>
            Have a nice{" "}
            {new Date().toLocaleDateString(undefined, { weekday: "long" })} :)
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
