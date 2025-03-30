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
import { cardFlip } from "@/utils/expertiseFlip";

// Define the return types for desktop and mobile implementations
interface DesktopCardFlipControls {
  flipCards: (progress: number) => void;
  resetCards: () => void;
  completeCards: () => void;
  cleanup?: () => void;
}

interface MobileCardFlipControls {
  kill: () => void;
}

// Union type that covers both possible return types
type CardFlipReturnType =
  | DesktopCardFlipControls
  | MobileCardFlipControls
  | void;

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
      // Initialize variables for tracking card flip state
      let cardFlipControls: DesktopCardFlipControls | null = null;
      let allCardsFlipped = false;

      // Main horizontal scrolling timeline
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
            // Calculate progress in overall scroll
            const progress = self.progress;

            // AboutMe section begins at 25% and ends at 50% of total scroll
            const aboutMeStart = 0.15;
            const aboutMeEnd = 0.4;

            // If we're in the AboutMe section range
            if (
              progress >= aboutMeStart &&
              progress <= aboutMeEnd &&
              cardFlipControls
            ) {
              // Calculate local progress for card flips (0-1 range)
              const localProgress =
                (progress - aboutMeStart) / (aboutMeEnd - aboutMeStart);

              // Flip cards based on this progress
              cardFlipControls.flipCards(localProgress);

              // Check if all cards have been flipped
              if (localProgress >= 0.99) {
                allCardsFlipped = true;
              }
            }

            // Prevent scrolling past AboutMe until all cards are flipped
            if (progress > aboutMeEnd && !allCardsFlipped) {
              // Force scroll position to stay at AboutMe
              self.scroll(
                self.start + (aboutMeEnd - 0.01) * (self.end - self.start)
              );
            }
          },
        },
      });

      // Optimize performance
      gsap.set(sectionsRef.current, {
        willChange: "transform",
      });

      // First horizontal movement: Hero to AboutMe
      mainTimeline.to(sections, {
        xPercent: -100,
        ease: "none",
        duration: 1,
      });

      // Second horizontal movement: AboutMe to Experience/Projects
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
        const aboutMeSection = sections?.[1];

        if (cards && cards.length > 0 && aboutMeSection) {
          const result = cardFlip({
            cards,
            trigger: aboutMeSection as HTMLElement,
            breakpoint,
          });

          // Type guard to ensure we have desktop controls
          if (result && "flipCards" in result) {
            cardFlipControls = result;
          }
        }
      }, 100);

      return () => {
        // Clean up
        if (cardFlipControls?.cleanup) {
          cardFlipControls.cleanup();
        }
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
      let mobileFlipControl: MobileCardFlipControls | null = null;
      setTimeout(() => {
        const cards = expertiseRef.current?.cards;
        const aboutMeSection = sections?.[1];

        if (cards && cards.length > 0 && aboutMeSection) {
          const result = cardFlip({
            cards,
            trigger: aboutMeSection as HTMLElement,
            breakpoint,
          });

          // Type guard to ensure we have mobile controls
          if (result && "kill" in result) {
            mobileFlipControl = result as MobileCardFlipControls;
          }
        }
      }, 100);

      return () => {
        if (mobileFlipControl) {
          mobileFlipControl.kill();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
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
