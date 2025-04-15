"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectType } from "@/utils/projects-data";
import styles from "./workLayout.module.scss";
import MoreInfo from "@/components/MoreInfo";
import GradientBg from "@/components/GradientBg";

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
        <Image
          src={`/images/projects/${project.slug}/hero.png`}
          alt={project.name}
          width={1000}
          height={600}
          className={styles.workLayout__heroImage}
          priority
        />

        <div className={styles.workLayout__indicator}>
          <MoreInfo />
        </div>

        {/* <div className={styles.hero__seeWebsite}>
          <Link
            href={project.websiteUrl || "#"}
            className={styles.hero__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            SEE WEBSITE
          </Link>
        </div> */}
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

      {/* Device Mockup */}
      <section className={styles.mockup}>
        <div className={styles.mockup__background}>
          <GradientBg />
        </div>
        <div className={styles.mockup__container}>
          <div className={styles.mockup__laptop}>
            <Image
              src="/images/devices/device-laptop.png"
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
