"use client";

import { useState, useEffect, useRef } from "react";

const intents = [
  { id: "collab", label: "Collaboration", icon: "🤝" },
  { id: "work", label: "Job Opportunity", icon: "💼" },
  { id: "bug", label: "Bug Report", icon: "🐛" },
  { id: "hi", label: "Just Saying Hi", icon: "👋" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [intent, setIntent] = useState<string | null>(null);
  const [signal, setSignal] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [time, setTime] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  // Time & Status Logic (Simulated "Tech Hub" Time - NYC)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const timeString = now.toLocaleTimeString("en-US", options);
      setTime(timeString);

      // Simple "Online" logic: 9 AM - 6 PM EST
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(formatter.format(now));
      setIsOnline(hour >= 9 && hour < 18);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Gamified "Signal Strength" Calculation
  useEffect(() => {
    let score = 10; // Base connection
    if (form.name.length > 2) score += 20;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) score += 30;
    if (form.message.length > 10) score += 20;
    if (intent) score += 20;
    setSignal(Math.min(score, 100));
  }, [form, intent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signal < 50) return; // Prevent weak signals

    setStatus("sending");

    // Simulate network delay
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setIntent(null);
      // Reset after 3s
      setTimeout(() => setStatus("idle"), 5000);
    }, 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("malki._mohamed@outlook.com");
    setShowCopy(true);
    setTimeout(() => setShowCopy(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#22c55e 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-500 font-mono text-xs tracking-widest uppercase">Uplink Established</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Initialize Transmission</h2>
          </div>

          <div className="text-right mt-6 md:mt-0 font-mono text-xs text-zinc-500">
            <p>SECURE CHANNEL: <span className="text-green-500">ENCRYPTED</span></p>
            <p>LATENCY: <span className="text-green-500">12ms</span></p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ─── Left: Status Panel (2 cols) ─── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Operator Status Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.05] backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500/50 to-transparent"></div>

              <h3 className="text-zinc-400 text-xs font-mono tracking-widest uppercase mb-4">Operator Status</h3>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-zinc-500"} shadow-[0_0_10px_currentColor]`}></div>
                  {isOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>}
                </div>
                <div>
                  <p className="text-white font-medium">{isOnline ? "Online / Active" : "Offline / Sleeping"}</p>
                  <p className="text-zinc-500 text-xs font-mono">My Local Time: {time}</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {isOnline
                  ? "I'm currently active. Expect a rapid response protocol initiated within 2-4 hours."
                  : "Currently outside operational hours. Transmission will be queued for the next cycle."}
              </p>
            </div>

            {/* Direct Link Card */}
            <div
              onClick={copyEmail}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.05] backdrop-blur-sm relative overflow-hidden cursor-pointer hover:bg-zinc-800/40 transition-colors group"
            >
              <h3 className="text-zinc-400 text-xs font-mono tracking-widest uppercase mb-2">Direct Frequency</h3>
              <div className="flex justify-between items-center">
                <p className="text-lg text-white font-mono group-hover:text-green-400 transition-colors">malki._mohamed@outlook.com</p>
                <span className="text-zinc-500 group-hover:text-white transition-colors">
                  {showCopy ? "✓" : "📋"}
                </span>
              </div>
              {showCopy && <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center text-green-400 font-mono text-xs uppercase tracking-widest backdrop-blur-xs">Copied to Clipboard</div>}
            </div>

            {/* Signal Strength Meter */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.05] backdrop-blur-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-zinc-400 text-xs font-mono tracking-widest uppercase">Signal Strength</h3>
                <span className={`font-mono text-xs ${signal === 100 ? "text-green-400" : "text-zinc-500"}`}>{signal}%</span>
              </div>

              {/* Bar */}
              <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-700 ease-out ${signal > 80 ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-zinc-600"}`}
                  style={{ width: `${signal}%` }}
                ></div>
              </div>

              <p className="text-[10px] text-zinc-500 font-mono text-right">
                {signal < 50 ? "WEAK SIGNAL - ADD DATA" : signal < 100 ? "STABILIZING..." : "SIGNAL LOCKED - READY"}
              </p>
            </div>
          </div>

          {/* ─── Right: Transmission Form (3 cols) ─── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-zinc-900/20 border border-white/[0.05] rounded-3xl p-8 backdrop-blur-md relative">
              {/* Status Overlay */}
              {status === "sent" && (
                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
                    <span className="text-2xl text-green-500">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Transmission Sent</h3>
                  <p className="text-zinc-400 text-center max-w-xs">Data packet secured. Acknowledgment receipt will be sent shortly.</p>
                </div>
              )}

              <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="text-green-500">01.</span> Message Objective
              </h3>

              {/* Intent Chips */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {intents.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntent(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 ${intent === item.id
                      ? "bg-green-500/10 border-green-500/50 text-white shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "bg-black/20 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/5"
                      }`}
                  >
                    <span className="block text-xl mb-1">{item.icon}</span>
                    <span className="block text-xs font-mono font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="text-green-500">02.</span> Transmission Data
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="name" className="text-xs font-mono text-zinc-500 mb-2 block group-focus-within:text-green-500 transition-colors">IDENTITY_MATRIX</label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:bg-green-500/5 transition-all font-mono text-sm"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="text-xs font-mono text-zinc-500 mb-2 block group-focus-within:text-green-500 transition-colors">RETURN_FREQUENCY (EMAIL)</label>
                    <input
                      type="email"
                      id="email" 
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:bg-green-500/5 transition-all font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-500 mb-2 block group-focus-within:text-green-500 transition-colors">DATA_PACKET_CONTENT</label>
                  <textarea
                    id="message" 
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Initiate message protocol..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:bg-green-500/5 transition-all font-mono text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] text-zinc-600 font-mono hidden md:block">
                  STATUS: {status === 'sending' ? 'UPLOADING...' : 'STANDBY'}
                </p>

                <button
                  type="submit"
                  disabled={signal < 50 || status === 'sending'}
                  className={`px-8 py-3 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 relative overflow-hidden group ${signal >= 50
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] cursor-pointer border border-green-500/20"
                    : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed border border-transparent"
                    }`}
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      TRANSMITTING
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      INITIATE UPLINK {signal >= 50 && "→"}
                    </span>
                  )}

                  {/* Hover sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Section Footer */}
        <footer className="mt-20 border-t border-white/[0.08] pt-8 text-center">
          <p className="text-zinc-600 text-xs font-mono mb-2">
            SYSTEM STATUS: NOMINAL • UPTIME: 99.9%
          </p>
          <p className="text-zinc-700 text-[10px]">
            DESIGNED & BUILT BY MALKI MOHAMED • POWERED BY NEXT.JS
          </p>
        </footer>

      </div>
    </section>
  );
}

