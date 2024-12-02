import React from "react";
import { motion } from "framer-motion";
import styles from "./button.module.scss";
import DotSquare from "@/components/DotSquare";

interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

export default function Button({ isActive, toggleMenu }: ButtonProps) {
  return (
    <motion.div
      className={styles.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div className={styles.button__bg}>
        <DotSquare
          color={isActive ? "var(--color-primary)" : "var(--color-light)"}
        />
      </motion.div>
      <motion.div className={styles.button__content} onClick={toggleMenu}>
        <motion.div
          className={styles.button__slider}
          animate={{ top: isActive ? "-100%" : "0%" }}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className={styles.button__el}>
            <PerspectiveText label="Menu" />
          </div>
          <div className={styles.button__el}>
            <PerspectiveText label="Close" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
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
