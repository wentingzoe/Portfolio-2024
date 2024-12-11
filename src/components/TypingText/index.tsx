import React from "react";
import { motion } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%" },
};

interface TypingTextProps {
  text: string | { text: string; className?: string }[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  speed?: number;
  initialDelay?: number;
  style?: React.CSSProperties;
  isVisible?: boolean;
}

export default function TypingText({
  text,
  as: Tag = "p",
  className = "",
  speed = 0.08,
  initialDelay = 0.5,
  style = {},
  isVisible = true,
}: TypingTextProps) {
  const segments = Array.isArray(text) ? text : [{ text }];

  const words = segments.flatMap((segment) => {
    const replaced = segment.text.replace(/\n/g, " \n ");
    return replaced
      .split(" ")
      .filter(Boolean)
      .map((w) => ({
        word: w,
        className: segment.className || "",
      }));
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      style={{ display: "inline-block", overflow: "hidden", ...style }}
    >
      <Tag className={className} style={{ display: "inline-block" }}>
        {words.map((w, i) => {
          if (w.word === "\n") {
            return <br key={i} />;
          }

          return (
            <motion.div
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
              className={w.className}
            >
              {w.word}
            </motion.div>
          );
        })}
      </Tag>
    </motion.div>
  );
}
