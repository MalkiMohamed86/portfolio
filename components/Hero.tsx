"use client";

import { useEffect, useState, useRef } from "react";

// Expanded Content Files
const files = {
  "bio.tsx": {
    lang: "tsx",
    content: `
import { Experience, Philosophy } from "./types";

const Developer = {
  name: "Malki Mohamed",
  role: "Full-Stack Developer",
  location: "Azrou, Morocco",
  
  philosophy: [
    "Clean Code",
    "System Conception",
    "User-Centric Design",
    "Scalable Architecture"
  ],

  experience: [
    { company: "AUI", role: "Frontend Intern", year: "Mar 2025" },
    { company: "Projects", role: "Online Exams App", year: "Apr 2025" },
  ],

  status: "🟢 Seeking new opportunities"
};

export default Developer;
    `,
  },
  "stack.json": {
    lang: "json",
    content: `
{
  "frontend": {
    "frameworks": ["React", "Blade"],
    "styling": ["Tailwind CSS", "Bootstrap", "Material UI"],
    "visuals": ["Figma", "Canva"]
  },
  "backend": {
    "frameworks": ["Laravel 11/12", "Express.js"],
    "runtime": ["Node.js", "PHP", "Python"],
    "database": ["MySQL", "MongoDB"]
  },
  "tools": {
    "devops": ["Git", "GitHub", "Postman"],
    "office": ["Excel", "Word", "PowerPoint"]
  }
}
    `,
  },
  "README.md": {
    lang: "markdown",
    content: `
# Portfolio v2.0 🚀

Welcome to my digital workspace. This portfolio is built with the latest web technologies to showcase my work and skills.

## Features
- ⚡ **Next.js 14** (App Router)
- 🎨 **Tailwind CSS** (Custom Design System)
- 🎭 **Framer Motion** (Smooth Animations)
- 📝 **TypeScript** (Type Safety)

## Getting Started
To view my projects, simply scroll down or type \`npm run start\` in the terminal below.

## Contact
Feel free to reach out via the contact form or email directly.
    `,
  },
};

type FileName = keyof typeof files;

const SyntaxHighlight = ({ code, language }: { code: string; language: string }) => {
  // GitHub Dark Theme Colors
  // Strings: #a5d6ff (blue-300)
  // Keywords: #ff7b72 (red-400)
  // Functions: #d2a8ff (purple-400)
  // Types/Classes: #ffa657 (orange-300)
  // Comments: #8b949e (zinc-500)
  // Numbers: #79c0ff (blue-200)

  if (language === "json") {
    const parts = code.split(/(".*?"|:|\{|\}|\[|\]|,)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('"')) {
            const isKey = parts[i + 1]?.trim() === ":";
            // Keys in JSON usually blue-ish or plain, Values are strings (blue-300)
            return <span key={i} className={isKey ? "text-indigo-200" : "text-blue-300"}>{part}</span>;
          }
          if (["{", "}", "[", "]", ","].includes(part)) return <span key={i} className="text-zinc-400">{part}</span>;
          return <span key={i} className="text-zinc-300">{part}</span>;
        })}
      </>
    );
  }

  if (language === "tsx") {
    // Improved regex to handle comments better
    const parts = code.split(/(\/\/.*$|'.*?'|".*?"|`[\s\S]*?`|\b(import|from|const|export|default|return|interface|type|async|await)\b|[{}();,])/gm);
    return (
      <>
        {parts.map((part, i) => {
          if (!part) return null;
          // Comments
          if (part.trim().startsWith("//")) return <span key={i} className="text-zinc-500 italic">{part}</span>;

          // Strings
          if (part.startsWith("'") || part.startsWith('"') || part.startsWith("`")) return <span key={i} className="text-blue-300">{part}</span>;

          // Keywords (Red/Pink in GitHub Dark)
          if (["import", "from", "const", "export", "default", "return", "interface", "type"].includes(part))
            return <span key={i} className="text-red-400">{part}</span>;

          // Punctuation
          if (["{", "}", "(", ")", ";", ","].includes(part)) return <span key={i} className="text-zinc-400">{part}</span>;

          // Classes / Types (Orange)
          if (part.trim() === "Developer" || part.trim() === "Experience" || part.trim() === "Philosophy")
            return <span key={i} className="text-orange-300">{part}</span>;

          // Object Keys (Blue-ish in GitHub or Purple if function call)
          if (part.trim() === "name" || part.trim() === "role" || part.trim() === "location")
            return <span key={i} className="text-purple-300">{part}</span>;

          // Default text
          return <span key={i} className="text-zinc-200">{part}</span>;
        })}
      </>
    );
  }

  if (language === "markdown") {
    const parts = code.split(/(# .*$|## .*$|- \*\*.*?\*\*|`.*?`)/gm);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("# ")) return <span key={i} className="text-blue-400 font-bold">{part}</span>;
          if (part.startsWith("## ")) return <span key={i} className="text-blue-400 font-bold">{part}</span>;
          if (part.startsWith("- **")) return <span key={i} className="text-purple-300">{part}</span>;
          if (part.startsWith("`")) return <span key={i} className="text-zinc-400 bg-zinc-800 px-1 rounded">{part}</span>;
          return <span key={i} className="text-zinc-300">{part}</span>;
        })}
      </>
    )
  }

  return <>{code}</>;
};

