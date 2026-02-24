import { useRef, useEffect, useState } from "react";
import canonLogo from "../assets/logos/canon.webp";
import ljhookerLogo from "../assets/logos/ljhooker.webp";
import nearmapLogo from "../assets/logos/nearmap.webp";
import optusLogo from "../assets/logos/optus.webp";
import qantasLogo from "../assets/logos/qantas.webp";
import reachoutLogo from "../assets/logos/reachout.webp";

const logos = [
  { src: qantasLogo, alt: "Qantas", className: "h-4 md:h-5", href: "https://qantas.com" },
  { src: optusLogo, alt: "Optus", className: "h-3.5 md:h-[18px]", href: "https://optus.com.au" },
  { src: canonLogo, alt: "Canon", className: "h-4 md:h-5", href: "https://canon.com.au" },
  { src: nearmapLogo, alt: "Nearmap", className: "h-4 md:h-[26px]", href: "https://nearmap.com.au" },
  { src: ljhookerLogo, alt: "LJ Hooker", className: "h-5 md:h-7", href: "https://ljhooker.com.au" },
  { src: reachoutLogo, alt: "ReachOut", className: "h-[18px] md:h-6", href: "https://reachout.com.au" },
];

function LogoItem({ logo }: { logo: typeof logos[number] }) {
  const imageElement = (
    <img
      className={`${logo.className} w-auto object-contain opacity-40 brightness-0 transition-opacity duration-300 hover:opacity-100 flex-shrink-0 transform-gpu cursor-pointer`}
      src={logo.src}
      alt={logo.alt}
    />
  );

  return logo.href ? (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center flex-shrink-0"
    >
      {imageElement}
    </a>
  ) : (
    <div className="flex items-center justify-center flex-shrink-0">
      {imageElement}
    </div>
  );
}

function LogoSet() {
  return (
    <>
      {logos.map((logo, index) => (
        <LogoItem key={index} logo={logo} />
      ))}
    </>
  );
}

export default function LogoCloud() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (!setRef.current) return;

    const measure = () => {
      if (setRef.current) {
        setScrollWidth(setRef.current.offsetWidth);
      }
    };

    // Wait for images to load before measuring
    const images = setRef.current.querySelectorAll("img");
    let loaded = 0;
    const total = images.length;

    if (total === 0) {
      measure();
      return;
    }

    const onLoad = () => {
      loaded++;
      if (loaded >= total) measure();
    };

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", onLoad);
      }
    });

    if (loaded >= total) measure();

    // Re-measure on resize
    const observer = new ResizeObserver(measure);
    observer.observe(setRef.current);

    return () => {
      observer.disconnect();
      images.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden mt-24 pb-2">
      <div
        className="w-full relative flex items-center max-w-[800px] mx-auto overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center will-change-transform hover:[animation-play-state:paused]"
          style={{
            animation: scrollWidth ? `ticker 30s linear infinite` : 'none',
            ['--scroll-width' as string]: `-${scrollWidth}px`,
          }}
        >
          <div ref={setRef} className="flex items-center gap-x-12 md:gap-x-16 pr-12 md:pr-16 flex-shrink-0">
            <LogoSet />
          </div>
          <div className="flex items-center gap-x-12 md:gap-x-16 pr-12 md:pr-16 flex-shrink-0">
            <LogoSet />
          </div>
        </div>
      </div>
    </div>
  );
}
