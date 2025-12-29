// hooks/useTypingAnimation.ts
import { useState, useEffect } from 'react';

interface UseTypingAnimationProps {
  lines: string[];
  charDelay?: number;
  linePause?: number;
  finalDelay?: number;
}

export const useTypingAnimation = ({
  lines,
  charDelay = 50,
  linePause = 700,
  finalDelay = 800
}: UseTypingAnimationProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [showFinal, setShowFinal] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const timeout = setTimeout(() => {
        setShowFinal(true);
        setTypingComplete(true);
      }, finalDelay);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplay((prev) => prev + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      }, charDelay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplay("");
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, linePause);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines, charDelay, linePause, finalDelay]);

  return {
    display,
    showFinal,
    typingComplete,
    reset: () => {
      setLineIndex(0);
      setCharIndex(0);
      setDisplay("");
      setShowFinal(false);
      setTypingComplete(false);
    }
  };
};