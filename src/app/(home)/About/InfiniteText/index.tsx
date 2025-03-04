"use client";
import React, { useRef, useEffect, useCallback } from "react";
import styles from "./infiniteText.module.scss";
import gsap from "gsap";

export default function InfiniteText() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const infiniteText = useRef(null);

  const xPercent = useRef(0);
  const direction = useRef(-1);

  const animate = useCallback(() => {
    if (xPercent.current < -100) {
      xPercent.current = 0;
    } else if (xPercent.current > 0) {
      xPercent.current = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent.current });
    gsap.set(secondText.current, { xPercent: xPercent.current });
    xPercent.current += 0.1 * direction.current;

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      direction.current = e.deltaY > 0 ? -1 : 1;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [animate]);
  return (
    <div ref={infiniteText} className={styles.infiniteText}>
      <div className={styles.infiniteText__slider}>
        <h1 ref={firstText}>Wenting Yong - Wenting Yong -</h1>
        <h1 ref={secondText}>Wenting Yong - Wenting Yong -</h1>
      </div>
    </div>
  );
}
