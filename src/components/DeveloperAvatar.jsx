// DeveloperAvatar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

/**
 * DeveloperAvatar.jsx
 * - video fills the whole card (cover)
 * - no internal padding so video prend tout le carro
 */
const DeveloperAvatar = ({ fit = "cover" }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
        setPlaying(!v.paused);
      } catch {
        setPlaying(false);
      }
    };
    tryPlay();
  }, []);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Card container: no inner padding so video uses all space */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/6 bg-black/20">
        {/* VIDEO fills entire container */}
        <video
          ref={videoRef}
          src="/intro1.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Intro video"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit === "cover" ? "cover" : "contain",
            objectPosition: "center center",
            display: "block",
            backgroundColor: fit === "contain" ? "rgba(0,0,0,0.35)" : "transparent",
          }}
        />

        {/* Optional subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Name overlay (optional); remove if you want pure video) */}
        <div className="absolute left-5 bottom-5 pointer-events-none">
          <div className="text-white font-semibold text-lg">Mahmoud Bousbih</div>
          <div className="text-xs text-cyan-300 font-mono">Full-Stack Developer</div>
        </div>

        {/* Play / Pause control */}
        <button
          onClick={toggleVideo}
          aria-label={playing ? "Pause intro" : "Play intro"}
          className="absolute right-3 bottom-3 z-30 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/8 text-white text-xs backdrop-blur"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
        </button>
      </div>
    </div>
  );
};

export default DeveloperAvatar;
