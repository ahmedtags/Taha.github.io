/**
 * About Section Component
 * Minimalist design with elegant typography and generous whitespace
 * Design: Serif heading with subtle accent line, body text in clean sans-serif
 */

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <h2 className="text-sm font-sans font-semibold text-accent uppercase tracking-widest">
              About Me
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Who I Am
          </h3>
        </div>

       {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              My name is Ahmed Hisham Taha, and I'm a Computer Science student at 
              Universiti Sains Malaysia. I'm passionate about artificial intelligence 
              and building things that solve real problems. Whether it's creating a 
              mobile fitness app, developing an e-commerce system, or experimenting 
              with computer vision, I love the challenge of turning ideas into 
              working solutions.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm the type of person who's always learning something new - one day 
              I'm coding in Python and OpenCV, the next I'm diving into WebGL for 
              3D graphics, or editing videos in After Effects. I'm hardworking and 
              quick to pick up new technologies. What drives me is the satisfaction 
              of building something that actually works and makes an impact.
            </p>
          </div>
          {/* Skills */}
          <div>
            <h4 className="text-xl font-display font-semibold text-foreground mb-6">
              Technical Skills
            </h4>
            <ul className="space-y-3">
              {[
                "Python & C++ Programming",
                "Java Development",
                "React Native & Mobile Development",
                "Computer Vision (OpenCV)",
                "Natural Language Processing",
                "Database Management & SQL",
                "WebGL & 3D Graphics",
                "Software Design & Architecture",
                "Microsoft Excel & Data Analysis",
                "Adobe After Effects",
                "UI/UX Design",
                "Teamwork & Collaboration",
                "Effective Communication",
              ].map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}