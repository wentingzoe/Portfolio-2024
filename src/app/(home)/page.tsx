"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.scss";
import { MousePositionProvider } from "@/context/MousePositionContext";
import { useBreakpoint } from "@/context/BreakpointContext";
import Hero from "./Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
// import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import { initExpertiseFlip } from "@/utils/expertiseFlip";

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<{
    cards: HTMLDivElement[];
    section: HTMLDivElement | null;
  } | null>(null);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    const sections = sectionsRef.current?.children;
    if (!sections) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (breakpoint === "desktop") {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          //markers: true,
          end: () => `+=${sectionsRef.current?.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
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
        clearProps: "all",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [breakpoint]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cards = expertiseRef.current?.cards;
      const sections = sectionsRef.current?.children;
      const aboutMeSection = sections?.[1];

      if (
        !cards ||
        cards.length === 0 ||
        !aboutMeSection ||
        breakpoint !== "desktop"
      )
        return;

      clearInterval(interval);
      initExpertiseFlip({
        cards,
        trigger: aboutMeSection as HTMLElement,
        breakpoint,
      });
    }, 100);

    return () => clearInterval(interval);
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
            <AboutMe expertiseRef={expertiseRef} />
          </section>
          <section className={`${styles.section} ${styles.section3}`}>
            <Experience />
            <Projects />
          </section>
          <section className={`${styles.section} ${styles.section4}`}>
            <Contact />
          </section>
        </div>
      </MousePositionProvider>
    </main>
  );
};

export default Home;
