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

const BUTTON_CURSOR_SRC =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2228%22%20height%3D%2229%22%20fill%3D%22none%22%20viewBox%3D%220%200%2028%2029%22%3E%20%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M6.84%2021.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1%202.1%200%200%201-.25-1.67%202.2%202.2%200%200%201%202.39-1.67c.85.18%201.63.6%202.25%201.2.43.41.82.85%201.18%201.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7%204.7%200%200%201%20.43-3.08c.58-.55%201.44-.7%202.17-.37a4.4%204.4%200%200%201%201.57%202.17c.43%201.07.72%202.19.86%203.33.27%201.67.79%204.1.8%204.6%200-.61-.11-1.91%200-2.5.12-.6.54-1.1%201.12-1.33.5-.15%201.02-.19%201.53-.1.52.1.98.4%201.29.83.38.98.6%202%20.63%203.05.04-.91.2-1.82.47-2.7.28-.39.68-.67%201.15-.8.55-.1%201.11-.1%201.66%200%20.46.15.85.44%201.14.82.35.88.56%201.82.63%202.77%200%20.23.12-.65.48-1.24a1.67%201.67%200%201%201%203.17%201.07v3.77c-.06.97-.2%201.94-.4%202.9-.29.85-.7%201.65-1.2%202.38-.8.9-1.48%201.92-1.98%203.02a6.67%206.67%200%200%200%20.03%203.2c-.68.07-1.37.07-2.05%200-.65-.1-1.45-1.4-1.67-1.8a.63.63%200%200%200-1.13%200c-.37.64-1.18%201.79-1.75%201.85-1.12.14-3.42%200-5.23%200%200%200%20.3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z%22%2F%3E%20%3Cpath%20stroke%3D%22%23000%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222.25%22%20d%3D%22M6.84%2021.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1%202.1%200%200%201-.25-1.67%202.2%202.2%200%200%201%202.39-1.67c.85.18%201.63.6%202.25%201.2.43.41.82.85%201.18%201.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7%204.7%200%200%201%20.43-3.08c.58-.55%201.44-.7%202.17-.37a4.4%204.4%200%200%201%201.57%202.17c.43%201.07.72%202.19.86%203.33.27%201.67.79%204.1.8%204.6%200-.61-.11-1.91%200-2.5.12-.6.54-1.1%201.12-1.33.5-.15%201.02-.19%201.53-.1.52.1.98.4%201.29.83.38.98.6%202%20.63%203.05.04-.91.2-1.82.47-2.7.28-.39.68-.67%201.15-.8.55-.1%201.11-.1%201.66%200%20.46.15.85.44%201.14.82.35.88.56%201.82.63%202.77%200%20.23.12-.65.48-1.24a1.67%201.67%200%201%201%203.17%201.07v3.77c-.06.97-.2%201.94-.4%202.9-.29.85-.7%201.65-1.2%202.38-.8.9-1.48%201.92-1.98%203.02a6.67%206.67%200%200%200%20.03%203.2c-.68.07-1.37.07-2.05%200-.65-.1-1.45-1.4-1.67-1.8a.63.63%200%200%200-1.13%200c-.37.64-1.18%201.79-1.75%201.85-1.12.14-3.42%200-5.23%200%200%200%20.3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z%22%20clip-rule%3D%22evenodd%22%2F%3E%20%3Cpath%20fill%3D%22%23000%22%20d%3D%22M20.65%2022.3v-6.24c0-.38-.31-.68-.7-.68-.37%200-.68.3-.68.68v6.23c0%20.38.3.68.69.68.38%200%20.69-.3.69-.68ZM17.2%2022.3l-.04-6.25a.67.67%200%201%200-1.34.01l.04%206.24a.67.67%200%201%200%201.34%200ZM12.37%2016.07l.04%206.22c0%20.38.3.68.67.68.37%200%20.67-.3.67-.68l-.04-6.23c0-.38-.3-.68-.67-.68-.37%200-.67.31-.67.69Z%22%2F%3E%20%3C%2Fsvg%3E";

export function CustomCursor() {
  const magnifyIconSize = MAGNIFY_ICON_SIZE;
  const magnifyPadding = MAGNIFY_PADDING;
  const magnifySize = Math.max(DOT_SIZE, magnifyIconSize + magnifyPadding * 2);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [displayedLabel, setDisplayedLabel] = useState<string | null>(null);
  const [magnifyMode, setMagnifyMode] = useState(false);
  const [figmaMode, setFigmaMode] = useState(false);
  const [codeMode, setCodeMode] = useState(false);
  const [buttonMode, setButtonMode] = useState(false);
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
      const buttonTarget = (e.target as HTMLElement).closest(
        "button, a, [role='button'], [data-cursor-pointer]",
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
      } else if (buttonTarget && !nativePointerTarget) {
        setButtonMode(true);
      } else if (labelTarget && !magnifyTarget) {
        const label = (labelTarget as HTMLElement).dataset.cursorLabel || null;
        setHoverLabel(label);
        if (label) setDisplayedLabel(label);
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
      const buttonTarget = (e.target as HTMLElement).closest(
        "button, a, [role='button'], [data-cursor-pointer]",
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
      if (buttonTarget) setButtonMode(false);
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

  const showDefault = !nativePointerMode && !codeMode && !figmaMode && !(buttonMode && !magnifyMode);

  return (
    <>
      {codeMode && !nativePointerMode && (
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
      )}

      {figmaMode && !nativePointerMode && (
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
      )}

      {(buttonMode && !nativePointerMode && !magnifyMode) && (
        <motion.div
          key="button"
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: mouseX,
            y: mouseY,
            width: 28,
            height: 29,
            translateX: "-30%",
            translateY: "-10%",
            opacity: visible ? 1 : 0,
          }}
        >
          <img src={BUTTON_CURSOR_SRC} alt="" width={28} height={29} />
        </motion.div>
      )}

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
          opacity: visible && showDefault ? 1 : 0,
        }}
      >
        <span
          ref={measureRef}
          className="absolute text-[13px] font-medium whitespace-nowrap invisible"
        >
          {displayedLabel}
        </span>
        <motion.span
          className={`${darkBg ? "text-[#1a1a1a]" : "text-white"} text-[13px] font-medium whitespace-nowrap select-none`}
          style={{ position: "absolute", left: PILL_PADDING_LEFT }}
          animate={{ opacity: hoverLabel ? 1 : 0 }}
          transition={{ duration: 0.15, delay: hoverLabel ? 0.05 : 0 }}
        >
          {displayedLabel}
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
    </>
  );
}
