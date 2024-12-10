"use client";
import React, { useRef, useEffect } from "react";
import styles from "./infiniteText.module.scss";
import gsap from "gsap";

export default function InfiniteText() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const infiniteText = useRef(null);

  let xPercent = 0;
  const direction = useRef(-1);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      direction.current = e.deltaY > 0 ? -1 : 1;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.1 * direction.current;

    requestAnimationFrame(animate);
  };

  return (
    <div ref={infiniteText} className={styles.infiniteText}>
      <div className={styles.infiniteText__slider}>
        <h1 ref={firstText}>Wenting Yong</h1>
        <h1 ref={secondText}>Wenting Yong</h1>
      </div>
    </div>
  );
}
