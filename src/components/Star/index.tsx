import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./star.module.scss";

interface StarProps {
  color: string;
}

const Star: React.FC<StarProps> = ({ color }) => {
  const starRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!starRef.current) return;

    gsap.set(starRef.current, {
      transformOrigin: "center center",
    });

    const starTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    starTL
      .to(starRef.current, {
        rotate: 360,
        duration: 1,
        ease: "none",
      })
      .to(starRef.current, {
        scale: 1.5,
        duration: 0.2,
        ease: "power1.out",
        repeat: 1,
        yoyo: true,
      });
  }, []);

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={starRef}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        overflow: "visible",
      }}
      preserveAspectRatio="xMidYMid meet"
      className={styles.responsiveSvg}
    >
      <path
        d="M20.1758 0H19.8436H20.1369C19.6688 11.2156 10.833 20.1588 0 20.1635C10.833 20.1682 19.6688 29.1114 20.1369 40H19.8436H20.1758C20.644 29.1114 29.4798 20.1682 40 20.1635C29.4798 20.1588 20.644 11.2156 20.1758 0Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
