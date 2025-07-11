// import React, { useRef } from "react";
// import styles from "./about.module.scss";
// import { useInView, motion } from "framer-motion";
// import FollowEye from "@/components/FollowEye";
// import DotSquare from "@/components/DotSquare";
// import StarLine from "@/components/StarLine";
// import TypingText from "@/components/TypingText";
// import InfiniteText from "@/app/(home)/About/InfiniteText";
// import MoreInfo from "@/components/MoreInfo";
// import { useMousePosition } from "@/context/MousePositionContext";
// import {
//   perspectiveRight,
//   slideUp,
//   containerVariants,
//   opacity,
//   slideRight,
// } from "@/utils/animation";
// import { expertiseItems } from "@/utils/nav-items";
// import { aboutDescription } from "@/utils/text";

// export default function About() {
//   const mousePosition = useMousePosition();
//   const aboutRef = useRef(null);
//   const detailsRef = useRef(null);
//   const isInAbout = useInView(aboutRef, { amount: 0.5 });
//   const isInDetails = useInView(detailsRef, { amount: 0.6 });
//   return (
//     <div className={styles.about}>
//       <motion.div
//         className={styles.about__content}
//         ref={aboutRef}
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInAbout ? "visible" : "hidden"}
//       >
//         <h5 className={styles.about__title}>About Me</h5>
//         <div className={styles.about__eyeDecor}>
//           <div className={styles.about__followEye}>
//             <FollowEye
//               mousePosition={mousePosition}
//               backgroundColor="var(--color-primary)"
//             />
//           </div>
//           <div className={styles.about__dotSquare}>
//             <DotSquare color="var(--color-light)" />
//           </div>
//         </div>
//         <motion.div className={styles.about__description}>
//           <motion.div variants={slideUp} className={styles.about__decor} />
//           <motion.div variants={slideUp} className={styles.about__intro}>
//             <TypingText
//               text={aboutDescription.text1}
//               as="h3"
//               speed={0.04}
//               initialDelay={1}
//               isVisible={isInAbout}
//             />
//             <TypingText
//               text={aboutDescription.text2}
//               as="h4"
//               speed={0.05}
//               initialDelay={1.2}
//               isVisible={isInAbout}
//             />
//           </motion.div>
//         </motion.div>

//         <motion.div variants={opacity} className={styles.about__infiniteText}>
//           <InfiniteText />
//         </motion.div>
//       </motion.div>
//       <motion.div
//         ref={detailsRef}
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInDetails ? "visible" : "hidden"}
//         className={styles.about__details}
//       >
//         <h5 className={styles.about__detailsTitle}>What I do</h5>
//         <TypingText
//           text={aboutDescription.text3}
//           as="p"
//           className={styles.about__detailsCTA}
//           isVisible={isInDetails}
//         />

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInDetails ? "visible" : "hidden"}
//           className={styles.about__list}
//         >
//           <div className={styles.about__listTitle}>
//             <div className={styles.about__listIcon}>
//               <StarLine
//                 color="var(--color-light)"
//                 lineWidth={800}
//                 isInDetails={isInDetails}
//               />
//             </div>
//             <motion.h4 variants={slideRight}>Expertise</motion.h4>
//           </div>
//           <motion.ul
//             variants={containerVariants}
//             initial="hidden"
//             animate={isInDetails ? "visible" : "hidden"}
//             className={styles.about__listItems}
//           >
//             {expertiseItems.map((item, i) => {
//               const { title } = item;
//               return (
//                 <motion.li
//                   key={`e_${i}`}
//                   className={styles.about__listItem}
//                   custom={i}
//                   variants={perspectiveRight}
//                 >
//                   <h4>{title}</h4>
//                 </motion.li>
//               );
//             })}
//           </motion.ul>
//           <motion.div variants={opacity} className={styles.about__moreInfo}>
//             <MoreInfo />
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }
