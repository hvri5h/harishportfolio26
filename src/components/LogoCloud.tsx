import canonLogo from "../assets/logos/canon.png";
import ljhookerLogo from "../assets/logos/ljhooker.png";
import nearmapLogo from "../assets/logos/nearmap.png";
import optusLogo from "../assets/logos/optus.png";
import qantasLogo from "../assets/logos/qantas.png";
import reachoutLogo from "../assets/logos/reachout.png";

const logos = [
  { src: qantasLogo, alt: "Qantas" },
  { src: optusLogo, alt: "Optus" },
  { src: canonLogo, alt: "Canon" },
  { src: nearmapLogo, alt: "Nearmap" },
  { src: ljhookerLogo, alt: "LJ Hooker" },
  { src: reachoutLogo, alt: "ReachOut" },
];

export default function LogoCloud() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <p className="text-center text-sm text-text-tertiary mb-8">
          Shipped products for
        </p>
        <div className="flex items-center justify-center gap-x-10 gap-y-6 flex-wrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              className="h-6 w-auto object-contain opacity-50 brightness-0"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
