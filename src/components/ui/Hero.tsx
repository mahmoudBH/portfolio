"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ThreeCanvas from "./ThreeCanvas";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Curseur custom double cercle avec lag */
function LuxuryCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 20 : 8,
          height: hovered ? 20 : 8,
          borderRadius: "50%",
          background: "#C5A059",
          transition: "width 0.3s, height 0.3s",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 56 : 38,
          height: hovered ? 56 : 38,
          borderRadius: "50%",
          border: "1px solid rgba(197,160,89,0.55)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          borderColor: hovered ? "rgba(197,160,89,0.9)" : "rgba(197,160,89,0.45)",
        }}
      />
    </>
  );
}

/** Marques de coin dorées */
function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: "1.5rem", left: "1.5rem" },
    tr: { top: "1.5rem", right: "1.5rem", transform: "scaleX(-1)" },
    bl: { bottom: "1.5rem", left: "1.5rem", transform: "scaleY(-1)" },
    br: { bottom: "1.5rem", right: "1.5rem", transform: "scale(-1)" },
  };

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ width: 22, height: 22, ...styles[position] }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      {/* Vertical bar */}
      <span
        className="absolute left-0 top-0 w-[1px] h-full"
        style={{ background: "rgba(197,160,89,0.45)" }}
      />
      {/* Horizontal bar */}
      <span
        className="absolute left-0 top-0 h-[1px] w-full"
        style={{ background: "rgba(197,160,89,0.45)" }}
      />
    </motion.div>
  );
}

/** Titre animé ligne par ligne */
function AnimatedTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800, rotateX, rotateY }}
    >
      <h1
        className="
          font-display uppercase
          text-[13vw] sm:text-[9rem] md:text-[10.5rem] lg:text-[12.5rem]
          leading-[0.84] tracking-tight
          text-zinc-50
        "
      >
        {/* Line 1 */}
        <div className="overflow-hidden pb-[0.08em]">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.3, ease: EASE_LUXURY }}
          >
            Mahmoud
          </motion.div>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden pb-[0.08em]">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.68, duration: 1.3, ease: EASE_LUXURY }}
            className="flex items-end gap-[0.04em]"
          >
            <span>Bousbih</span>
            <span
              className="font-serif italic font-light"
              style={{
                color: "#C5A059",
                textShadow: "0 0 40px rgba(197,160,89,0.35), 0 0 80px rgba(197,160,89,0.15)",
              }}
            >
              .
            </span>
          </motion.div>
        </div>
      </h1>
    </motion.div>
  );
}

/** Bouton CTA avec effet révélation dorée */
function ExploreButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 1.1, ease: EASE_LUXURY }}
    >
      <button
        data-cursor-hover
        onClick={onClick}
        className="group relative flex items-center gap-5 overflow-hidden border border-zinc-700 px-10 py-[1.15rem] transition-colors duration-500 hover:border-[#C5A059]"
        style={{ cursor: "none" }}
        suppressHydrationWarning
      >
        {/* Fond doré qui monte */}
        <span
          className="absolute inset-0 translate-y-full bg-[#C5A059] transition-transform duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
          aria-hidden
        >
          <style>{`button:hover .gold-fill { transform: translateY(0) !important; }`}</style>
        </span>

        <span className="relative z-10 font-mono text-[0.6rem] uppercase tracking-[0.42em] text-zinc-300 transition-colors duration-500 group-hover:text-zinc-950">
          Explore Works
        </span>

        {/* Flèche animée */}
        <span className="relative z-10 flex h-4 w-4 items-center justify-center">
          <span
            className="block h-[10px] w-[10px] rotate-45 border-b border-r border-zinc-400 transition-colors duration-500 group-hover:border-zinc-950"
            style={{ animation: "arrowBounce 1.8s ease-in-out infinite" }}
          />
        </span>

        <style>{`
          @keyframes arrowBounce {
            0%, 100% { transform: rotate(45deg) translate(0,0); }
            50%       { transform: rotate(45deg) translate(3px,3px); }
          }
        `}</style>
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HERO — COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function Hero() {
  const scrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <>
      {/* Curseur custom (désactivé sur mobile) */}
      <div className="hidden lg:block">
        <LuxuryCursor />
      </div>

      <section
        className="relative h-screen w-full overflow-hidden bg-zinc-950"
        style={{ cursor: "none" }}
      >
        {/* ── ARRIÈRE-PLANS ── */}

        {/* Barre status dorée en haut */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-30 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #C5A059 50%, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.8, ease: EASE_LUXURY }}
        />

        {/* Grille dorée très subtile */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Noise texture */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Three.js Canvas */}
        <div className="absolute inset-0 z-[3]">
          <ThreeCanvas />
        </div>

        {/* Vignette radiale */}
        <div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at center, transparent 20%, #09090b 100%)",
          }}
        />

        {/* Marques de coin */}
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        {/* ── NAVIGATION ── */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-9">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: EASE_LUXURY }}
            className="font-display text-[1.55rem] font-semibold tracking-tight"
            style={{ color: "#C5A059" }}
            data-cursor-hover
          >
            MB<span className="text-zinc-700">.</span>
          </motion.div>

          {/* Localisation + disponibilité */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: EASE_LUXURY }}
            className="flex items-center gap-3"
          >
            {/* Dot pulsant */}
            <span className="relative flex h-[5px] w-[5px]">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "#C5A059" }}
              />
              <span
                className="relative inline-flex h-[5px] w-[5px] rounded-full"
                style={{ background: "#C5A059" }}
              />
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.38em] text-zinc-500">
              Available · Tunis, TN
            </span>
          </motion.div>
        </nav>

        {/* ── CONTENU CENTRAL ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: EASE_LUXURY }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-10" style={{ background: "#C5A059" }} />
            <span
              className="font-mono text-[0.58rem] uppercase tracking-[0.48em]"
              style={{ color: "#C5A059" }}
            >
              Full-Stack Developer
            </span>
            <span className="h-px w-10" style={{ background: "#C5A059" }} />
          </motion.div>

          {/* Titre principal avec parallax */}
          <AnimatedTitle />

          {/* Séparateur vertical */}
          <motion.div
            className="my-7 w-px"
            style={{
              height: 52,
              background: "linear-gradient(to bottom, #C5A059, transparent)",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9, ease: EASE_LUXURY }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 1, ease: EASE_LUXURY }}
            className="mb-12 max-w-[36ch] font-mono text-[0.68rem] uppercase leading-loose tracking-[0.22em] text-zinc-500"
          >
            Architecting{" "}
            <span className="text-zinc-200">high-performance</span> web & Mobile
            applications by merging robust backend infrastructures with meticulously crafted user experiences.
          </motion.p>

          {/* CTA */}
          <ExploreButton onClick={scrollDown} />
        </div>

        {/* ── LIGNE DÉCORATIVE DROITE ── */}
        <motion.div
          className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <span
            className="font-mono text-[0.48rem] uppercase tracking-[0.38em] text-zinc-700"
            style={{ writingMode: "vertical-rl" }}
          >
            2025 · Portfolio
          </span>
          <div
            className="w-px"
            style={{
              height: 48,
              background: "linear-gradient(to bottom, transparent, rgba(197,160,89,0.3))",
            }}
          />
        </motion.div>

        {/* CSS globaux pour animations */}
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(1); transform-origin: top; }
            50%       { opacity: 1;   transform: scaleY(1.08); transform-origin: top; }
          }
        `}</style>
      </section>
    </>
  );
}