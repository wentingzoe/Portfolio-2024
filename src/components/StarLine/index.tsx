import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./starLine.module.scss";

interface StarLineProps {
  color: string;
  lineWidth: number;
  isInDetails: boolean;
}

const StarLine: React.FC<StarLineProps> = ({
  color,
  lineWidth,
  isInDetails,
}) => {
  const starRef = useRef<SVGPathElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    if (!starRef.current || !lineRef.current) return;

    if (isInDetails && !animationTriggered.current) {
      animationTriggered.current = true;

      const timeline = gsap.timeline();

      timeline
        .fromTo(
          starRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power1.out",
          }
        )

        .fromTo(
          lineRef.current,
          { attr: { x2: 0 }, opacity: 0 },
          {
            attr: { x2: lineWidth },
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "+=0"
        );

      return () => {
        timeline.kill();
      };
    }

    if (!isInDetails) {
      animationTriggered.current = false;
    }
  }, [lineWidth, isInDetails]);

  return (
    <div className={styles.starLine}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Star Shape */}
        <path
          ref={starRef}
          d="M20.1758 0H19.8436H20.1369C19.6688 11.2156 10.833 20.1588 0 20.1635C10.833 20.1682 19.6688 29.1114 20.1369 40H19.8436H20.1758C20.644 29.1114 29.4798 20.1682 40 20.1635C29.4798 20.1588 20.644 11.2156 20.1758 0Z"
          fill={color}
        />

        {/* Line */}
        <line
          x1="20"
          y1="20"
          x2="0"
          y2="20"
          stroke={color}
          strokeWidth="0.5"
          ref={lineRef}
        />
      </svg>
    </div>
  );
};

export default StarLine;
