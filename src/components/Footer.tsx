import { useState } from "react";
import footerBranding from "../assets/footer.svg";
import {
  PiLinkedinStroke,
  PiXComStroke,
  PiYoutubeStroke,
  PiCopyDefaultStroke,
  PiCopyCopiedStroke,
  PiCalendarDefaultStroke,
} from "./icons/pikaicons-react";

const EMAIL = "hello@hari.sh";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/htiruna",
    icon: PiLinkedinStroke,
  },
  {
    label: "X",
    href: "https://x.com/htiruna",
    icon: PiXComStroke,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@htiruna",
    icon: PiYoutubeStroke,
  },
];

const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <footer
      className="bg-[#141414] text-white sticky bottom-0 z-0"
      data-cursor-dark
    >
      <div className="flex flex-col max-w-[1200px] mx-auto px-8 max-sm:px-6 pt-56 pb-10 min-h-screen">
        {/* CTA section */}
        <div className="flex-1 flex flex-col items-center justify-end pb-16 text-center">
          <h2 className="font-display font-semibold text-[56px] leading-[1.1] tracking-[-0.03em] text-white mb-6 max-md:text-5xl max-sm:text-4xl">
            Let's connect
          </h2>
          <p className="font-display font-medium text-2xl text-[rgba(255,255,255,0.5)] max-w-[600px] mb-16 leading-[1.55]">
            Have a project in mind and need someone that does both design and
            engineering? I'd love to hear from you :)
          </p>

          {/* Email pill + Social icons row */}
          <div className="flex items-center gap-3 max-sm:flex-col">
            {/* Email pill with copy */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(EMAIL);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="flex items-center bg-white rounded-full pl-6 pr-2 py-2 gap-1"
              data-cursor-label="Copy email"
            >
              <span className="font-display font-semibold text-xl text-[#141414] tracking-[-0.02em]">
                {EMAIL}
              </span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#141414]/50">
                {isCopied ? (
                  <PiCopyCopiedStroke className="w-5 h-5" />
                ) : (
                  <PiCopyDefaultStroke className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Book a call */}
            <a
              href="https://cal.com/htiruna"
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
            className="w-full"
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end text-sm text-[rgba(255,255,255,0.3)]">
          <span>
            &copy; 2026 Harish Tirunahari &middot; Vibe coded with Claude Code &
            Antigravity
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
