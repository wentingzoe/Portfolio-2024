import styles from "./projects.module.scss";
import { useState, useRef } from "react";
import Project from "./Project";
import Modal from "./Modal";
import { project_list } from "@/utils/text";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Index() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [100, 0]);
  return (
    <div ref={container} className={styles.projects}>
      <h5 className={styles.projects__title}> Selected Works</h5>
      <div className={styles.projects__container}>
        <div className={styles.projects__listTitles}>
          <p>Project Name</p>
          <p className={styles.projects__role}>Role</p>
        </div>
        {project_list.map((project, index) => {
          return (
            <ul className={styles.projects__line} key={index}>
              <Project
                index={index}
                name={project.name}
                role={project.role}
                details={project.details}
                src={project.src}
                setModal={setModal}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </ul>
          );
        })}
      </div>
      <Modal modal={modal} projects={project_list} />
      <motion.div
        style={{ height }}
        className={styles["projects__circle-container"]}
      >
        <div className={styles.projects__circle}></div>
      </motion.div>
    </div>
  );
}
