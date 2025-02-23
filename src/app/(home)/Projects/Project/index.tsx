"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./project.module.scss";

export default function Index({
  index,
  name,
  role,
  details,
  src,
  setModal,
  activeIndex,
  setActiveIndex,
}: any) {
  const isOpen = activeIndex === index;

  return (
    <motion.li
      className={styles.project}
      onClick={() => {
        setActiveIndex(isOpen ? null : index);
        setModal({ active: false, index });
      }}
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <div className={styles.project__title}>
        <h3 className={styles.project__name}>{name}</h3>
        <p className={styles.project__role}>{role}</p>
      </div>
      <motion.div
        className={styles.project__details}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: isOpen ? 0.8 : 0.6,
          ease: "easeInOut",
          delay: isOpen ? 0.3 : 0.5,
        }}
      >
        <p className={styles.project__description}>{details}</p>
        <Image
          className={styles.project__image}
          src={`/images/${src}`}
          alt={name}
          width={300}
          height={0}
        />
      </motion.div>
    </motion.li>
  );
}
