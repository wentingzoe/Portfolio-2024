"use client";
import React from "react";
import styles from "./hero.module.scss";
import Image from "next/image";
import Creative from "./Creative/Creative";
import Titles from "./Titles/Titles";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__title}>
        <Creative />
        <Titles />
      </div>
      <div className={styles.hero__bg}>
        <Image
          className={styles.hero__image}
          src="/images/hero_left_bg.svg"
          alt="bg"
          fill
          priority
        />
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
