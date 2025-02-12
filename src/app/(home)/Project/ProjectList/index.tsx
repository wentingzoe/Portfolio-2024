"use Client";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { projects } from "@/utils/text";
import styles from "./projectList.module.scss";
import Lenis from "lenis";

export default function ProjectList() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  return (
    <div ref={container} className={styles.projectList}>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <ProjectCard
            key={`p_${i}`}
            i={i}
            {...project}
            url={project.link}
            progress={scrollYProgress.get()}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
