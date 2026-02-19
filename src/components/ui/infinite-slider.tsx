'use client';

import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface InfiniteSliderProps {
    children: React.ReactNode;
    gap?: number;
    reverse?: boolean;
    speed?: number; // pixels per second
    speedOnHover?: number;
    className?: string;
}

export function InfiniteSlider({
    children,
    gap = 20,
    reverse = false,
    speed = 100,
    speedOnHover, // default to speed if not provided?
    className,
}: InfiniteSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            // Measure the full width of the double-rendered content
            const measure = () => {
                if (containerRef.current) {
                    setContentWidth(containerRef.current.scrollWidth);
                }
            };
            measure();
            window.addEventListener('resize', measure);
            return () => window.removeEventListener('resize', measure);
        }
    }, []); // Run once on mount

    const currentSpeed = isHovered && speedOnHover ? speedOnHover : speed;
    // duration = distance / speed. Distance is half the total width (one copy).
    const duration = contentWidth > 0 ? (contentWidth / 2) / currentSpeed : 20;

    return (
        <div
            className={cn('overflow-hidden', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="flex w-max"
                style={{ gap: `${gap}px` }}
                ref={containerRef}
                animate={{
                    x: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
                }}
                transition={{
                    duration: duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}
