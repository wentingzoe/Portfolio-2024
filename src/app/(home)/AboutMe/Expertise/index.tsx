"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import styles from "./expertise.module.scss";
import { about_expertise } from "@/utils/text";

export type ExpertiseHandle = {
  cards: HTMLDivElement[];
  section: HTMLDivElement | null;
};

const Expertise = forwardRef<ExpertiseHandle>((_, ref) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    cards: cardsRef.current.filter(Boolean) as HTMLDivElement[],
    section: sectionRef.current,
  }));

  return (
    <div className={styles.expertise} ref={sectionRef}>
      {about_expertise.map((expertise, index) => (
        <div
          className={styles.expertise__item}
          key={`expertise_${index}`}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
        >
          <div className={styles.expertise__front}>
            <h2 className={`${styles.expertise__title} small`}>
              {expertise.title}
            </h2>
            <h1 className={styles.expertise__number}>{expertise.number}</h1>
          </div>
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
                  {expertise.tools.map((tool, i) => (
                    <li key={`tool_${i}`}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Expertise;
