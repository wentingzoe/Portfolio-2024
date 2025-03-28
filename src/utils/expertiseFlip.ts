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

export const cardFlip = ({ cards, trigger, breakpoint }: ExpertiseFlipOptions) => {
  if (!cards.length || !trigger) return;

 
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
    
        const isDesktop = breakpoint === "desktop";
    
    // Reset default CSS transformations to prevent conflicts
    // For desktop (rotateY)
    if (isDesktop) {
      gsap.set(front, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        rotationY: 0,
        willChange: "transform",
      });
      
      gsap.set(back, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        rotationY: -180,
        willChange: "transform",
      });
    } 
    // For mobile/tablet (rotateX)
    else {
      gsap.set(front, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        rotationX: 0,
        rotationY: 0,
        willChange: "transform",
      });
      
      gsap.set(back, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        rotationX: -180,
        rotationY: 0,
        willChange: "transform",
      });
    }
 const tl = gsap.timeline({ paused: true });
    
    // Add the flip animation based on breakpoint
    if (isDesktop) {
      tl.to(front, { 
        rotationY: 180, 
        duration: 0.5,
        ease: "power2.inOut" 
      });
      
      tl.to(back, { 
        rotationY: 0, 
        duration: 0.5,
        ease: "power2.inOut" 
      }, "<");
    } else {
      tl.to(front, { 
        rotationX: 180, 
        duration: 0.5,
        ease: "power2.inOut" 
      });
      
      tl.to(back, { 
        rotationX: 0, 
        duration: 0.5,
        ease: "power2.inOut" 
      }, "<");
    }
    
    
    return tl;
  }).filter(Boolean) as gsap.core.Timeline[];

  if (breakpoint === "desktop") {
    // No additional ScrollTrigger is needed here
    return {
      flipCards: (progress: number) => {
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        const cardCount = cardTimelines.length;
        const progressPerCard = 1 / cardCount;
        
        cardTimelines.forEach((tl, index) => {
          const cardStartThreshold = index * progressPerCard;
          const cardEndThreshold = (index + 1) * progressPerCard;
          
          if (progress <= cardStartThreshold) {
            tl.progress(0);
          } else if (progress >= cardEndThreshold) {
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
        start: "top center", 
        end: "bottom center",
        scrub: 0.5,
				markers: true,
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