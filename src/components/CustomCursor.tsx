import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 20;
const PILL_HEIGHT = 40;
const PILL_PADDING_X = 20;
const FIGMA_SIZE = 48;

const FIGMA_CURSOR_SRC =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='26'%20fill='none'%20viewBox='0%200%2024%2026'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.69%202.69a2.357%202.357%200%200%201%202.495-.54L21.47%208.632a2.357%202.357%200%200%201-.255%204.494l-7.271%201.818-1.818%207.27a2.357%202.357%200%200%201-4.494.256L1.15%205.185a2.357%202.357%200%200%201%20.54-2.495Z'%20fill='%23fff'/%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.633%203.622A.786.786%200%200%200%202.62%204.633L9.103%2021.92a.786.786%200%200%200%201.498-.086l2.047-8.185%208.185-2.046a.785.785%200%200%200%20.086-1.498L3.633%203.622Z'%20fill='%23010101'/%3E%3C/svg%3E";

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [figmaMode, setFigmaMode] = useState(false);
  const [codeMode, setCodeMode] = useState(false);
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
    [visible, mouseX, mouseY],
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
      const labelTarget = (e.target as HTMLElement).closest(
        "[data-cursor-label]",
      );
      const figmaTarget = (e.target as HTMLElement).closest(
        "[data-cursor-figma]",
      );
      const codeTarget = (e.target as HTMLElement).closest(
        "[data-cursor-code]",
      );
      if (figmaTarget) {
        setFigmaMode(true);
      } else if (codeTarget) {
        setCodeMode(true);
      } else if (labelTarget) {
        setHoverLabel((labelTarget as HTMLElement).dataset.cursorLabel || null);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const labelTarget = (e.target as HTMLElement).closest(
        "[data-cursor-label]",
      );
      const figmaTarget = (e.target as HTMLElement).closest(
        "[data-cursor-figma]",
      );
      const codeTarget = (e.target as HTMLElement).closest(
        "[data-cursor-code]",
      );
      if (figmaTarget) setFigmaMode(false);
      if (codeTarget) setCodeMode(false);
      if (labelTarget) setHoverLabel(null);
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

  if (codeMode) {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-[10px] h-[26px] bg-green-500 animate-[terminalBlink_1s_step-end_infinite]" />
      </motion.div>
    );
  }

  if (figmaMode) {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          width: FIGMA_SIZE,
          height: FIGMA_SIZE,
          opacity: visible ? 1 : 0,
        }}
      >
        <img src={FIGMA_CURSOR_SRC} alt="" width={24} height={26} />
      </motion.div>
    );
  }

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
