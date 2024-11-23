import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./creative.module.scss";
import FollowEye from "@/components/FollowEye";
import { useMousePosition } from "@/context/MousePositionContext";

const Creative: React.FC = () => {
  const mousePosition = useMousePosition();

  const starRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!starRef.current) return;

    gsap.set(starRef.current, {
      transformOrigin: "center center",
    });

    const starTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    starTL
      .to(starRef.current, {
        rotate: 360,
        duration: 1,
        stagger: 0.5,
      })
      .to(starRef.current, {
        scale: 1.5,
        duration: 0.2,
        ease: "power1.out",
        repeat: 1,
        yoyo: true,
      });
  }, []);

  return (
    <div className={styles.creative}>
      <div className={styles.creative__cr}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178 118">
          <path
            d="M145.918 115H127.038V30.2H142.238L144.478 46.84C149.918 35.32 159.838 29.24 173.918 29.24H177.118V47.64H173.918C156.318 47.64 145.918 57.08 145.918 73.08V115Z"
            fill="white"
          />
          <path
            d="M56.8801 117.4C22.4801 117.4 0.560059 93.7201 0.560059 58.6801C0.560059 24.7601 22.0001 0.600098 56.8801 0.600098C86.0001 0.600098 106 17.5601 110.8 46.2001H91.1201C87.6001 28.6001 74.6401 17.8801 56.8801 17.8801C34.3201 17.8801 20.2401 33.7201 20.2401 58.6801C20.2401 84.2801 34.3201 99.9601 56.8801 99.9601C74.9601 99.9601 87.6001 89.5601 91.1201 71.8001H110.8C105.68 100.92 86.1601 117.4 56.8801 117.4Z"
            fill="white"
          />
        </svg>
      </div>
      <div className={styles.creative__e}>
        <FollowEye
          mousePosition={mousePosition}
          backgroundColor="var(--color-secondary)"
        />
      </div>
      <div className={styles.creative__at}>
        <svg
          width="87"
          height="90"
          viewBox="0 0 87 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.6 89.7599C13.08 89.7599 0.279959 80.3199 0.43996 64.4799C0.599959 44.6399 20.28 40.4799 36.76 38.5599C49.56 37.1199 59 36.6399 59.16 29.9199C59 21.5999 52.6 16.1599 41.72 16.1599C30.52 16.1599 22.52 22.2399 21.4 31.0399H2.35996C4.11996 13.1199 20.12 0.639893 42.04 0.639893C64.92 0.639893 77.56 13.1199 77.56 31.1999V69.5999C77.56 71.9999 78.84 73.2799 81.72 73.2799H86.36V87.9999H77.4C68.76 87.9999 63.48 84.4799 62.04 78.0799C61.72 77.2799 61.4 76.1599 61.24 75.1999C56.28 84.3199 47 89.7599 32.6 89.7599ZM36.44 74.8799C49.4 74.8799 59.16 67.5199 59.16 56.1599V44.3199C55.96 49.2799 47.8 50.3999 38.84 51.5199C28.28 52.7999 19.48 54.2399 19.48 63.1999C19.48 70.5599 25.4 74.8799 36.44 74.8799Z"
            fill="white"
          />
        </svg>
        <svg
          width="56"
          height="114"
          viewBox="0 0 56 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.1152 114H43.2352C24.8352 114 14.9152 104.88 14.9152 88.08V45.2H0.0351562V29.2H14.9152V0.23999H33.7952V29.2H55.7151V45.2H33.7952V86.8C33.7952 94 37.4752 98 44.5152 98H54.1152V114Z"
            fill="white"
          />
        </svg>
      </div>
      <div className={styles.creative__i}>
        <svg
          width="40"
          height="127"
          viewBox="0 0 40 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M29.4176 127H10.5376V42.2H29.4176V127Z" fill="white" />
        </svg>

        <div className={styles.creative__star}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ref={starRef}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              overflow: "visible",
            }}
          >
            <path
              d="M20.1758 0H19.8436H20.1369C19.6688 11.2156 10.833 20.1588 0 20.1635C10.833 20.1682 19.6688 29.1114 20.1369 40H19.8436H20.1758C20.644 29.1114 29.4798 20.1682 40 20.1635C29.4798 20.1588 20.644 11.2156 20.1758 0Z"
              fill="var(--color-secondary)"
            />
          </svg>
        </div>
      </div>
      <div className={styles.creative__ve}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="91"
          height="85"
          viewBox="0 0 91 85"
          fill="none"
        >
          <path
            d="M55.1826 85H35.5026L0.142578 0.199951H20.6226L45.4226 62.7599L70.0626 0.199951H90.5426L55.1826 85Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="84"
          height="91"
          viewBox="0 0 84 91"
          fill="none"
        >
          <path
            d="M44.6439 90.3999C18.7239 90.3999 0.963867 71.8399 0.963867 45.9199C0.963867 17.9199 19.3639 0.639893 43.0439 0.639893C67.0439 0.639893 83.0439 17.4399 83.5239 44.9599V49.4399H19.8439C21.1239 64.3199 30.4039 74.3999 44.8039 74.3999C54.5639 74.3999 61.9239 69.5999 64.8039 61.1199H83.2039C78.8839 79.3599 64.6439 90.3999 44.6439 90.3999ZM20.6439 36.1599H64.0039C61.6039 23.9999 54.0839 16.6399 43.0439 16.6399C31.8439 16.6399 23.5239 23.9999 20.6439 36.1599Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Creative;