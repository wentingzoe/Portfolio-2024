"use client";
import React from "react";
import styles from "./hero.module.scss";
import Image from "next/image";
import Creative from "./Creative";
import Titles from "./Titles";
import FloatingBox from "./FloatingBox";
import { useCurrentTime } from "@/hooks/useCurrentTime";

export default function Hero() {
  const currentTime = useCurrentTime("en-US", { timeZone: "America/Toronto" });

  return (
    <div className={styles.hero}>
      <FloatingBox />
      <div className={styles.hero__content}>
        <div className={styles.hero__name}>
          <h2 className={styles.hero__name__fn}>Wenting</h2>
          <h2 className={styles.hero__name__ln}>Yong</h2>
        </div>
        <div className={styles.hero__title}>
          <Creative />
          <Titles />
          <p className={styles.hero__title__subtitle}>
            specialized in Web Design, UX / UI, SEO, and Front End Development.
          </p>
        </div>
        <div className={styles.hero__location}>
          <div className={styles.hero__location__icon}>
            <Image src="/images/star.svg" alt="location" fill priority />
          </div>
          <p className={`${styles.hero__location__time} small`}>
            Based in Canada EST {currentTime}
          </p>
        </div>
      </div>

      <div className={styles.hero__portrait}>
        <Image
          className={styles.hero__image}
          src="/images/hero_portrait.webp"
          alt="portrait"
          fill
          priority
        />
      </div>
    </div>
  );
}
