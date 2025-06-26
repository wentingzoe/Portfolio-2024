"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./modal.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { modalScale } from "@/utils/animation";
import { useMousePosition } from "@/context/MousePositionContext";

interface ModalProps {
  projects: {
    src: string;
    name: string;
    color?: string;
  }[];
  modal: {
    active: boolean;
    index: number;
  };
  projectsRef: React.RefObject<HTMLDivElement>;
  pageRef?: React.RefObject<HTMLDivElement>;
}

export default function Modal({ projects, modal, projectsRef }: ModalProps) {
  const { active, index } = modal;
  const container = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [isWorkPage, setIsWorkPage] = useState(false);

  useEffect(() => {
    // Detect if we're on the work page
    if (window.location.pathname.startsWith("/work")) {
      setIsWorkPage(true);

      console.log("Work page detected !!!!!");
    }
  }, []);

  useEffect(() => {
    if (
      !mousePosition ||
      !container.current ||
      !cursor.current ||
      !cursorLabel.current ||
      !projectsRef.current
    )
      return;

    const { x, y } = mousePosition;
    const projectsRect = projectsRef.current.getBoundingClientRect();

    let clientX, clientY;

    if (isWorkPage) {
      clientX = x;
      clientY = y;
    } else {
      // For home page, use the original calculation
      const sectionTopOffset = projectsRect.top + window.scrollY;
      const sectionLeftOffset = projectsRect.left + window.scrollX;
      clientX = x - sectionLeftOffset + window.scrollX;
      clientY = y + window.scrollY - sectionTopOffset;
    }

    // Apply the positioning with GSAP
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

    moveContainerX(clientX);
    moveContainerY(clientY);
    moveCursorX(clientX);
    moveCursorY(clientY);
    moveCursorLabelX(clientX);
    moveCursorLabelY(clientY);
  }, [mousePosition, isWorkPage, projectsRef]);

  return (
    <>
      <motion.div
        ref={container}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={`${styles.modal} ${
          isWorkPage ? styles["modal--work"] : styles["modal--home"]
        }`}
      >
        <div
          style={{ top: index * -100 + "%" }}
          className={styles.modal__slider}
        >
          {projects.map((project, idx) => {
            const { src, name } = project;
            return (
              <div
                key={`modal_${idx}`}
                style={{ backgroundColor: project.color || "#000000" }}
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
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={`${styles.modal__cursor} ${
          isWorkPage ? styles["modal--work"] : styles["modal--home"]
        }`}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        variants={modalScale}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={`${styles.modal__cursorLabel} ${
          isWorkPage ? styles["modal--work"] : styles["modal--home"]
        }`}
      >
        <p>View</p>
      </motion.div>
    </>
  );
}
