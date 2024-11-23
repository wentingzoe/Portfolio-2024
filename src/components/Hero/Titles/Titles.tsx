import React from "react";
import styles from "./titles.module.scss";

export default function Titles() {
  return (
    <div className={styles.titles}>
      <h1 className={styles.titles__text}>Developer</h1>
      <h1 className={styles.titles__text}>Designer</h1>
    </div>
  );
}
