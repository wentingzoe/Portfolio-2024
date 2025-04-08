"use client";
import { useState, useRef } from "react";
import styles from "./projectsList.module.scss";
import { projects } from "@/utils/projects-data";
import Modal from "./Modal";
import Project from "./Project";

type FilterType = "ALL" | "DESIGN" | "DEVELOPMENT";

interface ProjectsListProps {
  filter?: FilterType;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function ProjectsList({
  filter = "ALL",
  containerRef,
}: ProjectsListProps) {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Filter projects based on selected filter
  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => tag.toUpperCase().includes(filter))
        );

  // Format projects for Modal component
  const projectsForModal = filteredProjects.map((project) => ({
    name: project.name,
    src: project.src,
    color: "var(--color-primary)",
  }));

  const refToPage = containerRef;
  return (
    <div ref={projectsRef} className={styles.projectsList}>
      <div className={styles.projectsList__container}>
        <div className={styles.projectsList__listTitles}>
          <h6>Project Name</h6>
          <h6>Role</h6>
          <h6>Year</h6>
        </div>
        {filteredProjects.map((project, index) => (
          <ul className={styles.projectsList__line} key={index}>
            <Project
              index={index}
              project={project}
              isOpen={activeIndex === index}
              setActiveIndex={setActiveIndex}
              setModal={setModal}
            />
          </ul>
        ))}
      </div>

      {/* Always render the Modal component */}
      <Modal
        modal={modal}
        projects={projectsForModal}
        projectsRef={projectsRef}
        pageRef={refToPage}
      />
    </div>
  );
}
