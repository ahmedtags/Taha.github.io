/**
 * Header Component
 * Minimalist navigation with elegant spacing
 * Design: Playfair Display serif for brand, subtle navigation links
 */

import { Link } from "wouter";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container py-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-display font-semibold text-foreground hover:text-accent transition-colors duration-300">
          Portfolio
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="#about"
            className="text-sm font-sans text-foreground hover:text-accent transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-sm font-sans text-foreground hover:text-accent transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm font-sans text-foreground hover:text-accent transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#courses"
            className="text-sm font-sans text-foreground hover:text-accent transition-colors duration-300"
          >
            Courses
          </a>
        </nav>
      </div>
    </header>
  );
}
