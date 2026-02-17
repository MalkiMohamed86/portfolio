"use client";

import { useEffect, useRef } from 'react';

// Skill Data
const skills = [
  "PHP", "Laravel", "React", "Node.js", "Python", "SQL",
  "MySQL", "MongoDB", "Blade", "Tailwind", "Bootstrap",
  "Git", "GitHub", "Figma", "Postman", "Express.js"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Physics State (Refs for performance - no re-renders)
  const state = useRef({
    isDragging: false,
    rotation: { x: 0, y: 0 },
    momentum: { x: 0.5, y: 0.5 },
    lastMouse: { x: 0, y: 0 }
  });

  // Particle System State
  const particles = useRef<{ x: number, y: number, vx: number, vy: number, size: number }[]>([]);

  // Fibonacci Sphere Config
  const radius = 220;
  const phi = Math.PI * (3 - Math.sqrt(5));

  // Init Particles
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Create initial particles (Increased count and size for visibility)
    const particleCount = 70; // Increased from 40
    particles.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1 // Increased size
    }));

    return () => window.removeEventListener('resize', resize);
  }, []);

  // Physics Loop (Direct DOM Manipulation + Canvas Draw)
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      const { isDragging, rotation, momentum } = state.current;

      // --- Sphere Physics ---
      if (!isDragging) {
        // Apply momentum
        rotation.x += momentum.x;
        rotation.y += momentum.y;

        // Friction
        momentum.x *= 0.98;
        momentum.y *= 0.98;

        // Min speed to keep it alive
        if (Math.abs(momentum.x) < 0.05) momentum.x = momentum.x > 0 ? 0.05 : -0.05;
        if (Math.abs(momentum.y) < 0.05) momentum.y = momentum.y > 0 ? 0.05 : -0.05;
      }

      // Update Sphere Rotation
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg)`;
      }

      // Update Items (Counter-rotation & Depth)
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        // Calculate original 3D position
        const y = 1 - (i / (skills.length - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY; // Static Z relative to sphere center

        // Rotation matrix approximation for simpler depth sorting
        // We need the *rotated* Z to calculate depth.
        const radX = (rotation.x * Math.PI) / 180;
        const radY = (rotation.y * Math.PI) / 180;

        // 1. Rotate around X
        // const y1 = y * Math.cos(radX) - z * Math.sin(radX);
        const z1 = y * Math.sin(radX) + z * Math.cos(radX);

        // 2. Rotate around Y
        const z2 = z1 * Math.cos(radY) - x * Math.sin(radY);

        // z2 is roughly our depth (-1 to 1)
        const depth = z2;
        const opacity = Math.max(0.15, (depth + 1.2) / 2.2);
        const scale = (0.6 + opacity * 0.4).toFixed(3);

        // Update Item Style directly
        item.style.opacity = opacity.toFixed(2);
        item.style.transform = `translate3d(${x * radius}px, ${y * radius}px, ${z * radius}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg) scale(${scale})`;
        item.style.zIndex = Math.floor(opacity * 100).toString();
      });

      // --- Background Particle Animation ---
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Brighter Green for higher visibility
        ctx.fillStyle = 'rgba(74, 222, 128, 0.5)';
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)'; // More visible lines

        particles.current.forEach((p, i) => {
          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // Draw Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particles.current.length; j++) {
            const p2 = particles.current[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) { // Increased connection distance
              ctx.beginPath();
              ctx.lineWidth = 1 - dist / 160;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Event Handlers
  const handleStart = (clientX: number, clientY: number) => {
    state.current.isDragging = true;
    state.current.lastMouse = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!state.current.isDragging) return;
    const deltaX = clientX - state.current.lastMouse.x;
    const deltaY = clientY - state.current.lastMouse.y;

    state.current.rotation.y += deltaX * 0.5;
    state.current.rotation.x -= deltaY * 0.5;

    state.current.momentum = { x: -deltaY * 0.1, y: deltaX * 0.1 };
    state.current.lastMouse = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    state.current.isDragging = false;
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-20 cursor-grab active:cursor-grabbing relative"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60 z-0" /> {/* Increased Opacity */}

      <div className="text-center mb-12 z-10 pointer-events-none relative">
        <span className="text-green-500 font-mono text-xs tracking-widest uppercase">02. Tech Stack</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Quantum Core</h2>
        <p className="text-zinc-500 mt-2 text-sm">Drag to rotate ecosystem</p>
      </div>

      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] perspective-1000 z-10">
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full preserve-3d will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="absolute left-1/2 top-1/2 flex items-center justify-center will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Orb Effect */}
              <div className="relative px-5 py-3 rounded-full bg-gradient-to-br from-white/10 to-black/80 backdrop-blur-md border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,0,0,0.5)] group hover:from-green-500/20 hover:to-green-900/40 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-colors duration-300">
                <span className="text-white font-mono text-sm md:text-base font-bold whitespace-nowrap text-shadow pointer-events-none">{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
      `}</style>
    </section>
  );
}
