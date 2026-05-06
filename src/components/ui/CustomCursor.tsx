"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// CURSOR STATE TYPES
// ─────────────────────────────────────────────
type CursorState =
  | "default"    // navigation normale
  | "hover"      // survol lien / bouton
  | "view"       // survol image / carte projet
  | "drag"       // survol slider
  | "text"       // survol zone de texte éditable
  | "hidden";    // curseur hors fenêtre

// Config par état
const STATE_CONFIG: Record<
  CursorState,
  {
    dotScale: number;
    ringScale: number;
    ringOpacity: number;
    ringBorder: string;
    ringBg: string;
    label?: string;
  }
> = {
  default: {
    dotScale:    1,
    ringScale:   1,
    ringOpacity: 1,
    ringBorder:  "rgba(255,255,255,0.18)",
    ringBg:      "rgba(0,0,0,0)",
  },
  hover: {
    dotScale:    2.5,
    ringScale:   1.6,
    ringOpacity: 1,
    ringBorder:  "rgba(197,160,89,0.7)",
    ringBg:      "rgba(197,160,89,0.06)",
  },
  view: {
    dotScale:    0,          // dot caché, label affiché
    ringScale:   4.5,
    ringOpacity: 1,
    ringBorder:  "rgba(197,160,89,0.5)",
    ringBg:      "rgba(197,160,89,0.08)",
    label:       "View",
  },
  drag: {
    dotScale:    0,
    ringScale:   3,
    ringOpacity: 1,
    ringBorder:  "rgba(255,255,255,0.25)",
    ringBg:      "rgba(255,255,255,0.04)",
    label:       "Drag",
  },
  text: {
    dotScale:    0.3,
    ringScale:   0.7,
    ringOpacity: 0.5,
    ringBorder:  "rgba(197,160,89,0.3)",
    ringBg:      "rgba(0,0,0,0)",
  },
  hidden: {
    dotScale:    0,
    ringScale:   0,
    ringOpacity: 0,
    ringBorder:  "rgba(0,0,0,0)",
    ringBg:      "rgba(0,0,0,0)",
  },
};

// ─────────────────────────────────────────────
// HELPER — détecte le state depuis l'élément
// ─────────────────────────────────────────────
function detectState(target: HTMLElement): CursorState {
  if (
    target.closest("[data-cursor='view']") ||
    target.closest("[data-cursor-view]")
  ) return "view";

  if (target.closest("[data-cursor='drag']")) return "drag";

  if (
    target.tagName === "INPUT"    ||
    target.tagName === "TEXTAREA" ||
    target.closest("input")       ||
    target.closest("textarea")
  ) return "text";

  if (
    target.tagName === "A"        ||
    target.tagName === "BUTTON"   ||
    target.closest("a")           ||
    target.closest("button")      ||
    target.closest("[data-cursor-hover]") ||
    window.getComputedStyle(target).cursor === "pointer"
  ) return "hover";

  return "default";
}

// ─────────────────────────────────────────────
// TRAIL DOTS — traînée de particules
// ─────────────────────────────────────────────
const TRAIL_COUNT = 6;

function TrailDots({
  positions,
}: {
  positions: Array<{ x: number; y: number }>;
}) {
  return (
    <>
      {positions.map((pos, i) => {
        const ratio = (TRAIL_COUNT - i) / TRAIL_COUNT; // plus grand au début
        const size  = ratio * 4;
        const alpha = ratio * 0.25;
        return (
          <div
            key={i}
            className="pointer-events-none fixed z-[9995] rounded-full"
            style={{
              left:      pos.x,
              top:       pos.y,
              width:     size,
              height:    size,
              background: `rgba(197,160,89,${alpha})`,
              transform: "translate(-50%,-50%)",
              transition: `opacity 0.1s`,
            }}
          />
        );
      })}
    </>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function CustomCursor() {
  const [state,    setState]    = useState<CursorState>("default");
  const [trail,    setTrail]    = useState<Array<{ x: number; y: number }>>([]);
  const [clicking, setClicking] = useState(false);
  const frameRef   = useRef<number>(0);
  const posRef     = useRef({ x: -100, y: -100 });
  const trailRef   = useRef<Array<{ x: number; y: number }>>([]);

  // Motion values — jamais de re-render React
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // DOT — spring ultra-rapide
  const dotX = useSpring(mx, { stiffness: 600, damping: 30, mass: 0.05 });
  const dotY = useSpring(my, { stiffness: 600, damping: 30, mass: 0.05 });

  // RING — spring plus lent (lag visuel)
  const ringX = useSpring(mx, { stiffness: 130, damping: 20, mass: 0.08 });
  const ringY = useSpring(my, { stiffness: 130, damping: 20, mass: 0.08 });

  const cfg = STATE_CONFIG[state];

  // Trail RAF update
  const updateTrail = useCallback(() => {
    trailRef.current = [
      { x: posRef.current.x, y: posRef.current.y },
      ...trailRef.current.slice(0, TRAIL_COUNT - 1),
    ];
    setTrail([...trailRef.current]);
    frameRef.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(frameRef.current);
  }, [updateTrail]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      setState(detectState(e.target as HTMLElement));
    };

    const onLeave = () => setState("hidden");
    const onEnter = () => setState("default");

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove",     onMove,  { passive: true });
    window.addEventListener("mouseover",     onOver,  { passive: true });
    document.addEventListener("mouseleave",  onLeave);
    document.addEventListener("mouseenter",  onEnter);
    window.addEventListener("mousedown",     onDown);
    window.addEventListener("mouseup",       onUp);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseover",    onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
    };
  }, [mx, my]);

  return (
    <div className="hidden md:block" aria-hidden>

      {/* ── TRAIL ── */}
      <TrailDots positions={trail} />

      {/* ── DOT CENTRAL ── */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width:  10,
          height: 10,
          background: "#ffffff",
          top: 0,
          left: 0,
        }}
        animate={{
          scale:   clicking ? 0.6 : cfg.dotScale,
          opacity: cfg.dotScale === 0 ? 0 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── RING ── */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width:  38,
          height: 38,
          top:  0,
          left: 0,
          border: `1px solid ${cfg.ringBorder}`,
          background: cfg.ringBg,
        }}
        animate={{
          scale:        clicking ? 0.85 : cfg.ringScale,
          opacity:      cfg.ringOpacity,
          borderColor:  cfg.ringBorder,
          background:   cfg.ringBg,
          width:        38,
          height:       38,
        }}
        transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Label dans le ring (état view / drag) */}
        <AnimatePresence>
          {cfg.label && (
            <motion.span
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center font-mono text-[0.38rem] uppercase tracking-[0.3em]"
              style={{ color: "#C5A059" }}
            >
              {cfg.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── CLICK RIPPLE ── */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="ripple"
            className="pointer-events-none fixed z-[9997] rounded-full"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
              top: 0, left: 0,
              border: "1px solid rgba(197,160,89,0.4)",
            }}
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}