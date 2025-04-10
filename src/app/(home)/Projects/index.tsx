import { useRef, useState, useEffect } from "react";
import ProjectsList from "@/components/ProjectsList";
import styles from "./projects.module.scss";

interface ProjectsProps {
  onProjectExpand?: (isExpanded: boolean) => void;
}

export default function Projects({ onProjectExpand }: ProjectsProps) {
  const homeContainerRef = useRef<HTMLDivElement>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  // Monitor height changes to detect when projects expand/collapse
  useEffect(() => {
    if (!homeContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;

        // Detect significant height changes
        if (Math.abs(newHeight - containerHeight) > 50) {
          setContainerHeight(newHeight);

          // Notify parent about height change
          if (onProjectExpand) {
            onProjectExpand(expandedProject !== null);
          }
        }
      }
    });

    observer.observe(homeContainerRef.current);

    return () => {
      if (homeContainerRef.current) {
        observer.unobserve(homeContainerRef.current);
      }
    };
  }, [containerHeight, expandedProject, onProjectExpand]);

  // Handle project expansion/collapse
  const handleProjectExpand = (index: number | null) => {
    setExpandedProject(index);

    // Notify parent component about expansion state
    if (onProjectExpand) {
      onProjectExpand(index !== null);
    }
  };

  return (
    <div ref={homeContainerRef} className={styles.projects}>
      <h5 className={styles.projects__title}> Selected Works</h5>
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
