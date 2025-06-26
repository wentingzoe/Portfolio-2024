"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.scss";
import { useBreakpoint } from "@/context/BreakpointContext";
import Hero from "./Hero";
import GradientBg from "@/components/GradientBg";
import Projects from "./Projects";
import Experience from "./Experience";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import { cardFlip } from "@/utils/expertiseFlip";

interface DesktopCardFlipControls {
  flipCards: (progress: number) => void;
  resetCards: () => void;
  completeCards: () => void;
  cleanup?: () => void;
}

interface MobileCardFlipControls {
  kill: () => void;
}

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<{
    cards: HTMLDivElement[];
    section: HTMLDivElement | null;
  } | null>(null);

  const breakpoint = useBreakpoint();

  /**
   * ScrollTrigger recalculation when the Project modal expands.
   */
  const handleProjectExpand = () => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  /**
   * Register ScrollTrigger once on the client.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  /**
   * Main animation logic – re‑initialised each time the breakpoint changes.
   */
  useEffect(() => {
    const container = sectionsRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];

    // Clear out any previous ScrollTriggers before creating new ones.
    ScrollTrigger.getAll().forEach((t) => t.kill());

    /** Collect disposers created inside this effect. */
    const cleanupFns: (() => void)[] = [];

    if (breakpoint === "desktop") {
      /* ───────────────────────────── Desktop logic ───────────────────────────── */
      let cardFlipControls: DesktopCardFlipControls | null = null;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () =>
            `+=${
              container.scrollWidth +
              (sections[2].scrollHeight - window.innerHeight)
            }`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const aboutStart = 0.15;
            const aboutEnd = 0.4;

            if (
              progress >= aboutStart &&
              progress <= aboutEnd &&
              cardFlipControls
            ) {
              const local = (progress - aboutStart) / (aboutEnd - aboutStart);
              cardFlipControls.flipCards(local);
            }
          },
        },
      });

      gsap.set(container, { willChange: "transform" });

      // Horizontal scroll between sections
      mainTl
        .to(sections, { xPercent: -100, ease: "none", duration: 1 })
        .to(sections, { xPercent: -200, ease: "none", duration: 1 })
        .to(sections[2], {
          y: () => `-${sections[2].scrollHeight - window.innerHeight}px`,
          ease: "none",
          duration: 1,
        })
        .to(sections, { xPercent: -300, ease: "none", duration: 1 });

      // Card‑flip animation inside About Me (desktop)
      setTimeout(() => {
        const cards = expertiseRef.current?.cards;
        const aboutMeSection = sections[1];

        if (cards?.length && aboutMeSection) {
          const result = cardFlip({
            cards,
            trigger: aboutMeSection,
            breakpoint,
          });

          if (result && "flipCards" in result) {
            cardFlipControls = result;
          }
        }
      }, 100);

      // Refresh when Projects/Experience column height changes
      const section3 = sections[2];
      const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      resizeObserver.observe(section3);
      cleanupFns.push(() => resizeObserver.disconnect());

      cleanupFns.push(() => {
        if (cardFlipControls?.cleanup) cardFlipControls.cleanup();
      });
    } else {
      /* ─────────────────────── Mobile / Tablet logic ────────────────────────── */
      gsap.set(sections, { clearProps: "all" });

      let mobileFlipControl: MobileCardFlipControls | null = null;

      setTimeout(() => {
        const cards = expertiseRef.current?.cards;
        const aboutMeSection = sections[1];

        if (cards?.length && aboutMeSection) {
          const result = cardFlip({
            cards,
            trigger: aboutMeSection,
            breakpoint,
          });

          if (result && "kill" in result && typeof result.kill === "function") {
            mobileFlipControl = result as MobileCardFlipControls;
          }
        }
      }, 100);

      cleanupFns.push(() => {
        if (mobileFlipControl) mobileFlipControl.kill();
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [breakpoint]);

  return (
    <main>
      <div className={styles.background}>
        <GradientBg />
      </div>

      <div ref={sectionsRef} className={styles.container}>
        <section className={`${styles.section} ${styles.section1}`}>
          <Hero />
        </section>

        <section className={`${styles.section} ${styles.section2}`}>
          <AboutMe expertiseRef={expertiseRef} />
        </section>

        <section className={`${styles.section} ${styles.section3}`}>
          <Projects onProjectExpand={handleProjectExpand} />
          <Experience />
        </section>

        <section className={`${styles.section} ${styles.section4}`}>
          <Contact />
        </section>
      </div>
    </main>
  );
};

export default Home;
