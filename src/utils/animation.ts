
export const menu = {
  open: {
    width: "var(--menu-animate-width)",
    height: "var(--menu-animate-height)",
    top: "var(--menu-open-padding)",
    right: "var(--menu-open-padding)",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]  as [number, number, number, number] },
  },
  closed: {
    width: "5vw",
    height: "5vw",
    top: "0",
    right: "0",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
export const perspective = {
    initial: {
        opacity: 0,
        rotateX: 90,
        translateY: 80,
        translateX: -20,
    },
    enter: (custom: number) =>{ 
    
        return{
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: 0,
        transition: {
            duration: 0.65, 
            delay: 0.5 + (custom * 0.15), 
            ease: [.215,.61,.355,1]  as [number, number, number, number],
            opacity: { duration: 0.35}
        }
    }},
    exit: {
        opacity: 0,
        transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1]  as [number, number, number, number]}
    }
}

export const slideIn = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { 
            duration: 0.5,
            delay: 0.75 + (i * 0.1), 
            ease: [.215,.61,.355,1]  as [number, number, number, number]
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, type: "tween", ease: "easeInOut"}
    }
}




//Delay Children Animation
// export const containerVariants = {
//   hidden: { opacity: 0},
//   visible: {
//     opacity: 1,
//     transition: {
//     staggerChildren: 0.5,
//     delayChildren: 0.3,
//     },
//   },
// };

//Box Animation
export const slideUp = {
  hidden: { opacity: 0, scale: 0.5, x:-20, y:-20},
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 1,type: "linear", ease: [0.76, 0, 0.24, 1]}
  }
};

export const slideRight = {
  hidden: { opacity: 0, scale: 0.5, x:-100, y:-20},
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 1,type: "linear", ease: [0.76, 0, 0.24, 1]}
  }
};

export const opacity = {
    hidden: { opacity: 0},  
    visible: {
      opacity: 1,
    
    }
}

export const perspectiveRight = {
    hidden: {
        opacity: 0,
        transform: "rotateX(-90deg) translateX(-100px) translateY(-50px)",
         transition: { duration: 1, type: "linear", ease: [0.76, 0, 0.24, 1]}
    },
    visible: (custom: number) =>{ 
    
        return{
        opacity: 1,
        transform: "rotateY(0deg) translateX(0) translateY(0)",
        transition: {
            duration: 2, 
            delay: 2 + (custom * 0.3), 
            ease: [.215,.61,.355,1]  as [number, number, number, number],
            opacity: { duration: 0.35}
        }
    }},
    
    
}

export const modalScale = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1]  as [number, number, number, number] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number]},
  },
};


//Work Layout - Gallery Animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.2,
    },
  },
};

export const imageVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const contentVariants = {
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

      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};