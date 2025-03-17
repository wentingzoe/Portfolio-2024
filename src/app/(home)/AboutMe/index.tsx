import React from "react";
import styles from "./aboutMe.module.scss";
import FollowEye from "@/components/FollowEye";
import DotSquare from "@/components/DotSquare";
import { useMousePosition } from "@/context/MousePositionContext";
import Image from "next/image";
import TextSwitch from "@/components/TextSwitch";
import { about_name } from "@/utils/text";
import Expertise from "./Expertise";
import FloatingBar from "./FloatingBar";
import StarLine from "@/components/StarLine";

export default function AboutMe() {
  const mousePosition = useMousePosition();
  return (
    <div className={styles.aboutMe}>
      {/* Who I am */}
      <div className={styles.aboutMe__who}>
        <h5 className={styles.aboutMe__title}>Who I am</h5>
        <div className={styles.aboutMe__hello}>
          <h2>H</h2>
          <div className={styles.aboutMe__followEye}>
            <FollowEye
              mousePosition={mousePosition}
              backgroundColor="var(--color-primary)"
            />
          </div>
          <h2>llo</h2>
        </div>
        <div className={styles.aboutMe__content}>
          <div className={styles.aboutMe__im}>
            <Image
              className={styles.aboutMe__image}
              src="/images/i'm.svg"
              alt="im"
              fill
            />
          </div>
          <div className={styles.aboutMe__name}>
            <TextSwitch items={about_name} size="h2" />
          </div>
          <div className={styles.aboutMe__description}>
            <p>
              A web developer & digital designer passionate about crafting bold,
              interactive, and meaningful experiences.
            </p>
            <p>
              With a love for visual storytelling and motion design, I build
              experiences that captivate and engage users.
            </p>
          </div>
          <div className={styles.aboutMe__decor}>
            <DotSquare color="var(--color-light)" />
          </div>
        </div>
        <div className={styles.aboutMe__cta}>
          <div className={styles.aboutMe__starLine}>
            <StarLine
              color="var(--color-primary)"
              lineWidth={200}
              isInDetails={true}
            />
          </div>
          <p className={`${styles.aboutMe__ctaText} regular`}>
            Let’s turn ideas into digital reality
          </p>
        </div>
      </div>

      {/* What I Do */}
      <div className={styles.aboutMe__what}>
        <div className={styles.aboutMe__bar}>
          <h5 className={styles.aboutMe__title2}>What I do</h5>
          <FloatingBar />
        </div>
        <div className={styles.aboutMe__expertise}>
          <Expertise />
        </div>
      </div>
    </div>
  );
}
