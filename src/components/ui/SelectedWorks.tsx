"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

// ── Remplacer par vos imports réels ──
import modeDark       from "../../app/photo/mode dark.png";
import dashboardAdmin from "../../app/photo/dashboard admin.png";
import coffeeShop     from "../../app/photo/coffe shop.png";
import torontoBoutique from "../../app/photo/toronto boutique appartment.png";

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────
interface Project {
  id:          string;
  title:       string;
  subtitle:    string;
  category:    string;
  year:        string;
  image:       string | StaticImageData;
  alignment:   "left" | "right";
  tech:        string[];
  award?:      string;
  githubLink?: string;
  liveLink?:   string;
}

const projects: Project[] = [
  {
    id:         "01",
    title:      "Finance",
    subtitle:   "Hub",
    category:   "Full-stack digital banking simulator with secure workflows & smart analytics.",
    year:       "2024",
    image:      modeDark,
    alignment:  "left",
    tech:       ["Next.js", "TypeScript", "NestJS", "Prisma", "Docker"],
    githubLink: "https://github.com/mahmoudBH/financehub",
    liveLink:   "https://financehub-web-one.vercel.app/",
  },
  {
    id:         "02",
    title:      "Syma",
    subtitle:   "Flow",
    category:   "Comprehensive Web, Mobile & AI project management ecosystem.",
    year:       "2025",
    image:      dashboardAdmin,
    alignment:  "right",
    tech:       ["React", "React Native", "Node.js", "AI Analysis"],
    githubLink: "https://github.com/mahmoudBH/syma-flow",
  },
  {
    id:         "03",
    title:      "Coffee Shop",
    subtitle:   "Platform",
    category:   "Complete Full-Stack management and showcase solution for a restaurant.",
    year:       "2024",
    image:      coffeeShop,
    alignment:  "left",
    tech:       ["Next.js", "TypeScript", "Node.js", "Prisma", "Tailwind"],
    githubLink: "https://github.com/mahmoudBH/coffee-shop-platform",
    liveLink:   "https://coffee-shop-platform-sepia.vercel.app/",
  },
  {
    id:         "04",
    title:      "Toronto",
    subtitle:   "Boutique",
    category:   "Premium real estate web app — immersive UI/UX & modern rendering.",
    year:       "2024",
    image:      torontoBoutique,
    alignment:  "right",
    tech:       ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    githubLink: "https://github.com/mahmoudBH/Boutique-Apartments",
    liveLink:   "https://toronto-apartments.vercel.app/",
  },
];

const EASE = [0.76, 0, 0.24, 1] as const;

