"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/app/page.module.scss";
import { MousePositionProvider } from "@/context/MousePositionContext";
import Hero from "../components/Hero/";

const DESKTOP_BREAKPOINT = 1024;

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Ensure ScrollTrigger is registered only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Handle resize and check screen width
  useEffect(() => {
    const checkScreenSize = () => {
      const isDesktopView = window.innerWidth >= DESKTOP_BREAKPOINT;
      if (isDesktopView !== isDesktop) {
        setIsDesktop(isDesktopView);
      }
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isDesktop]);

  // GSAP animations
  useEffect(() => {
    const sections = sectionsRef.current?.children;
    if (!sections) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (isDesktop) {
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
  }, [isDesktop]);

  return (
    <main>
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
    </main>
  );
};

export default Home;
