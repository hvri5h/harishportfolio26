import footerBranding from "../assets/footer.svg";

const EMAIL = "hello@hari.sh";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/htiruna",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/htiruna",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@htiruna",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#141414] text-white sticky bottom-0 z-0"
      data-cursor-dark
    >
      <div className="flex flex-col max-w-[1200px] mx-auto px-8 max-sm:px-6 pt-56 pb-10 min-h-screen">
        {/* CTA section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="font-display font-semibold text-[56px] leading-[1.1] tracking-[-0.01em] text-white mb-6 max-md:text-5xl max-sm:text-4xl">
            Let's connect
          </h2>
          <p className="font-display text-2xl text-[rgba(255,255,255,0.5)] max-w-[500px] mb-16 leading-[1.55]">
            Have a project in mind or need a design + engineering partner? I'd
            love to hear from you.
          </p>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-[clamp(28px,5vw,56px)] leading-[1.1] tracking-[-0.02em] text-white hover:text-white/80 transition-colors mb-10"
          >
            {EMAIL}
          </a>

          {/* Social icons */}
          <div className="flex items-center">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Watermark image — in flow so nothing overlaps */}
        <div className="select-none pointer-events-none mt-6 mb-4">
          <img
            src={footerBranding}
            alt=""
            className="w-full"
            draggable={false}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end text-sm text-[rgba(255,255,255,0.3)]">
          <span>
            &copy; 2026 Harish Tirunahari &middot; Vibe coded using Claude Code
            & Antigravity
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
