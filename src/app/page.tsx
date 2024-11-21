"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/app/ui/page.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={sectionsRef} className={styles.container}>
      <section className={`${styles.section} ${styles.section1}`}>
        Section 1
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
