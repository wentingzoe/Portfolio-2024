"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./floatingbox.module.scss";
import { useBreakpoint } from "@/context/BreakpointContext";

const FloatingBox: React.FC = () => {
  const breakpoint = useBreakpoint();
  const floatingRectRef = useRef<SVGRectElement>(null);
  const fixedRectRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const floatingRect = floatingRectRef.current;
    const fixedRect = fixedRectRef.current;
    const svg = svgRef.current;

    if (!floatingRect || !fixedRect || !svg) return;

    let svgWidth = svg.clientWidth;
    let svgHeight = svg.clientHeight;
    let rectSize: number;
    let fixedRectWidth: number;
    let fixedRectHeight: number;
    let initialFloatingX: number;
    let initialFloatingY: number;

    const updateDimensions = () => {
      svgWidth = svg.clientWidth;
      svgHeight = svg.clientHeight;

      if (breakpoint === "desktop") {
        // Desktop settings
        rectSize = Math.min(svgWidth, svgHeight) * 0.15;
        fixedRectWidth = svgWidth * 0.53;
        fixedRectHeight = svgHeight;
        initialFloatingX = fixedRectWidth - rectSize / 2;
        initialFloatingY = fixedRectHeight * 0.2 - rectSize / 2;
      } else if (breakpoint === "tablet") {
        // Tablet settings
        rectSize = Math.min(svgWidth, svgHeight) * 0.15;
        fixedRectWidth = Math.min(svgWidth, svgHeight) * 0.8; // Square
        fixedRectHeight = fixedRectWidth;
        initialFloatingX = fixedRectWidth - rectSize / 2;
        initialFloatingY = fixedRectHeight * 0.5 - rectSize / 2;
      } else if (breakpoint === "mobile") {
        // Mobile settings
        rectSize = Math.min(svgWidth, svgHeight) * 0.15;
        fixedRectWidth = svgHeight;
        fixedRectHeight = svgHeight * 0.7;
        initialFloatingX = fixedRectWidth * 0.2 - rectSize / 2;
        initialFloatingY = fixedRectHeight - rectSize / 2;
      }

      // Update fixed rectangle attributes
      fixedRect.setAttribute("width", fixedRectWidth.toString());
      fixedRect.setAttribute("height", fixedRectHeight.toString());

      // Update floating rectangle attributes
      floatingRect.setAttribute("width", rectSize.toString());
      floatingRect.setAttribute("height", rectSize.toString());
      gsap.set(floatingRect, {
        attr: {
          x: initialFloatingX,
          y: initialFloatingY,
        },
      });
    };

    const animateFloatingRect = () => {
      // Adjust animation bounds based on breakpoint
      let xMax: number = 0,
        yMax: number = 0;
      if (breakpoint === "desktop") {
        xMax = initialFloatingX - rectSize;
        yMax = initialFloatingY - rectSize / 4;
      } else if (breakpoint === "tablet") {
        xMax = initialFloatingX - rectSize / 2;
        yMax = initialFloatingY - rectSize / 4;
      } else if (breakpoint === "mobile") {
        xMax = initialFloatingX - rectSize / 2;
        yMax = initialFloatingY - rectSize;
      }

      gsap.to(floatingRect, {
        attr: {
          // x: () => Math.random() * xMax,
          // y: () => Math.random() * yMax,
          x: xMax,
          y: yMax,
        },
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    updateDimensions();
    animateFloatingRect();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return (
    <div className={styles.container}>
      <svg className={styles.svg} ref={svgRef}>
        <defs>
          <filter id="subtract-overlap" x="0" y="0" width="100%" height="100%">
            {/* Input images */}
            <feImage xlinkHref="#fixedRect" result="fixed" />
            <feImage xlinkHref="#floatingRect" result="floating" />

            {/* Create the overlap area */}
            <feComposite
              in="fixed"
              in2="floating"
              operator="in"
              result="overlap"
            />

            {/* Subtract the overlap from both shapes */}
            <feComposite
              in="fixed"
              in2="overlap"
              operator="out"
              result="fixedFinal"
            />
            <feComposite
              in="floating"
              in2="overlap"
              operator="out"
              result="floatingFinal"
            />

            {/* Merge the final shapes */}
            <feMerge>
              <feMergeNode in="fixedFinal" />
              <feMergeNode in="floatingFinal" />
            </feMerge>
          </filter>
        </defs>

        {/* Group the shapes and apply the filter */}
        <g filter="url(#subtract-overlap)">
          {/* Fixed rectangle */}
          <rect
            id="fixedRect"
            ref={fixedRectRef}
            x="0"
            y="0"
            width="0"
            height="0"
            fill="black"
          />

          {/* Floating rectangle */}
          <rect
            id="floatingRect"
            ref={floatingRectRef}
            x="0"
            y="0"
            width="0"
            height="0"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
};

export default FloatingBox;
