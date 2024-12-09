import React from "react";
import styles from "./moreInfo.module.scss";
import { socialLinks } from "@/utils/nav-items";
import Star from "@/components/Star";
import DotSquare from "@/components/DotSquare";

export default function index() {
  return (
    <div className={styles.moreInfo}>
      <div className={styles.moreInfo__title}>
        <div className={styles.moreInfo__star}>
          <Star color="var(--color-primary)" />
        </div>
        <span className="bold"> Know More About Me</span>
      </div>
      <div className={styles.moreInfo__links}>
        {socialLinks.map((link, i) => {
          const { title, href } = link;
          if (i < 3) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                <p>{title}</p>
              </a>
            );
          }
        })}
      </div>
      <div className={styles.moreInfo__dotSquare}>
        <DotSquare color="var(--color-secondary)" />
      </div>
    </div>
  );
}
