"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const NAV_LINKS = [
  { label: "Works",     href: "#works" },
  { label: "Expertise", href: "#expertise" },
  { label: "Journey",   href: "#journey" },
  { label: "Contact",   href: "#contact" },
] as const;

const SOCIAL_LINKS = [
  { icon: SiGithub,   href: "https://github.com/mahmoudBH",                  label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/mahmoud-bousbih",        label: "LinkedIn" },
  { icon: Mail,       href: "mailto:mahmoudbousbih57@gmail.com",              label: "Email" },
] as const;

// ─────────────────────────────────────────────
// FOOTER COMPONENT
// ─────────────────────────────────────────────
export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#070709", borderTop: "1px solid rgba(39,39,42,0.55)" }}
    >
      {/* Ambiance top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(197,160,89,0.22) 50%,transparent)" }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }}
      />

      <div className="relative z-10 mx-auto max-w-[100rem] px-6 md:px-16">

        {/* ══ BIG LOGO ROW ══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
          className="border-b py-16 md:py-24 flex flex-col md:flex-row items-center
            md:items-end justify-between gap-10"
          style={{ borderColor: "rgba(39,39,42,0.55)" }}
        >
          {/* Huge wordmark */}
          <div className="overflow-hidden">
            <span
              className="block font-display font-light uppercase leading-none tracking-tight"
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
                color: "rgba(197,160,89,0.3)",
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
              }}
            >
              Mahmoud
            </span>
            <span
              className="block font-display font-light uppercase leading-none tracking-tight"
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
                color: "hsla(39, 48%, 56%, 0.3)",
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
              }}
            >
              Bousbih
            </span>
          </div>

          {/* Right block — tagline + back to top */}
          <div className="flex flex-col items-end gap-8 shrink-0">
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-zinc-400">
                Full-Stack Developer
              </span>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.35em] text-zinc-500">
                Tunis, Tunisia
              </span>
            </div>

            {/* Back to top circle */}
            <button
              onClick={scrollTop}
              suppressHydrationWarning
              className="group relative flex h-14 w-14 items-center justify-center rounded-full overflow-hidden
                transition-all duration-500 hover:scale-110"
              style={{ border: "1px solid rgba(63,63,70,0.55)", cursor: "none" }}
            >
              <span
                className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"
                style={{ background: "#C5A059" }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5"
                className="relative z-10 text-zinc-400 transition-colors duration-400 group-hover:text-zinc-950 -rotate-90"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* ══ NAV + SOCIAL ROW ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: EASE }}
          className="border-b py-10 flex flex-col md:flex-row items-start md:items-center
            justify-between gap-8"
          style={{ borderColor: "rgba(39,39,42,0.55)" }}
        >
          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group relative font-mono text-[0.52rem] uppercase tracking-[0.38em]
                  text-zinc-400 transition-colors duration-400 hover:text-zinc-200"
                style={{ cursor: "none" }}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "#C5A059" }}
                />
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex h-9 w-9 items-center justify-center rounded-full
                  overflow-hidden transition-all duration-500 hover:scale-110"
                style={{ border: "1px solid rgba(63,63,70,0.5)", cursor: "none" }}
              >
                <span
                  className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"
                  style={{ background: "rgba(197,160,89,0.12)" }}
                />
                <Icon
                  className="relative z-10 transition-colors duration-400 text-zinc-400 group-hover:text-[#C5A059]"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ══ BOTTOM BAR ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-7"
        >
          {/* Logo + copy */}
          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-semibold tracking-tight"
              style={{ color: "#C5A059" }}>
              MB<span className="text-zinc-500">.</span>
            </span>
            <span className="h-3 w-px" style={{ background: "rgba(63,63,70,0.5)" }} />
            <span className="font-mono text-[0.46rem] uppercase tracking-[0.28em] text-zinc-500">
              © {new Date().getFullYear()} Mahmoud Bousbih — All rights reserved
            </span>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono text-[0.44rem] uppercase tracking-[0.3em] text-zinc-500
                  transition-colors duration-300 hover:text-zinc-300"
                style={{ cursor: "none" }}
              >
                {l}
              </a>
            ))}
            {/* Separator + stack mention */}
            <span className="h-3 w-px" style={{ background: "rgba(63,63,70,0.45)" }} />
            <span className="font-mono text-[0.44rem] uppercase tracking-[0.3em] text-zinc-600">
              Built with Next.js · Framer Motion
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}