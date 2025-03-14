import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./textSwitch.module.scss";

interface TextItem {
  text: string;
  color: string;
}

interface TextSwitchProps {
  items: TextItem[];
  size?: keyof JSX.IntrinsicElements;
}

const TextSwitch: React.FC<TextSwitchProps> = ({ items, size = "h1" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minWidth, setMinWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (textRef.current) {
      setMinWidth(textRef.current.clientWidth);
    }
  }, []);

  const wordVariants = {
    initial: { y: "50%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: { ease: "easeOut", duration: 1.5 },
    },
    exit: {
      y: "-100%",
      opacity: 0.8,
      transition: { ease: "easeIn", duration: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const TitleTag = size as keyof JSX.IntrinsicElements;

  return (
    <div
      className={styles.textSwitch}
      style={{
        color: items[currentIndex].color,
        minWidth: minWidth || "auto",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          ref={textRef}
          key={items[currentIndex].text}
          className={styles.textSwitch__item}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {items[currentIndex].text.split("").map((char, i) => (
            <motion.span
              key={i}
              className={styles.textSwitch__letter}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <TitleTag className={styles.textSwitch__text}>{char}</TitleTag>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextSwitch;
