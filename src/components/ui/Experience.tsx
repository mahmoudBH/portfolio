"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────
type ExpType = "Professional" | "Award" | "Project" | "Education";

interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  type: ExpType;
  tech: string[];
  details: string[];
}

const experiences: Experience[] = [
  {
    id: "01",
    year: "Feb — May 2025",
    role: "Full-Stack Developer Intern",
    company: "Symatique",
    location: "Internship · Tunis, TN",
    description:
      "Built SymaFlow end-to-end — a Web, Mobile & AI project management ecosystem — and reduced processing time by 30% through Python/Flask automation.",
    type: "Professional",
    tech: ["React.js", "React Native", "Node.js", "Python", "Flask", "MySql", "TypeScript"],
    details: [
      "Engineered SymaFlow from scratch — a full-stack platform integrating a Web app, a Mobile app, and an AI microservice for data analysis and progress prediction.",
      "Built the web frontend with Next.js (App Router) and TypeScript, delivering a polished multi-role UI for Admins, Project Managers, Developers, Designers, and QA.",
      "Developed the mobile application with React Native (Expo) sharing the same backend API for real-time cross-platform synchronisation.",
      "Designed Python / Flask microservices for AI-powered analysis and workflow automation, reducing processing time by 30%.",
      "Architected secure REST APIs with Node.js, Prisma ORM, and JWT authentication; applied Agile / Scrum methodologies throughout.",
    ],
  },
  {
    id: "02",
    year: "2025",
    role: "1st Place Winner",
    company: "Hackathon Nefzawa",
    location: "Award · Kébili, TN",
    description:
      "Led development of an award-winning AI-Based Media Analysis prototype, delivered under a strict 48-hour deadline.",
    type: "Award",
    tech: ["Python", "TensorFlow", "React", "Flask", "Cloud", "ML APIs"],
    details: [
      "Lead developer and architect of the winning AI-based media analysis prototype.",
      "Integrated ML APIs for real-time data processing, sentiment analysis, and insight generation.",
      "Pitched the full technical architecture and business value to a jury of industry experts.",
      "Delivered a fully functional MVP within a strict 48-hour competition deadline.",
    ],
  },
  {
    id: "03",
    year: "2024",
    role: "Full-Stack Developer Intern",
    company: "UIB Bank ",
    location: "Internship · Tunis, TN",
    description:
      "Architected a production-grade digital banking simulator with secure auth, virtual cards, smart savings, and an admin supervision panel.",
    type: "Professional",
    tech: ["Next.js", "NestJS", "Prisma", "MySQL", "Redis", "JWT", "Docker"],
    details: [
      "Designed and built FinanceHub — a complete digital banking dashboard simulator showcasing modern fintech engineering practices.",
      "Implemented multi-account management, virtual cards, transfers, deposits, withdrawals, and currency exchange flows.",
      "Built Smart Savings Vaults, real-time analytics, and a full admin supervision panel.",
      "Secured the platform with JWT + refresh token rotation and Redis caching; deployed via Docker on Vercel.",
    ],
  },
  {
    id: "04",
    year: "2022 — 2025",
    role: "B.Sc. Information Technology",
    company: "ISET Kébili",
    location: "Education · Kébili, TN",
    description:
      "Three-year degree in Software Engineering — algorithms, databases, web technologies, and applied full-stack development.",
    type: "Education",
    tech: ["Algorithms", "SQL", "Software Engineering", "OOP", "Web Dev","mobile dev", "Networks"],
    details: [
      "Specialised in Software Engineering and Modern Web & Mobile Technologies over three years (2022 – 2025).",
      "Completed advanced coursework in Relational Databases (MySQL / PostgreSQL), Data Structures, and Algorithms.",
      "Graduated with a final-year internship project (SymaFlow) rated as outstanding by the evaluation committee.",
      "Participated in the Hackathon Business Game event hosted at the institute.",
    ],
  },
];

const TYPE_META: Record<ExpType, { label: string; color: string }> = {
  Professional: { label: "Pro", color: "#C5A059" },
  Award:        { label: "★",   color: "#C5A059" },
  Project:      { label: "⬡",   color: "#8aaedd" },
  Education:    { label: "Edu", color: "#7a9e7e" },
};

