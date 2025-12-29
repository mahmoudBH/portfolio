// utils/variants.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true }
};

export const staggerChildren = (delay: number = 0.1) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: delay
    }
  },
  viewport: { once: true }
});