// ─────────────────────────────────────────────
// CURSOR LABEL
// ─────────────────────────────────────────────
function CursorLabel({ visible, x, y }: { visible: boolean; x: number; y: number }) {
  const sx = useSpring(x, { stiffness: 160, damping: 20 });
  const sy = useSpring(y, { stiffness: 160, damping: 20 });

  return (
    <motion.div
      className="pointer-events-none fixed z-[9990] flex items-center justify-center"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="flex h-[76px] w-[76px] items-center justify-center rounded-full backdrop-blur-md"
        style={{ background: "rgba(197,160,89,0.92)" }}
      >
        <span className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.25em] text-zinc-950">
          Explore
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="mb-40 md:mb-64">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-10 flex items-center gap-4"
      >
        <span className="h-px w-12" style={{ background: "#C5A059" }} />
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.45em]" style={{ color: "#C5A059" }}>
          Portfolio
        </span>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display text-[14vw] md:text-[10rem] lg:text-[11.5rem] font-light uppercase leading-[0.85] tracking-tight text-zinc-50"
          >
            Selected
            <br />
            <span className="text-zinc-700">Works</span>
            <span style={{ color: "#C5A059" }}>.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1, ease: EASE }}
          className="flex flex-col gap-2 pb-4 md:items-end"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-zinc-600">
            {projects.length} Projects
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-zinc-600">
            2024 — 2025
          </span>
          <div className="mt-3 h-px w-16" style={{ background: "rgba(197,160,89,0.3)" }} />
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────
function ProjectCard({
  project, index, onCursorEnter, onCursorLeave, onCursorMove,
}: {
  project: Project;
  index:   number;
  onCursorEnter: () => void;
  onCursorLeave: () => void;
  onCursorMove:  (x: number, y: number) => void;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const isRight  = project.alignment === "right";
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col gap-10 md:gap-0 items-stretch
        ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Index watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 1 }}
        className={`absolute top-0 z-20 hidden md:block font-display text-[14rem] font-light
          leading-none select-none pointer-events-none
          ${isRight ? "right-[55%] translate-x-1/2" : "left-[55%] -translate-x-1/2"}`}
        style={{ color: "rgba(197,160,89,0.04)", top: "-3rem" }}
      >
        {project.id}
      </motion.div>

      {/* ═══════════════════════════════════════════
          IMAGE SECTION
          Principe : un seul conteneur `relative`
          qui prend la taille naturelle de l'image.
          Tous les overlays absolus vivent dedans.
      ════════════════════════════════════════════ */}
      <motion.div
        className={`w-full md:w-[58%] ${isRight ? "md:ml-8" : "md:mr-8"}`}
        initial={{ opacity: 0, x: isRight ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
        onMouseMove={(e) => onCursorMove(e.clientX, e.clientY)}
      >
        {/*
          ┌───────────────────────────────────────────────┐
          │  .relative — hauteur = hauteur naturelle img  │
          │  Tous les position:absolute se calent ici    │
          └───────────────────────────────────────────────┘
        */}
        <div className="group/img relative w-full overflow-hidden rounded-sm">

          {/* IMAGE — définit la hauteur de la boîte */}
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={1000}
            className="block w-full h-auto object-cover
              transition-all duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]
              group-hover/img:scale-[1.03]"
            style={{ filter: "grayscale(0.65) brightness(0.44)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter =
                "grayscale(0) brightness(0.82)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter =
                "grayscale(0.65) brightness(0.44)";
            }}
          />

          {/* CORNER — haut gauche */}
          <div
            className="pointer-events-none absolute top-0 left-0 z-20"
            style={{ width: 28, height: 28 }}
          >
            <span className="absolute left-0 top-0 h-full w-px" style={{ background: "rgba(197,160,89,0.85)" }} />
            <span className="absolute left-0 top-0 h-px w-full" style={{ background: "rgba(197,160,89,0.85)" }} />
          </div>

          {/* CORNER — bas droit */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-20"
            style={{ width: 28, height: 28 }}
          >
            <span className="absolute right-0 bottom-0 h-full w-px" style={{ background: "rgba(197,160,89,0.85)" }} />
            <span className="absolute right-0 bottom-0 h-px w-full" style={{ background: "rgba(197,160,89,0.85)" }} />
          </div>

          {/* GRADIENT OVERLAY directionnel */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: isRight
                ? "linear-gradient(to left,  rgba(9,9,11,0.65) 0%, transparent 55%)"
                : "linear-gradient(to right, rgba(9,9,11,0.65) 0%, transparent 55%)",
            }}
          />

          {/* BADGE AWARD */}
          {project.award && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-4 left-4 z-30 flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{
                background:     "rgba(197,160,89,0.12)",
                border:         "1px solid rgba(197,160,89,0.35)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#C5A059">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em]" style={{ color: "#C5A059" }}>
                {project.award}
              </span>
            </motion.div>
          )}



          {/* TECH STACK — révélation au hover */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 flex flex-wrap gap-2 p-5
              opacity-0 group-hover/img:opacity-100 transition-opacity duration-400"
            style={{ background: "linear-gradient(to top, rgba(9,9,11,0.92) 0%, transparent)" }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 font-mono text-[0.48rem] uppercase tracking-[0.28em]"
                style={{ border: "1px solid rgba(197,160,89,0.3)", color: "rgba(197,160,89,0.85)" }}
              >
                {t}
              </span>
            ))}
          </div>

        </div>{/* fin .group/img */}
      </motion.div>

      {/* ═══════════════════════════════════════════
          TEXTE & LIENS
      ════════════════════════════════════════════ */}
      <motion.div
        className={`w-full md:w-[42%] flex flex-col justify-center z-10
          ${isRight ? "md:pr-16 md:items-end md:text-right" : "md:pl-16 md:items-start"}`}
        style={{ y: textY }}
        initial={{ opacity: 0, x: isRight ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.25, duration: 1.2, ease: EASE }}
      >
        {/* Index + année */}
        <div className={`mb-8 flex items-center gap-4 ${isRight ? "flex-row-reverse" : ""}`}>
          <span className="font-mono text-sm font-light tracking-tight" style={{ color: "#C5A059" }}>
            {project.id}
          </span>
          <div className="h-px" style={{ width: 32, background: "rgba(197,160,89,0.3)" }} />
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-zinc-600">
            {project.year}
          </span>
        </div>

        {/* Titre */}
        <h3 className="font-display font-light uppercase leading-[0.88] tracking-tight text-zinc-50 mb-8
          text-[3.2rem] md:text-[4rem] lg:text-[5rem]">
          <span className="block">{project.title}</span>
          <span className="block italic text-zinc-500">{project.subtitle}</span>
        </h3>

        {/* Séparateur */}
        <div
          className="mb-7 h-px"
          style={{
            width:      48,
            background: isRight
              ? "linear-gradient(to left,  rgba(197,160,89,0.5), transparent)"
              : "linear-gradient(to right, rgba(197,160,89,0.5), transparent)",
            alignSelf: isRight ? "flex-end" : "flex-start",
          }}
        />

        {/* Description */}
        <p className="mb-14 max-w-[32ch] font-mono text-[0.65rem] uppercase leading-loose tracking-[0.22em] text-zinc-400">
          {project.category}
        </p>

        {/* CTA LINKS */}
        <div className={`flex flex-col xl:flex-row gap-6
          ${isRight ? "xl:flex-row-reverse xl:self-end" : "self-start"}`}
        >
          {/* Live Demo */}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link relative flex items-center gap-4 ${isRight ? "flex-row-reverse" : ""}`}
              style={{ cursor: "none" }}
            >
              <div
                className="relative flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full overflow-hidden transition-transform duration-500 group-hover/link:scale-110"
                style={{ border: "1px solid rgba(197,160,89,0.4)" }}
              >
                <span
                  className="absolute inset-0 rounded-full -translate-y-full transition-transform duration-500
                    group-hover/link:translate-y-0"
                  style={{ background: "#C5A059" }}
                />
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  className="relative z-10 text-zinc-400 transition-colors duration-300 group-hover/link:text-zinc-950"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <span className="relative">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-zinc-500
                  transition-colors duration-400 group-hover/link:text-zinc-200">
                  Live Demo
                </span>
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500
                    group-hover/link:w-full"
                  style={{ background: "#C5A059" }}
                />
              </span>
            </a>
          )}

          {/* GitHub Repo */}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link relative flex items-center gap-4 ${isRight ? "flex-row-reverse" : ""}`}
              style={{ cursor: "none" }}
            >
              <div
                className="relative flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full overflow-hidden transition-transform duration-500 group-hover/link:scale-110"
                style={{ border: "1px solid rgba(63,63,70,0.6)" }}
              >
                <span
                  className="absolute inset-0 rounded-full -translate-y-full transition-transform duration-500
                    group-hover/link:translate-y-0"
                  style={{ background: "#C5A059" }}
                />
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                  className="relative z-10 text-zinc-500 transition-colors duration-300 group-hover/link:text-zinc-950"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <span className="relative">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-zinc-500
                  transition-colors duration-400 group-hover/link:text-zinc-200">
                  Repository
                </span>
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500
                    group-hover/link:w-full"
                  style={{ background: "#C5A059" }}
                />
              </span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}


