"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import styles from "./floatingRect.module.scss";
import SVGFilter from "./SVGFilter";

type Area = {
  minXPercent: number;
  maxXPercent: number;
  minYPercent: number;
  maxYPercent: number;
};
type RectConfig = {
  id: string;
  sizePercent: number;
  color?: string;
  area: Area;
};

type FloatingRectProps = {
  fixedRectSize: {
    widthPercent: number;
    heightPercent: number;
    xPercent: number;
    yPercent: number;
  };
  rects: RectConfig[];
};

const FloatingRect: React.FC<FloatingRectProps> = ({
  fixedRectSize,
  rects,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const fixedRectRef = useRef<SVGRectElement>(null);
  const rectRefs = useRef<Map<string, SVGRectElement>>(new Map());
  const tweenRefs = useRef<Map<string, gsap.core.Tween | null>>(new Map());

  const animateRect = useCallback((id: string, config: RectConfig) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = rectRefs.current.get(id);
    if (!rect) return;

    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;
    const area = config.area;

    // Ensure min is less than max
    const minX =
      (Math.min(area.minXPercent, area.maxXPercent) / 100) * svgWidth;
    const maxX =
      (Math.max(area.minXPercent, area.maxXPercent) / 100) * svgWidth;
    const minY =
      (Math.min(area.minYPercent, area.maxYPercent) / 100) * svgHeight;
    const maxY =
      (Math.max(area.minYPercent, area.maxYPercent) / 100) * svgHeight;

    const targetX = gsap.utils.random(minX, maxX);
    const targetY = gsap.utils.random(minY, maxY);

    tweenRefs.current.get(id)?.kill();

    const tween = gsap.to(rect, {
      attr: { x: targetX, y: targetY },
      duration: gsap.utils.random(2.5, 3.5),
      ease: "sine.inOut",
      roundProps: "attr.x,attr.y",
      onComplete: () => animateRect(id, config),
    });

    tweenRefs.current.set(id, tween);
  }, []);

  // Create a separate function to update all rects
  const updateAllRects = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;

    // Kill previous tweens
    tweenRefs.current.forEach((tween) => tween?.kill());

    // Set Fixed Rect
    if (fixedRectRef.current) {
      gsap.set(fixedRectRef.current, {
        attr: {
          width: (fixedRectSize.widthPercent / 100) * svgWidth,
          height: (fixedRectSize.heightPercent / 100) * svgHeight,
          x: (fixedRectSize.xPercent / 100) * svgWidth,
          y: (fixedRectSize.yPercent / 100) * svgHeight,
        },
      });
    }

    // Floating Rects
    rects.forEach((rectConfig) => {
      const ref = rectRefs.current.get(rectConfig.id);
      if (!ref) return;

      const size =
        (rectConfig.sizePercent / 100) * Math.min(svgWidth, svgHeight);
      const area = rectConfig.area;

      // Handle cases where min/max might be reversed
      const minX =
        (Math.min(area.minXPercent, area.maxXPercent) / 100) * svgWidth;
      const maxX =
        (Math.max(area.minXPercent, area.maxXPercent) / 100) * svgWidth;
      const minY =
        (Math.min(area.minYPercent, area.maxYPercent) / 100) * svgHeight;
      const maxY =
        (Math.max(area.minYPercent, area.maxYPercent) / 100) * svgHeight;

      const initX = gsap.utils.random(minX, maxX);
      const initY = gsap.utils.random(minY, maxY);

      gsap.set(ref, {
        attr: {
          width: size,
          height: size,
          x: initX,
          y: initY,
        },
      });

      animateRect(rectConfig.id, rectConfig);
    });
  }, [fixedRectSize, rects, animateRect]);

  useEffect(() => {
    // Initialize on first render
    updateAllRects();

    // Set up resize handler
    const handleResize = () => {
      // Use the same function for consistency
      updateAllRects();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tweenRefs.current.forEach((tween) => tween?.kill());
    };
  }, [fixedRectSize, rects, updateAllRects]);

  return (
    <div className={styles.floatingRect}>
      <svg className={styles.floatingRect__content} ref={svgRef}>
        <SVGFilter rectIds={rects.map((r) => r.id)} />
        <g filter="url(#subtract-overlap)">
          <rect id="fixedRect" ref={fixedRectRef} fill="var(--color-primary)" />
          {rects.map((rect) => (
            <rect
              key={rect.id}
              id={rect.id}
              ref={(el) => {
                if (el) {
                  rectRefs.current.set(rect.id, el);
                }
              }}
              fill={rect.color || "var(--color-primary)"}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FloatingRect;
