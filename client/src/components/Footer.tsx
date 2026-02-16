/**
 * Footer Component
 * Minimalist footer with contact information and social links
 * Design: Clean typography, generous spacing, subtle accent elements
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background py-16 md:py-20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-semibold mb-4">
              Let's Connect
            </h3>
            <p className="text-background/80 leading-relaxed">
              I'm always interested in hearing about new projects and
              opportunities.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-widest mb-4 text-accent">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Tahaahmd2006@Gmail.com"
                  className="text-background/80 hover:text-accent transition-colors duration-300"
                >
                  Tahaahmd2006@Gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+9710589094871"
                  className="text-background/80 hover:text-accent transition-colors duration-300"
                >
                  +971 0589094871
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-widest mb-4 text-accent">
              Follow
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/ahmad-taha-72ab333a4"
                  className="text-background/80 hover:text-accent transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ahmedtags"
                  className="text-background/80 hover:text-accent transition-colors duration-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/blx_ma/"
                  className="text-background/80 hover:text-accent transition-colors duration-300"
                >
                  Instagram 
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
        </div>
      </div>
    </footer>
  );
}
