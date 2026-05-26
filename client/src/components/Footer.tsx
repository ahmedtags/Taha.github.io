/**
 * Footer / Contact Component
 * Gradient background with animated social icons, glowing links,
 * and a smooth "back to top" button.
 */

import { useScrollAnimation } from "@/hooks/useAnimations";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmad-taha-72ab333a4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/ahmedtags",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/blx_ma/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const header = useScrollAnimation();
  const content = useScrollAnimation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, oklch(0.97 0.005 65), oklch(0.95 0.01 60))",
      }}
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.85 0.15 40 / 30%), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.85 0.15 40 / 5%), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div ref={header.ref} className={`text-center mb-16 transition-all duration-700 ${header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Let's{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, oklch(0.85 0.15 40), oklch(0.70 0.12 50))",
              }}
            >
              Connect
            </span>
          </h3>
          <p className="text-lg text-foreground/50 font-sans font-light max-w-lg mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
        </div>

        {/* Contact Grid */}
        <div ref={content.ref} className={`grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-200 ${content.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Email Card */}
          <a
            href="mailto:Tahaahmd2006@Gmail.com"
            className="glass-card gradient-border rounded-xl p-6 group flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-1">Email</p>
              <p className="text-foreground/80 font-sans font-medium group-hover:text-accent transition-colors duration-300">
                Tahaahmd2006@Gmail.com
              </p>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+9710589094871"
            className="glass-card gradient-border rounded-xl p-6 group flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-foreground/80 font-sans font-medium group-hover:text-accent transition-colors duration-300">
                +971 0589094871
              </p>
            </div>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-16">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full flex items-center justify-center glass-card text-foreground/50 hover:text-accent hover:scale-110 transition-all duration-300"
              style={{
                opacity: content.isVisible ? 1 : 0,
                transform: content.isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${index * 80 + 400}ms`,
              }}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8 border-t border-foreground/5">
          <p className="text-sm text-foreground/30 font-sans">
            © {new Date().getFullYear()} Ahmed Taha
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-foreground/30 hover:text-accent transition-colors duration-300"
          >
            Back to top
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
