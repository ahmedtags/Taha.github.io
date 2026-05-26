/**
 * Hero Section Component
 * Rendered over the global interactive background.
 */

import { useState, useEffect } from "react";

const TITLES = [
  "AI & Computer Science Student",
  "Software Developer",
  "Computer Vision Enthusiast",
  "Full-Stack Builder",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
      }, 80);
    } else if (!isDeleting && displayText.length === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Content */}
      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Greeting badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans font-medium mb-8 glass"
          style={{
            opacity: 0,
            animation: "fade-in-up 0.8s ease-out 0.2s forwards",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold text-6xl md:text-8xl text-foreground mb-4 tracking-tight"
          style={{
            opacity: 0,
            animation: "fade-in-up 0.8s ease-out 0.4s forwards",
          }}
        >
          Ahmed{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, oklch(0.85 0.15 40), oklch(0.70 0.12 50))",
            }}
          >
            Taha
          </span>
        </h1>

        {/* Typing subtitle */}
        <div
          className="h-10 md:h-12 flex items-center justify-center mb-6"
          style={{
            opacity: 0,
            animation: "fade-in-up 0.8s ease-out 0.6s forwards",
          }}
        >
          <p className="text-xl md:text-2xl font-sans font-medium text-accent">
            {displayText}
            <span
              className="inline-block w-0.5 h-6 md:h-7 bg-accent ml-1 align-middle"
              style={{ animation: "glow-pulse 1s ease-in-out infinite" }}
            />
          </p>
        </div>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto font-sans font-light"
          style={{
            opacity: 0,
            animation: "fade-in-up 0.8s ease-out 0.8s forwards",
          }}
        >
          Computer Science student at Universiti Sains Malaysia specializing in
          artificial intelligence, software development, and computer vision.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: 0,
            animation: "fade-in-up 0.8s ease-out 1.0s forwards",
          }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="glow-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-sans font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, oklch(0.85 0.15 40), oklch(0.75 0.12 40))",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            View My Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-sans font-semibold text-foreground glass hover:border-accent/30 transition-all duration-300 hover:scale-[1.03]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: 0,
          animation: "fade-in-up 0.8s ease-out 1.4s forwards",
        }}
      >
        <span className="text-xs font-sans text-foreground/40 uppercase tracking-widest">Scroll</span>
        <div
          className="w-5 h-8 rounded-full border-2 border-foreground/20 flex justify-center pt-1.5"
        >
          <div
            className="w-1 h-2 rounded-full bg-accent"
            style={{ animation: "scroll-indicator 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}