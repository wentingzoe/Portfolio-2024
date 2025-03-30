import React from "react";
import styles from "./aboutMe.module.scss";
import FollowEye from "@/components/FollowEye";
import DotSquare from "@/components/DotSquare";
import { useMousePosition } from "@/context/MousePositionContext";
import Image from "next/image";
import TextSwitch from "@/components/TextSwitch";
import { about_name } from "@/utils/text";
// import Expertise from "./Expertise";
import Expertise, { ExpertiseHandle } from "./Expertise";
import StarLine from "@/components/StarLine";
import { useBreakpoint } from "@/context/BreakpointContext";
import FloatingRect from "@/components/FloatingRect";
import { aboutFloatingRectConfig } from "@/components/FloatingRect/floatingRectConfigs";

type AboutMeProps = {
  expertiseRef: React.Ref<ExpertiseHandle>;
};

export default function AboutMe({ expertiseRef }: AboutMeProps) {
  const mousePosition = useMousePosition();
  const breakpoint = useBreakpoint();
  const decorConfig = aboutFloatingRectConfig[breakpoint];

  return (
    <div className={styles.aboutMe}>
      <div className={styles.aboutMe__ahead}>
        <h5>Who I am</h5>
        <h5>What I do</h5>
      </div>
      {/* Who I am */}
      <div className={styles.aboutMe__who}>
        <div className={styles.aboutMe__content}>
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
          <div className={styles.aboutMe__row}>
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
          </div>
          <div className={styles.aboutMe__row}>
            <div className={styles.aboutMe__decor}>
              <DotSquare color="var(--color-light)" />
            </div>
            <div className={styles.aboutMe__description}>
              <p>
                A web developer & digital designer passionate about crafting
                bold, interactive, and meaningful experiences.
              </p>
              <p>
                With a love for visual storytelling and motion design, I build
                experiences that captivate and engage users.
              </p>
            </div>
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
      {/* bar */}
      <div className={styles.aboutMe__bar}>
        <FloatingRect
          componentId="about"
          fixedRectSize={decorConfig.fixedRectSize}
          rects={decorConfig.rects}
        />
      </div>

      {/* What I Do */}
      <div className={styles.aboutMe__what}>
        <Expertise ref={expertiseRef} />
      </div>
    </div>
  );
}
