"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiHtml5, SiCss, SiNodedotjs, SiExpress, SiNestjs, SiMysql,
  SiPostgresql, SiPrisma, SiGit, SiDocker, SiGithubactions,
  SiVercel, SiRender, SiRedis, SiGraphql, SiPython,
} from "react-icons/si";
import { TbApi, TbBrandThreejs, TbSql } from "react-icons/tb";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "React.js", "Node.js", "Next.js", "TypeScript",
  "SQL", "Docker", "CI/CD", "Three.js", "NestJS", "Prisma",
];

interface Skill { name: string; icon: IconType; level: number }
interface SkillGroup { id: string; category: string; description: string; skills: Skill[] }

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "01",
    category: "Languages",
    description: "Core syntax & data manipulation",
    skills: [
      { name: "JavaScript", icon: SiJavascript, level: 95 },
      { name: "TypeScript", icon: SiTypescript, level: 90 },
      { name: "Python",     icon: SiPython,     level: 80 },
      { name: "SQL",        icon: TbSql,        level: 85 },
    ],
  },
  {
    id: "02",
    category: "Frontend",
    description: "Interfaces & immersive experiences",
    skills: [
      { name: "React.js",    icon: SiReact,       level: 97 },
      { name: "Next.js",     icon: SiNextdotjs,   level: 90 },
      { name: "Tailwind CSS",icon: SiTailwindcss, level: 90 },
      { name: "Three.js",    icon: TbBrandThreejs, level: 72 },
      { name: "HTML5",       icon: SiHtml5,       level: 98 },
      { name: "CSS3",        icon: SiCss,        level: 95 },
    ],
  },
  {
    id: "03",
    category: "Backend",
    description: "APIs, services & server logic",
    skills: [
      { name: "Node.js",   icon: SiNodedotjs, level: 94 },
      { name: "NestJS",    icon: SiNestjs,    level: 75 },
      { name: "Express.js",icon: SiExpress,   level: 93 },
      { name: "REST APIs", icon: TbApi,       level: 92 },
      { name: "GraphQL",   icon: SiGraphql,   level: 65 },
    ],
  },
  {
    id: "04",
    category: "Database",
    description: "Storage, caching & ORM layers",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 80 },
      { name: "MySQL",      icon: SiMysql,      level: 90 },
      { name: "Prisma ORM", icon: SiPrisma,     level: 77 },
      { name: "Redis",      icon: SiRedis,      level: 70 },
    ],
  },
  {
    id: "05",
    category: "DevOps",
    description: "Deployment, CI/CD & cloud infra",
    skills: [
      { name: "Docker",          icon: SiDocker,         level: 78 },
      { name: "GitHub Actions",  icon: SiGithubactions,  level: 80 },
      { name: "Vercel",          icon: SiVercel,         level: 90 },
      { name: "Render",          icon: SiRender,         level: 82 },
      { name: "Git",             icon: SiGit,            level: 94 },
    ],
  },
];

const EASE = [0.76, 0, 0.24, 1] as const;

// ─────────────────────────────────────────────
// MARQUEE ROW
// ─────────────────────────────────────────────
function MarqueeRow({ items, rtl, speed }: { items: string[]; rtl: boolean; speed: number }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="flex w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        animate={{ x: rtl ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-16 pr-16 whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display font-light uppercase tracking-tight transition-colors duration-500 hover:text-zinc-400 select-none"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 4rem)",
              color: i % 2 === 0 ? "rgba(39,39,42,0.9)" : "rgba(63,63,70,0.5)",
            }}
          >
            {item}
            <span className="ml-14 text-[0.4em]" style={{ color: "rgba(197,160,89,0.25)" }}>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SKILL BAR — barre de niveau animée
