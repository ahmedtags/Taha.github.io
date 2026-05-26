/**
 * Project Detail Page
 * Full-width gradient header, glassmorphism content cards,
 * animated page entrance, and timeline-style results.
 */

import { useRoute, Link } from "wouter";
import { PROJECTS } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useAnimations";

/** Inner component that renders the full detail page — hooks are safe here */
function ProjectDetailContent({ projectId }: { projectId: number }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  const projectIndex = PROJECTS.findIndex((p) => p.id === projectId);

  const challengeAnim = useScrollAnimation(0.2);
  const solutionAnim = useScrollAnimation(0.2);
  const resultsAnim = useScrollAnimation(0.2);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-display font-bold text-foreground mb-2">404</h1>
          <p className="text-foreground/50 mb-8 font-sans">Project not found</p>
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card text-accent font-sans font-medium hover:scale-105 transition-all cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Portfolio
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-3">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-display font-semibold text-foreground hover:text-accent transition-colors duration-300 cursor-pointer">
              Ahmed<span className="text-accent">.</span>
            </span>
          </Link>
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors cursor-pointer font-sans">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.98 0.001 70), oklch(0.96 0.01 60), oklch(0.97 0.005 65))",
        }}
      >
        {/* Background number */}
        <span className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 text-[12rem] md:text-[16rem] font-display font-bold text-foreground/[0.03] select-none pointer-events-none">
          {String(projectIndex + 1).padStart(2, "0")}
        </span>

        {/* Gradient orb */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.85 0.15 40 / 8%), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div
          className="container max-w-4xl relative z-10"
          style={{ opacity: 0, animation: "fade-in-up 0.8s ease-out 0.2s forwards" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-px w-12"
              style={{
                background: "linear-gradient(90deg, oklch(0.85 0.15 40), transparent)",
              }}
            />
            <span className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em]">
              Project Details
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
            style={{ opacity: 0, animation: "fade-in-up 0.8s ease-out 0.4s forwards" }}
          >
            {project.title}
          </h1>

          <p
            className="text-xl text-foreground/60 leading-relaxed mb-8 max-w-3xl font-sans font-light"
            style={{ opacity: 0, animation: "fade-in-up 0.8s ease-out 0.6s forwards" }}
          >
            {project.fullDescription}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-3"
            style={{ opacity: 0, animation: "fade-in-up 0.8s ease-out 0.8s forwards" }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-4 py-2 text-sm font-sans font-medium rounded-full border border-accent/20 text-accent/80 bg-accent/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: "linear-gradient(to top, oklch(0.98 0.001 70), transparent)",
          }}
        />
      </section>

      {/* Content */}
      <main className="container max-w-4xl py-16 md:py-24">
        {/* Challenge & Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Challenge */}
          <div
            ref={challengeAnim.ref}
            className="glass-card gradient-border rounded-xl p-8"
            style={{
              opacity: challengeAnim.isVisible ? 1 : 0,
              transform: challengeAnim.isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-accent"
                style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Challenge
              </h3>
            </div>
            <p className="text-foreground/60 leading-relaxed font-sans font-light">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div
            ref={solutionAnim.ref}
            className="glass-card gradient-border rounded-xl p-8"
            style={{
              opacity: solutionAnim.isVisible ? 1 : 0,
              transform: solutionAnim.isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.15s",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-accent"
                style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" />
                  <path d="m15.2 7.6 2.8-2.8" />
                  <path d="M18 12h4" />
                  <path d="m15.2 16.4 2.8 2.8" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.8-2.8" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.8 2.8" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Solution
              </h3>
            </div>
            <p className="text-foreground/60 leading-relaxed font-sans font-light">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Results Timeline */}
        <div
          ref={resultsAnim.ref}
          className="glass-card gradient-border rounded-xl p-8 md:p-12 mb-16"
          style={{
            opacity: resultsAnim.isVisible ? 1 : 0,
            transform: resultsAnim.isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-accent"
              style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              Results & Achievements
            </h3>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-4 relative"
                style={{
                  opacity: resultsAnim.isVisible ? 1 : 0,
                  transform: resultsAnim.isVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: `all 0.4s ease ${index * 150 + 200}ms`,
                }}
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-semibold text-accent-foreground flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.85 0.15 40), oklch(0.75 0.12 40))",
                    }}
                  >
                    {index + 1}
                  </div>
                  {index < project.results.length - 1 && (
                    <div className="w-px h-8 bg-accent/20" />
                  )}
                </div>
                <p className="text-lg text-foreground/70 font-sans font-light pt-1 pb-4">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card text-foreground/70 hover:text-accent font-sans font-medium transition-all duration-300 cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              All Projects
            </span>
          </Link>

          {/* Next project link */}
          {projectIndex < PROJECTS.length - 1 && (
            <Link href={`/project/${PROJECTS[projectIndex + 1].id}`}>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card text-foreground/70 hover:text-accent font-sans font-medium transition-all duration-300 cursor-pointer">
                Next Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");

  if (!match) {
    return null;
  }

  const projectId = parseInt(params?.id || "0");

  return <ProjectDetailContent projectId={projectId} />;
}
