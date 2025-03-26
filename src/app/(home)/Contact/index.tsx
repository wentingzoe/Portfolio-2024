import React from "react";
import styles from "./contact.module.scss";
import Image from "next/image";
import FloatingRect from "@/components/FloatingRect";
import FollowEye from "@/components/FollowEye";
import Star from "@/components/Star";
import { useBreakpoint } from "@/context/BreakpointContext";
import { useMousePosition } from "@/context/MousePositionContext";
import { contactFloatingRectConfig } from "@/components/FloatingRect/floatingRectConfigs";
import { socialLinks } from "@/utils/nav-items";
import StarLine from "@/components/StarLine";

export default function Contact() {
  const breakpoint = useBreakpoint();
  const decorConfig = contactFloatingRectConfig[breakpoint];
  const mousePosition = useMousePosition();
  return (
    <div className={styles.contact}>
      <FloatingRect
        fixedRectSize={decorConfig.fixedRectSize}
        rects={decorConfig.rects}
      />

      <div className={styles.contact__cta}>
        <div className={styles.contact__content}>
          <h2>Let&apos;s make</h2>
          <div className={styles.contact__row}>
            <h2>magic</h2>
            <div className={styles.contact__followEye}>
              <FollowEye
                mousePosition={mousePosition}
                backgroundColor="var(--color-secondary)"
              />
            </div>
          </div>
          <h2>together</h2>
          <div className={styles.contact__ctaText}>
            <div className={styles.contact__starLine}>
              <StarLine
                color="var(--color-secondary)"
                lineWidth={400}
                isInDetails={true}
              />
            </div>
            <h4>Get in Touch</h4>
          </div>
        </div>
      </div>
      <div className={styles.contact__visual}>
        <div className={styles.contact__portrait}>
          <Image
            className={styles.contact__image}
            src="/images/contact.webp"
            alt="portrait"
            fill
            priority
          />
        </div>
      </div>
      <div className={styles.contact__footer}>
        <div className={styles.contact__copyRight}>
          <div className={styles.contact__star}>
            <Star color="var(--color-secondary)" />
          </div>
          <p className={`${styles.contact__text} small`}>
            ©2024 Wenting Yong
            <br />
            All Rights Reserved
          </p>
        </div>
        <div className={styles.contact__social}>
          {socialLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <a href={href} key={`footer_${i}`}>
                {title}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
