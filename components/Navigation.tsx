"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-6xl">
        <a href="#home" className="text-lg font-semibold text-white hover:text-green-400 transition-colors">
          johndoe<span className="text-green-500">.</span>
        </a>
        
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
