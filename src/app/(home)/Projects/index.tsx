import styles from "./projects.module.scss";
import ProjectsList from "@/components/ProjectsList";

export default function Index() {
  return (
    <div className={styles.projects}>
      <h5 className={styles.projects__title}> Selected Works</h5>
      <ProjectsList />
    </div>
  );
}
