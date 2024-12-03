import React from "react";
import styles from "./creative.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";
import Star from "@/components/Star";

const Creative: React.FC = () => {
  const mousePosition = useMousePosition();

  return (
    <div className={styles.creative}>
      <h1>Cr</h1>
      <div className={styles.creative__eye}>
        <FollowEye
          mousePosition={mousePosition}
          backgroundColor="var(--color-secondary)"
        />
      </div>
      <h1>at</h1>
      <div className={styles.creative__i}>
        <svg
          viewBox="0 0 40 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className={styles.responsiveSvg}
        >
          <path d="M29.4176 127H10.5376V42.2H29.4176V127Z" fill="white" />
        </svg>

        <div className={styles.creative__star}>
          <Star color="var(--color-secondary)" />
        </div>
      </div>
      <h1>ve</h1>
    </div>
  );
};

export default Creative;
