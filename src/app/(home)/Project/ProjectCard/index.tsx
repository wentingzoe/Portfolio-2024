"use client";
import { useTransform, useScroll, motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import styles from "./projectCard.module.scss";

interface ProjectCardProps {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  i: number;
  progress: number;
  range: [number, number];
  targetScale: number;
}

export default function ProjectCard({
  title,
  description,
  src,
  link,
  color,
  i,
  progress,
  range,
  targetScale,
}: ProjectCardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const motionProgress = useMotionValue(progress);
  const scale = useTransform(motionProgress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          top: `calc(10vh + ${i * 10}vh)`,
        }}
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={`/images/${src}`} alt="image" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
