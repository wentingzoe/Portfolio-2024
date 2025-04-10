"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./projectsList.module.scss";
import { projects } from "@/utils/projects-data";
import Modal from "./Modal";
import Project from "./Project";

type FilterType = "ALL" | "DESIGN" | "DEVELOPMENT";

interface ProjectsListProps {
  filter?: FilterType;
  containerRef?: React.RefObject<HTMLDivElement>;
  onProjectExpand?: (index: number | null) => void;
}

export default function ProjectsList({
  filter = "ALL",
  containerRef,
  onProjectExpand,
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

  // Handle active index changes
  useEffect(() => {
    // Notify parent component when a project is expanded/collapsed
    if (onProjectExpand) {
      onProjectExpand(activeIndex);
    }

    // If a project is expanded/collapsed, dispatch a resize event
    // to help other components recalculate heights
    if (activeIndex !== null || activeIndex === null) {
      window.dispatchEvent(new Event("resize"));

      // Additional resize events with delay to catch animations
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 600);
    }
  }, [activeIndex, onProjectExpand]);

  // Handle setting the active index
  const handleSetActiveIndex = (index: number | null) => {
    setActiveIndex(index);
  };

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
              setActiveIndex={handleSetActiveIndex}
              setModal={setModal}
            />
          </ul>
        ))}
      </div>

      <Modal
        modal={modal}
        projects={projectsForModal}
        projectsRef={projectsRef}
        pageRef={containerRef}
      />
    </div>
  );
}
