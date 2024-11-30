import styles from "./nav.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { links, footerLinks } from "../../../utils/nav-items";
import { perspective, slideIn } from "../../../utils/animation";

export default function Nav() {
  return (
    <AnimatePresence>
      <nav className={styles.nav}>
        <div className={styles.nav__content}>
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.div
                key={`b_${i}`}
                className={styles.nav__link}
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a href={href}>{title}</a>
              </motion.div>
            );
          })}
        </div>
        <motion.div className={styles.nav__footer}>
          {footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a
                href={href}
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                key={`f_${i}`}
              >
                {title}
              </motion.a>
            );
          })}
        </motion.div>
      </nav>
    </AnimatePresence>
  );
}
