// src/app/work/page.tsx
"use client";
import { useState, useRef } from "react";

import ProjectsList from "@/components/ProjectsList";
import styles from "./work.module.scss";

type FilterType = "ALL" | "DESIGN" | "DEVELOPMENT";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const workContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div className={styles.work}>
      <div ref={workContainerRef} className={styles.work__container}>
        <h1 className="small">
          Where Creativity
          <br />
          Meets Code
        </h1>

        {/* Filter Buttons */}
        <div className={styles.work__filters}>
          <button
            className={`${styles.work__filterButton} ${
              activeFilter === "ALL" ? styles.work__filterButton_active : ""
            }`}
            onClick={() => handleFilterChange("ALL")}
          >
            ALL
          </button>
          <button
            className={`${styles.work__filterButton} ${
              activeFilter === "DESIGN" ? styles.work__filterButton_active : ""
            }`}
            onClick={() => handleFilterChange("DESIGN")}
          >
            DESIGN
          </button>
          <button
            className={`${styles.work__filterButton} ${
              activeFilter === "DEVELOPMENT"
                ? styles.work__filterButton_active
                : ""
            }`}
            onClick={() => handleFilterChange("DEVELOPMENT")}
          >
            DEVELOPMENT
          </button>
        </div>

        {/* Projects List with active filter */}
        <div className={styles.work__list}>
          <ProjectsList filter={activeFilter} containerRef={workContainerRef} />
        </div>
      </div>
    </div>
  );
}
