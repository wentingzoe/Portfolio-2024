import styles from "./projects.module.scss";
import { useState, useRef } from "react";
import Project from "./Project";
import Modal from "./Modal";
import { project_list } from "@/utils/text";

export default function Index() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const container = useRef(null);

  return (
    <div ref={container} className={styles.projects}>
      <h5 className={styles.projects__title}> Selected Works</h5>
      <div className={styles.projects__container}>
        <div className={styles.projects__listTitles}>
          <h6>Project Name</h6>
          <h6>Role</h6>
          <h6>Year</h6>
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
                tags={project.tags}
                year={project.year}
                setModal={setModal}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </ul>
          );
        })}
      </div>
      <Modal modal={modal} projects={project_list} />
    </div>
  );
}
