"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./floatingbox.module.scss";
import { useBreakpoint } from "@/context/BreakpointContext";

const FloatingBox: React.FC = () => {
  const breakpoint = useBreakpoint();
  const floatingRectRef = useRef<SVGRectElement>(null);
  const smallRectRef = useRef<SVGRectElement>(null);
  const fixedRectRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const fixedRect = fixedRectRef.current;
    const floatingRect = floatingRectRef.current;
    const smallRect = smallRectRef.current;
    const svg = svgRef.current;
    const group = groupRef.current;

    if (!fixedRect || !floatingRect || !smallRect || !svg || !group) return;

    let floatingRectAnimation: gsap.core.Tween;
    let smallRectAnimation: gsap.core.Tween;

    const updateDimensions = () => {
      // Kill existing animations
      if (floatingRectAnimation) floatingRectAnimation.kill();
      if (smallRectAnimation) smallRectAnimation.kill();

      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;

      const rectSize = Math.min(svgWidth, svgHeight) * 0.15;
      const smallRectSize = rectSize * 0.5;

      let fixedRectWidth = 0;
      let fixedRectHeight = 0;
      let initialFloatingX = 0;
      let initialFloatingY = 0;
      let finalFloatingX = 0;
      let finalFloatingY = 0;
      let initialSmallX = 0;
      let initialSmallY = 0;
      let finalSmallX = 0;
      let finalSmallY = 0;

      // Calculate positions based on breakpoint
      if (breakpoint === "desktop") {
        fixedRectWidth = svgWidth * 0.53;
        fixedRectHeight = svgHeight;

        // Floating rectangle positions
        initialFloatingX = fixedRectWidth - rectSize / 2;
        initialFloatingY = fixedRectHeight * 0.2 - rectSize / 2;
        finalFloatingX = initialFloatingX - rectSize;
        finalFloatingY = initialFloatingY - rectSize / 4;

        // Small rectangle positions
        initialSmallX = fixedRectWidth - smallRectSize / 2;
        initialSmallY = fixedRectHeight * 0.8 - smallRectSize / 2;
        finalSmallX = initialSmallX - smallRectSize * 2;
        finalSmallY = initialSmallY - smallRectSize;
      } else if (breakpoint === "tablet") {
        fixedRectWidth = Math.min(svgWidth, svgHeight) * 0.8;
        fixedRectHeight = fixedRectWidth;

        // Floating rectangle positions
        initialFloatingX = fixedRectWidth - rectSize / 2;
        initialFloatingY = fixedRectHeight * 0.5 - rectSize / 2;
        finalFloatingX = initialFloatingX - rectSize / 2;
        finalFloatingY = initialFloatingY - rectSize / 4;

        // Small rectangle positions
        initialSmallX = fixedRectWidth - smallRectSize / 2;
        initialSmallY = fixedRectHeight * 0.5 - smallRectSize / 2;
        finalSmallX = initialSmallX - smallRectSize * 2;
        finalSmallY = initialSmallY - smallRectSize;
      } else if (breakpoint === "mobile") {
        fixedRectWidth = svgHeight;
        fixedRectHeight = svgHeight * 0.7;

        // Floating rectangle positions
        initialFloatingX = fixedRectWidth * 0.2 - rectSize / 2;
        initialFloatingY = fixedRectHeight - rectSize / 2;
        finalFloatingX = initialFloatingX - rectSize / 2;
        finalFloatingY = initialFloatingY - rectSize;

        // Small rectangle positions
        initialSmallX = fixedRectWidth * 0.8 - smallRectSize / 2;
        initialSmallY = fixedRectHeight * 0.2 - smallRectSize / 2;
        finalSmallX = initialSmallX - smallRectSize;
        finalSmallY = initialSmallY - smallRectSize * 2;
      }

      // Set initial attributes
      gsap.set(fixedRect, {
        attr: {
          width: fixedRectWidth,
          height: fixedRectHeight,
          x: 0,
          y: 0,
        },
      });

      gsap.set(floatingRect, {
        attr: {
          width: rectSize,
          height: rectSize,
        },
      });

      gsap.set(smallRect, {
        attr: {
          width: smallRectSize,
          height: smallRectSize,
        },
      });

      // Animate rectangles to new initial positions
      gsap.to(floatingRect, {
        attr: {
          x: initialFloatingX,
          y: initialFloatingY,
        },
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          // Start movement animation
          floatingRectAnimation = gsap.to(floatingRect, {
            attr: {
              x: finalFloatingX,
              y: finalFloatingY,
            },
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });

      gsap.to(smallRect, {
        attr: {
          x: initialSmallX,
          y: initialSmallY,
        },
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          // Start movement animation
          smallRectAnimation = gsap.to(smallRect, {
            attr: {
              x: finalSmallX,
              y: finalSmallY,
            },
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    };

    // Initial update
    updateDimensions();

    // Update on resize
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (floatingRectAnimation) floatingRectAnimation.kill();
      if (smallRectAnimation) smallRectAnimation.kill();
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
            <feImage xlinkHref="#smallRect" result="small" />

            {/* Combine floatingRect and smallRect */}
            <feMerge result="floatingCombined">
              <feMergeNode in="floating" />
              <feMergeNode in="small" />
            </feMerge>

            {/* Create the overlap area */}
            <feComposite
              in="fixed"
              in2="floatingCombined"
              operator="in"
              result="overlap"
            />

            {/* Subtract the overlap from fixedRect and floatingCombined */}
            <feComposite
              in="fixed"
              in2="overlap"
              operator="out"
              result="fixedFinal"
            />
            <feComposite
              in="floatingCombined"
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
        {/* Apply the filter to the group and set ref */}
        <g filter="url(#subtract-overlap)" ref={groupRef}>
          {/* Fixed rectangle */}
          <rect id="fixedRect" ref={fixedRectRef} x="0" y="0" fill="black" />
          {/* Floating rectangle */}
          <rect
            id="floatingRect"
            ref={floatingRectRef}
            x="0"
            y="0"
            fill="black"
          />
          {/* Small rectangle */}
          <rect id="smallRect" ref={smallRectRef} x="0" y="0" fill="black" />
        </g>
      </svg>
    </div>
  );
};

export default FloatingBox;
