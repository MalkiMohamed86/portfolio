"use client";

import { useState, useEffect, useRef } from "react";

function FloatingSkills({ categories }: { categories: { name: string; skills: { name: string; level: number }[] }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number; angle: number; radius: number; speed: number; orbitSpeed: number }[]>([]);

  const allSkills = categories.flatMap((cat) => cat.skills);

  useEffect(() => {
    const total = allSkills.length;
    const initial = allSkills.map((_, idx) => {
      const ring = Math.floor(idx / 5);
      const posInRing = idx % 5;
      const angle = (posInRing / 5) * Math.PI * 2 + ring * 0.8;
      const radius = 120 + ring * 80;
      return {
        x: 0,
        y: 0,
        angle,
        radius,
        speed: 0.0003 + Math.random() * 0.0004,
        orbitSpeed: (idx % 2 === 0 ? 1 : -1) * (0.08 + Math.random() * 0.06),
      };
    });
    setPositions(initial);

    let frameId: number;
    const animate = () => {
      setPositions((prev) =>
        prev.map((p) => ({
          ...p,
          angle: p.angle + p.speed,
        }))
      );
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[420px]">
      {allSkills.map((skill, idx) => {
        if (!positions[idx]) return null;
        const p = positions[idx];
        const cx = 50;
        const cy = 50;
        const x = cx + Math.cos(p.angle) * (p.radius / 5);
        const y = cy + Math.sin(p.angle) * (p.radius / 7);
        return (
          <span
            key={skill.name}
            className="absolute px-3 py-1.5 text-xs font-medium rounded-lg border border-white/[0.06] text-slate-500 bg-white/[0.02]
                       hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/[0.06]
                       hover:shadow-[0_0_24px_rgba(34,197,94,0.12)] transition-all duration-500 cursor-default whitespace-nowrap"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {skill.name}
          </span>
        );
      })}
      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/[0.03] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <p className="text-slate-600 text-sm font-mono text-center">← Pick a category<br/><span className="text-slate-700 text-xs">to explore skills</span></p>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    {
      name: "Languages",
      icon: "{ }",
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 92 },
        { name: "Python", level: 85 },
        { name: "HTML/CSS", level: 98 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      name: "Frameworks",
      icon: "⚛",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 93 },
        { name: "Node.js", level: 90 },
        { name: "Express", level: 88 },
        { name: "TailwindCSS", level: 95 },
      ],
    },
    {
      name: "Tools",
      icon: "⚙",
      skills: [
        { name: "Git", level: 92 },
        { name: "Docker", level: 82 },
        { name: "AWS", level: 78 },
        { name: "Vercel", level: 90 },
        { name: "Figma", level: 75 },
      ],
    },
    {
      name: "Databases",
      icon: "◢",
      skills: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "Redis", level: 78 },
        { name: "Prisma", level: 86 },
        { name: "Firebase", level: 80 },
      ],
    },
  ];

  const selected = activeCategory
    ? categories.find((c) => c.name === activeCategory)
    : null;

  return (
    <section id="skills" className="min-h-screen flex items-center px-6 py-20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-green-400 font-mono text-xs tracking-wider">02.</span>
          <h2 className="text-2xl font-bold text-white">Skills &amp; Tools</h2>
          <div className="flex-1 h-px bg-white/[0.06]"></div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left: Category selector */}
          <div className="md:col-span-4 space-y-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(isActive ? null : cat.name)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group cursor-pointer
                    ${isActive
                      ? "bg-green-500/[0.08] border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.08)]"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-green-500/15 hover:bg-white/[0.04]"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-lg transition-colors ${isActive ? "text-green-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                        {cat.icon}
                      </span>
                      <span className={`font-semibold transition-colors ${isActive ? "text-green-400" : "text-white"}`}>
                        {cat.name}
                      </span>
                    </div>
                    <span className={`text-xs font-mono transition-colors ${isActive ? "text-green-500/60" : "text-slate-600"}`}>
                      {cat.skills.length}
                    </span>
                  </div>
                  {/* Mini bar preview */}
                  <div className="flex gap-1 mt-3">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.04]">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isActive ? "bg-green-500" : "bg-white/10"}`}
                          style={{ width: `${isActive ? s.level : 30}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Skill detail panel */}
          <div className="md:col-span-8">
            {selected ? (
              <div className="space-y-1">
                {selected.skills.map((skill, idx) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group relative p-5 rounded-xl border border-transparent hover:border-green-500/15 hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-green-500/40 font-mono text-xs">0{idx + 1}</span>
                          <span className={`font-medium transition-colors ${isHovered ? "text-green-400" : "text-white"}`}>
                            {skill.name}
                          </span>
                        </div>
                        <span className={`font-mono text-sm font-bold transition-colors ${isHovered ? "text-green-400" : "text-slate-500"}`}>
                          {skill.level}%
                        </span>
                      </div>
                      {/* Skill bar */}
                      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out relative"
                          style={{
                            width: `${skill.level}%`,
                            background: isHovered
                              ? "linear-gradient(90deg, #22c55e, #4ade80)"
                              : "linear-gradient(90deg, rgba(34,197,94,0.5), rgba(34,197,94,0.3))",
                          }}
                        >
                          {isHovered && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <FloatingSkills categories={categories} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
