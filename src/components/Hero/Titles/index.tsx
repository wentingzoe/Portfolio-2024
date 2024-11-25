import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./titles.module.scss";

export default function Titles() {
  const titles = ["Developer", "Designer"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Handle looping through titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [titles.length]);

  // Variants for the word container
  const wordVariants = {
    initial: { y: "50%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1.5,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0.8,
      transition: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
  };

  // Variants for the individual letters
  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={styles.titles}>
      <AnimatePresence mode="wait">
        <motion.div
          key={titles[currentTitleIndex]}
          className={styles.titles__item}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {titles[currentTitleIndex].split("").map((char, i) => (
            <motion.h1
              key={i}
              className={styles.titles__letter}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {char}
            </motion.h1>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
