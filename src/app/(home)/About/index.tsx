import React from "react";
import styles from "./about.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";
import DotSquare from "@/components/DotSquare";
import InfiniteText from "@/app/(home)/About/InfiniteText";
import MoreInfo from "@/app/(home)/About/MoreInfo";
import StarLine from "@/components/StarLine";

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
        <MoreInfo />
        <InfiniteText />
      </div>
      <div className={styles.about__details}>
        <h5 className={styles.about__detailsTitle}>What I do</h5>
        <p className={styles.about__detailsCTA}>
          I can assist you in designing a digital product or enhancing an
          existing one to make it more visually appealing, interactive, and
          user-friendly.{" "}
        </p>
        <div className={styles.about__list}>
          <div className={styles.about__listTitle}>
            <div className={styles.about__listIcon}>
              <StarLine color="var(--color-light)" lineWidth={800} />
            </div>
            <h3>Expertise</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
