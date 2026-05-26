/**
 * Courses Section Component
 * Tabbed category layout with animated accordion, glassmorphism cards,
 * and animated counting stats.
 */

import { useState, useMemo } from "react";
import { COURSES, type Course } from "@/data/courses";
import { useScrollAnimation, useCountUp } from "@/hooks/useAnimations";

/** Extracted component so useScrollAnimation is called at the component level, not inside a loop */
function CourseItem({
  course,
  index,
  isExpanded,
  onToggle,
}: {
  course: Course;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const card = useScrollAnimation(0.1);

  return (
    <div
      ref={card.ref}
      className="glass-card rounded-xl overflow-hidden"
      style={{
        opacity: card.isVisible ? 1 : 0,
        transform: card.isVisible ? "translateY(0)" : "translateY(15px)",
        transition: `all 0.4s ease ${index * 60}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group/btn transition-all duration-200"
      >
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <span
            className="font-mono text-sm font-semibold text-accent/70 whitespace-nowrap px-2.5 py-1 rounded-md"
            style={{ background: "oklch(0.85 0.15 40 / 8%)" }}
          >
            {course.code}
          </span>
          <span className="text-foreground/80 font-sans font-medium truncate group-hover/btn:text-foreground transition-colors">
            {course.title}
          </span>
        </div>
        <div className="ml-4 flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded ? "bg-accent/20 rotate-180" : "bg-foreground/5"
            }`}
          >
            <svg
              className="w-4 h-4 text-accent transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Animated expand content */}
      <div
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isExpanded ? "300px" : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-0">
          <div className="border-t border-border/30 pt-4">
            <p className="text-foreground/60 leading-relaxed font-sans font-light text-sm">
              {course.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const header = useScrollAnimation();

  // Group courses by category
  const coursesByCategory = useMemo(() => {
    return COURSES.reduce(
      (acc, course) => {
        if (!acc[course.category]) {
          acc[course.category] = [];
        }
        acc[course.category].push(course);
        return acc;
      },
      {} as Record<string, typeof COURSES>
    );
  }, []);

  const categories = Object.keys(coursesByCategory);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Stats
  const totalCount = useCountUp(COURSES.length);
  const categoryCount = useCountUp(categories.length);

  return (
    <section id="courses" className="py-24 md:py-36 bg-background relative">
      {/* Background accent */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.15 40 / 4%), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div ref={header.ref} className={`mb-12 max-w-4xl transition-all duration-700 ${header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-px flex-shrink-0 transition-all duration-700"
              style={{
                width: header.isVisible ? "48px" : "0px",
                background: "linear-gradient(90deg, oklch(0.85 0.15 40), transparent)",
              }}
            />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em]">
              Education
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Courses & Training
          </h3>
          <p className="text-lg text-foreground/50 font-sans font-light leading-relaxed">
            A comprehensive collection of courses and training programs I have completed to build expertise in computer science and software development.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setExpandedId(null);
              }}
              className={`relative px-5 py-2.5 text-sm font-sans font-medium rounded-lg transition-all duration-300 ${
                activeCategory === category
                  ? "text-accent-foreground"
                  : "text-foreground/60 hover:text-foreground glass-card"
              }`}
              style={
                activeCategory === category
                  ? { background: "linear-gradient(135deg, oklch(0.85 0.15 40), oklch(0.75 0.12 40))" }
                  : undefined
              }
            >
              {category}
              {activeCategory === category && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Course List */}
        <div className="space-y-3 max-w-4xl">
          {(coursesByCategory[activeCategory] || []).map((course, index) => (
            <CourseItem
              key={course.id}
              course={course}
              index={index}
              isExpanded={expandedId === course.id}
              onToggle={() => setExpandedId(expandedId === course.id ? null : course.id)}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-16 border-t border-border/20">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div ref={totalCount.ref} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                {totalCount.count}
              </div>
              <p className="text-foreground/50 font-sans text-sm">Total Courses</p>
            </div>
            <div ref={categoryCount.ref} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                {categoryCount.count}
              </div>
              <p className="text-foreground/50 font-sans text-sm">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                100<span className="text-2xl">%</span>
              </div>
              <p className="text-foreground/50 font-sans text-sm">Completion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
