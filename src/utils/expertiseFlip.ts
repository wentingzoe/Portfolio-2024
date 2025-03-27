import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/(home)/AboutMe/Expertise/expertise.module.scss"; 

gsap.registerPlugin(ScrollTrigger);

type ExpertiseFlipOptions = {
  cards: HTMLElement[];
  trigger: HTMLElement;
  breakpoint: string;
};

export const initExpertiseFlip = ({ cards, trigger, breakpoint }: ExpertiseFlipOptions) => {
  if (!cards.length || !trigger || breakpoint !== "desktop") return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "right left", 
      end: "+=800",
      scrub: 1,
      markers: true,
    },
  });

  cards.forEach((card, index) => {
    const front = card.querySelector(`.${styles.expertise__front}`) as HTMLElement;
    const back = card.querySelector(`.${styles.expertise__back}`) as HTMLElement;
    if (!front || !back) return;

    gsap.set(card, { perspective: 1000 });

    gsap.set(front, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      rotationY: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    });

    gsap.set(back, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      rotationY: -180,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    });

    const delay = 0.3 * index;

    timeline.to(front, { rotationY: 180, duration: 0.8 }, delay);
    timeline.to(back, { rotationY: 0, duration: 0.8 }, `<`);
  });
};

