"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.scss";
import { MousePositionProvider } from "@/context/MousePositionContext";
import { useBreakpoint } from "@/context/BreakpointContext";
import Hero from "./Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
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

    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (breakpoint === "desktop") {
      // Initialize card flip controls
      let cardFlipControls: any = null;
      const aboutMeSection = sections[1]; // Get the AboutMe section

      // Set up main horizontal scrolling timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () =>
            `+=${
              (sectionsRef.current?.scrollWidth ?? 0) +
              (sections[2].scrollHeight - window.innerHeight)
            }`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate main progress (overall page scroll)
            const progress = self.progress;

            // Determine the AboutMe section scroll range
            // For a 4-section layout, each section takes about 25% of the total scroll
            // Fine-tune these values based on your actual layout
            const aboutMeStart = 0.25; // AboutMe section becomes fully visible
            const aboutMeEnd = 0.5; // AboutMe section starts to scroll away

            // If we're in the AboutMe section range and card flip controls are available
            if (
              progress >= aboutMeStart &&
              progress <= aboutMeEnd &&
              cardFlipControls
            ) {
              // Calculate a local progress value for just the AboutMe section
              // Map aboutMeStart-aboutMeEnd to 0-1 range for the card flips
              const localProgress =
                (progress - aboutMeStart) / (aboutMeEnd - aboutMeStart);

              // Flip the cards based on this local progress
              cardFlipControls.flipCards(localProgress);
            }
          },
        },
      });

      // Optimize performance
      gsap.set(sectionsRef.current, {
        willChange: "transform",
      });

      // First horizontal movement: Hero to AboutMe (right edge aligned with right of screen)
      mainTimeline.to(sections, {
        xPercent: -100,
        ease: "none",
        duration: 1,
      });

      // AboutMe stays on screen while cards flip (this segment handled by the onUpdate function)

      // Third horizontal movement: AboutMe to Experience/Projects
      mainTimeline.to(sections, {
        xPercent: -200,
        ease: "none",
        duration: 1,
      });

      // Vertical scroll within the Experience/Projects section
      mainTimeline.to(sections[2], {
        y: () => `-${sections[2].scrollHeight - window.innerHeight}px`,
        ease: "none",
        duration: 1,
      });

      // Final horizontal movement to Contact
      mainTimeline.to(sections, {
        xPercent: -300,
        ease: "none",
        duration: 1,
      });

      // Initialize expertise flip with a delay to ensure DOM is ready
      setTimeout(() => {
        const cards = expertiseRef.current?.cards;

        if (cards && cards.length > 0 && aboutMeSection) {
          cardFlipControls = initExpertiseFlip({
            cards,
            trigger: aboutMeSection as HTMLElement,
            breakpoint,
          });
        }
      }, 100);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } else {
      // Mobile/tablet handling
      gsap.set(sections, {
        xPercent: 0,
        y: 0,
        clearProps: "all",
      });

      // Initialize expertise flips for mobile/tablet
      setTimeout(() => {
        const cards = expertiseRef.current?.cards;
        const aboutMeSection = sections?.[1];

        if (cards && cards.length > 0 && aboutMeSection) {
          initExpertiseFlip({
            cards,
            trigger: aboutMeSection as HTMLElement,
            breakpoint,
          });
        }
      }, 100);
    }

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