const EASE = [0.76, 0, 0.24, 1] as const;

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
          Journey
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
            Career
            <br />
            <span className="text-zinc-700">Timeline</span>
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
            {experiences.length} Milestones
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-zinc-600">
            2022 — 2025
          </span>
          <div className="mt-3 h-px w-16" style={{ background: "rgba(197,160,89,0.3)" }} />
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE ROW
// ─────────────────────────────────────────────
function ExperienceRow({
  exp,
  index,
  isOpen,
  onToggle,
  isLast,
}: {
  exp: Experience;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-10%" });
  const meta = TYPE_META[exp.type];

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.9, ease: EASE }}
      className="relative group"
      style={{ borderBottom: isLast ? "none" : "1px solid rgba(39,39,42,0.8)" }}
    >
      {/* Hover background sweep */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(to right, rgba(197,160,89,0.025) 0%, transparent 60%)",
        }}
      />

      {/* ── TRIGGER ROW ── */}
      <button
        onClick={onToggle}
        className="relative z-10 w-full py-10 md:py-14 text-left"
        style={{ cursor: "none" }}
        suppressHydrationWarning
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">

          {/* COL 1 — Index + Type badge */}
          <div className="md:w-[14%] flex items-center gap-4 shrink-0">
            {/* Grand index décoratif */}
            <span
              className="font-display font-light text-[2.2rem] leading-none tabular-nums transition-colors duration-500"
              style={{ color: isOpen ? "#C5A059" : "rgba(63,63,70,0.6)" }}
            >
              {exp.id}
            </span>
            {/* Badge type */}
            <span
              className="font-mono text-[0.45rem] uppercase tracking-[0.3em] rounded-full px-2.5 py-1 border"
              style={{
                color: meta.color,
                borderColor: `${meta.color}40`,
                background: `${meta.color}0d`,
              }}
            >
              {exp.type}
            </span>
          </div>

          {/* COL 2 — Année + Localisation */}
          <div className="md:w-[16%] flex flex-col gap-1 shrink-0">
            <span
              className="font-mono text-[0.6rem] tracking-[0.3em] transition-colors duration-500"
              style={{ color: isOpen ? "#C5A059" : "#6b6b72" }}
            >
              {exp.year}
            </span>
            <span className="font-mono text-[0.48rem] uppercase tracking-[0.25em] text-zinc-700">
              {exp.location}
            </span>
          </div>

          {/* COL 3 — Rôle + Entreprise */}
          <div className="md:w-[42%]">
            <h3
              className="font-display font-light uppercase leading-tight tracking-tight transition-colors duration-500
                text-[2rem] md:text-[2.8rem] lg:text-[3.4rem]"
              style={{ color: isOpen ? "#f4f4f5" : "#71717a" }}
            >
              {exp.role}
            </h3>
            <div className="mt-2 flex items-center gap-3">
              <span
                className="h-px w-5 transition-all duration-700"
                style={{ background: isOpen ? "#C5A059" : "rgba(63,63,70,0.5)" }}
              />
              <span
                className="font-mono text-[0.55rem] uppercase tracking-[0.3em] transition-colors duration-500"
                style={{ color: isOpen ? "#C5A059" : "#52525b" }}
              >
                {exp.company}
              </span>
            </div>
          </div>

          {/* COL 4 — Description + toggle */}
          <div className="md:w-[28%] flex items-center justify-between md:justify-end gap-6">
            <p className="hidden lg:block font-mono text-[0.55rem] leading-relaxed tracking-wide text-zinc-600 max-w-[22ch] italic group-hover:text-zinc-500 transition-colors duration-500">
              {exp.description}
            </p>

            {/* Toggle — cercle animé */}
            <div
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden transition-all duration-500"
              style={{
                border: isOpen
                  ? "1px solid #C5A059"
                  : "1px solid rgba(63,63,70,0.6)",
              }}
            >
              <span
                className="absolute inset-0 rounded-full transition-transform duration-500"
                style={{
                  background: "#C5A059",
                  transform: isOpen ? "scale(1)" : "scale(0)",
                }}
              />
              {/* Plus / Minus SVG */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="relative z-10 transition-colors duration-300"
                stroke={isOpen ? "#0a0a0a" : "#71717a"}
                strokeWidth="1.2"
              >
                <line x1="6" y1="1" x2="6" y2="11" className="transition-all duration-400"
                  style={{ opacity: isOpen ? 0 : 1 }} />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* ── DETAIL PANEL ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-16 md:pl-[30%]">
              <div
                className="relative rounded-none border-l overflow-hidden p-10 md:p-14"
                style={{ borderColor: "rgba(197,160,89,0.2)" }}
              >
                {/* Lueur interne */}
                <div
                  className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(197,160,89,0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Header panel */}
                <div className="mb-10 flex items-center justify-between">
                  <span
                    className="font-mono text-[0.52rem] uppercase tracking-[0.45em]"
                    style={{ color: "#C5A059" }}
                  >
                    Responsibilities
                  </span>
                  {/* Tech chips */}
                  <div className="hidden md:flex flex-wrap justify-end gap-2 max-w-[50%]">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-3 py-1 font-mono text-[0.45rem] uppercase tracking-[0.25em]"
                        style={{
                          border: "1px solid rgba(197,160,89,0.2)",
                          color: "rgba(197,160,89,0.6)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Détails */}
                <div className="flex flex-col gap-7">
                  {exp.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.07, duration: 0.7, ease: EASE }}
                      className="group/item flex items-start gap-5"
                    >
                      {/* Bullet doré */}
                      <div className="mt-[0.45rem] flex shrink-0 flex-col items-center gap-1">
                        <span
                          className="block h-[5px] w-[5px] rounded-full transition-all duration-400 group-hover/item:scale-150"
                          style={{
                            background: "#C5A059",
                            boxShadow: "0 0 8px rgba(197,160,89,0.6)",
                          }}
                        />
                        {idx < exp.details.length - 1 && (
                          <span
                            className="block w-px"
                            style={{
                              height: 28,
                              background:
                                "linear-gradient(to bottom, rgba(197,160,89,0.3), transparent)",
                            }}
                          />
                        )}
                      </div>

                      <p className="font-mono text-[0.65rem] leading-[2] tracking-wide text-zinc-500 transition-colors duration-400 group-hover/item:text-zinc-300">
                        {detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech chips mobile */}
                <div className="mt-10 flex flex-wrap gap-2 md:hidden">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 font-mono text-[0.45rem] uppercase tracking-[0.25em]"
                      style={{
                        border: "1px solid rgba(197,160,89,0.2)",
                        color: "rgba(197,160,89,0.6)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


// ─────────────────────────────────────────────
// EXPORT DEFAULT
// ─────────────────────────────────────────────
export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Derive active index from scroll
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  scrollYProgress.on("change", (v) => {
    if (v <= 0 || v >= 1) { setActiveIdx(null); return; }
    setActiveIdx(Math.min(experiences.length - 1, Math.floor(v * experiences.length)));
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-32 md:py-64"
        style={{ background: "#09090b" }}
      >
        {/* Lueurs ambiantes */}
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(100,130,180,0.04) 0%, transparent 65%)",
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

          {/* Timeline border-top */}
          <div style={{ borderTop: "1px solid rgba(39,39,42,0.8)" }}>
            {experiences.map((exp, index) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>

          {/* ── FOOTER STATS ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-0"
            style={{ borderTop: "1px solid rgba(39,39,42,0.6)" }}
          >
            {[
              { value: "3+", label: "Years Coding" },
              { value: "20+", label: "Projects Built" },
              { value: "01", label: "Hackathon Won" },
              { value: "∞",  label: "Lines Written" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 py-10 px-6"
                style={{
                  borderRight:
                    i < 3 ? "1px solid rgba(39,39,42,0.6)" : "none",
                }}
              >
                <span
                  className="font-display font-light leading-none"
                  style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#C5A059" }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-[0.52rem] uppercase tracking-[0.32em] text-zinc-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}