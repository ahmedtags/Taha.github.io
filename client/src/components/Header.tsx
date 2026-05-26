/**
 * Header Component
 * Glassmorphism navbar with active section indicator,
 * mobile hamburger menu with animated slide-in drawer, and logo glow.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useActiveSection } from "@/hooks/useAnimations";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "courses", label: "Courses" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(["hero", "about", "projects", "courses", "contact"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3 shadow-lg shadow-black/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative text-xl font-display font-semibold text-foreground transition-colors duration-300"
          >
            <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
              Ahmed
              <span className="text-accent">.</span>
            </span>
            <span
              className="absolute -inset-2 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-sans font-medium rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-accent"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent"
                    style={{ animation: "fade-in-up 0.3s ease-out forwards" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 glass md:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "oklch(0.98 0.001 70 / 95%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left py-4 text-lg font-sans font-medium border-b border-border/30 transition-all duration-300 ${
                activeSection === item.id
                  ? "text-accent"
                  : "text-foreground/70 hover:text-foreground hover:pl-2"
              }`}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                transition: `all 0.3s ease ${index * 0.05 + 0.1}s`,
              }}
            >
              <span className="text-accent/40 text-sm mr-3 font-mono">0{index + 1}</span>
              {item.label}
            </button>
          ))}

          {/* Social links in mobile menu */}
          <div className="mt-auto pb-8">
            <p className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/ahmedtags"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-taha-72ab333a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
