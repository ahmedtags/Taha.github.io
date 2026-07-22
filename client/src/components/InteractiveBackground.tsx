/**
 * Global Interactive Background Component
 * Provides a unified particle network constellation and smooth mouse spotlight
 * tracking that spans across all sections of the landing page.
 */

import { useEffect, useRef } from "react";

function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic particle count based on screen size (denser but still highly performant)
    const particleCount = Math.min(90, Math.floor((width * height) / 18000));
    const connectionDistance = 140;
    const mouseInfluenceDistance = 210;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
    }

    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // Slow gentle drift
        vy: (Math.random() - 0.5) * 0.4,
        radius: radius,
        baseRadius: radius,
      });
    }

    const mouse = {
      x: null as number | null,
      y: null as number | null,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Ensure particles stay within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Mouse interaction (uses client coordinates relative to viewport)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseInfluenceDistance) {
            // Gentle pull towards mouse
            const force = (mouseInfluenceDistance - dist) / mouseInfluenceDistance;
            p.x += (dx / dist) * force * 0.7;
            p.y += (dy / dist) * force * 0.7;
            p.radius = p.baseRadius + force * 2.0; // Grow slightly when near mouse
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217, 163, 74, 0.65)"; // Soft gold
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217, 163, 74, ${alpha})`; // Soft gold connection lines
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseInfluenceDistance) {
            const alpha = (1 - dist / mouseInfluenceDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(217, 163, 74, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none w-full h-full z-[1]" />;
}

export default function InteractiveBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        // Spotlight follows viewport coordinates
        const x = e.clientX - 250;
        const y = e.clientY - 250;
        spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none w-full h-full z-0">
      {/* Static subtle background gradient */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          background: "linear-gradient(135deg, oklch(0.98 0.001 70), oklch(0.97 0.005 65))",
        }}
      />

      {/* Grid overlay for texture */}
      <div
        className="fixed inset-0 opacity-100 z-[-1]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.25 0.01 65 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.25 0.01 65 / 4%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spotlight cursor glow */}
      <div
        ref={spotlightRef}
        className="fixed rounded-full pointer-events-none opacity-60 transition-transform duration-100 ease-out z-[0]"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, oklch(0.85 0.15 40 / 12%), transparent 70%)",
          left: 0,
          top: 0,
          transform: "translate3d(-1000px, -1000px, 0)",
        }}
      />

      {/* Dynamic Particle Network */}
      <InteractiveParticles />
    </div>
  );
}
