import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Zap,
  Sparkles,
  ChevronDown,
  Lock,
  Unlock,
  RotateCcw,
} from "lucide-react";

interface StudentIDCardPullProps {
  name?: string;
  title?: string;
  studentId?: string;
  department?: string;
  avatarUrl?: string;
  isUnlocked?: boolean;
  onUnlock?: () => void;
  onLock?: () => void;
}

export default function StudentIDCardPull({
  name = "Ahmed H. Taha",
  title = "AI & CS Student",
  studentId = "ID-2026-USM",
  department = "Computer Science & AI",
  avatarUrl = "/ahmed_pfp.jpg",
  isUnlocked = false,
  onUnlock,
  onLock,
}: StudentIDCardPullProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Direct 2D Motion values for X & Y axis drag (0ms lag direct hardware tracking)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Calculate pull progress percentage (0 to 1) based on downward threshold (135px)
  const pullProgress = useTransform(dragY, [0, 135], [0, 1]);

  // Warm Amber Glow reacting to total displacement
  const tensionGlow = useTransform(
    dragY,
    [0, 70, 135],
    ["rgba(217, 119, 6, 0.15)", "rgba(245, 158, 11, 0.45)", "rgba(234, 179, 8, 0.85)"]
  );

  // Dynamic 3D Card Rotation based on lateral X motion (pendulum tilt)
  const cardRotateZ = useTransform(dragX, [-200, 0, 200], [-18, 0, 18]);

  // Base resting distance from top anchor to card clip hole (hanging lower down at 165px)
  const BASE_Y = 165;

  // Exact 1:1 Pixel Bezier Paths connecting Top Anchor (0, 12) directly to Card Hole (dragX, dragY + BASE_Y)
  const leftStrandPath = useTransform([dragX, dragY], ([x, y]: any[]) => {
    const startX = -8;
    const startY = 12;
    const endX = x - 6;
    const endY = y + BASE_Y;

    // Bezier control point introducing natural rope sag/curvature
    const ctrlX = x * 0.45;
    const ctrlY = (y + BASE_Y) * 0.5 + Math.abs(x) * 0.08;

    return `M ${startX} ${startY} Q ${ctrlX - 6} ${ctrlY}, ${endX} ${endY}`;
  });

  const rightStrandPath = useTransform([dragX, dragY], ([x, y]: any[]) => {
    const startX = 8;
    const startY = 12;
    const endX = x + 6;
    const endY = y + BASE_Y;

    // Bezier control point introducing natural rope sag/curvature
    const ctrlX = x * 0.45;
    const ctrlY = (y + BASE_Y) * 0.5 + Math.abs(x) * 0.08;

    return `M ${startX} ${startY} Q ${ctrlX + 6} ${ctrlY}, ${endX} ${endY}`;
  });

  // Clasp position tied exactly to Card Hole top
  const claspTransformX = useTransform(dragX, (x) => x - 8);
  const claspTransformY = useTransform(dragY, (y) => y + BASE_Y - 6);

  const PULL_THRESHOLD = 135;

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    if (info.offset.y >= PULL_THRESHOLD || dragY.get() >= PULL_THRESHOLD) {
      // Trigger laser scan animation
      setIsScanning(true);
      
      setTimeout(() => {
        setIsScanning(false);
        if (onUnlock) onUnlock();
      }, 550);
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* LOCKED / PRE-PULL STATE: CENTERED HANGING BADGE & LANYARD ROPE */}
      {/* ------------------------------------------------------------- */}
      {!isUnlocked && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-auto select-none">
          {/* Top Metallic Anchor Bar Attached to Top Viewport */}
          <div className="relative z-30 flex flex-col items-center">
            <div className="w-28 h-3 bg-gradient-to-r from-stone-800 via-amber-200/40 to-stone-800 rounded-b-lg shadow-lg border-x border-b border-amber-500/30" />
            <div className="w-7 h-7 border-2 border-amber-300/80 rounded-full bg-gradient-to-b from-stone-300 via-stone-600 to-stone-900 -mt-1.5 shadow-inner flex items-center justify-center">
              <div className="w-3 h-3 bg-stone-950 rounded-full border border-amber-500/50" />
            </div>
          </div>

          {/* 1:1 Pixel Synchronized SVG Lanyard Rope Layer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 overflow-visible z-20 pointer-events-none">
            <svg className="overflow-visible" width="1" height="1">
              <defs>
                <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1c1917" />
                  <stop offset="50%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#1c1917" />
                </linearGradient>
                <linearGradient id="lanyardHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Left Strap Strand - Directly Anchored to Card Clip Hole */}
              <motion.path
                d={leftStrandPath}
                fill="none"
                stroke="url(#lanyardGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <motion.path
                d={leftStrandPath}
                fill="none"
                stroke="url(#lanyardHighlight)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Right Strap Strand - Directly Anchored to Card Clip Hole */}
              <motion.path
                d={rightStrandPath}
                fill="none"
                stroke="url(#lanyardGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <motion.path
                d={rightStrandPath}
                fill="none"
                stroke="url(#lanyardHighlight)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Metal Clasp Moving 1:1 with Card Clip Hole */}
              <motion.g style={{ x: claspTransformX, y: claspTransformY }}>
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="10"
                  rx="2"
                  fill="url(#lanyardGrad)"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
              </motion.g>
            </svg>
          </div>

          {/* 2D Draggable Physical Student ID Card (With Idle Pendulum Sway Onboarding Cue) */}
          <motion.div
            drag={true}
            dragConstraints={{ left: -320, right: 320, top: -40, bottom: 260 }}
            dragElastic={0.15}
            dragSnapToOrigin={true}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 35 }}
            style={{
              x: dragX,
              y: dragY,
              rotate: cardRotateZ,
              marginTop: `${BASE_Y}px`,
              willChange: "transform",
            }}
            animate={
              !isDragging && !isScanning
                ? {
                    x: [-14, 14, -14],
                  }
                : {}
            }
            transition={
              !isDragging
                ? {
                    x: { repeat: Infinity, duration: 4.0, ease: "easeInOut" },
                  }
                : undefined
            }
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, cursor: "grabbing" }}
            className="relative z-30 cursor-grab touch-none"
          >
            {/* Glowing Warm Gold Tension Field on Drag */}
            <motion.div
              className="absolute -inset-3 rounded-3xl blur-xl transition-all duration-150 pointer-events-none"
              style={{
                background: tensionGlow,
                opacity: isDragging ? 1 : 0.35,
              }}
            />

            {/* Rigid Card Frame Container (Fixed 288px x 410px) */}
            <div className="relative w-[288px] h-[410px] rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-500/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(217,119,6,0.2)] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              
              {/* Metallic Badge Clip Hole at top of Card */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 rounded-full bg-stone-950 border border-stone-700 flex items-center justify-center shadow-inner">
                <div className="w-5 h-1.5 rounded-full bg-stone-800 border border-amber-600/50" />
              </div>

              {/* Warm Gold Laser Scanning Beam Sweep Effect */}
              {isScanning && (
                <motion.div
                  initial={{ y: -50, opacity: 1 }}
                  animate={{ y: 420, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-10 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-95 blur-xs shadow-[0_0_35px_#f59e0b] z-50 pointer-events-none"
                />
              )}

              {/* Card Header & Smart Chip */}
              <div className="mt-3 flex items-center justify-between border-b border-stone-800 pb-3">
                {/* Gold Smart Chip Graphic */}
                <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/80 p-0.5 shadow flex flex-col justify-between">
                  <div className="w-full h-px bg-amber-950/60" />
                  <div className="w-full h-2 border-y border-amber-950/60 flex">
                    <div className="w-1/2 border-r border-amber-950/60" />
                  </div>
                  <div className="w-full h-px bg-amber-950/60" />
                </div>

                {/* Institution Tag & Contactless Icon */}
                <div className="flex items-center space-x-2 text-stone-400">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 font-semibold uppercase">ACADEMIC ID</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Photo & Student Details */}
              <div className="flex flex-col items-center text-center my-auto space-y-3">
                {/* Hologram Avatar Frame */}
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 opacity-80 blur-xs animate-pulse" />
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400 bg-stone-900 shadow-inner">
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Hologram Overlay grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b15_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b15_1px,transparent_1px)] bg-[size:6px_6px]" />
                  </div>
                  {/* Status Indicator Dot */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-stone-950 bg-amber-500 flex items-center justify-center shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white font-mono flex items-center justify-center gap-1.5">
                    {name}
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-xs font-semibold text-amber-400 tracking-wide font-sans mt-0.5">{title}</p>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">{department}</p>
                </div>
              </div>

              {/* Card Footer: Barcode & Pull Progress */}
              <div className="pt-3 border-t border-stone-800 flex flex-col items-center space-y-2">
                {/* Simulated Barcode */}
                <div className="w-full h-8 bg-stone-950 rounded px-3 py-1 flex items-center justify-between border border-stone-800">
                  <div className="h-full flex items-center space-x-0.5 opacity-85">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3].map((width, idx) => (
                      <div
                        key={idx}
                        className="h-full bg-stone-300"
                        style={{ width: `${width * 0.8 + 1}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 font-bold tracking-tight">{studentId}</span>
                </div>

                {/* Pull Hint / Drag Progress */}
                <div className="w-full flex flex-col items-center space-y-1">
                  <div className="flex items-center text-[10px] text-stone-300 font-mono space-x-1">
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    <span>{isDragging ? "Move & Pull down to scan..." : "MOVE OR PULL BADGE TO UNLOCK"}</span>
                  </div>

                  {/* Warm Gold Progress Line */}
                  <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
                      style={{ scaleX: pullProgress, transformOrigin: "left" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* UNLOCKED STATE: DOCKED CARD AT TOP-RIGHT CORNER WITH ELASTIC SPRING */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{
              x: 0,
              y: 100,
              scale: 0.95,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 0.65,
              opacity: 1,
            }}
            exit={{
              x: 0,
              y: 100,
              scale: 0.95,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
              mass: 0.8,
            }}
            className="fixed top-4 right-4 md:top-6 md:right-8 z-50 origin-top-right cursor-pointer group"
            onClick={onLock}
            whileHover={{ scale: 0.68 }}
            whileTap={{ scale: 0.63 }}
          >
            {/* Ambient Pulsing Gold Glow behind Docked Card */}
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/20 blur-xl group-hover:bg-amber-500/35 transition-all duration-300" />

            {/* Docked Card Badge Container */}
            <div className="relative w-[288px] h-[410px] rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-400/60 p-5 shadow-[0_15px_40px_rgba(217,119,6,0.3)] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              
              {/* Top Clip Indicator Ring */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-amber-400/30 border border-amber-400 flex items-center justify-center">
                <div className="w-5 h-1 rounded-full bg-amber-300" />
              </div>

              {/* Header */}
              <div className="mt-3 flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="w-9 h-6 rounded bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-300 p-0.5 flex flex-col justify-between">
                  <div className="w-full h-px bg-amber-950" />
                  <div className="w-full h-1.5 border-y border-amber-950 flex" />
                </div>
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono tracking-widest font-bold">UNLOCKED</span>
                </div>
              </div>

              {/* Avatar & Info */}
              <div className="flex flex-col items-center text-center my-auto space-y-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-950" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-mono">{name}</h4>
                  <p className="text-xs text-amber-400 font-sans">{title}</p>
                </div>
              </div>

              {/* Click to Re-lock Prompt Banner */}
              <div className="pt-2 border-t border-stone-800 flex items-center justify-center space-x-1.5 text-[10px] font-mono text-amber-400 group-hover:text-amber-300">
                <RotateCcw className="w-3 h-3 animate-spin-slow" />
                <span>CLICK DOCKED BADGE TO RE-LOCK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
