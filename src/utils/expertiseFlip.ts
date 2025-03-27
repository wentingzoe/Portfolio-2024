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
      start: "center center",
      end: "+=1000",
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
      rotationY: 180,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    });
    gsap.set(back, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      rotationY: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    });

    const delay = 0.3 * index;

    timeline.fromTo(
      front,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5 },
      delay
    );
    timeline.to(front, { rotationY: 0, duration: 0.8 }, delay + 0.6);
    timeline.to(back, { rotationY: 180, duration: 0.8 }, "<");
  });
};
