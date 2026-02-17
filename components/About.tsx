"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const INFLUENCE = 180;
    const COUNT = 300;

    interface Particle {
      x: number; y: number;
      speed: number;
      drift: number;
      size: number;
      phase: number;
      type: "plus" | "dot" | "diamond";
    }

    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (particles.length === 0) spawnAll();
    };

    const spawnParticle = (randomY: boolean): Particle => {
      const types: Particle["type"][] = ["plus", "dot", "diamond"];
      return {
        x: randomY ? Math.random() * canvas.width : canvas.width + Math.random() * 100,
        y: Math.random() * canvas.height,
        speed: 0.4 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 0.3,
        size: 3 + Math.random() * 7,
        phase: Math.random() * Math.PI * 2,
        type: types[Math.floor(Math.random() * types.length)],
      };
    };

    const spawnAll = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push(spawnParticle(true));
      }
    };

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cursorActive = mouseRef.current.active;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // River flow: move left
        p.x -= p.speed;
        // Vertical drift (wavy)
        p.y += Math.sin(time * 2 + p.phase) * p.drift + p.drift * 0.5;

        // Respawn off-screen right
        if (p.x < -20) {
          p.x = canvas.width + Math.random() * 60;
          p.y = Math.random() * canvas.height;
        }
        if (p.y < -20) p.y = canvas.height + 10;
        if (p.y > canvas.height + 20) p.y = -10;

        // Cursor interaction: push away like wake in water
        let t = 0;
        if (cursorActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          t = Math.max(0, 1 - dist / INFLUENCE);
          t = t * t;
          if (dist > 0 && t > 0) {
            const force = t * 8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Visuals
        const pulse = 0.5 + 0.5 * Math.sin(time * 3 + p.phase);
        const alpha = 0.05 + pulse * 0.06 + t * 0.6;
        const green = Math.round(180 + t * 75);
        const size = p.size + t * 5;
        const color = `rgba(34, ${green}, 94, ${alpha})`;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 0.8 + t * 0.8;

        if (p.type === "plus") {
          const half = size / 2;
          ctx.beginPath();
          ctx.moveTo(p.x - half, p.y);
          ctx.lineTo(p.x + half, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - half);
          ctx.lineTo(p.x, p.y + half);
          ctx.stroke();
        } else if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Diamond
          const half = size * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - half);
          ctx.lineTo(p.x + half, p.y);
          ctx.lineTo(p.x, p.y + half);
          ctx.lineTo(p.x - half, p.y);
          ctx.closePath();
          ctx.stroke();
        }

        // Glow when cursor is near
        if (t > 0.2) {
          ctx.fillStyle = `rgba(34, ${green}, 94, ${t * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 py-20 overflow-hidden">
      {/* Interactive canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header row */}
        <div className="mb-6">
          <span className="text-green-400 font-mono text-xs tracking-wider mb-5 block">01. About</span>
          <h3 className="text-3xl md:text-5xl font-bold text-white leading-snug max-w-2xl">
            You need a partner who{" "}
            <span className="text-gradient">ships results.</span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column: Content */}
          <div className="lg:w-1/2">
            {/* Description */}
            <p className="text-slate-400 leading-relaxed mb-10 text-base">
              <span className="text-purple-400 font-medium">Junior Full-Stack Developer</span> specialized in building clean, scalable, and well-architected applications. I have hands-on experience with Laravel, Node.js, React, and MySQL through academic and real-world projects.
              <br /><br />
              I strategically leverage <span className="text-purple-400 font-medium">AI tools</span> to accelerate development, enhance problem-solving, and deliver high-quality, optimized solutions.
              <br /><br />
              <span className="text-white font-bold italic">Why me?</span> Because I combine technical depth, fast execution, and continuous learning. I don’t just build features — I build <span className="text-purple-400 font-medium">structured systems designed to last</span>.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-12 py-8 border-y border-white/[0.06]">
              {[
                { value: "Full", label: "Stack Dev" },
                { value: "8+", label: "Projects" },
                { value: "3+ Years", label: "Building" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-[10px] text-green-400/70 uppercase tracking-widest mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Benefit rows */}
            <div className="space-y-6">
              {[
                { title: "Problem Solver", body: "Strong analytical thinking to break down complex issues." },
                { title: "Full-Stack Capable", body: "Comfortable with both frontend interfaces and backend logic." },
                { title: "Quick Learner", body: "Adaptable to new technologies and frameworks." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex items-center gap-6">
              <a href="#contact" className="px-6 py-3 bg-white text-black font-bold text-sm rounded hover:bg-zinc-200 transition-colors">Start a Conversation</a>
              <a href="#projects" className="text-slate-500 hover:text-white text-sm transition-colors border-b border-transparent hover:border-purple-500">or see my work →</a>
            </div>
          </div>

          {/* Right Column: Innovation Visual */}
          <div className="lg:w-1/2 w-full">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-8 flex items-center justify-center group">

              {/* Central Core */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-black border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-500">
                <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center text-[10px] text-zinc-400 shadow-lg" title="Claude">
                    <span className="text-white text-[10px] font-bold">Cl</span>
                  </div>
                </div>
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-8 h-8 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center text-[10px] text-zinc-400 shadow-lg" title="ChatGPT">
                    <span className="text-white text-[10px] font-bold">GPT</span>
                  </div>
                </div>
              </div>

              {/* Connecting Lines (Decor) */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20">
                  <circle cx="50%" cy="50%" r="30%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-purple-500 animate-[spin_20s_linear_infinite]" />
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                </svg>
              </div>

              {/* Floating Tool Cards */}
              {/* Top Right: Claude */}
              <div className="absolute top-6 right-6 bg-[#111] border border-white/10 p-2.5 rounded-lg shadow-xl translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f5d9bc] flex items-center justify-center text-black font-bold text-xs">Cl</div>
                <div>
                  <div className="text-xs font-bold text-white">Claude</div>
                  <div className="text-[10px] text-zinc-500">Analysis & Logic</div>
                </div>
              </div>

              {/* Bottom Left: ChatGPT */}
              <div className="absolute bottom-6 left-6 bg-[#111] border border-white/10 p-2.5 rounded-lg shadow-xl translate-y-0 group-hover:translate-y-2 transition-transform duration-500 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#74aa9c] flex items-center justify-center text-white font-bold text-xs">GPT</div>
                <div>
                  <div className="text-xs font-bold text-white">ChatGPT</div>
                  <div className="text-[10px] text-zinc-500">Code Gen & Refactor</div>
                </div>
              </div>

              {/* Top Left: Copilot */}
              <div className="absolute top-10 left-8 bg-[#111] border border-white/10 p-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black text-[10px] font-bold">Co</div>
                <span className="text-[10px] text-zinc-300">Copilot</span>
              </div>

              {/* Bottom Right: Gemini */}
              <div className="absolute bottom-12 right-10 bg-[#111] border border-white/10 p-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 flex items-center gap-2">
                <span className="text-[10px] text-zinc-300">Gemini</span>
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">Ge</div>
              </div>

              {/* Center Bottom: V0 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111] border border-white/10 px-3 py-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                <span className="text-[10px] text-zinc-400 font-mono">v0.dev</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
