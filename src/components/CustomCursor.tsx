import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 20;
const PILL_HEIGHT = 40;
const PILL_PADDING_X = 20;

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pillWidth, setPillWidth] = useState(DOT_SIZE);
  const isExpanded = hoverLabel !== null;
  const measureRef = useRef<HTMLSpanElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const width = useSpring(DOT_SIZE, { stiffness: 400, damping: 30 });
  const height = useSpring(DOT_SIZE, { stiffness: 400, damping: 30 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [visible, mouseX, mouseY]
  );

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
    };
  }, [onMouseMove]);

  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor-label]");
      if (target) {
        setHoverLabel((target as HTMLElement).dataset.cursorLabel || null);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor-label]");
      if (target) setHoverLabel(null);
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  useEffect(() => {
    if (isExpanded && measureRef.current) {
      const textWidth = measureRef.current.offsetWidth;
      setPillWidth(textWidth + PILL_PADDING_X * 2);
    }
    width.set(isExpanded ? pillWidth : DOT_SIZE);
    height.set(isExpanded ? PILL_HEIGHT : DOT_SIZE);
  }, [isExpanded, hoverLabel, width, height, pillWidth]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        width,
        height,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "#1a1a1a",
        opacity: visible ? 1 : 0,
      }}
    >
      <span
        ref={measureRef}
        className="absolute text-[13px] font-medium whitespace-nowrap invisible"
      >
        {hoverLabel}
      </span>
      <motion.span
        className="text-white text-[13px] font-medium whitespace-nowrap select-none"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.15, delay: isExpanded ? 0.05 : 0 }}
      >
        {hoverLabel}
      </motion.span>
    </motion.div>
  );
}
