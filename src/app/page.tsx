"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/app/page.module.scss";
import { MousePositionProvider } from "@/context/MousePositionContext";
import Hero from "../components/Hero/Hero";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = sectionsRef.current?.children;

    if (sections) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=600%",
        },
      });

      timeline.to(sections, {
        xPercent: -200,
        ease: "none",
      });

      timeline.to(sections[2], {
        y: () => `-${sections[2].scrollHeight - window.innerHeight}px`,
        ease: "none",
      });

      timeline.to(sections, {
        xPercent: -300,
        ease: "none",
      });
    }
  }, []);

  return (
    <MousePositionProvider>
      <div ref={sectionsRef} className={styles.container}>
        <section className={`${styles.section} ${styles.section1}`}>
          <Hero />
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
    </MousePositionProvider>
  );
};

export default Home;
