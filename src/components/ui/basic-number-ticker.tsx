import {
  animate,
  type AnimationPlaybackControls,
  type ValueAnimationTransition,
} from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export type BasicNumberTickerRef = {
  startAnimation: () => void;
};

type BasicNumberTickerProps = {
  from: number;
  target: number;
  transition?: ValueAnimationTransition<number>;
  className?: string;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
};

const defaultTransition: ValueAnimationTransition<number> = {
  duration: 3,
  type: "tween",
  ease: "easeInOut",
};

export const BasicNumberTicker = forwardRef<
  BasicNumberTickerRef,
  BasicNumberTickerProps
>(
  (
    {
      from,
      target,
      transition = defaultTransition,
      className,
      onStart,
      onComplete,
      autoStart = true,
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(from);
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);
    const currentValueRef = useRef(from);

    const startAnimation = useCallback(() => {
      controlsRef.current?.stop();
      onStart?.();

      controlsRef.current = animate(currentValueRef.current, target, {
        ...transition,
        onUpdate: (latest) => {
          currentValueRef.current = latest;
          setDisplayValue(Math.round(latest));
        },
        onComplete: () => {
          currentValueRef.current = target;
          setDisplayValue(target);
          onComplete?.();
        },
      });
    }, [onComplete, onStart, target, transition]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation,
      }),
      [startAnimation],
    );

    useEffect(() => {
      currentValueRef.current = from;
      setDisplayValue(from);
    }, [from]);

    useEffect(() => {
      if (!autoStart) return;
      startAnimation();
      return () => {
        controlsRef.current?.stop();
      };
    }, [autoStart, startAnimation]);

    return (
      <span className={cn("tabular-nums tracking-tight", className)}>
        {displayValue}
      </span>
    );
  },
);

BasicNumberTicker.displayName = "BasicNumberTicker";
