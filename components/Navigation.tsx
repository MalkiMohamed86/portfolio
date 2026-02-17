"use client";

import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-[calc(100%+20px)] opacity-0"
            }`}
          style={{
            marginTop: isScrolled ? "12px" : "0px",
            width: "min(1152px, 92vw)",
            borderRadius: isScrolled ? "9999px" : "0px",
            background: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            border: "none",
            boxShadow: "none",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="px-6 py-3 flex justify-between items-center">
            <a
              href="#home"
              className="text-base font-semibold text-white hover:text-green-400 transition-colors z-50 relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              malkimohamed<span className="text-green-500">.</span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-6">
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
                <a
                  href="#contact"
                  className="text-sm font-semibold py-2 px-5 rounded-full transition-all duration-300"
                  style={{
                    background: "var(--accent)",
                    color: "#050505",
                    boxShadow: "0 0 16px rgba(34,197,94,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(34,197,94,0.5)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(34,197,94,0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Hire Me
                </a>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 z-50 relative focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-40 transition-all duration-500 md:hidden flex justify-center items-center ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <li
              key={item.name}
              style={{
                transitionDelay: `${i * 100}ms`,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0
              }}
              className="transition-all duration-500"
            >
              <a
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-green-400 transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li
            style={{
              transitionDelay: `${navItems.length * 100}ms`,
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            className="transition-all duration-500"
          >
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block mt-4"
              style={{
                background: "var(--accent)",
                color: "#050505",
                boxShadow: "0 0 20px rgba(34,197,94,0.4)",
              }}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}


