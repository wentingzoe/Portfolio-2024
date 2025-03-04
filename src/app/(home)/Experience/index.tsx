import React from "react";
import styles from "./experience.module.scss";

export default function Experience() {
  return (
    <div className={styles.experience}>
      <h5 className={styles.experience__title}>Experience</h5>
      <div className={styles.experience__content}>
        <div className={styles.experience__description}>
          <p>
            Over the years, I’ve collaborated with visionary teams to build
            seamless, high-performance web experiences.
          </p>
          <p>
            My work blends code, motion, and design to create immersive digital
            products.
          </p>
        </div>
        <div className={styles.experience__formula}>
          <h2>Code</h2>
          <h2>× Motion </h2>
          <h2>× Design</h2>
          <div className={styles.experience__line}></div>
          <h2>= Digital Magic</h2>
        </div>
      </div>
    </div>
  );
}
