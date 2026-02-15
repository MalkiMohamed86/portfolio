"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Green glow at top-right */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/[0.04] rounded-full blur-[100px]"></div>
        {/* Dim green glow bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-green-500/[0.02] rounded-full blur-[100px]"></div>
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(34,197,94,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

          {/* ─── Card 1: Identity (Large) ─── */}
          <div className="md:col-span-8 bento-card p-8 md:p-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" style={{ animation: "pulse-green 2s infinite" }}></div>
              <span className="text-green-400 text-sm font-medium tracking-wide">Available for hire</span>
            </div>
            <p className="text-sm text-slate-500 mb-3 font-mono tracking-wider uppercase">Hello, I&apos;m</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
              <span className="text-white">John</span>{" "}
              <span className="text-gradient">Doe</span>
              <span className="text-green-500 inline-block ml-1" style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
              Full-stack engineer who turns complex problems into{" "}
              <span className="text-green-400 font-medium">clean, scalable products</span> that
              users love and businesses rely on.
            </p>
          </div>

          {/* ─── Card 2: Status (Small) ─── */}
          <div className="md:col-span-4 bento-card flex flex-col justify-between animate-fade-in-up-d1">
            <div>
              <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mb-4">Current Status</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Location</span>
                  <span className="text-slate-300 text-sm font-medium">San Francisco, CA</span>
                </div>
                <div className="h-px bg-white/[0.04]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Local time</span>
                  <span className="text-slate-300 text-sm font-mono">{time || "—"}</span>
                </div>
                <div className="h-px bg-white/[0.04]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Status</span>
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    Open to work
                  </span>
                </div>
              </div>
            </div>
            {/* Social row */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-white/[0.04]">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="text-slate-600 hover:text-green-400 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-slate-600 hover:text-green-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-slate-600 hover:text-green-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="mailto:hello@johndoe.com"
                 className="text-slate-600 hover:text-green-400 transition-colors" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* ─── Card 3: Stats ─── */}
          <div className="md:col-span-3 bento-card text-center flex flex-col justify-center animate-fade-in-up-d2">
            <p className="text-4xl md:text-5xl font-bold text-gradient mb-1">5+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Years Building</p>
          </div>

          {/* ─── Card 4: Tech Stack Marquee ─── */}
          <div className="md:col-span-6 bento-card animate-fade-in-up-d3 overflow-hidden">
            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/[0.04] text-slate-400 border border-white/[0.06]
                             hover:border-green-500/30 hover:text-green-400 hover:bg-green-500/[0.05] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Card 5: Projects Count ─── */}
          <div className="md:col-span-3 bento-card text-center flex flex-col justify-center animate-fade-in-up-d4">
            <p className="text-4xl md:text-5xl font-bold text-gradient mb-1">50+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Projects Shipped</p>
          </div>

          {/* ─── Card 6: CTA ─── */}
          <div className="md:col-span-7 bento-card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fade-in-up-d5">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Got a project in mind?</h2>
              <p className="text-sm text-slate-500">Let&apos;s build something that makes an impact.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="#projects" className="btn-primary text-sm py-3 px-6">
                See My Work
              </a>
              <a href="#contact" className="btn-secondary text-sm py-3 px-6">
                Contact Me
              </a>
            </div>
          </div>

          {/* ─── Card 7: Approach ─── */}
          <div className="md:col-span-5 bento-card animate-fade-in-up-d6">
            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mb-4">My Approach</p>
            <div className="space-y-3">
              {[
                { num: "01", text: "Understand your business goals" },
                { num: "02", text: "Design the right architecture" },
                { num: "03", text: "Build, test, iterate fast" },
                { num: "04", text: "Ship & support long-term" },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3 group">
                  <span className="text-green-500/60 text-xs font-mono group-hover:text-green-400 transition-colors">{step.num}</span>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
