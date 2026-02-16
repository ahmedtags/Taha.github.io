/**
 * Project Detail Page
 * Minimalist design with elegant typography
 * Displays full project information with back navigation
 */

import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/data/projects";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");

  if (!match) {
    return null;
  }

  const projectId = parseInt(params?.id || "0");
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer">
              <ArrowLeft size={20} />
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
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-display font-semibold text-foreground hover:text-accent transition-colors duration-300 cursor-pointer">
              Portfolio
            </span>
          </Link>
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors cursor-pointer">
              <ArrowLeft size={20} />
              Back
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container py-16 md:py-24 max-w-4xl">
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-accent" />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-widest">
              Project Details
            </h2>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed mb-8">
            {project.fullDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-4 py-2 text-sm font-sans font-medium text-accent bg-accent/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Challenge */}
          <div>
            <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
              Challenge
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
              Solution
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-secondary/30 rounded-sm p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
            Results
          </h3>
          <ul className="space-y-4">
            {project.results.map((result, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                  ✓
                </span>
                <span className="text-lg text-foreground/80">{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-sm hover:bg-secondary/30 transition-colors duration-300 cursor-pointer">
            <ArrowLeft size={20} />
            Back to Portfolio
          </span>
        </Link>
      </main>
    </div>
  );
}
