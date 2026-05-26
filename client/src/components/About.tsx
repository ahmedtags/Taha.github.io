/**
 * About Section Component
 * Premium dark design with scroll-triggered animations,
 * animated skill bars with percentage fills, and glassmorphism cards.
 */

import { useScrollAnimation } from "@/hooks/useAnimations";

const SKILL_CATEGORIES = [
  {
    title: "Languages & Frameworks",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: "Python", level: 90 },
      { name: "C++", level: 85 },
      { name: "Java", level: 80 },
      { name: "JavaScript / React", level: 75 },
    ],
  },
  {
    title: "AI & Computer Vision",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
    skills: [
      { name: "OpenCV", level: 85 },
      { name: "Machine Learning", level: 80 },
      { name: "NLP", level: 70 },
      { name: "Data Analytics", level: 75 },
    ],
  },
  {
    title: "Design & Creative",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    skills: [
      { name: "After Effects", level: 85 },
      { name: "UI/UX Design", level: 75 },
      { name: "WebGL / 3D Graphics", level: 70 },
      { name: "Video Editing", level: 80 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-sans text-foreground/80">{name}</span>
        <span
          className="text-xs font-mono text-accent transition-opacity duration-500"
          style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${delay + 600}ms` }}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-foreground/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: "linear-gradient(90deg, oklch(0.85 0.15 40), oklch(0.75 0.12 40))",
          }}
        />
      </div>
    </div>
  );
}

/** Extracted component so useScrollAnimation is called at the component level, not inside a loop */
function SkillCategoryCard({
  category,
  catIndex,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  catIndex: number;
}) {
  const card = useScrollAnimation(0.2);

  return (
    <div
      ref={card.ref}
      className="glass-card gradient-border rounded-xl p-6 md:p-8"
      style={{
        opacity: card.isVisible ? 1 : 0,
        transform: card.isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${catIndex * 150}ms`,
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-accent"
          style={{ background: "oklch(0.85 0.15 40 / 10%)" }}
        >
          {category.icon}
        </div>
        <h4 className="text-base font-sans font-semibold text-foreground">
          {category.title}
        </h4>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={catIndex * 150 + skillIndex * 100}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const header = useScrollAnimation();
  const bio = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-36 bg-transparent relative">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.15 40 / 5%), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container max-w-6xl relative z-10">
        {/* Section Header */}
        <div ref={header.ref} className={`mb-16 transition-all duration-700 ${header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-px flex-shrink-0 transition-all duration-700"
              style={{
                width: header.isVisible ? "48px" : "0px",
                background: "linear-gradient(90deg, oklch(0.85 0.15 40), transparent)",
              }}
            />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em]">
              About Me
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Who I Am
          </h3>
        </div>

        {/* Bio */}
        <div ref={bio.ref} className={`grid md:grid-cols-5 gap-12 mb-20 transition-all duration-700 delay-200 ${bio.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="md:col-span-3 space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed font-sans font-light">
              My name is Ahmed Hisham Taha, and I'm a Computer Science student at
              Universiti Sains Malaysia. I'm passionate about artificial intelligence
              and building things that solve real problems. Whether it's creating a
              mobile fitness app, developing an e-commerce system, or experimenting
              with computer vision, I love the challenge of turning ideas into
              working solutions.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed font-sans font-light">
              I'm the type of person who's always learning something new – one day
              I'm coding in Python and OpenCV, the next I'm diving into WebGL for
              3D graphics, or editing videos in After Effects. I'm hardworking and
              quick to pick up new technologies. What drives me is the satisfaction
              of building something that actually works and makes an impact.
            </p>
          </div>

          {/* Quick stats */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { label: "University", value: "USM" },
              { label: "Major", value: "Computer Science" },
              { label: "Focus", value: "Artificial Intelligence" },
              { label: "Location", value: "Malaysia" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-lg p-4 flex items-center gap-4"
                style={{
                  opacity: bio.isVisible ? 1 : 0,
                  transform: bio.isVisible ? "translateX(0)" : "translateX(20px)",
                  transition: `all 0.5s ease ${i * 100 + 300}ms`,
                }}
              >
                <span className="text-xs font-sans font-medium text-accent/60 uppercase tracking-widest w-20 flex-shrink-0">
                  {stat.label}
                </span>
                <span className="text-sm font-sans font-medium text-foreground">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <SkillCategoryCard key={category.title} category={category} catIndex={catIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}