import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./followeye.module.scss";

const FollowEye: React.FC<{
  backgroundColor: string;
  mousePosition?: { x: number; y: number } | null;
}> = ({ backgroundColor, mousePosition }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // console.log("FollowEye -> mousePosition", mousePosition);
  useEffect(() => {
    if (!containerRef.current || !mousePosition) return;

    const container = containerRef.current;
    const maxTrans = 15;
    const maxX = container.clientWidth / 2;
    const maxY = container.clientHeight / 2;

    const eyes = container.querySelectorAll<HTMLElement>(".eye");
    const pupils = container.querySelectorAll<HTMLElement>(".eye-pupil");

    eyes.forEach((eye, i) => {
      const pupil = pupils[i];
      const eyeRect = eye.getBoundingClientRect();
      const r = eyeRect.width / 2;
      const centerX = eyeRect.left + r;
      const centerY = eyeRect.top + r;

      let x = mousePosition.x - centerX;
      let y = mousePosition.y - centerY;
      // Limit the movement within the bounds of the eye
      x = Math.max(-maxX, Math.min(x, maxX));
      y = Math.max(-maxY, Math.min(y, maxY));

      const xPercent = x / maxX;
      const yPercent = y / maxY;

      const scaledXPercent = xPercent * maxTrans;
      const scaledYPercent = yPercent * maxTrans;

      gsap.to(pupil, {
        xPercent: scaledXPercent,
        yPercent: scaledYPercent,
        duration: 0.4,
        // ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(eye, {
        xPercent: scaledXPercent * 0.4,
        yPercent: scaledYPercent * 0.4,
        duration: 0.4,
        // ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [mousePosition]);
  return (
    <div className={`${styles.followeye} box`} ref={containerRef}>
      <div className={styles.followeye__content}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <clipPath id="clip-mask">
              <path
                fill="none"
                d="M95.86 50S75.33 79.47 50 79.47 4.14 50 4.14 50 24.67 20.53 50 20.53 95.86 50 95.86 50Z"
              />
            </clipPath>
          </defs>
          <path fill={backgroundColor} d="M0 0h100v100H0z" />
          <g className="eye">
            <path
              fill="var(--color-light)"
              d="M95.86 50S75.33 79.47 50 79.47 4.14 50 4.14 50 24.67 20.53 50 20.53 95.86 50 95.86 50Z"
            />
            <g clipPath="url(#clip-mask)">
              <circle
                className="eye-pupil"
                cx="50"
                cy="50"
                r="20.91"
                fill="var(--color-primary)"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FollowEye;
