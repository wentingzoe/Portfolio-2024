import React from "react";
import styles from "./aboutMe.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";
import Image from "next/image";
import TextSwitch from "@/components/TextSwitch";
import { about_name } from "@/utils/text";

export default function AboutMe() {
  const mousePosition = useMousePosition();
  return (
    <div className={styles.aboutMe}>
      <div className={styles.aboutMe__who}>
        <h5 className={styles.aboutMe__title}>Who I am</h5>
        <div className={styles.aboutMe__content}>
          <div className={styles.aboutMe__hello}>
            <h2>H</h2>
            <FollowEye
              mousePosition={mousePosition}
              backgroundColor="var(--color-primary)"
            />
            <h2>llo</h2>
          </div>
          <div className={styles.aboutMe__im}>
            <Image src="/images/i'm.svg" alt="im" fill />
          </div>
          <div className={styles.aboutMe__name}>
            <TextSwitch items={about_name} size="h2" />
          </div>
          <div className={styles.aboutMe__description}></div>
        </div>
      </div>
      <div className={styles.aboutMe__what}>
        <h5 className={styles.aboutMe__title}>What I do</h5>
      </div>
    </div>
  );
}
