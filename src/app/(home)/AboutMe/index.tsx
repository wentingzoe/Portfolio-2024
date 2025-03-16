import React from "react";
import styles from "./aboutMe.module.scss";
import FollowEye from "@/components/FollowEye";
import DotSquare from "@/components/DotSquare";
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
      </div>
      <div className={styles.aboutMe__what}>
        <div className={styles.aboutMe_bar}>
          <h5 className={styles.aboutMe__title}>What I do</h5>
        </div>
        <div className={styles.aboutMe__expertise}>
          <h2 className={styles.aboutMe__expertiseTitle}>Developer</h2>
          <h1 className={styles.aboutMe__number}>1</h1>
        </div>
        {/* <div
          className={`${styles.aboutMe__expertise} ${styles.aboutMe__hover}`}
        >
          <h1 className={styles.aboutMe__number}>1</h1>
          <div className={styles.aboutMe__expertiseContent}>
            <div className={styles.aboutMe__expertiseDescription}>
              <h6>Scalable & Modern Web Development</h6>
              <p className="small">
                Building fast, mobile-first, and fully responsive websites that
                adapt seamlessly to any screen size.
              </p>
            </div>
            <div className={styles.aboutMe__expertiseTools}>
              <h6>Tools</h6>
              <ul>
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>HTML5 & CSS3</li>
                <li>Tailwind CSS</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>PostgreSQL</li>
                <li>Docker</li>
                <li>GitHub Copilot</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.aboutMe__expertise2}></div>
      <div className={styles.aboutMe__expertise3}></div>
    </div>
  );
}
