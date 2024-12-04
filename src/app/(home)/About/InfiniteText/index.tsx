"use client";
import React, { useRef, useEffect } from "react";
import styles from "./infiniteText.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Index() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  const direction = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerWidth,
        onUpdate: (e) => (direction.current = e.direction * -1),
      },
      x: "-300px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction.current;
  };

  return (
    <div className={styles.infiniteText}>
      <div ref={slider} className={styles.infiniteText__slider}>
        <h1 ref={firstText}>Wenting Yong -</h1>
        <h1 ref={secondText}>Wenting Yong -</h1>
      </div>
    </div>
  );
}
