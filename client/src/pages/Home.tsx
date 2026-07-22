/**
 * Home Page - Portfolio Website
 * Features: Student ID Card Pull Lock/Unlock & Docking Entrance Animation with Reflowing Hero Content
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import StudentIDCardPull from "@/components/StudentIDCardPull";
import { Sparkles, Lock } from "lucide-react";

export default function Home() {
  // Persist unlock status in sessionStorage so navigating to project details and returning keeps portfolio unlocked
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("portfolio_unlocked") === "true";
  });

  const handleUnlock = () => {
    sessionStorage.setItem("portfolio_unlocked", "true");
    setIsUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem("portfolio_unlocked");
    setIsUnlocked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Prevent scrolling when portfolio is locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUnlocked]);

  return (
    <div className="min-h-screen relative overflow-x-hidden text-foreground">
      {/* 3D Dynamic Interactive Canvas Background */}
      <InteractiveBackground />

      {/* Persistent Student ID Card Badge (Hangs centered when locked, docks top-right when unlocked) */}
      <StudentIDCardPull
        isUnlocked={isUnlocked}
        onUnlock={handleUnlock}
        onLock={handleLock}
      />

      {/* ------------------------------------------------------------- */}
      {/* LOCKED STATE SCREEN OVERLAY (Warm Dark Glass Curtain) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center p-6 bg-stone-950/90 backdrop-blur-xl pointer-events-none select-none"
          >
            {/* Ambient Warm Gold Target Reticle Grid Behind Hanging Badge */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b12_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Glowing Warm Gold Target Ring Framing Card */}
            <div className="relative w-80 h-[480px] rounded-3xl border border-amber-500/30 flex items-center justify-center mt-[115px]">
              <div className="absolute -inset-4 rounded-3xl border border-amber-500/15 animate-ping opacity-30 pointer-events-none" />
              
              {/* Corner Warm Gold Target Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400/80" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400/80" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400/80" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400/80" />
            </div>

            {/* Locked Screen Title & Instructions */}
            <div className="mt-8 text-center space-y-3 max-w-md relative z-10">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Lock className="w-3.5 h-3.5 animate-pulse" />
                <span>ACCESS RESTRICTED • SECURITY SCAN REQUIRED</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                AHMED HISHAM TAHA
              </h1>
              <p className="text-sm font-mono text-stone-400">
                AI & Computer Science Student • Portfolio Portal
              </p>

              <div className="pt-4 flex items-center justify-center space-x-2 text-xs font-mono text-amber-400 font-medium animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>PULL DOWN THE ID CARD BADGE ABOVE TO UNLOCK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* UNLOCKED MAIN PORTFOLIO CONTENT (Reflows & Slides In as Card Docks) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(16px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10"
          >
            {/* Header Navbar */}
            <Header />

            {/* Main Sections */}
            <main>
              <Hero />
              <About />
              <Projects />
              <Courses />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
