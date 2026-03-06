import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PiSearchDefaultZoomInStroke } from "./icons/pikaicons-react";

const DOT_SIZE = 20;
const PILL_HEIGHT = 40;
const PILL_PADDING_LEFT = 20;
const PILL_PADDING_RIGHT = 20;
const FIGMA_SIZE = 48;
const MAGNIFY_ICON_SIZE = 30;
const MAGNIFY_PADDING = 16;

const FIGMA_CURSOR_SRC =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='26'%20fill='none'%20viewBox='0%200%2024%2026'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.69%202.69a2.357%202.357%200%200%201%202.495-.54L21.47%208.632a2.357%202.357%200%200%201-.255%204.494l-7.271%201.818-1.818%207.27a2.357%202.357%200%200%201-4.494.256L1.15%205.185a2.357%202.357%200%200%201%20.54-2.495Z'%20fill='%23fff'/%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.633%203.622A.786.786%200%200%200%202.62%204.633L9.103%2021.92a.786.786%200%200%200%201.498-.086l2.047-8.185%208.185-2.046a.785.785%200%200%200%20.086-1.498L3.633%203.622Z'%20fill='%23010101'/%3E%3C/svg%3E";

export function CustomCursor() {
  const magnifyIconSize = MAGNIFY_ICON_SIZE;
  const magnifyPadding = MAGNIFY_PADDING;
  const magnifySize = Math.max(DOT_SIZE, magnifyIconSize + magnifyPadding * 2);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [magnifyMode, setMagnifyMode] = useState(false);
  const [figmaMode, setFigmaMode] = useState(false);
  const [codeMode, setCodeMode] = useState(false);
  const [nativePointerMode, setNativePointerMode] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pillWidth, setPillWidth] = useState(DOT_SIZE);
  const isExpanded = hoverLabel !== null || magnifyMode;
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
      const magnifyTarget = (e.target as HTMLElement).closest(
        "[data-cursor-magnify]",
      );
      const labelTarget = (e.target as HTMLElement).closest(
        "[data-cursor-label]",
      );
      const figmaTarget = (e.target as HTMLElement).closest(
        "[data-cursor-figma]",
      );
      const codeTarget = (e.target as HTMLElement).closest(
        "[data-cursor-code]",
      );
      const nativePointerTarget = (e.target as HTMLElement).closest(
        "[data-cursor-native-pointer]",
      );
      const darkTarget = (e.target as HTMLElement).closest(
        "[data-cursor-dark]",
      );
      if (nativePointerTarget) setNativePointerMode(true);
      if (darkTarget) setDarkBg(true);
      if (magnifyTarget) {
        setMagnifyMode(true);
        setHoverLabel(null);
      }
      if (figmaTarget) {
        setFigmaMode(true);
      } else if (codeTarget) {
        setCodeMode(true);
      } else if (labelTarget && !magnifyTarget) {
        setHoverLabel((labelTarget as HTMLElement).dataset.cursorLabel || null);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const magnifyTarget = (e.target as HTMLElement).closest(
        "[data-cursor-magnify]",
      );
      const labelTarget = (e.target as HTMLElement).closest(
        "[data-cursor-label]",
      );
      const figmaTarget = (e.target as HTMLElement).closest(
        "[data-cursor-figma]",
      );
      const codeTarget = (e.target as HTMLElement).closest(
        "[data-cursor-code]",
      );
      const nativePointerTarget = (e.target as HTMLElement).closest(
        "[data-cursor-native-pointer]",
      );
      const darkTarget = (e.target as HTMLElement).closest(
        "[data-cursor-dark]",
      );
      if (nativePointerTarget) setNativePointerMode(false);
      if (darkTarget) setDarkBg(false);
      if (magnifyTarget) setMagnifyMode(false);
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
      setPillWidth(textWidth + PILL_PADDING_LEFT + PILL_PADDING_RIGHT);
    }
    if (magnifyMode) {
      width.set(magnifySize);
      height.set(magnifySize);
      return;
    }
    width.set(isExpanded ? pillWidth : DOT_SIZE);
    height.set(isExpanded ? PILL_HEIGHT : DOT_SIZE);
  }, [
    isExpanded,
    hoverLabel,
    magnifyMode,
    width,
    height,
    pillWidth,
    magnifySize,
  ]);

  if (nativePointerMode) {
    return null;
  }

  if (codeMode) {
    return (
      <motion.div
        key="code"
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center gap-1.5"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0
        }}
      >
        <span className="text-[#0EE725] font-mono text-[28px] font-black leading-none mt-[2px]">
          &gt;
        </span>
        <div
          style={{ animation: "terminalBlink 1s infinite" }}
          className="w-[12px] h-[24px] bg-[#0EE725]"
        />
      </motion.div>
    );
  }

  if (figmaMode) {
    return (
      <motion.div
        key="figma"
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
      key="default"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        width,
        height,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: darkBg ? "#ffffff" : "#1a1a1a",
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
        className={`${darkBg ? "text-[#1a1a1a]" : "text-white"} text-[13px] font-medium whitespace-nowrap select-none`}
        style={{ position: "absolute", left: PILL_PADDING_LEFT }}
        animate={{ opacity: hoverLabel ? 1 : 0 }}
        transition={{ duration: 0.15, delay: hoverLabel ? 0.05 : 0 }}
      >
        {hoverLabel}
      </motion.span>
      <motion.div
        aria-hidden="true"
        className="text-white flex items-center justify-center"
        style={{
          width: magnifyIconSize,
          height: magnifyIconSize,
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: magnifyMode ? 1 : 0,
          scale: magnifyMode ? 1 : 0.8,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <PiSearchDefaultZoomInStroke className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
