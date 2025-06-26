import { useRef, useState, useEffect } from "react";
import ProjectsList from "@/components/ProjectsList";
import styles from "./projects.module.scss";

interface ProjectsProps {
  onProjectExpand?: (isExpanded: boolean) => void;
}

export default function Projects({ onProjectExpand }: ProjectsProps) {
  const homeContainerRef = useRef<HTMLDivElement>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const containerEl = homeContainerRef.current;
    if (!containerEl) return;

    let prevHeight = containerEl.getBoundingClientRect().height;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;

        if (Math.abs(newHeight - prevHeight) > 50) {
          prevHeight = newHeight;
          onProjectExpand?.(expandedProject !== null);
        }
      }
    });

    observer.observe(containerEl);

    return () => observer.disconnect();
  }, [expandedProject, onProjectExpand]);

  const handleProjectExpand = (index: number | null) => {
    setExpandedProject(index);
    onProjectExpand?.(index !== null);
  };

  return (
    <div ref={homeContainerRef} className={styles.projects}>
      <h5 className={styles.projects__title}>Selected Works</h5>
      <div className={styles.projects__container}>
        <ProjectsList
          filter="ALL"
          containerRef={homeContainerRef}
          onProjectExpand={handleProjectExpand}
        />
      </div>
    </div>
  );
}
