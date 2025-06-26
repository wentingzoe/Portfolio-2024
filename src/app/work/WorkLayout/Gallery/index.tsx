"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ProjectType } from "@/utils/projects-data";
import styles from "./gallery.module.scss";
import GradientBg from "@/components/GradientBg";

type GalleryProps = {
  project: ProjectType;
};

const Gallery = ({ project }: GalleryProps) => {
  // Reference for the gallery container
  const galleryRef = useRef<HTMLDivElement>(null);

  // Dynamic height adjustment for background
  useEffect(() => {
    if (!galleryRef.current) return;

    const adjustHeight = () => {
      const gallery = galleryRef.current;
      const background = gallery?.querySelector(
        `.${styles.gallery__background}`
      );

      if (gallery && background) {
        const height = gallery.getBoundingClientRect().height;
        (background as HTMLElement).style.height = `${height}px`;
      }
    };

    // Initial adjustment
    adjustHeight();

    // Adjust on resize
    window.addEventListener("resize", adjustHeight);

    // Adjust after images load
    const images = galleryRef.current.querySelectorAll("img");
    const handleImageLoad = () => adjustHeight();

    images.forEach((img) => {
      if (img.complete) {
        adjustHeight();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      window.removeEventListener("resize", adjustHeight);
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [project.galleryWithDescriptions]);

  return (
    <section ref={galleryRef} className={styles.gallery}>
      <div className={styles.gallery__background}>
        <GradientBg />
      </div>

      <div className={styles.gallery__header}>
        <h6 className={styles.gallery__title}>GALLERY</h6>
      </div>

      <div className={styles.gallery__container}>
        {project.galleryWithDescriptions?.map((item, index) => (
          <GalleryItem
            key={index}
            item={item}
            projectSlug={project.slug}
            projectName={project.name}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

// Gallery Item component with Framer Motion animations
const GalleryItem = ({
  item,
  projectSlug,
  projectName,
  index,
}: {
  item: { image: string; title: string; description: string };
  projectSlug: string;
  projectName: string;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px",
  });

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const contentVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={itemRef}
      className={styles.gallery__item}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className={styles.gallery__imageContainer}
        variants={imageVariants}
      >
        <Image
          src={`/images/projects/${projectSlug}/${item.image}`}
          alt={`${projectName} - ${item.title || `Image ${index + 1}`}`}
          width={600}
          height={400}
          className={styles.gallery__image}
        />
      </motion.div>

      <motion.div
        className={styles.gallery__content}
        variants={contentVariants}
      >
        <h3 className={styles.gallery__sectionName}>
          {item.title || `Section ${index + 1}`}
        </h3>
        <p className={styles.gallery__description}>{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
