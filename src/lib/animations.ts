import type { Variants } from "framer-motion";

export const getStaggerContainer = (): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
});

export const getStaggerItem = (shouldReduceMotion: boolean): Variants => ({
  hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.165, 0.84, 0.44, 1], // ease-out-quart
    },
  },
});
