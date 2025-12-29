import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initGSAP = () => {
  gsap.defaults({
    ease: "power3.out",
    duration: 1
  });

  gsap.registerEase("smoothStep", (progress) => {
    return progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;
  });
};