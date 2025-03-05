"use client";
import { useEffect, useRef } from "react";
import styles from "./modal.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { modalScale } from "@/utils/animation";
import { useMousePosition } from "@/context/MousePositionContext";

export default function Modal({
  projects,
  modal,
}: {
  projects: { src: string; color: string; name: string }[];
  modal: { active: boolean; index: number };
}) {
  const { active, index } = modal;
  const container = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!mousePosition) return;
    const { x, y } = mousePosition;
    const moveContainerX = gsap.quickTo(container.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const moveContainerY = gsap.quickTo(container.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const moveCursorX = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const moveCursorY = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const moveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const moveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const clientX = x;
    const clientY = y;

    moveContainerX(clientX);
    moveContainerY(clientY);
    moveCursorX(clientX);
    moveCursorY(clientY);
    moveCursorLabelX(clientX);
    moveCursorLabelY(clientY);
  }, [mousePosition]);
  return (
    <>
      <motion.div
        ref={container}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modal}
      >
        <div
          style={{ top: index * -100 + "%" }}
          className={styles.modal__slider}
        >
          {projects.map(
            (
              project: { src: string; color: string; name: string },
              index: number
            ) => {
              const { src, color, name } = project;
              return (
                <div
                  key={`modal_${index}`}
                  style={{ backgroundColor: color }}
                  className={styles.modal__box}
                >
                  <Image
                    className={styles.modal__image}
                    src={`/images/${src}`}
                    alt={name}
                    width={300}
                    height={0}
                  />
                </div>
              );
            }
          )}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modal__cursor}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modal__cursorLabel}
      >
        <p>View</p>
      </motion.div>
    </>
  );
}
