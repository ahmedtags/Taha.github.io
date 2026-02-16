/**
 * Projects Section Component
 * Minimalist gallery with elegant card design
 * Design: Clean cards with subtle shadows, typography hierarchy, hover effects
 */

import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-widest">
              Featured Work
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Selected Projects
          </h3>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group bg-card rounded-sm p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
            >
              {/* Project Header */}
              <div className="mb-6">
                <h4 className="text-2xl font-display font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-foreground/70 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs font-sans font-medium text-accent bg-accent/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={`/project/${project.id}`}
                className="inline-flex items-center gap-2 text-accent font-sans font-medium hover:gap-3 transition-all duration-300"
              >
                View Project
                <span className="text-lg">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
