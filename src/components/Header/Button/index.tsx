import { motion } from "framer-motion";
import styles from "./button.module.scss";
import DotSquare from "@/components/DotSquare";

interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

export default function Button({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.bg}>
        <DotSquare
          color={isActive ? "var(--color-primary)" : "var(--color-light)"}
        />
      </div>
      <div className={styles.button} onClick={toggleMenu}>
        <motion.div
          className={styles.slider}
          animate={{ top: isActive ? "-100%" : "0%" }}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className={styles.el}>
            <PerspectiveText label="Menu" />
          </div>
          <div className={styles.el}>
            <PerspectiveText label="Close" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface PerspectiveTextProps {
  label: string;
}

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className={styles.perspectiveText}>
      <span>{label}</span>
      <span>{label}</span>
    </div>
  );
}
