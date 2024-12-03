"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.scss";
import { MousePositionProvider } from "@/context/MousePositionContext";
import { useBreakpoint } from "@/context/BreakpointContext";
import Hero from "./Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
import About from "./About";

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  // Ensure ScrollTrigger is registered only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    const sections = sectionsRef.current?.children;
    if (!sections) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (breakpoint === "desktop") {
      // Horizontal scroll animation for desktop
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sectionsRef.current?.scrollWidth}`,
          invalidateOnRefresh: true, // Recalculate on resize
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
    } else {
      // Reset transformations for mobile/tablet
      gsap.set(sections, {
        xPercent: 0,
        y: 0,
        clearProps: "all", // Clear all GSAP-added properties
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [breakpoint]);

  return (
    <main>
      <AnimatedBackground />
      <MousePositionProvider>
        <div ref={sectionsRef} className={styles.container}>
          <section className={`${styles.section} ${styles.section1}`}>
            <Hero />
          </section>
          <section className={`${styles.section} ${styles.section2}`}>
            <About />
          </section>
          <section className={`${styles.section} ${styles.section3}`}>
            Section 3
          </section>
          <section className={`${styles.section} ${styles.section4}`}>
            Section 4
          </section>
        </div>
      </MousePositionProvider>
    </main>
  );
};

export default Home;
