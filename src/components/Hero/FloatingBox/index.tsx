"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./floatingbox.module.scss";

const FloatingBox: React.FC = () => {
  const floatingRectRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const floatingRect = floatingRectRef.current;
    const svg = svgRef.current;

    if (!floatingRect || !svg) return;

    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;
    const rectSize = 150; // Size of the floating rectangle

    // GSAP Animation for floating motion
    gsap.to(floatingRect, {
      attr: {
        x: () => Math.random() * (svgWidth - rectSize),
        y: () => Math.random() * (svgHeight - rectSize),
      },
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className={styles.container}>
      <svg className={styles.svg} ref={svgRef}>
        <defs>
          <filter id="subtract-overlap" x="0" y="0" width="100%" height="100%">
            <feImage xlinkHref="#fixedRect" result="fixed" />
            <feImage xlinkHref="#floatingRect" result="floating" />

            <feComposite
              in="fixed"
              in2="floating"
              operator="in"
              result="overlap"
            />

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

            <feMerge>
              <feMergeNode in="fixedFinal" />
              <feMergeNode in="floatingFinal" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#subtract-overlap)">
          <rect
            id="fixedRect"
            x="0"
            y="0"
            width="56%"
            height="100%"
            fill="black"
          />

          <rect
            id="floatingRect"
            ref={floatingRectRef}
            x="50%"
            y="30%"
            width="150"
            height="150"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
};

export default FloatingBox;
