import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./Project";
import Modal from "./Modal";
import { project_list } from "@/utils/text";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Index() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [100, 0]);
  return (
    <section ref={container} className={styles.projects}>
      <div className={styles.projects__container}>
        <p className={styles.projects__header}> Recent Work</p>
        {project_list.map((project, index) => {
          return (
            <ul className={styles.projects__line} key={index}>
              <Project
                index={index}
                title={project.title}
                role={project.role}
                setModal={setModal}
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
    </section>
  );
}
