import React, { useRef } from "react";
import styles from "./about.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";
import DotSquare from "@/components/DotSquare";
import InfiniteText from "@/app/(home)/About/InfiniteText";
import MoreInfo from "@/app/(home)/About/MoreInfo";
import StarLine from "@/components/StarLine";
import { useInView, motion } from "framer-motion";
import {
  perspectiveRight,
  opacity,
  containerVariants,
} from "@/utils/animation";
import { expertiseItems } from "@/utils/nav-items";
import TypingText from "@/components/TypingText";
import { aboutDescription } from "@/utils/text";

export default function About() {
  const mousePosition = useMousePosition();
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { amount: 0.5 });
  return (
    <motion.div ref={aboutRef} className={styles.about}>
      <div className={styles.about__content}>
        <h5 className={styles.about__title}>About Me</h5>
        <div className={styles.about__eyeDecor}>
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.about__description}
        >
          <motion.div variants={opacity} className={styles.about__decor} />
          <motion.div variants={opacity} className={styles.about__intro}>
            <TypingText
              text={aboutDescription.text1}
              as="h3"
              className={styles.about__text1}
              speed={0.04}
              initialDelay={1}
              isVisible={isInView}
            />
            <TypingText
              text={aboutDescription.text2}
              as="h4"
              className={styles.about__text2}
              speed={0.05}
              initialDelay={1.2}
              isVisible={isInView}
            />
          </motion.div>
        </motion.div>
        <div className={styles.about__moreInfo}>
          <MoreInfo />
        </div>
        <motion.div className={styles.about__infiniteText} variants={opacity}>
          <InfiniteText />
        </motion.div>
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
          <ul className={styles.about__listItems}>
            {expertiseItems.map((item, i) => {
              const { title } = item;
              return (
                <motion.li
                  key={`e_${i}`}
                  className={styles.about__listItem}
                  custom={i}
                  variants={perspectiveRight}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <h4>{title}</h4>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
