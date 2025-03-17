"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import styles from "./floatingBar.module.scss";
import { useBreakpoint } from "@/context/BreakpointContext";

const FloatingBar: React.FC = () => {
  const breakpoint = useBreakpoint();
  const barRef = useRef<SVGRectElement>(null);
  const floatingBoxRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const floatingTweenRef = useRef<gsap.core.Tween | null>(null);

  const [dimensions, setDimensions] = useState({
    barHeight: 0,
    boxSize: 0,
    barWidth: 0,
    barX: 0,
  });

  const animateFloatingBox = useMemo(
    () => () => {
      const { barWidth, barHeight, boxSize, barX } = dimensions;
      const box = floatingBoxRef.current;
      if (!box) return;

      if (floatingTweenRef.current) floatingTweenRef.current.kill();

      // Floating on the left edge of bar
      const minX = 0;
      const maxX = barX + barWidth * 0.5 - boxSize;

      const minY = barHeight * 0.1;
      const maxY = barHeight - boxSize * 0.5;

      const randomX = gsap.utils.random(minX, maxX);
      const randomY = gsap.utils.random(minY, maxY);

      floatingTweenRef.current = gsap.to(box, {
        attr: { x: randomX, y: randomY },
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
        onComplete: animateFloatingBox,
      });
    },
    [dimensions]
  );

  useEffect(() => {
    const bar = barRef.current;
    const box = floatingBoxRef.current;
    const svg = svgRef.current;

    if (!bar || !box || !svg) return;

    const updateDimensions = () => {
      if (floatingTweenRef.current) floatingTweenRef.current.kill();

      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;
      const barWidth = svgWidth;
      const barHeight = svgHeight;
      const boxSize = barWidth * 0.4;
      const barX = svgWidth * 0.2;

      setDimensions({
        barHeight,
        barWidth,
        boxSize,
        barX,
      });

      // Floating box initial position (left edge)

      gsap.set(bar, {
        attr: {
          width: barWidth,
          height: barHeight,
          x: "20%",
          y: 0,
        },
      });
      const boxInitX = gsap.utils.random(0, barX + barWidth * 0.5 - boxSize);
      const boxInitY = gsap.utils.random(
        barHeight * 0.1,
        barHeight - boxSize * 0.5
      );

      gsap.set(box, {
        attr: { width: boxSize, height: boxSize, x: boxInitX, y: boxInitY },
      });
    };

    updateDimensions();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (floatingTweenRef.current) floatingTweenRef.current.kill();
    };
  }, [breakpoint]);

  useEffect(() => {
    if (dimensions.boxSize > 0) {
      animateFloatingBox();
    }
  }, [dimensions, animateFloatingBox]);

  const SVGFilter: React.FC = React.memo(() => (
    <defs>
      <filter id="subtract-bar" x="0" y="0" width="100%" height="100%">
        <feImage xlinkHref="#bar" result="bar" />
        <feImage xlinkHref="#floatingBox" result="box" />

        <feComposite in="bar" in2="box" operator="out" result="barFinal" />
        <feComposite in="box" in2="bar" operator="out" result="boxFinal" />

        <feMerge>
          <feMergeNode in="barFinal" />
          <feMergeNode in="boxFinal" />
        </feMerge>
      </filter>
    </defs>
  ));
  SVGFilter.displayName = "SVGFilter";

  return (
    <div className={styles.floatingBar}>
      <svg className={styles.floatingBar__svg} ref={svgRef}>
        <SVGFilter />
        <g filter="url(#subtract-bar)">
          <rect id="bar" ref={barRef} fill="var(--color-primary)" />
          <rect
            id="floatingBox"
            ref={floatingBoxRef}
            fill="var(--color-primary)"
          />
        </g>
      </svg>
    </div>
  );
};

export default React.memo(FloatingBar);