export default function Hero() {
  const [activeFile, setActiveFile] = useState<FileName>("bio.tsx");
  const [typedContent, setTypedContent] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Responsive: Close sidebar on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
      setTerminalOpen(false); // Also close terminal on mobile to save space
    }
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    setIsTyping(true);
    setTypedContent("");
    const content = files[activeFile].content.trim();
    let index = 0;

    // Typing speed based on content length
    const speed = content.length > 300 ? 5 : 15;

    const interval = setInterval(() => {
      setTypedContent((prev) => content.slice(0, index));
      index++;
      if (index > content.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [activeFile]);

  // Terminal Build Simulation
  useEffect(() => {
    const logs = [
      "> portfolio-v2@1.0.0 dev",
      "> next dev",
      "",
      "ready - started server on 0.0.0.0:3000, url: http://localhost:3000",
      "info  - loaded env from .env.local",
      "event - compiled client and server successfully in 1241 ms (156 modules)",
      "wait  - compiling...",
      "event - compiled successfully",
      "> Ready for user interaction..."
    ];

    let delay = 0;
    setTerminalLogs([]);

    logs.forEach((log, i) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        // Auto-scroll terminal
        const term = document.getElementById("terminal-body");
        if (term) term.scrollTop = term.scrollHeight;
      }, delay);
    });
  }, []);

  const handleRun = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center p-6 bg-black overflow-hidden pt-24">

      {/* Static Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto max-w-6xl z-10 flex flex-col lg:flex-row gap-12 items-start lg:items-center h-full">

        {/* Left: Intro Text */}
        <div className="lg:w-5/12 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              v2.0.0 Stable
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Builder of <br />
              <span className="text-zinc-600">Digital Worlds</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
              I craft high-performance applications with focusing on clean code, scalability, and exceptional user experiences.
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={handleRun} className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 group">
              Inside Look
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a href="#contact" className="px-8 py-3 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 border border-white/10 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-zinc-500">
            <a href="https://www.linkedin.com/in/malkimohamed/" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">LinkedIn</span>
            </a>
            <a href="https://github.com/MalkiMohamed86" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.04-.015-2.04-3.34.72-4.045-1.61-4.045-1.61-.555-1.41-1.35-1.785-1.35-1.785-1.095-.75.075-.735.075-.735 1.215.09 1.86 1.245 1.86 1.245 1.08 1.86 2.835 1.32 3.525 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.475-1.335-5.475-5.94 0-1.32.465-2.385 1.245-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3.015-.405 1.02.0 2.055.135 3.015.405 2.3-1.545 3.285-1.23 3.285-1.23.675 1.65.24 2.88.135 3.18.78.84 1.245 1.905 1.245 3.225 0 4.62-2.82 5.625-5.49 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225 .69 .825 .57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">GitHub</span>
            </a>
            <a href="mailto:malkimohamed1202@gmail.com" className="hover:text-white transition-colors flex items-center gap-2 group">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Email</span>
            </a>
            <a href="https://www.instagram.com/noctis_86_" target="_blank" className="hover:text-pink-500 transition-colors flex items-center gap-2 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Instagram</span>
            </a>
          </div>

          {/* Tech Badge Grid */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-xs text-zinc-600 font-mono mb-3 uppercase tracking-wider">Powered By</p>
            <div className="flex gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {/* Using simple text badges for max compatibility */}
              <span className="text-xl font-bold text-white">Next.js</span>
              <span className="text-xl font-bold text-blue-400">React</span>
              <span className="text-xl font-bold text-blue-500">TS</span>
              <span className="text-xl font-bold text-cyan-400">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Right: Portfolio OS Window */}
        <div className="lg:w-7/12 w-full lg:h-[600px] h-[500px]">
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative h-full flex flex-col font-mono text-sm">

            {/* Title Bar */}
            <div className="h-10 bg-[#1a1a1a] border-b border-black flex items-center px-4 justify-between shrink-0">
              <div className="flex gap-2 group">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:brightness-75 transition-all"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:brightness-75 transition-all"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] group-hover:brightness-75 transition-all"></div>
              </div>
              <div className="text-xs text-zinc-500 flex gap-2">
                <span>portfolio-v2</span>
                <span className="text-zinc-700">—</span>
                <span>{activeFile}</span>
              </div>
              <div className="w-14"></div>
            </div>

            {/* Main Workspace */}
            <div className="flex flex-1 overflow-hidden relative">

              {/* Activity Bar (Sidebar) */}
              <div className={`w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 bg-[#111] shrink-0 z-20`}>
                <div className={`cursor-pointer transition-colors ${showSidebar ? "text-white" : "text-zinc-600 hover:text-white"}`} onClick={() => setShowSidebar(!showSidebar)} title="Explorer">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                </div>
                <a href="https://github.com" target="_blank" className="text-zinc-600 hover:text-white transition-colors" title="Source Control">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.04-.015-2.04-3.34.72-4.045-1.61-4.045-1.61-.555-1.41-1.35-1.785-1.35-1.785-1.095-.75.075-.735.075-.735 1.215.09 1.86 1.245 1.86 1.245 1.08 1.86 2.835 1.32 3.525 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.475-1.335-5.475-5.94 0-1.32.465-2.385 1.245-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3.015-.405 1.02.0 2.055.135 3.015.405 2.3-1.545 3.285-1.23 3.285-1.23.675 1.65.24 2.88.135 3.18.78.84 1.245 1.905 1.245 3.225 0 4.62-2.82 5.625-5.49 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225 .69 .825 .57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <div className="flex-1"></div>
                <div className="text-zinc-600 hover:text-white cursor-pointer" title="Settings">⚙️</div>
              </div>

              {/* Explorer Panel */}
              {showSidebar && (
                <div className="w-48 border-r border-white/5 bg-[#0d0d0d] flex flex-col shrink-0 animate-slide-in-left">
                  <div className="h-8 flex items-center px-4 text-zinc-500 text-xs font-bold tracking-wider uppercase">Explorer</div>
                  <div className="flex-1 pt-2">
                    {/* Open Editors */}
                    <div className="px-2">
                      <div className="text-zinc-500 text-[10px] font-bold mb-1 flex items-center gap-1">
                        <span className="text-[8px]">▼</span> OPEN EDITORS
                      </div>
                      {(Object.keys(files) as FileName[]).map((fileName) => (
                        <div key={fileName} onClick={() => setActiveFile(fileName)} className={`flex items-center gap-2 text-xs px-2 py-1 rounded cursor-pointer ${activeFile === fileName ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
                          <span className="opacity-0 group-hover:opacity-100">×</span>
                          <span>{fileName}</span>
                        </div>
                      ))}
                    </div>
                    {/* PortFolio Folder */}
                    <div className="mt-4 px-2">
                      <div className="text-zinc-500 text-[10px] font-bold mb-1 flex items-center gap-1">
                        <span className="text-[8px]">▼</span> PORTFOLIO-V2
                      </div>
                      <div className="pl-3 space-y-1">
                        {(Object.keys(files) as FileName[]).map((fileName) => (
                          <div key={fileName} onClick={() => setActiveFile(fileName)} className={`flex items-center gap-2 text-xs py-0.5 cursor-pointer ${activeFile === fileName ? "text-green-400" : "text-zinc-500 hover:text-zinc-300"}`}>
                            <span className={fileName.endsWith("tsx") ? "text-blue-400" : fileName.endsWith("json") ? "text-yellow-400" : "text-gray-400"}>📄</span>
                            {fileName}
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs py-0.5 text-zinc-600">
                          <span className="text-purple-400">📁</span> node_modules
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Editor Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
                {/* Tabs */}
                <div className="flex bg-[#0a0a0a] border-b border-black overflow-x-auto shrink-0 scrollbar-hide">
                  {(Object.keys(files) as FileName[]).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => setActiveFile(fileName)}
                      className={`px-4 py-2.5 text-xs font-mono flex items-center gap-2 border-r border-black min-w-fit transition-all ${activeFile === fileName
                        ? "bg-[#1e1e1e] text-white border-t-2 border-t-green-500"
                        : "text-zinc-600 hover:bg-[#151515] hover:text-zinc-400 bg-[#0f0f0f]"
                        }`}
                    >
                      <span className={
                        fileName.endsWith("tsx") ? "text-blue-400" :
                          fileName.endsWith("json") ? "text-yellow-400" :
                            "text-gray-400"
                      }>
                        {fileName.endsWith("tsx") ? "TSX" : fileName.endsWith("json") ? "{ }" : "MD"}
                      </span>
                      {fileName}
                      {activeFile === fileName && <span className="text-zinc-500 ml-2 hover:bg-white/10 rounded-full w-4 h-4 flex items-center justify-center">×</span>}
                    </button>
                  ))}
                </div>

                {/* Code View */}
                <div ref={scrollRef} className="flex-1 p-6 overflow-auto custom-scrollbar relative">
                  {/* Line Numbers */}
                  <div className="absolute left-0 top-6 bottom-0 w-12 text-right pr-4 text-zinc-700 select-none pointer-events-none font-mono text-xs leading-relaxed">
                    {typedContent.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>

                  {/* Code Content */}
                  <div className="ml-8 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                    <SyntaxHighlight code={typedContent} language={activeFile.endsWith("json") ? "json" : activeFile.endsWith("tsx") ? "tsx" : "markdown"} />
                    {isTyping && <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1 align-middle"></span>}
                  </div>
                </div>

                {/* Integrated Terminal Panel */}
                {terminalOpen && (
                  <div className="h-32 border-t border-white/10 bg-[#0c0c0c] flex flex-col shrink-0">
                    <div className="h-6 flex items-center justify-between px-3 border-b border-white/5">
                      <div className="flex gap-4 text-[10px] font-bold text-zinc-500">
                        <span className="text-white border-b border-white">TERMINAL</span>
                        <span>OUTPUT</span>
                        <span>DEBUG CONSOLE</span>
                      </div>
                      <div className="cursor-pointer hover:text-white text-zinc-600" onClick={() => setTerminalOpen(false)}>×</div>
                    </div>
                    <div id="terminal-body" className="flex-1 p-2 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-1 custom-scrollbar">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className={log.startsWith(">") ? "text-green-500" : "text-zinc-400"}>{log}</div>
                      ))}
                      <div className="text-green-500 animate-pulse">_</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] flex items-center px-3 justify-between text-[10px] font-mono text-white shrink-0">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors" onClick={() => setTerminalOpen(!terminalOpen)}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </div>
                <span className="flex items-center gap-1 font-semibold"><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> main*</span>
                <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors hidden sm:flex">
                  <span>⊘ 0</span>
                  <span>⚠ 0</span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="hidden sm:inline">Ln {typedContent.split('\n').length}, Col 1</span>
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline">{activeFile.endsWith("tsx") ? "TypeScript React" : activeFile.endsWith("json") ? "JSON" : "Markdown"}</span>
                <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition-colors bg-white/10" onClick={handleRun}>
                  <span className="animate-pulse text-yellow-300">⚡</span> Go Live
                </div>
                <span className="hidden sm:inline">🔔</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
        /* Animation for sidebar slide */
        @keyframes slideInLeft {
           from { width: 0; opacity: 0; }
           to { width: 192px; opacity: 1; }
        }
        .animate-slide-in-left {
           animation: slideInLeft 0.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
