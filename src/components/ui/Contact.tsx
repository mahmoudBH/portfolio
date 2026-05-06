"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Mail, MapPin, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const SOCIALS = [
  {
    href: "https://github.com/mahmoudBH",
    icon: SiGithub,
    label: "GitHub",
    handle: "github.com/mahmoudBH",
    color: "#e8e8e8",
  },
  {
    href: "https://www.linkedin.com/in/mahmoudbh7",
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/mahmoudbh7",
    color: "#0A66C2",
  },
  {
    href: "mailto:boussbimahmoud@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "boussbimahmoud@gmail.com",
    color: "#C5A059",
  },
] as const;

const INFO = [
  { icon: MapPin, label: "Location", value: "Tunis, Tunisia" },
  { icon: Mail, label: "Email", value: "boussbimahmoud@gmail.com" },
  { icon: Clock, label: "Status", value: "Available · Open to work" },
] as const;

// ─────────────────────────────────────────────
// MAGNETIC SOCIAL ROW
// ─────────────────────────────────────────────
function SocialRow({
  href, icon: Icon, label, handle, color,
}: {
  href: string;
  icon: any;
  label: string;
  handle: string;
  color: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ x: sx, y: sy, cursor: "none", borderBottom: "1px solid rgba(39,39,42,0.6)" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
        my.set((e.clientY - (r.top + r.height / 2)) * 0.22);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="group flex items-center justify-between gap-6 py-5 transition-all duration-500"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden transition-all duration-500"
          style={{ border: "1px solid rgba(63,63,70,0.55)" }}
        >
          <span
            className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"
            style={{ background: color, opacity: 0.15 }}
          />
          <Icon style={{ width: 15, height: 15, color: "#52525b" }}
            className="relative z-10 transition-colors duration-400 group-hover:text-white"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[0.44rem] uppercase tracking-[0.42em] text-zinc-500">
            {label}
          </span>
          <span className="font-mono text-[0.6rem] tracking-wide text-zinc-400
            transition-colors duration-400 group-hover:text-zinc-200">
            {handle}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5"
        className="shrink-0 text-zinc-500 transition-all duration-400
          group-hover:text-[#C5A059] group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// FLOAT INPUT
// ─────────────────────────────────────────────
function FloatInput({
  id, label, type = "text", multiline = false, rows = 4, name
}: {
  id: string; label: string; type?: string; multiline?: boolean; rows?: number; name?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const active = focused || filled;

  const cls = "w-full bg-transparent pt-6 pb-2 text-zinc-100 focus:outline-none transition-colors duration-300 font-mono text-[0.75rem] tracking-wide resize-none";

  return (
    <div className="relative" style={{ borderBottom: `1px solid ${active ? "#C5A059" : "rgba(63,63,70,0.45)"}`, transition: "border-color 0.4s" }}>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 transition-all duration-350"
        style={{
          top: active ? "0.1rem" : "1.1rem",
          fontSize: active ? "0.42rem" : "0.58rem",
          letterSpacing: active ? "0.48em" : "0.32em",
          color: active ? "#C5A059" : "#52525b",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>

      {multiline
        ? <textarea id={id} name={name || id} rows={rows} className={cls}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          suppressHydrationWarning />
        : <input id={id} name={name || id} type={type} className={cls}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          suppressHydrationWarning />
      }

      {/* Gold underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: "#C5A059", originX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// BUDGET CHIP
// ─────────────────────────────────────────────
function BudgetChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      suppressHydrationWarning
      className="rounded-full px-4 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.28em]
        transition-all duration-400"
      style={{
        border: active ? "1px solid #C5A059" : "1px solid rgba(63,63,70,0.5)",
        color: active ? "#C5A059" : "#52525b",
        background: active ? "rgba(197,160,89,0.07)" : "transparent",
        cursor: "none",
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// SEND BUTTON
// ─────────────────────────────────────────────
function SendButton({ sent, loading }: { sent: boolean; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={sent || loading}
      suppressHydrationWarning
      className="group relative flex items-center gap-4 overflow-hidden border px-10 py-4
        transition-colors duration-500 hover:border-[#C5A059]"
      style={{ borderColor: "rgba(63,63,70,0.6)", cursor: "none" }}
    >
      <span
        className={`absolute inset-0 transition-transform duration-500 ${sent ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0"}`}
        style={{ background: "#C5A059", transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
      />
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} className="relative z-10 flex items-center gap-3">
            <CheckCircle style={{ width: 13, height: 13, color: "#0a0a0a" }} />
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.42em] text-zinc-950">
              Message Sent
            </span>
          </motion.span>
        ) : loading ? (
          <motion.span key="loading" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} className="relative z-10 flex items-center gap-4">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.42em] text-zinc-400
              transition-colors duration-300 group-hover:text-zinc-950">
              Sending...
            </span>
            <svg className="animate-spin h-[13px] w-[13px] text-zinc-500 group-hover:text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </motion.span>
        ) : (
          <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} className="relative z-10 flex items-center gap-4">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.42em] text-zinc-400
              transition-colors duration-300 group-hover:text-zinc-950">
              Send Message
            </span>
            <ArrowRight style={{ width: 13, height: 13 }}
              className="text-zinc-600 transition-all duration-400 group-hover:text-zinc-950 group-hover:translate-x-1" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────
// EXPORT DEFAULT
// ─────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-8%" });
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "0%"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjgvapoy", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setSent(true);
        form.reset();
        setBudget("");
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: bgY, background: "#09090b" }}
      className="relative overflow-hidden pt-32 md:pt-48 pb-0"
    >
      {/* ── AMBIANCE ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        style={{ width: 1000, height: 500, background: "radial-gradient(ellipse, rgba(197,160,89,0.065) 0%, transparent 68%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "linear-gradient(to right,#C5A059 1px,transparent 1px),linear-gradient(to bottom,#C5A059 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent,rgba(197,160,89,0.3) 50%,transparent)" }} />

      <div className="relative z-10 mx-auto max-w-[100rem] px-6 md:px-16">

        {/* ══ HEADER ══ */}
        <div className="mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}
            className="mb-10 flex items-center gap-4"
          >
            <span className="h-px w-12" style={{ background: "#C5A059" }} />
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.45em]" style={{ color: "#C5A059" }}>
              Get in touch
            </span>
          </motion.div>

          {/* Titre split sur deux colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}
                className="font-display font-light uppercase leading-[0.82] tracking-tight text-zinc-50
                  text-[16vw] md:text-[9rem] lg:text-[10.5rem]"
              >
                Let&apos;s
                <br />
                <span className="text-zinc-700">Build</span>
                <span style={{ color: "#C5A059" }}>.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 1, ease: EASE }}
              className="flex flex-col gap-6 pb-4"
            >
              <p className="font-mono text-[0.68rem] leading-[2] tracking-[0.2em] uppercase text-zinc-500 max-w-[38ch]">
                Available for <span className="text-zinc-300">freelance work</span> and{" "}
                <span className="text-zinc-300">full-time opportunities</span>.{" "}
                Let&apos;s create something extraordinary together.
              </p>
              {/* Status badge */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-[6px] w-[6px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: "#22c55e" }} />
                  <span className="relative inline-flex h-[6px] w-[6px] rounded-full" style={{ background: "#22c55e" }} />
                </span>
                <span className="font-mono text-[0.52rem] uppercase tracking-[0.38em]" style={{ color: "#22c55e" }}>
                  Available · Open to work
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start pb-24 md:pb-36">

          {/* ── LEFT — INFO + SOCIALS ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-4 flex flex-col gap-14"
          >
            {/* Info rows */}
            <div style={{ borderTop: "1px solid rgba(39,39,42,0.65)" }}>
              {INFO.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="group flex items-center gap-5 py-5 transition-all duration-400
                    hover:bg-[rgba(197,160,89,0.025)] px-1"
                  style={{ borderBottom: "1px solid rgba(39,39,42,0.65)" }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                    transition-colors duration-400"
                    style={{ border: "1px solid rgba(63,63,70,0.5)" }}
                  >
                    <Icon style={{ width: 13, height: 13, color: "#C5A059" }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.42rem] uppercase tracking-[0.4em] text-zinc-500">
                      {label}
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-wide text-zinc-300
                      transition-colors duration-400 group-hover:text-zinc-100">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col">
              <span className="mb-4 font-mono text-[0.46rem] uppercase tracking-[0.45em] text-zinc-500">
                Connect
              </span>
              {SOCIALS.map((s) => (
                <SocialRow key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — FORM ── */}
          <div className="lg:col-span-8" ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative p-10 md:p-14"
              style={{ border: "1px solid rgba(39,39,42,0.65)" }}
            >
              {/* Corner marks */}
              {(["tl", "tr", "bl", "br"] as const).map((p) => {
                const s: React.CSSProperties =
                  p === "tl" ? { top: 0, left: 0 }
                    : p === "tr" ? { top: 0, right: 0, transform: "scaleX(-1)" }
                      : p === "bl" ? { bottom: 0, left: 0, transform: "scaleY(-1)" }
                        : { bottom: 0, right: 0, transform: "scale(-1)" };
                return (
                  <div key={p} className="pointer-events-none absolute" style={{ width: 16, height: 16, ...s }}>
                    <span className="absolute left-0 top-0 h-full w-px" style={{ background: "rgba(197,160,89,0.45)" }} />
                    <span className="absolute left-0 top-0 h-px w-full" style={{ background: "rgba(197,160,89,0.45)" }} />
                  </div>
                );
              })}

              {/* Inner glow */}
              <div className="pointer-events-none absolute -top-20 -right-20 rounded-full"
                style={{
                  width: 220, height: 220,
                  background: "radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 70%)"
                }} />

              {/* Form header */}
              <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7" style={{ background: "rgba(197,160,89,0.4)" }} />
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.45em]" style={{ color: "#C5A059" }}>
                    Send a message
                  </span>
                </div>
                <span className="font-mono text-[0.44rem] uppercase tracking-[0.3em] text-zinc-700">
                  Response within 24h
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FloatInput id="name" name="name" label="Your Name" />
                  <FloatInput id="email" name="email" label="Your Email" type="email" />
                </div>
                <FloatInput id="subject" name="subject" label="Subject" />
                <FloatInput id="message" name="message" label="Your Message" multiline rows={6} />
                
                <input type="hidden" name="budget" value={budget} />

                <div className="flex flex-col md:flex-row items-start md:items-center
                  justify-between gap-8 pt-2">
                  {/* Budget */}
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[0.44rem] uppercase tracking-[0.4em] text-zinc-700">
                      Budget Range
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["< $5k", "$5k–$15k", "$15k+", "Let's talk"].map((b) => (
                        <BudgetChip key={b} label={b} active={budget === b} onClick={() => setBudget(b)} />
                      ))}
                    </div>
                  </div>
                  <SendButton sent={sent} loading={loading} />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}