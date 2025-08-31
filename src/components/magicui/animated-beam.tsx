
"use client";

import React, {
  CSSProperties,
  ForwardedRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useAnimation } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>; // Contenedor de referencia para las coordenadas
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeatDelay?: number;
}

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  delay = 0,
  duration = 1,
  repeatDelay = 0,
}: AnimatedBeamProps) => {
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  const controls = useAnimation();

  useEffect(() => {
    const from = fromRef.current;
    const to = toRef.current;
    const container = containerRef.current;

    if (from && to && container) {
      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;

      setPathD(
        `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`,
      );
      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    }
  }, [fromRef, toRef, containerRef, curvature]);

  useEffect(() => {
    controls.start({
      pathLength: [0, 1],
      transition: {
        delay,
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: repeatDelay,
      },
    });
  }, [duration, delay, repeatDelay, controls]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu",
        className,
      )}
      style={{
        width: "100%",
        height: "100%",
      }}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#gradient-${gradientStartColor.replace(
          "#",
          "",
        )}-${gradientStopColor.replace("#", "")})`}
        strokeLinecap="round"
        initial={{ pathLength: reverse ? 1 : 0 }}
        animate={controls}
      />
      <defs>
        <motion.linearGradient
          id={`gradient-${gradientStartColor.replace(
            "#",
            "",
          )}-${gradientStopColor.replace("#", "")}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop stopColor={gradientStartColor} />
          <stop offset="1" stopColor={gradientStopColor} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
