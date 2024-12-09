import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./starLine.module.scss";

interface StarLineProps {
  color: string;
  lineWidth: number;
}

const StarLine: React.FC<StarLineProps> = ({ color, lineWidth }) => {
  const starRef = useRef<SVGPathElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    if (!starRef.current || !lineRef.current) return;

    gsap.set(starRef.current, {
      transformOrigin: "center center",
    });

    const starTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    starTL.to(starRef.current, {
      scale: 1.2,
      duration: 1,
      ease: "power1.out",
      repeat: 1,
      yoyo: true,
    });
    gsap.fromTo(
      lineRef.current,
      { attr: { x2: 20 } },
      {
        attr: { x2: lineWidth },
        duration: 10,
        ease: "power2.inOut",
        yoyo: true,
      }
    );
  }, [lineWidth]);

  return (
    <div className={styles.starLine}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        //  ref={starRef}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          overflow: "visible",
        }}
        preserveAspectRatio="xMidYMid meet"
        // className={styles.responsiveSvg}
      >
        <path
          ref={starRef}
          d="M20.1758 0H19.8436H20.1369C19.6688 11.2156 10.833 20.1588 0 20.1635C10.833 20.1682 19.6688 29.1114 20.1369 40H19.8436H20.1758C20.644 29.1114 29.4798 20.1682 40 20.1635C29.4798 20.1588 20.644 11.2156 20.1758 0Z"
          fill={color}
        />

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
