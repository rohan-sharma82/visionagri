// This file contains the necessary code for the Farmer-to-AI animation.
// You can copy and paste this into your own project.
// Make sure you have `framer-motion` and `clsx` (or a similar class utility) installed.

"use client";

import React, {
  CSSProperties,
  ForwardedRef,
  RefObject,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image"; // Assuming you use next/image

// Utility function (like clsx or tailwind-merge)
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

// 1. The AnimatedBeam component
// Original path: src/components/magicui/animated-beam.tsx

interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>; // Container reference for coordinates
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


// 2. The Animation Container and its components
// Original path: src/app/page.tsx

// Helper component for the icons
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-28 items-center justify-center rounded-full border-2 bg-white p-0 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// The icons themselves (replace with your own images or icons)
const Icons = {
  openai: () => (
    <Image
      src="/ai photo.png" // Replace with your image path
      alt="AI Icon"
      width={60}
      height={60}
      className="h-full w-full rounded-full object-cover"
    />
  ),
  user: () => (
    <Image
      src="/images/farmers.png" // Replace with your image path
      alt="Farmer Icon"
      width={60}
      height={60}
      className="h-full w-full rounded-full object-cover"
    />
  ),
};

// The main component that puts it all together
export default function AnimationComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const aiIconRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-gray-100 flex justify-center p-4 md:p-8 pt-16 shadow-inner"
    >
        <div className="flex w-full items-stretch justify-between gap-10 max-w-2xl">
          <div className="flex flex-col justify-start items-center">
             <Circle ref={userIconRef}>
              <Icons.user />
            </Circle>
          </div>
          <div className="flex flex-col justify-start items-center">
            <Circle ref={aiIconRef}>
              <Icons.openai />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={userIconRef}
          toRef={aiIconRef}
        />
    </section>
  );
}
