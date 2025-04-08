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
          {(["ALL", "DESIGN", "DEVELOPMENT"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              className={`${styles.work__filterButton} ${
                activeFilter === filter
                  ? styles["work__filterButton--active"]
                  : ""
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects List with active filter */}
        <div className={styles.work__list}>
          <ProjectsList filter={activeFilter} containerRef={workContainerRef} />
        </div>
      </div>
    </div>
  );
}
