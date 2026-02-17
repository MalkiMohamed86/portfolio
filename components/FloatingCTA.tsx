"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type CTAState = {
  label: string;
  icon: string;
  target: string;
  gradient: string;
  glow: string;
  glowHover: string;
};

const ctaStates: Record<string, CTAState> = {
  hero: {
    label: "See My Work",
    icon: "↓",
    target: "#projects",
    gradient: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
    glow: "0 0 12px rgba(34,197,94,0.15), 0 4px 12px rgba(0,0,0,0.15)",
    glowHover: "0 0 24px rgba(34,197,94,0.3), 0 6px 20px rgba(0,0,0,0.2)",
  },
  about: {
    label: "See My Work",
    icon: "↓",
    target: "#projects",
    gradient: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
    glow: "0 0 12px rgba(34,197,94,0.15), 0 4px 12px rgba(0,0,0,0.15)",
    glowHover: "0 0 24px rgba(34,197,94,0.3), 0 6px 20px rgba(0,0,0,0.2)",
  },
  skills: {
    label: "View Projects",
    icon: "→",
    target: "#projects",
    gradient: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
    glow: "0 0 12px rgba(34,197,94,0.15), 0 4px 12px rgba(0,0,0,0.15)",
    glowHover: "0 0 24px rgba(34,197,94,0.3), 0 6px 20px rgba(0,0,0,0.2)",
  },
  projects: {
    label: "Let\u2019s Talk",
    icon: "✉",
    target: "#contact",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    glow: "0 0 12px rgba(59,130,246,0.15), 0 4px 12px rgba(0,0,0,0.15)",
    glowHover: "0 0 24px rgba(59,130,246,0.3), 0 6px 20px rgba(0,0,0,0.2)",
  },
  contact: {
    label: "Back to Top",
    icon: "↑",
    target: "#home",
    gradient: "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
    glow: "0 0 12px rgba(168,85,247,0.15), 0 4px 12px rgba(0,0,0,0.15)",
    glowHover: "0 0 24px rgba(168,85,247,0.3), 0 6px 20px rgba(0,0,0,0.2)",
  },
};

function getCurrentSection(): string {
  const sections = ["contact", "projects", "skills", "about", "home"];
  const scrollY = window.scrollY + window.innerHeight * 0.5;

  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop) {
      if (id === "home") return "hero";
      return id;
    }
  }
  return "hero";
}

export default function FloatingCTA() {
  const [section, setSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > window.innerHeight * 0.3);
      setSection(getCurrentSection());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current || !isHovering) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const max = 6;
      setMagnetOffset({
        x: ((e.clientX - cx) / (rect.width / 2)) * max,
        y: ((e.clientY - cy) / (rect.height / 2)) * max,
      });
    },
    [isHovering]
  );

  const cta = ctaStates[section] || ctaStates.hero;

  const handleClick = () => {
    const el = document.querySelector(cta.target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-40 pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMagnetOffset({ x: 0, y: 0 });
        }}
        className="pointer-events-auto"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.02em",
          color: "#050505",
          background: cta.gradient,
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          boxShadow: isHovering ? cta.glowHover : cta.glow,
          transform: `translate(${magnetOffset.x}px, ${magnetOffset.y}px) scale(${isHovering ? 1.05 : 1}) translateY(${isVisible ? "0px" : "80px"})`,
          opacity: isVisible ? 1 : 0,
          transition: isHovering
            ? "box-shadow 0.3s ease, opacity 0.5s ease, scale 0.3s ease"
            : "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, opacity",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            fontSize: "11px",
            transition: "transform 0.3s ease",
            transform: isHovering ? "scale(1.15)" : "scale(1)",
          }}
        >
          {cta.icon}
        </span>
        {cta.label}
      </button>
    </div>
  );
}
