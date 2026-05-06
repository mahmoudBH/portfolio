"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type Variant = "light" | "gold" | "ghost" | "dark";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  strength?: number;        // intensité magnétique 0-1 (défaut 0.3)
  rounded?: boolean;        // pill vs rectangle
}

// ─────────────────────────────────────────────
// VARIANT CONFIGS
// ─────────────────────────────────────────────
const VARIANTS: Record<
  Variant,
  {
    base: string;
    fill: string;
    text: string;
    textHover: string;
    border: string;
  }
> = {
  // Fond blanc → texte noir : CTA principal
  light: {
    base:      "border-zinc-200/20 bg-transparent",
    fill:      "bg-zinc-50",
    text:      "text-zinc-200",
    textHover: "text-zinc-950",
    border:    "border-zinc-200/20",
  },
  // Fond doré → texte noir : CTA premium
  gold: {
    base:      "border-[rgba(197,160,89,0.4)] bg-transparent",
    fill:      "bg-[#C5A059]",
    text:      "text-zinc-300",
    textHover: "text-zinc-950",
    border:    "border-[rgba(197,160,89,0.4)]",
  },
  // Contour seulement → texte blanc
  ghost: {
    base:      "border-zinc-700 bg-transparent",
    fill:      "bg-zinc-800",
    text:      "text-zinc-400",
    textHover: "text-zinc-50",
    border:    "border-zinc-700",
  },
  // Fond sombre → texte blanc
  dark: {
    base:      "border-zinc-900 bg-zinc-900/50",
    fill:      "bg-zinc-950",
    text:      "text-zinc-300",
    textHover: "text-zinc-50",
    border:    "border-zinc-800",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function MagneticButton({
  children,
  className,
  variant = "light",
  strength = 0.3,
  rounded = true,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Positions — motion values = zéro re-render
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const tx   = useMotionValue(0);  // texte parallax
  const ty   = useMotionValue(0);

  // Shimmer position (éclat de lumière sur hover)
  const shimX = useMotionValue(-60);
  const shimY = useMotionValue(-60);

  const spring  = { stiffness: 160, damping: 16, mass: 0.08 };
  const tSpring = { stiffness: 200, damping: 18, mass: 0.06 };

  const sx  = useSpring(x,  spring);
  const sy  = useSpring(y,  spring);
  const stx = useSpring(tx, tSpring);
  const sty = useSpring(ty, tSpring);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const rect = ref.current!.getBoundingClientRect();
    const midX = clientX - (rect.left + rect.width  / 2);
    const midY = clientY - (rect.top  + rect.height / 2);

    x.set(midX * strength);
    y.set(midY * strength);
    tx.set(midX * (strength * 0.4));
    ty.set(midY * (strength * 0.4));

    // Shimmer suit exactement le curseur dans le bouton
    shimX.set(clientX - rect.left);
    shimY.set(clientY - rect.top);
  };

  const reset = () => {
    x.set(0);  y.set(0);
    tx.set(0); ty.set(0);
    shimX.set(-60); shimY.set(-60);
  };

  const v = VARIANTS[variant];

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative overflow-hidden border transition-colors duration-500",
        rounded ? "rounded-full" : "",
        v.base,
        className
      )}
      style={{ cursor: "none" }}
      {...props}
    >
      {/* ── FILL SWEEP (monte du bas) ── */}
      <div
        className={cn(
          "absolute inset-0 z-0 translate-y-[105%] transition-transform duration-500",
          rounded ? "rounded-full" : "",
          v.fill
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
      />

      {/* ── SHIMMER (reflet de lumière sur le fond) ── */}
      <motion.div
        className="pointer-events-none absolute z-[1] h-20 w-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          x: shimX,
          y: shimY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── BORDER GOLD GLOW on hover ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{
          borderRadius: rounded ? "9999px" : 0,
          boxShadow:
            variant === "gold"
              ? "inset 0 0 20px rgba(197,160,89,0.12), 0 0 30px rgba(197,160,89,0.08)"
              : "inset 0 0 20px rgba(255,255,255,0.04)",
        }}
      />

      {/* ── CHILDREN avec parallax ── */}
      <motion.span
        style={{ x: stx, y: sty }}
        className={cn(
          "relative z-10 flex items-center justify-center gap-3",
          "font-mono text-[0.62rem] uppercase tracking-[0.38em]",
          "transition-colors duration-400",
          v.text,
          `group-hover:${v.textHover}`
        )}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}