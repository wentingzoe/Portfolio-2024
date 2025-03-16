"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./expertise.module.scss";
import { about_expertise } from "@/utils/text";

export default function Expertise() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const front = card.querySelector(`.${styles.expertise__front}`);
      const back = card.querySelector(`.${styles.expertise__hover}`);

      gsap.set([front, back], {
        transformPerspective: 1000,
        transformOrigin: "left center",
      });
      gsap.set(back, { rotationY: 180 });
      gsap.set(front, { rotationY: 0 });

      card.addEventListener("mouseenter", () => {
        gsap.to(front, {
          duration: 0.8,
          rotationY: -180,
          ease: "power2.inOut",
        });
        gsap.to(back, { duration: 0.8, rotationY: 0, ease: "power2.inOut" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(front, { duration: 0.8, rotationY: 0, ease: "power2.inOut" });
        gsap.to(back, { duration: 0.8, rotationY: 180, ease: "power2.inOut" });
      });
    });
  }, []);

  return (
    <div className={styles.expertise}>
      {about_expertise.map((expertise, index) => (
        <div
          className={styles.expertise__item}
          key={`expertise_${index}`}
          ref={(el) => (cardsRef.current[index] = el)}
        >
          {/* Front Side */}
          <div className={styles.expertise__front}>
            <h2 className={styles.expertise__title}>{expertise.title}</h2>
            <h1 className={styles.expertise__number}>{expertise.number}</h1>
          </div>
          {/* Hover Side */}
          <div className={styles.expertise__hover}>
            <div className={styles.expertise__content}>
              <h1 className={styles.expertise__number}>{expertise.number}</h1>
              <div className={styles.expertise__description}>
                <h6>{expertise.descriptionTitle}</h6>
                <p className="small">{expertise.description}</p>
              </div>
              <div className={styles.expertise__tools}>
                <h6>Tools</h6>
                <ul>
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
