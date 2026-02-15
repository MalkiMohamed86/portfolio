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

        {/* Description */}
        <p className="text-slate-400 leading-relaxed max-w-2xl mb-14 text-base">
          I work with founders and teams who are done with missed deadlines and messy code.
          I bring clarity to chaos — turning your vision into software that performs,
          scales, and actually moves your business forward.
        </p>

        {/* Stats row */}
        <div className="flex gap-14 md:gap-20 mb-16 pb-16 border-b border-white/[0.06]">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Shipped" },
            { value: "30+", label: "Happy Clients" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-gradient leading-none">{stat.value}</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefit rows */}
        <div>
          {[
            { num: "01", title: "Performance obsessed", body: "Sub-second load times and optimized Core Web Vitals. Your users get speed, you get conversions." },
            { num: "02", title: "Architected to scale", body: "Clean systems that grow with your business — no costly rewrites when you hit traction." },
            { num: "03", title: "Transparent process", body: "Weekly updates, honest estimates, and a direct line to me. You always know where things stand." },
            { num: "04", title: "ROI-driven decisions", body: "I don't build features for fun. Every choice is filtered through one question: does this move the needle?" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group flex items-start gap-6 md:gap-10 py-6 border-b border-white/[0.04] last:border-b-0
                         hover:border-green-500/10 transition-colors"
            >
              <span className="text-green-500/30 font-mono text-xs pt-1 group-hover:text-green-500/60 transition-colors shrink-0">
                {item.num}
              </span>
              <div>
                <h4 className="text-base font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex items-center gap-6">
          <a href="#contact" className="btn-primary text-sm py-3 px-8">Start a Conversation</a>
          <a href="#projects" className="text-slate-500 hover:text-green-400 text-sm transition-colors">or see my work →</a>
        </div>

      </div>
    </section>
  );
}
