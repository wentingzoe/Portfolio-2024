"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./expertise.module.scss";
import { about_expertise } from "@/utils/text";
import { useBreakpoint } from "@/context/BreakpointContext";

export default function Expertise() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const breakpoint = useBreakpoint();

  // Initial GSAP setup
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const front = card.querySelector(`.${styles.expertise__front}`);
      const back = card.querySelector(`.${styles.expertise__back}`);

      // Reset rotations
      gsap.set([front, back], {
        rotationX: 0,
        rotationY: 0,
      });

      if (breakpoint === "desktop") {
        // Desktop: Rotate Y (left to right)
        gsap.set([front, back], { transformOrigin: "left center" });
        gsap.set(back, { rotationY: -180 });
      } else {
        // Tablet & smaller: Rotate X (top to bottom)
        gsap.set([front, back], { transformOrigin: "top center" });
        gsap.set(back, { rotationX: -180, opacity: 0 });
      }
    });
  }, [breakpoint]);

  // Hover Animation Logic
  useEffect(() => {
    const handleCardAction = (index: number, isEntering: boolean) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const front = card.querySelector(`.${styles.expertise__front}`);
      const back = card.querySelector(`.${styles.expertise__back}`);
      if (!front || !back) return;

      if (breakpoint === "desktop") {
        // Desktop: Rotate Y (Left to Right)
        if (isEntering) {
          gsap.to(front, {
            rotationY: 180,
            duration: 0.8,
            ease: "cubic-bezier(0.7, 0, 0.3, 1)",
          });
          gsap.to(back, {
            rotationY: 0,
            duration: 0.8,
            ease: "cubic-bezier(0.7, 0, 0.3, 1)",
          });
        } else {
          gsap.to(front, { rotationY: 0, duration: 0.8 });
          gsap.to(back, { rotationY: -180, duration: 0.8 });
        }
      } else {
        // Tablet: Rotate X (Top to Bottom)
        if (isEntering) {
          gsap.to(front, {
            rotationX: 180,
            opacity: 0,
            duration: 0.8,
            ease: "cubic-bezier(0.7, 0, 0.3, 1)",
          });
          gsap.to(back, {
            rotationX: 0,
            opacity: 1,
            duration: 0.8,
            ease: "cubic-bezier(0.7, 0, 0.3, 1)",
          });
        } else {
          gsap.to(front, {
            rotationX: 0,
            opacity: 1,
            duration: 0.6,
          });
          gsap.to(back, {
            rotationX: -180,
            opacity: 0,
            duration: 0.6,
          });
        }
      }
    };

    // Event Listeners
    const cards = cardsRef.current;
    const enterHandlers: (() => void)[] = [];
    const leaveHandlers: (() => void)[] = [];

    cards.forEach((card, index) => {
      if (!card) return;

      const enter = () => handleCardAction(index, true);
      const leave = () => handleCardAction(index, false);

      enterHandlers.push(enter);
      leaveHandlers.push(leave);

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
    });

    return () => {
      // Cleanup listeners
      cards.forEach((card, index) => {
        if (!card) return;
        card.removeEventListener("mouseenter", enterHandlers[index]);
        card.removeEventListener("mouseleave", leaveHandlers[index]);
      });
    };
  }, [breakpoint]);

  return (
    <div className={styles.expertise}>
      {about_expertise.map((expertise, index) => (
        <div
          className={styles.expertise__item}
          key={`expertise_${index}`}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
        >
          {/* Front Side */}
          <div
            className={`${styles.expertise__front} ${
              index === 2 ? styles.rightLine : ""
            }`}
          >
            <h2 className={`${styles.expertise__title} small`}>
              {expertise.title}
            </h2>
            <h1 className={styles.expertise__number}>{expertise.number}</h1>
          </div>
          {/* Back Side */}
          <div className={styles.expertise__back}>
            <h2 className={`${styles.expertise__title2} small`}>
              {expertise.title}
            </h2>
            <h1 className={styles.expertise__number}>{expertise.number}</h1>
            <div className={styles.expertise__content}>
              <div className={styles.expertise__description}>
                <h6>{expertise.descriptionTitle}</h6>
                <p className="medium">{expertise.description}</p>
              </div>
              <div className={styles.expertise__tools}>
                <h6>Tools</h6>
                <ul className={styles.expertise__list}>
                  {expertise.tools.map((tool, index) => (
                    <li key={`tool_${index}`}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
