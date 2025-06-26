"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectType } from "@/utils/projects-data";
import styles from "./workLayout.module.scss";
import MoreInfo from "@/components/MoreInfo";

import Gallery from "./Gallery";

type WorkLayoutProps = {
  project: ProjectType;
};

const WorkLayout = ({ project }: WorkLayoutProps) => {
  return (
    <div className={styles.workLayout}>
      {/* Project Header */}
      <header className={styles.workLayout__header}>
        <h1 className="small">{project.name}</h1>

        <div className={styles.workLayout__infoGrid}>
          <div className={styles.workLayout__infoSection}>
            <h6 className={styles.workLayout__infoTitle}>ROLES / SERVICES</h6>
            <div className={styles.workLayout__infoText}>
              {project.tags.map((tag, index) => (
                <p
                  key={index}
                  className={`${styles.workLayout__infoItem} medium`}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.workLayout__infoSection}>
            <h6 className={styles.workLayout__infoTitle}>CREDITS</h6>
            <p className={`${styles.workLayout__infoText} medium`}>
              Wallrus Creative Technologies
            </p>
          </div>

          <div className={styles.workLayout__infoSection}>
            <h6 className={styles.workLayout__infoTitle}>LOCATION & YEAR</h6>
            <p className={`${styles.workLayout__infoText} medium`}>
              {project.location} © {project.year}
            </p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className={styles.workLayout__hero}>
        {/* <Image
          src={`/images/projects/${project.slug}/hero.png`}
          alt={project.name}
          width={1000}
          height={600}
          className={styles.workLayout__heroImage}
          priority
        /> */}

        <div className={styles.workLayout__indicator}>
          <MoreInfo />
        </div>
      </section>

      {/* Project Info */}
      <section className={styles.workLayout__info}>
        <div className={styles.workLayout__grid}>
          <div className={styles.workLayout__column}>
            <h6 className={styles.workLayout__infoTitle}>OVERVIEW </h6>
            <div
              className={styles.workLayout__text}
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          <div className={styles.workLayout__column}>
            <h6 className={styles.workLayout__infoTitle}>SUMMARY</h6>

            <div className={styles.workLayout__summaryContainer}>
              <div className={styles.workLayout__summarySection}>
                <h6 className={styles.workLayout__summaryTitle}>
                  Key Features
                </h6>
                <div className={styles.workLayout__summaryList}>
                  {project.features.map((feature, index) => (
                    <p key={index} className={styles.workLayout__summaryItem}>
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.workLayout__summarySection}>
                <h6 className={styles.workLayout__summaryTitle}>
                  Results & Impact
                </h6>
                <ul className={styles.workLayout__summaryList}>
                  {project.results.map((result, index) => (
                    <li key={index} className={styles.workLayout__summaryText}>
                      <p
                        className={`${styles.workLayout__summarySubtitle} bold`}
                      >
                        {result.title}
                      </p>
                      <p className={styles.workLayout__summaryDescription}>
                        {result.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Scroll Animation */}

      {/* <Gallery project={project} /> */}

      {/* Next/Prev Navigation */}
      <section className={styles.navigation}>
        <div className={styles.navigation__container}>
          <Link href="/#projects" className={styles.navigation__back}>
            <h6> ← Back to Projects</h6>
          </Link>

          <div className={styles.navigation__projects}>
            {project.nextProject && (
              <Link
                href={`/work/${project.nextProject.slug}`}
                className={styles.navigation__project}
              >
                <h1>NEXT</h1>
                <h4>{project.nextProject.name} →</h4>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkLayout;
