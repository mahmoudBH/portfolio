declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}

declare module 'gsap' {
  export const gsap: any;
  export const TimelineMax: any;
  export const TweenMax: any;
}

declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: any;
}

declare module 'gsap/TextPlugin' {
  export const TextPlugin: any;
}