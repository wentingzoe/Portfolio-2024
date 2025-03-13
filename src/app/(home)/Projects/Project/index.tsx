"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./project.module.scss";

export default function Index({
  index,
  name,
  role,
  details,
  src,
  tags,
  year,
  setModal,
  activeIndex,
  setActiveIndex,
}: {
  index: number;
  name: string;
  role: string;
  details: string;
  src: string;
  tags: string[];
  year: number;
  setModal: (modal: { active: boolean; index: number }) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) {
  const isOpen = activeIndex === index;

  return (
    <motion.li
      className={`${styles.project} ${isOpen ? styles.project__open : ""}`}
      onClick={() => {
        setActiveIndex(isOpen ? null : index);
        setModal({ active: false, index });
      }}
      onMouseEnter={() => {
        if (!isOpen) setModal({ active: true, index });
      }}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <motion.div
        className={styles.project__list}
        whileHover={!isOpen ? { x: 5 } : {}}
      >
        <motion.h4
          className={styles.project__name}
          animate={!isOpen ? { x: 10 } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {name}
        </motion.h4>
        <motion.p
          className={`${styles.project__role} medium`}
          animate={!isOpen ? { x: 0 } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {role}
        </motion.p>
        <motion.p
          className={`${styles.project__year} medium`}
          animate={!isOpen ? { x: -10 } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {year}
        </motion.p>
      </motion.div>
      <motion.div
        className={styles.project__details}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: isOpen ? 0.5 : 0.3,
          ease: "easeInOut",
          delay: isOpen ? 0.3 : 0,
        }}
      >
        <div className={styles.project__detailsBox}>
          <p className={`${styles.project__description} medium`}>{details}</p>
          <div className={styles.project__tags}>
            {tags.map((tag, index) => (
              <p key={index} className={`${styles.project__tag} medium`}>
                {tag}
              </p>
            ))}
          </div>
          <button className={styles.project__button}>View Project</button>
        </div>
        <motion.div
          className={styles.project__imageWrapper}
          initial={{ opacity: 0, height: -50 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
          transition={{ duration: 0.5, delay: isOpen ? 0.5 : 0 }}
        >
          <Image
            className={styles.project__image}
            src={`/images/${src}`}
            alt={name}
            width={300}
            height={0}
          />
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
