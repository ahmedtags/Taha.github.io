/**
 * Projects Section Component
 * Bento-grid layout with glassmorphism cards, gradient borders on hover,
 * animated tag pills, project numbering, and smooth hover effects.
 */

import { PROJECTS, type Project } from "@/data/projects";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useAnimations";

/** Extracted component so useScrollAnimation is called at the component level, not inside a loop */
function ProjectCard({ project, index, isWide }: { project: Project; index: number; isWide: boolean }) {
  const card = useScrollAnimation(0.15);

  return (
    <article
      ref={card.ref}
      className={`group glass-card gradient-border rounded-xl p-8 md:p-10 relative overflow-hidden ${
        isWide ? "md:col-span-2" : ""
      }`}
      style={{
        opacity: card.isVisible ? 1 : 0,
        transform: card.isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${index * 100}ms`,
      }}
    >
      {/* Project number */}
      <span className="absolute top-6 right-8 text-7xl font-display font-bold text-foreground/[0.03] select-none pointer-events-none group-hover:text-accent/[0.06] transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className={`relative z-10 ${isWide ? "md:max-w-3xl" : ""}`}>
        {/* Project Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-accent/60">
              /{String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>
          <h4 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-400">
            {project.title}
          </h4>
          <p className="text-foreground/60 leading-relaxed font-sans font-light">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="inline-block px-3 py-1.5 text-xs font-sans font-medium rounded-full border border-accent/20 text-accent/80 bg-accent/5 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300"
              style={{ transitionDelay: `${tagIndex * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <Link
          href={`/project/${project.id}`}
          className="inline-flex items-center gap-3 text-accent font-sans font-medium group/link hover:gap-4 transition-all duration-300"
        >
          <span className="relative">
            View Details
            <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover/link:w-full transition-all duration-300" />
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover/link:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function Projects() {
  const header = useScrollAnimation();

  return (
    <section id="projects" className="py-24 md:py-36 bg-background relative">
      {/* Subtle background accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.15 40 / 5%), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div ref={header.ref} className={`mb-16 max-w-4xl transition-all duration-700 ${header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-px flex-shrink-0 transition-all duration-700"
              style={{
                width: header.isVisible ? "48px" : "0px",
                background: "linear-gradient(90deg, oklch(0.85 0.15 40), transparent)",
              }}
            />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em]">
              Featured Work
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Selected Projects
          </h3>
          <p className="text-lg text-foreground/50 font-sans font-light">
            A showcase of projects that highlight my skills in AI, web development, and creative problem solving.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => {
            const isWide = index === 0 || index === PROJECTS.length - 1;
            return (
              <ProjectCard key={project.id} project={project} index={index} isWide={isWide} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
