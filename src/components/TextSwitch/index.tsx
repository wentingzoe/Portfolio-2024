import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./textSwitch.module.scss";

interface TextSwitchProps {
  items: Array<{ text: string; color?: string }>;
  size?: keyof JSX.IntrinsicElements;
}

const TextSwitch: React.FC<TextSwitchProps> = ({
  items = [],
  size = "div",
}) => {
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
      transition: { ease: "easeOut", duration: 0.7 },
    },
    exit: {
      y: "-50%",
      opacity: 0,
      transition: { ease: "easeIn", duration: 0.4 },
    },
  };

  // Character reveal animation, but with normal spacing
  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.4,
        ease: "easeOut",
      },
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
          <TitleTag className={styles.textSwitch__wrapper}>
            {items[currentIndex].text.split("").map((char, i) => (
              <motion.span
                key={i}
                className={styles.textSwitch__letter}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {char}
              </motion.span>
            ))}
          </TitleTag>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextSwitch;
