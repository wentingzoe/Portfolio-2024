import React from "react";
import styles from "./about.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";
import DotSquare from "@/components/DotSquare";
import InfiniteText from "@/app/(home)/About/InfiniteText";

export default function About() {
  const mousePosition = useMousePosition();
  return (
    <div className={styles.about}>
      <div className={styles.about__content}>
        <div className={styles.about__eye}>
          <div className={styles.about__followEye}>
            <FollowEye
              mousePosition={mousePosition}
              backgroundColor="var(--color-primary)"
            />
          </div>
          <div className={styles.about__dotSquare}>
            <DotSquare color="var(--color-light)" />
          </div>
        </div>
        <div className={styles.about__welcome}>
          <div className={styles.about__decor}></div>

          <h5 className={styles.about__title}>About Me</h5>
          <div />
          <div className={styles.about__intro}>
            <h3>
              Hey,
              <br />
              I&apos;m Wenting (Zoe)!
            </h3>
            <h4 className={styles.about__detail}>
              A <b className={styles.about__bold}>web developer</b> and{" "}
              <b className={styles.about__bold}>digital designer</b>, I love
              crafting <b className={styles.about__bold}>visual</b>,{" "}
              <b className={styles.about__bold}>interactive</b>, and{" "}
              <b className={styles.about__bold}>responsive</b> web experiences.
            </h4>
          </div>
        </div>
        <InfiniteText />
      </div>
      <div className={styles.about__skills}></div>
    </div>
  );
}
