import React, { useRef, useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Play, Pause } from "lucide-react";
import { scaleIn } from '../../utils/animations';

interface HeroAvatarProps {
  delay?: number;
  fit?: "cover" | "contain";
}

const HeroAvatar = ({ delay = 0, fit = "cover" }: HeroAvatarProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // حاول تشغيل الفيديو عند ظهوره
          video.play().catch(() => {
            // إذا فشل التشغيل التلقائي، اضبط حالة التشغيل على false
            setPlaying(false);
          });
        } else {
          // أوقف الفيديو عند الخروج من الشاشة
          video.pause();
        }
      },
      {
        threshold: 0.5, // عندما يكون 50% من الفيديو مرئيًا
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView && playing) {
      videoRef.current.play().catch(() => setPlaying(false));
    } else if (!isInView || !playing) {
      videoRef.current.pause();
    }
  }, [isInView, playing]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setPlaying(true));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="relative flex items-center justify-center"
    >
      <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden">
        {/* Video Card Container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/6 bg-black/20">
          {/* Video Element */}
          <video
            ref={videoRef}
            src="/intro1.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Developer introduction video"
            className={`absolute inset-0 w-full h-full ${
              fit === "cover" ? "object-cover" : "object-contain"
            } ${fit === "contain" ? "bg-black/35" : ""}`}
          />

          {/* Gradient Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Name Overlay */}
          <div className="absolute left-5 bottom-5 pointer-events-none">
            <div className="text-white font-semibold text-lg">Mahmoud Bousbih</div>
            <div className="text-xs text-cyan-300 font-mono">Full-Stack Developer</div>
          </div>

          {/* Play/Pause Control */}
          <button
            onClick={toggleVideo}
            aria-label={playing ? "Pause introduction video" : "Play introduction video"}
            className="absolute right-3 bottom-3 z-30 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/8 text-white text-xs backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroAvatar;