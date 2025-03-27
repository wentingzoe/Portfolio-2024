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
  componentId: string;
};

const FloatingRect: React.FC<FloatingRectProps> = ({
  fixedRectSize,
  rects,
  componentId,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const fixedRectRef = useRef<SVGRectElement>(null);
  const rectRefs = useRef<Map<string, SVGRectElement>>(new Map());
  const tweenRefs = useRef<Map<string, gsap.core.Tween | null>>(new Map());

  // Create stable ids using the component id as prefix
  const getPrefixedId = useCallback(
    (id: string) => `${componentId}-${id}`,
    [componentId]
  );
  const filterId = getPrefixedId("subtract-overlap");
  const fixedRectId = getPrefixedId("fixedRect");

  // Create prefixed rect IDs for the filter
  const rectIdsForFilter = rects.map((rect) => ({
    id: rect.id,
    prefixedId: getPrefixedId(rect.id),
  }));

  const animateRect = useCallback(
    (rectId: string, config: RectConfig) => {
      const svg = svgRef.current;
      if (!svg) return;

      const prefixedId = getPrefixedId(rectId);
      const rect = rectRefs.current.get(prefixedId);
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

      tweenRefs.current.get(prefixedId)?.kill();

      const tween = gsap.to(rect, {
        attr: { x: targetX, y: targetY },
        duration: gsap.utils.random(2.5, 3.5),
        ease: "sine.inOut",
        onComplete: () => animateRect(rectId, config),
      });

      tweenRefs.current.set(prefixedId, tween);
    },
    [getPrefixedId]
  );

  // Set fixed rectangle dimensions once
  const setFixedRect = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !fixedRectRef.current) return;

    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;

    // Set fixed rect - ONLY ONCE
    gsap.set(fixedRectRef.current, {
      attr: {
        width: (fixedRectSize.widthPercent / 100) * svgWidth,
        height: (fixedRectSize.heightPercent / 100) * svgHeight,
        x: (fixedRectSize.xPercent / 100) * svgWidth,
        y: (fixedRectSize.yPercent / 100) * svgHeight,
      },
    });
  }, [fixedRectSize]);

  // Update only floating rects
  const updateFloatingRects = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;

    // Kill previous tweens
    tweenRefs.current.forEach((tween) => tween?.kill());

    // Floating Rects
    rects.forEach((rectConfig) => {
      const prefixedId = getPrefixedId(rectConfig.id);
      const ref = rectRefs.current.get(prefixedId);
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
  }, [rects, getPrefixedId, animateRect]);

  useEffect(() => {
    const cleanup = () => {
      tweenRefs.current.forEach((tween) => tween?.kill());
      tweenRefs.current.clear();
    };

    cleanup();

    setFixedRect();

    const initTimer = setTimeout(() => {
      updateFloatingRects();
    }, 300);

    const handleResize = () => {
      updateFloatingRects();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("resize", handleResize);
      cleanup();
    };
  }, [setFixedRect, updateFloatingRects]);

  return (
    <div className={styles.floatingRect}>
      <svg className={styles.floatingRect__content} ref={svgRef}>
        <SVGFilter
          filterId={filterId}
          fixedRectId={fixedRectId}
          rectIds={rectIdsForFilter}
        />

        <g filter={`url(#${filterId})`}>
          {/* Fixed rectangle - This should never move */}
          <rect
            id={fixedRectId}
            ref={fixedRectRef}
            fill="var(--color-primary)"
          />

          {/* Floating rectangles - These should animate */}
          {rects.map((rect) => {
            const prefixedId = getPrefixedId(rect.id);
            return (
              <rect
                key={prefixedId}
                id={prefixedId}
                ref={(el) => {
                  if (el) rectRefs.current.set(prefixedId, el);
                }}
                fill={rect.color || "var(--color-primary)"}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default FloatingRect;
