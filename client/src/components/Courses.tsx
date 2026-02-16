/**
 * Courses Section Component
 * Displays all courses taken with course codes, titles, and descriptions
 * Design: Clean expandable layout with elegant typography
 */

import { useState } from "react";
import { COURSES } from "@/data/courses";

export default function Courses() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Group courses by category
  const coursesByCategory = COURSES.reduce(
    (acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = [];
      }
      acc[course.category].push(course);
      return acc;
    },
    {} as Record<string, typeof COURSES>
  );

  return (
    <section id="courses" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-widest">
              Education
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Courses & Training
          </h3>
          <p className="text-lg text-foreground/70 mt-6 leading-relaxed">
            A comprehensive collection of courses and training programs I have completed to build expertise in computer science and software development.
          </p>
        </div>

        {/* Courses by Category */}
        <div className="space-y-12">
          {Object.entries(coursesByCategory).map(([category, courses]) => (
            <div key={category}>
              <h4 className="text-2xl font-display font-semibold text-foreground mb-6">
                {category}
              </h4>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-background"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors duration-200 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-sm font-semibold text-accent whitespace-nowrap">
                            {course.code}
                          </span>
                          <span className="text-foreground font-sans font-medium truncate">
                            {course.title}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg
                          className={`w-5 h-5 text-accent transition-transform duration-200 ${
                            expandedId === course.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedId === course.id && (
                      <div className="px-6 py-4 bg-secondary/10 border-t border-border">
                        <p className="text-foreground/80 leading-relaxed font-sans">
                          {course.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {COURSES.length}
              </div>
              <p className="text-foreground/70 font-sans">Total Courses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {Object.keys(coursesByCategory).length}
              </div>
              <p className="text-foreground/70 font-sans">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                100%
              </div>
              <p className="text-foreground/70 font-sans">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
