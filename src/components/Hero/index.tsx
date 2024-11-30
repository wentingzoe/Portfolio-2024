"use client";
import React from "react";
import styles from "./hero.module.scss";
import Image from "next/image";
import Creative from "./Creative";
import Titles from "./Titles";
import FloatingBox from "./FloatingBox";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useBreakpoint } from "@/context/BreakpointContext";
import Star from "@/components/Star";

export default function Hero() {
  const currentTime = useCurrentTime("en-US", { timeZone: "America/Toronto" });
  const breakpoint = useBreakpoint();

  const starColor =
    breakpoint === "desktop"
      ? "var(--color-secondary)"
      : "var(--color-primary)";

  return (
    <div className={styles.hero}>
      <FloatingBox />
      <div className={styles.hero__content}>
        <div className={styles.hero__name}>
          <h2 className={styles.hero__firstName}>Wenting</h2>
          <h2 className={styles.hero__lastName}>Yong</h2>
        </div>
        <div className={styles.hero__title}>
          <Creative />
          <Titles />
          <p className={styles.hero__subtitle}>
            Specialized in Web Design, UX / UI, SEO, and Front End Development.
          </p>
        </div>
      </div>
      <div className={styles.hero__location}>
        <div className={styles.hero__icon}>
          <Star color={starColor} />
        </div>
        <p className={`${styles.hero__time} small`}>
          Based in Canada EST {currentTime}
        </p>
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
