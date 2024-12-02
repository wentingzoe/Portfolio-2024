"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import styles from "./header.module.scss";
import Nav from "./Nav/index";
import { menu } from "@/utils/animation";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
