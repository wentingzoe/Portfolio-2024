"use client";
import styles from "./style.module.scss";

export default function Index({ index, title, role, setModal }: any) {
  return (
    <li
      className={styles.project}
      onMouseEnter={() => {
        setModal({ active: true, index: index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index: index });
      }}
    >
      <h2 className={styles.project__title}>{title}</h2>
      <p className={styles.project__role}>{role}</p>
    </li>
  );
}
