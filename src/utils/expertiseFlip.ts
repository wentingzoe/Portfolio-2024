"use client";
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
  if (!cards.length || !trigger) return;

  // Clean up any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars.trigger === trigger) {
      st.kill();
    }
  });

  // Create separate flip timelines for each card
  const cardTimelines = cards.map((card, index) => {
    const front = card.querySelector(`.${styles.expertise__front}`) as HTMLElement;
    const back = card.querySelector(`.${styles.expertise__back}`) as HTMLElement;
    
    if (!front || !back) return null;
    
    // Set up 3D properties
    gsap.set(card, { perspective: 1500 });
    
    const rotationProp = breakpoint === "desktop" ? "rotationY" : "rotationX";
    
    // Reset to initial state
    gsap.set(front, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      [rotationProp]: 0,
      willChange: "transform",
    });
    
    gsap.set(back, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      [rotationProp]: -180,
      willChange: "transform",
    });
    
    // Create timeline for this card
    const tl = gsap.timeline({ paused: true });
    
    // Add the flip animation
    tl.to(front, { 
      [rotationProp]: 180, 
      duration: 0.8,
      ease: "power2.inOut" 
    });
    
    tl.to(back, { 
      [rotationProp]: 0, 
      duration: 0.8,
      ease: "power2.inOut" 
    }, "<");
    
    return tl;
  }).filter(Boolean) as gsap.core.Timeline[];

  if (breakpoint === "desktop") {
    // No additional ScrollTrigger is needed here
    return {
      flipCards: (progress: number) => {
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // Determine which cards should flip based on progress
        // Divide the progress range into steps for each card
        const cardCount = cardTimelines.length;
        const progressPerCard = 1 / cardCount;
        
        cardTimelines.forEach((tl, index) => {
          const cardStartThreshold = index * progressPerCard;
          const cardEndThreshold = (index + 1) * progressPerCard;
          
          if (progress <= cardStartThreshold) {
            // Before this card's range - ensure it's at 0
            tl.progress(0);
          } else if (progress >= cardEndThreshold) {
            // After this card's range - ensure it's at 1
            tl.progress(1);
          } else {
        
            const cardProgress = (progress - cardStartThreshold) / progressPerCard;
            tl.progress(cardProgress);
          }
        });
      },
      resetCards: () => {
        cardTimelines.forEach(tl => tl.progress(0));
      },
      completeCards: () => {
        cardTimelines.forEach(tl => tl.progress(1));
      }
    };
  } else {
    // For tablet/mobile:
    const triggers = cards.map((card, index) => {
      const tl = cardTimelines[index];
      if (!tl) return null;
      
      return ScrollTrigger.create({
        trigger: card,
        start: "center center", 
        end: "bottom top+=30%",
        scrub: 0.5,
        onUpdate: (self) => {
          tl.progress(self.progress);
        }
      });
    });
    
    // Return cleanup function
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }
};