// AnimatedBackground.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const AnimatedBackground = () => {
  const [stars, setStars] = useState([]);
    const [codeElements, setCodeElements] = useState([]);
    const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
    const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
      setVw(window.innerWidth);
    };
    window.addEventListener("resize", onResize);

    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }));

    const jsElements = [
      "const", "let", "var", "function", "return", "if", "else",
      "for", "while", "switch", "case", "break", "continue",
      "try", "catch", "finally", "async", "await", "export",
      "import", "default", "class", "extends", "new", "this",
      "super", "typeof", "instanceof", "true", "false", "null",
      "undefined", "NaN", "Infinity", "Math", "Date", "Array",
      "Object", "String", "Number", "Boolean", "Promise",
      "fetch", "axios", "React", "useState", "useEffect",
      "useContext", "useReducer", "useMemo", "useCallback",
      "document", "window", "console", "localStorage",
      "sessionStorage", "JSON", "parse", "stringify",
    ];

    const selectedElements = Array.from({ length: 50 }).map((_, i) => {
      const element = jsElements[Math.floor(Math.random() * jsElements.length)];
      const colors = [
        "#60a5fa", "#34d399", "#fbbf24", "#f472b6", "#a78bfa",
        "#22d3ee", "#4ade80", "#fb923c", "#c084fc", "#2dd4bf",
      ];
      return {
        id: i + 150,
        text: element,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setStars(newStars);
    setCodeElements(selectedElements);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // helper for pixel movement (independent from document scroll)
  const upDownPx = (mult = 1) => vh * (0.6 * mult);

  // Actual DOM for the background (position: fixed and appended to body via portal)
  const content = (
    <div id="animated-bg-root" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -9999 }}>
      <div style={{ position: "absolute", inset: 0 }} className="bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950" />
      <div style={{ position: "absolute", inset: 0 }} className="bg-gradient-to-b from-transparent via-neutral-900/10 to-transparent" />

      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          style={{
            position: "fixed",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "9999px",
            background: "#fff",
            opacity: star.opacity,
            willChange: "transform, opacity",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [star.opacity, Math.min(1, star.opacity * 1.5), star.opacity] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}

      {/* meteors, code elements, braces, binary, etc. — same pattern: position: fixed */}
      {Array.from({ length: 5 }).map((_, i) => {
        const startLeft = Math.random() * vw;
        const startTop = Math.random() * (vh * 0.5);
        const travelX = (Math.random() * vw * 0.6) + 200;
        const travelY = (Math.random() * vh * 0.6) + 200;
        return (
          <motion.div
            key={`meteor-${i}`}
            style={{
              position: "fixed",
              left: startLeft,
              top: startTop,
              width: 2,
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0 }}
            animate={{ x: [0, travelX], y: [0, travelY], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatDelay: Math.random() * 10 + 5, ease: "linear" }}
          />
        );
      })}

      {codeElements.map(el => (
        <motion.div
          key={`code-${el.id}`}
          style={{
            position: "fixed",
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            fontSize: `${el.size}rem`,
            opacity: el.opacity,
            color: el.color,
            textShadow: "0 0 10px currentColor",
            willChange: "transform, opacity",
            whiteSpace: "nowrap",
          }}
          animate={{
            y: [0, -upDownPx(0.6), 0],
            x: [0, Math.sin(el.id) * 40, 0],
            opacity: [el.opacity, el.opacity, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear", delay: el.delay }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* you can add remaining elements (braces, binary, glows, grid) similarly; keep "position: fixed" */}
    </div>
  );

  // Guard for SSR: createPortal only on client
  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
};

export default AnimatedBackground;
