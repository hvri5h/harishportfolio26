import canonLogo from '../assets/logos/canon.png';
import ljhookerLogo from '../assets/logos/ljhooker.png';
import nearmapLogo from '../assets/logos/nearmap.png';
import optusLogo from '../assets/logos/optus.png';
import qantasLogo from '../assets/logos/qantas.png';
import reachoutLogo from '../assets/logos/reachout.png';

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

const logos: Logo[] = [
    { src: qantasLogo, alt: 'Qantas Logo' },
    { src: optusLogo, alt: 'Optus Logo' },
    { src: canonLogo, alt: 'Canon Logo' },
    { src: nearmapLogo, alt: 'Nearmap Logo' },
    { src: ljhookerLogo, alt: 'LJ Hooker Logo' },
    { src: reachoutLogo, alt: 'ReachOut Logo' },
    // Duplicate logos to ensure we have enough content to scroll smoothly if few logos
    { src: qantasLogo, alt: 'Qantas Logo' },
    { src: optusLogo, alt: 'Optus Logo' },
    { src: canonLogo, alt: 'Canon Logo' },
    { src: nearmapLogo, alt: 'Nearmap Logo' },
    { src: ljhookerLogo, alt: 'LJ Hooker Logo' },
    { src: reachoutLogo, alt: 'ReachOut Logo' },
];

export default function LogoCloud() {

    return (
        <section className="bg-bg py-24 relative z-30">
            <div className="mx-auto max-w-[1200px] px-6">
                <h2 className="text-center text-[clamp(1.5rem,3vw,1.5rem)] font-semibold leading-[1.3] text-text-secondary mb-16">
                    For 12+ years, I've shipped digital products at every scale and phase.
                </h2>
                <div className="mx-auto grid grid-cols-3 items-center justify-items-center gap-x-16 gap-y-12 max-w-3xl opacity-60 hover:opacity-100 transition-opacity duration-300">
                    {logos.slice(0, 6).map((logo, index) => (
                        <img
                            key={index}
                            className="h-10 max-w-[160px] w-auto object-contain brightness-0"
                            src={logo.src}
                            alt={logo.alt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
