"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectType } from "@/utils/projects-data";
import styles from "./workLayout.module.scss";

type WorkLayoutProps = {
  project: ProjectType;
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const WorkLayout = ({ project }: WorkLayoutProps) => {
  return (
    <div className={styles.workLayout}>
      {/* Project Header */}
      <header className={styles.header}>
        <h1 className={styles.header__title}>{project.name}</h1>

        <div className={styles.header__infoGrid}>
          <div className={styles.header__infoSection}>
            <h2 className={styles.header__infoTitle}>ROLES / SERVICES</h2>
            <ul className={styles.header__infoList}>
              {project.tags.map((tag, index) => (
                <li key={index} className={styles.header__infoItem}>
                  • {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.header__infoSection}>
            <h2 className={styles.header__infoTitle}>CREDITS</h2>
            <p className={styles.header__infoText}>
              Wallrus Creative Technologies
            </p>
          </div>

          <div className={styles.header__infoSection}>
            <h2 className={styles.header__infoTitle}>LOCATION & YEAR</h2>
            <p className={styles.header__infoText}>
              {project.location} © {project.year}
            </p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className={styles.hero}>
        <Image
          src={`/images/projects/${project.slug}/hero.jpg`}
          alt={project.name}
          width={1400}
          height={700}
          className={styles.hero__image}
          priority
        />

        <div className={styles.hero__indicator}>
          <div className={styles.hero__dot}></div>
          <div className={styles.hero__line}></div>
          <div className={styles.hero__dot}></div>
        </div>

        <div className={styles.hero__seeWebsite}>
          <Link
            href={project.websiteUrl || "#"}
            className={styles.hero__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            SEE WEBSITE
          </Link>
        </div>
      </section>

      {/* Project Info */}
      <section className={styles.info}>
        <div className={styles.info__grid}>
          <div className={styles.info__column}>
            <h2 className={styles.info__title}>OVERVIEW</h2>
            <div
              className={styles.info__text}
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          <div className={styles.info__column}>
            <h2 className={styles.info__title}>SUMMARY</h2>

            <div className={styles.info__summaryGrid}>
              <div className={styles.info__summarySection}>
                <h3 className={styles.info__summaryTitle}>Key Features</h3>
                <ul className={styles.info__summaryList}>
                  {project.features.map((feature, index) => (
                    <li key={index} className={styles.info__summaryItem}>
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.info__summarySection}>
                <h3 className={styles.info__summaryTitle}>Results & Impact</h3>
                <ul className={styles.info__summaryList}>
                  {project.results.map((result, index) => (
                    <li key={index} className={styles.info__summaryItem}>
                      • {result.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Mockup */}
      <section className={styles.mockup}>
        <div className={styles.mockup__container}>
          <div className={styles.mockup__laptop}>
            <Image
              src="/images/laptop-mockup.png"
              alt="Laptop Mockup"
              width={800}
              height={500}
              className={styles.mockup__device}
            />
            <div className={styles.mockup__screen}>
              <Image
                src={`/images/projects/${project.slug}/mockup-screen.jpg`}
                alt={`${project.name} on laptop`}
                fill
                className={styles.mockup__content}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className={styles.gallery}>
        <div className={styles.gallery__grid}>
          {project.gallery.map((image, index) => (
            <div key={index} className={styles.gallery__item}>
              <Image
                src={`/images/projects/${project.slug}/${image}`}
                alt={`${project.name} - Image ${index + 1}`}
                width={500}
                height={800}
                className={styles.gallery__image}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Next/Prev Navigation */}
      <section className={styles.navigation}>
        <div className={styles.navigation__container}>
          <Link href="/#projects" className={styles.navigation__back}>
            Back to Projects
          </Link>

          <div className={styles.navigation__projects}>
            {project.prevProject && (
              <Link
                href={`/work/${project.prevProject.slug}`}
                className={styles.navigation__project}
              >
                ← {project.prevProject.name}
              </Link>
            )}

            {project.nextProject && (
              <Link
                href={`/work/${project.nextProject.slug}`}
                className={styles.navigation__project}
              >
                {project.nextProject.name} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkLayout;
