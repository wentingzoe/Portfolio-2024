import React from "react";
import styles from "./contact.module.scss";
import { useBreakpoint } from "@/context/BreakpointContext";
import FloatingRect from "@/components/FloatingRect";
import { contactFloatingRectConfig } from "@/utils/floatingRectConfigs";

export default function Contact() {
  const breakpoint = useBreakpoint();
  const decorConfig = contactFloatingRectConfig[breakpoint];
  return (
    <div className={styles.contact}>
      <FloatingRect
        fixedRectSize={decorConfig.fixedRectSize}
        rects={decorConfig.rects}
      />

      <div className={styles.contact__cta}>
        <h1>Let&apos;s make magic</h1>
      </div>
    </div>
  );
}