// ─────────────────────────────────────────────
// EXPORT DEFAULT
// ─────────────────────────────────────────────
export default function SelectedWorks() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos,     setCursorPos]     = useState({ x: -200, y: -200 });
  const [activeIndex,   setActiveIndex]   = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveIndex(Math.min(projects.length - 1, Math.floor(v * projects.length)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      <CursorLabel visible={cursorVisible} x={cursorPos.x} y={cursorPos.y} />

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-32 md:py-64"
        style={{ background: "#09090b" }}
      >
        {/* Lueurs ambiantes */}
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(100,130,180,0.04) 0%, transparent 70%)" }}
        />

        {/* Grille subtile */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[100rem] px-6 md:px-16">
          <SectionHeader />

          <div className="flex flex-col gap-48 md:gap-80">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onCursorEnter={() => setCursorVisible(true)}
                onCursorLeave={() => setCursorVisible(false)}
                onCursorMove={(x, y) => setCursorPos({ x, y })}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="mt-48 flex flex-col items-center gap-8 text-center"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-16" style={{ background: "rgba(197,160,89,0.3)" }} />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-zinc-600">
                Want to see more?
              </span>
              <span className="h-px w-16" style={{ background: "rgba(197,160,89,0.3)" }} />
            </div>

            <a
              href="https://github.com/mahmoudBH"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-5 overflow-hidden border px-14 py-5
                transition-colors duration-500 hover:border-[#C5A059]"
              style={{ borderColor: "rgba(63,63,70,0.8)", cursor: "none" }}
            >
              <span
                className="absolute inset-0 -translate-x-full bg-[#C5A059] transition-transform duration-500
                  group-hover:translate-x-0"
                style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
              />
              <span className="relative z-10 font-mono text-[0.6rem] uppercase tracking-[0.42em]
                text-zinc-400 transition-colors duration-300 group-hover:text-zinc-950">
                View Full GitHub
              </span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="relative z-10 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-950"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}