"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/app/ui/page.module.scss";
import Hero from "./components/Hero";
import FollowEye from "./components/FollowEye";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const sections = sectionsRef.current?.children;

    if (sections) {
      // GSAP Timeline for smooth scrolling
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=600%", // Total scroll length
        },
      });

      // Horizontal scrolling for Sections 1 to 3
      timeline.to(sections, {
        xPercent: -200, // Move to Section 3 (100% per section)
        ease: "none",
      });

      // Vertical scrolling in Section 3
      timeline.to(sections[2], {
        y: () => `-${sections[2].scrollHeight - window.innerHeight}px`, // Vertical scroll inside Section 3
        ease: "none",
      });

      // Horizontal scrolling to Section 4
      timeline.to(sections, {
        xPercent: -300, // Move to Section 4
        ease: "none",
      });
    }
  }, []);

  // Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={sectionsRef} className={styles.container}>
      <section className={`${styles.section} ${styles.section1}`}>
        <Hero />
        <FollowEye
          backgroundColor="var(--color-secondary)"
          mousePosition={mousePosition}
        />
      </section>
      <section className={`${styles.section} ${styles.section2}`}>
        Section 2
      </section>
      <section className={`${styles.section} ${styles.section3}`}>
        Section 3
      </section>
      <section className={`${styles.section} ${styles.section4}`}>
        Section 4
      </section>
    </div>
  );
};

export default Home;
