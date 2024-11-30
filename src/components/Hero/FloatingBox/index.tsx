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

    let floatingRectTween: gsap.core.Tween;
    let smallRectTween: gsap.core.Tween;

    const animateFloatingRect = () => {
      // Define movement area for floatingRect
      let minX = 0;
      let maxX = 0;
      let minY = 0;
      let maxY = 0;

      if (breakpoint === "desktop") {
        minX = fixedRectWidth - rectSize;
        maxX = fixedRectWidth + rectSize * 0.3;
        minY = fixedRectHeight * 0.15;
        maxY = fixedRectHeight * 0.25 - rectSize;
      } else if (breakpoint === "tablet") {
        minX = fixedRectWidth * 0.15;
        maxX = fixedRectWidth * 0.25 - rectSize;
        minY = fixedRectHeight - rectSize * 0.8;
        maxY = fixedRectHeight + rectSize * 0.1;
      } else if (breakpoint === "mobile") {
        minX = fixedRectWidth * 0.1;
        maxX = fixedRectWidth * 0.2 - rectSize;
        minY = fixedRectHeight - rectSize * 0.8;
        maxY = fixedRectHeight + rectSize * 0.1;
      }
      // Generate random positions within the area
      const randomX = gsap.utils.random(minX, maxX);
      const randomY = gsap.utils.random(minY, maxY);

      // Animate to random position
      floatingRectTween = gsap.to(floatingRect, {
        attr: { x: randomX, y: randomY },
        duration: gsap.utils.random(1, 3),
        ease: "sine.inOut",
        onComplete: animateFloatingRect, // Recursively animate
      });
    };

    const animateSmallRect = () => {
      // Define movement area for smallRect

      let minX = 0;
      let maxX = 0;
      let minY = 0;
      let maxY = 0;
      if (breakpoint === "desktop") {
        minX = fixedRectWidth - smallRectSize * 5;
        maxX = fixedRectWidth + smallRectSize * 0.5;
        minY = fixedRectHeight * 0.8;
        maxY = fixedRectHeight - smallRectSize;
      } else if (breakpoint === "tablet") {
        minX = fixedRectWidth - smallRectSize;
        maxX = fixedRectWidth + smallRectSize * 2;
        minY = fixedRectHeight * 0.15 - smallRectSize * 0.5;
        maxY = fixedRectHeight * 0.25;
      } else if (breakpoint === "mobile") {
        minX = fixedRectWidth * 0.5 - smallRectSize;
        maxX = fixedRectWidth * 0.6;
        minY = fixedRectHeight * 0.15 - smallRectSize * 0.5;
        maxY = fixedRectHeight * 0.25;
      }

      // Generate random positions within the area
      const randomX = gsap.utils.random(minX, maxX);
      const randomY = gsap.utils.random(minY, maxY);

      // Animate to random position
      smallRectTween = gsap.to(smallRect, {
        attr: { x: randomX, y: randomY },
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
        onComplete: animateSmallRect,
      });
    };

    let fixedRectWidth = 0;
    let fixedRectHeight = 0;
    let rectSize = 0;
    let smallRectSize = 0;

    const updateDimensions = () => {
      // Kill existing animations
      if (floatingRectTween) floatingRectTween.kill();
      if (smallRectTween) smallRectTween.kill();

      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;

      rectSize = Math.min(svgWidth, svgHeight) * 0.15;
      smallRectSize = rectSize * 0.4;

      // Calculate fixed rectangle dimensions based on breakpoint
      if (breakpoint === "desktop") {
        fixedRectWidth = svgWidth * 0.53;
        fixedRectHeight = svgHeight;
      } else if (breakpoint === "tablet") {
        fixedRectWidth = Math.min(svgWidth, svgHeight) * 0.8;
        fixedRectHeight = fixedRectWidth;
      } else if (breakpoint === "mobile") {
        fixedRectWidth = svgHeight;
        fixedRectHeight = svgHeight * 0.5;
      }

      // Set fixed rectangle attributes
      gsap.set(fixedRect, {
        attr: {
          width: fixedRectWidth,
          height: fixedRectHeight,
          x: 0,
          y: 0,
        },
      });

      // Set initial positions of floating rectangles within the area
      let floatingRectInitX = 0;
      let floatingRectInitY = 0;
      let smallRectInitX = 0;
      let smallRectInitY = 0;
      if (breakpoint === "desktop") {
        floatingRectInitX = gsap.utils.random(
          fixedRectWidth - rectSize * 3,
          fixedRectWidth + rectSize * 0.1
        );
        floatingRectInitY = gsap.utils.random(
          fixedRectHeight * 0.18,
          fixedRectHeight * 0.25 - rectSize * 0.5
        );

        smallRectInitX = gsap.utils.random(
          fixedRectWidth * 0.8,
          fixedRectWidth - smallRectSize * 0.5
        );
        smallRectInitY = gsap.utils.random(
          fixedRectHeight * 0.8,
          fixedRectHeight * 0.9 - smallRectSize * 0.5
        );
      } else if (breakpoint === "tablet") {
        floatingRectInitX = gsap.utils.random(
          fixedRectWidth * 0.2,
          fixedRectWidth * 0.3 - rectSize
        );
        floatingRectInitY = gsap.utils.random(
          fixedRectHeight - rectSize * 0.9,
          fixedRectHeight
        );

        smallRectInitX = gsap.utils.random(
          fixedRectWidth - smallRectSize * 0.5,
          fixedRectWidth + smallRectSize * 2.5
        );
        smallRectInitY = gsap.utils.random(
          fixedRectHeight * 0.15 - smallRectSize,
          fixedRectHeight * 0.3
        );
      } else if (breakpoint === "mobile") {
        floatingRectInitX = gsap.utils.random(
          fixedRectWidth * 0.2,
          fixedRectWidth * 0.3 - rectSize
        );
        floatingRectInitY = gsap.utils.random(
          fixedRectHeight - rectSize * 0.9,
          fixedRectHeight + rectSize * 0.1
        );

        smallRectInitX = gsap.utils.random(
          fixedRectWidth * 0.5 - smallRectSize * 0.5,
          fixedRectWidth * 0.6
        );
        smallRectInitY = gsap.utils.random(
          fixedRectHeight * 0.15 - smallRectSize,
          fixedRectHeight * 0.3
        );
      }

      // Set initial attributes of floating rectangles
      gsap.set(floatingRect, {
        attr: {
          width: rectSize,
          height: rectSize,
          x: floatingRectInitX,
          y: floatingRectInitY,
        },
      });

      gsap.set(smallRect, {
        attr: {
          width: smallRectSize,
          height: smallRectSize,
          x: smallRectInitX,
          y: smallRectInitY,
        },
      });

      // Start the random floating animations
      animateFloatingRect();
      animateSmallRect();
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
      if (floatingRectTween) floatingRectTween.kill();
      if (smallRectTween) smallRectTween.kill();
    };
  }, [breakpoint]);

  return (
    <div className={styles.floatingBox}>
      <svg className={styles.floatingBox__content} ref={svgRef}>
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