// ─────────────────────────────────────────────
function SkillBar({ level, delay }: { level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-[2px] w-full overflow-hidden" style={{ background: "rgba(39,39,42,0.6)" }}>
      <motion.div
        className="h-full"
        style={{ background: "linear-gradient(to right, rgba(197,160,89,0.5), #C5A059)" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ delay, duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// SKILL CARD (nouvelle version éditoriale)
// ─────────────────────────────────────────────
function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 1, ease: EASE }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="group relative flex flex-col overflow-hidden"
      style={{
        border: "1px solid rgba(39,39,42,0.8)",
        padding: "2.5rem",
        minHeight: 340,
      }}
    >
      {/* Sweep background on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered === index ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(197,160,89,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Corner mark TL */}
      <div className="pointer-events-none absolute top-0 left-0" style={{ width: 20, height: 20 }}>
        <span className="absolute left-0 top-0 h-full w-px" style={{ background: "rgba(197,160,89,0.5)" }} />
        <span className="absolute left-0 top-0 h-px w-full" style={{ background: "rgba(197,160,89,0.5)" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span
            className="font-mono text-[0.45rem] uppercase tracking-[0.38em] transition-colors duration-500"
            style={{ color: hovered === index ? "#C5A059" : "rgba(63,63,70,0.7)" }}
          >
            {group.id}
          </span>
          <h3
            className="font-display font-light uppercase tracking-tight leading-none transition-colors duration-500"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
              color: hovered === index ? "#f4f4f5" : "#a1a1aa",
            }}
          >
            {group.category}
          </h3>
          <span className="font-mono text-[0.48rem] uppercase tracking-[0.25em] text-zinc-700">
            {group.description}
          </span>
        </div>

        {/* Item count badge */}
        <span
          className="font-mono text-[0.5rem] uppercase tracking-[0.3em] rounded-full px-2.5 py-1 shrink-0"
          style={{
            border: "1px solid rgba(197,160,89,0.2)",
            color: "rgba(197,160,89,0.6)",
          }}
        >
          {group.skills.length} tools
        </span>
      </div>

      {/* Skills list */}
      <div className="relative z-10 flex flex-col gap-5 flex-1">
        {group.skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div key={skill.name} className="group/skill flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    className="transition-colors duration-400 shrink-0"
                    style={{
                      width: 14,
                      height: 14,
                      color: hovered === index ? "#C5A059" : "#52525b",
                    }}
                  />
                  <span
                    className="font-mono text-[0.55rem] uppercase tracking-[0.28em] transition-colors duration-400"
                    style={{ color: hovered === index ? "#d4d4d8" : "#71717a" }}
                  >
                    {skill.name}
                  </span>
                </div>
                <span
                  className="font-mono text-[0.45rem] tracking-widest tabular-nums"
                  style={{ color: "rgba(197,160,89,0.45)" }}
                >
                  {skill.level}%
                </span>
              </div>
              <SkillBar level={skill.level} delay={0.1 + i * 0.06 + index * 0.05} />
            </div>
          );
        })}
      </div>

      {/* Bottom line reveal */}
      <div
        className="relative z-10 mt-10 h-px overflow-hidden"
        style={{ background: "rgba(39,39,42,0.5)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 h-full"
          style={{ background: "#C5A059" }}
          animate={{ width: hovered === index ? "100%" : "0%" }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="mb-28 md:mb-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-10 flex items-center gap-4"
      >
        <span className="h-px w-12" style={{ background: "#C5A059" }} />
        <span
          className="font-mono text-[0.58rem] uppercase tracking-[0.45em]"
          style={{ color: "#C5A059" }}
        >
          Expertise
        </span>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display font-light uppercase leading-[0.85] tracking-tight text-zinc-50
              text-[13vw] md:text-[9.5rem] lg:text-[11rem]"
          >
            Technical
            <br />
            <span className="text-zinc-700">Arsenal</span>
            <span style={{ color: "#C5A059" }}>.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 1, ease: EASE }}
          className="flex flex-col items-start md:items-end gap-2 pb-4"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-zinc-600">
            {SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)} Technologies
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-zinc-600">
            {SKILL_GROUPS.length} Domains
          </span>
          <div className="mt-3 h-px w-16" style={{ background: "rgba(197,160,89,0.3)" }} />
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HORIZONTAL PROFICIENCY SUMMARY
// ─────────────────────────────────────────────
function ProficiencySummary() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const domains = SKILL_GROUPS.map((g) => ({
    label: g.category,
    avg: Math.round(g.skills.reduce((s, sk) => s + sk.level, 0) / g.skills.length),
  }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE }}
      className="mb-20 md:mb-28 grid gap-0"
      style={{
        gridTemplateColumns: `repeat(${domains.length}, 1fr)`,
        borderTop: "1px solid rgba(39,39,42,0.7)",
        borderLeft: "1px solid rgba(39,39,42,0.7)",
      }}
    >
      {domains.map((d, i) => (
        <div
          key={d.label}
          className="group flex flex-col gap-4 px-6 py-8 transition-colors duration-500 hover:bg-[rgba(197,160,89,0.02)]"
          style={{
            borderRight: "1px solid rgba(39,39,42,0.7)",
            borderBottom: "1px solid rgba(39,39,42,0.7)",
          }}
        >
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-zinc-600 group-hover:text-zinc-500 transition-colors">
            {d.label}
          </span>

          {/* Arc / numeric */}
          <div className="flex items-end gap-1.5">
            <span
              className="font-display font-light leading-none transition-colors duration-500 group-hover:text-[#C5A059]"
              style={{ fontSize: "2.4rem", color: "#3f3f46" }}
            >
              {d.avg}
            </span>
            <span className="mb-1.5 font-mono text-[0.42rem] text-zinc-700">%</span>
          </div>

          {/* Mini bar */}
          <div className="h-px w-full overflow-hidden" style={{ background: "rgba(39,39,42,0.6)" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(to right, rgba(197,160,89,0.4), #C5A059)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: `${d.avg}%` } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 1.2, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// EXPORT DEFAULT
// ─────────────────────────────────────────────
export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Marquee opacity on scroll
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-64"
      style={{ background: "#09090b" }}
    >
      {/* Lueur ambiante centrale */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(197,160,89,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Grille */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[100rem] px-6 md:px-16">
        <SectionHeader />

        {/* ── MARQUEE ── */}
        <motion.div
          style={{ opacity: marqueeOpacity }}
          className="mb-24 md:mb-32 flex flex-col gap-7 overflow-hidden"
        >
          <MarqueeRow items={MARQUEE_ITEMS} rtl={false} speed={48} />
          <MarqueeRow items={[...MARQUEE_ITEMS].reverse()} rtl speed={56} />
        </motion.div>

        {/* ── PROFICIENCY SUMMARY ROW ── */}
        <ProficiencySummary />

        {/* ── SKILL CARDS GRID ── */}
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-28 flex flex-col items-center gap-8 text-center"
        >
          <div className="flex items-center gap-5">
            <span className="h-px w-16" style={{ background: "rgba(197,160,89,0.25)" }} />
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.42em] text-zinc-600">
              Always learning · Always building
            </span>
            <span className="h-px w-16" style={{ background: "rgba(197,160,89,0.25)" }} />
          </div>

          {/* Tech count */}
          <div
            className="flex items-center gap-8 px-10 py-6"
            style={{
              border: "1px solid rgba(39,39,42,0.7)",
            }}
          >
            {[
              { n: SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0), label: "Technologies" },
              { n: "3+",  label: "Years" },
              { n: "20+", label: "Projects" },
            ].map(({ n, label }, i, arr) => (
              <div key={label} className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="font-display font-light leading-none"
                    style={{ fontSize: "2rem", color: "#C5A059" }}
                  >
                    {n}
                  </span>
                  <span className="font-mono text-[0.48rem] uppercase tracking-[0.3em] text-zinc-600">
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-8 w-px" style={{ background: "rgba(39,39,42,0.8)" }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}