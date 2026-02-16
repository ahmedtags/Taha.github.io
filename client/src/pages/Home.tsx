/**
 * Home Page - Portfolio Website
 * Minimalist Elegance Design System
 * Features: Hero section, About, Projects showcase, Footer
 */

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Courses />
      <Footer />
    </div>
  );
}
