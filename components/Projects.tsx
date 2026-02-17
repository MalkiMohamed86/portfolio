"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const projects = [
  {
    id: 1,
    title: "Online Exams App",
    subtitle: "Exam Management System",
    description:
      "A comprehensive system to manage exams, users, and roles. Features secure authentication, real-time analytics, and anti-cheating measures. Built with Laravel and Blade.",
    tags: ["Laravel", "Blade", "MySQL", "Tailwind"],
    status: "Completed",
    link: "#",
    accent: "#ef4444",
    accentRgb: "239,68,68",
  },
  {
    id: 2,
    title: "AUI Student Dashboard",
    subtitle: "Internal Dashboard",
    description:
      "Frontend for an internal dashboard using React and Material UI. Features Outlook login integration, student search, and visual enrollment statistics.",
    tags: ["React", "Material UI", "API", "Auth"],
    status: "Internship",
    link: "#",
    accent: "#3b82f6",
    accentRgb: "59,130,246",
  },
];

const CYCLE_DURATION = 5000;

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [animKey, setAnimKey] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef(Date.now());

  // Auto-cycle projects
  useEffect(() => {
    if (isHovering) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }

    startTime.current = Date.now() - progress * CYCLE_DURATION;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const pct = elapsed / CYCLE_DURATION;

      if (pct >= 1) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
        setAnimKey((k) => k + 1);
        startTime.current = Date.now();
        setProgress(0);
      } else {
        setProgress(pct);
      }
    }, 30);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, activeIndex]);

  const handleSelectProject = useCallback((index: number) => {
    setActiveIndex(index);
    setAnimKey((k) => k + 1);
    setProgress(0);
    startTime.current = Date.now();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    []
  );

  const active = projects[activeIndex];

  return (
    <section
      id="projects"
      className="min-h-screen bg-black relative flex flex-col justify-center py-20 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(#22c55e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-green-400 font-mono text-xs tracking-wider">
            03.
          </span>
          <h2 className="text-3xl font-bold text-white">Featured Work</h2>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Main Split Layout */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-stretch min-h-[480px]">
          {/* ─── Left: Project Selector ─── */}
          <div className="lg:w-[280px] flex-shrink-0 flex flex-col justify-between">
            {/* Project List */}
            <div className="space-y-1">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(index)}
                    className={`w-full text-left group relative flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-500 ${isActive
                      ? "bg-white/[0.04]"
                      : "hover:bg-white/[0.02]"
                      }`}
                  >
                    {/* Active bar indicator */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-500 ${isActive
                        ? "h-8 opacity-100"
                        : "h-0 opacity-0 group-hover:h-4 group-hover:opacity-40"
                        }`}
                      style={{ background: active.accent }}
                    />

                    {/* Number */}
                    <span
                      className={`font-mono text-xs transition-all duration-300 ${isActive
                        ? "text-green-400"
                        : "text-white/20 group-hover:text-white/40"
                        }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-semibold transition-all duration-300 truncate ${isActive
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                          }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-xs font-mono transition-all duration-300 truncate ${isActive
                          ? "text-green-400/70"
                          : "text-white/15 group-hover:text-white/30"
                          }`}
                      >
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      className={`text-sm transition-all duration-300 ${isActive
                        ? "text-green-400 translate-x-0 opacity-100"
                        : "text-white/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar + Counter */}
            <div className="mt-8 px-4 hidden lg:block">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Auto-cycling
                </span>
                <span className="text-[10px] font-mono text-white/30">
                  {activeIndex + 1}/{projects.length}
                </span>
              </div>
              <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-none"
                  style={{
                    width: `${progress * 100}%`,
                    background: active.accent,
                    boxShadow: `0 0 8px rgba(${active.accentRgb},0.5)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── Right: Immersive Detail Card ─── */}
          <div
            ref={cardRef}
            className="flex-1 relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden cursor-default min-h-[400px] lg:min-h-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePos({ x: 0.5, y: 0.5 });
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Parallax Glow that follows mouse */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-700"
              style={{
                left: `${mousePos.x * 100}%`,
                top: `${mousePos.y * 100}%`,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, rgba(${active.accentRgb},${isHovering ? 0.12 : 0.04}) 0%, transparent 70%)`,
                opacity: 1,
                transition: "left 0.3s ease-out, top 0.3s ease-out, background 0.7s ease",
              }}
            />

            {/* Accent gradient border on top */}
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)`,
                opacity: 0.6,
                transition: "background 0.7s ease",
              }}
            />

            {/* Cyber corner accents */}
            <div className="absolute top-5 right-5 w-16 h-16 border-t border-r rounded-tr-2xl pointer-events-none transition-colors duration-700"
              style={{ borderColor: `rgba(${active.accentRgb},0.2)` }}
            />
            <div className="absolute bottom-5 left-5 w-16 h-16 border-b border-l rounded-bl-2xl pointer-events-none transition-colors duration-700"
              style={{ borderColor: `rgba(${active.accentRgb},0.2)` }}
            />

            {/* Content — animated on project change */}
            <div
              key={animKey}
              className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-full"
            >
              {/* Top section */}
              <div>
                {/* Status Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md mb-8 project-card-enter"
                  style={{ animationDelay: "0ms" }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${active.status === "Operational"
                      ? "bg-green-500 animate-pulse"
                      : "bg-yellow-500"
                      }`}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-mono">
                    {active.status}
                  </span>
                </div>

                {/* Subtitle */}
                <p
                  className="font-mono text-xs tracking-wider uppercase mb-3 project-card-enter"
                  style={{
                    color: active.accent,
                    animationDelay: "60ms",
                  }}
                >
                  {active.subtitle}
                </p>

                {/* Title */}
                <h3
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 project-card-enter leading-tight"
                  style={{ animationDelay: "120ms" }}
                >
                  {active.title}
                </h3>

                {/* Description */}
                <p
                  className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8 project-card-enter"
                  style={{ animationDelay: "180ms" }}
                >
                  {active.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                {/* Tags */}
                <div
                  className="flex flex-wrap gap-2 mb-6 project-card-enter"
                  style={{ animationDelay: "240ms" }}
                >
                  {active.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-sm font-mono border transition-colors duration-300"
                      style={{
                        borderColor: `rgba(${active.accentRgb},0.15)`,
                        background: `rgba(${active.accentRgb},0.06)`,
                        color: active.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={active.link}
                  className="inline-flex items-center gap-2 text-white font-bold group/link project-card-enter hover:gap-3 transition-all duration-300"
                  style={{ animationDelay: "300ms" }}
                >
                  <span
                    className="transition-colors duration-300"
                    style={{ color: active.accent }}
                  >
                    View Project
                  </span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
