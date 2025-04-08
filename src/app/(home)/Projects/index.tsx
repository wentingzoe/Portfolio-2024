import { useRef } from "react";
import ProjectsList from "@/components/ProjectsList";
import styles from "./projects.module.scss";

export default function Projects() {
  const homeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={homeContainerRef} className={styles.projects}>
      <h5 className={styles.projects__title}> Selected Works</h5>
      <div className={styles.projects__container}>
        <ProjectsList filter="ALL" containerRef={homeContainerRef} />
      </div>
    </div>
  );
}
