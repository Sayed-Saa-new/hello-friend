"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { POEM_ASCII_ART } from "./ascii-art";

export function AsciiPortraitCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Cursor-tracked spotlight
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Tilt values (springy)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  // Spotlight position as %
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-[max(2rem,calc(50vh-231px))]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative w-full overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/60 p-4 shadow-[0_30px_80px_-40px_rgba(80,50,20,0.35)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_40px_120px_-40px_rgba(120,70,30,0.45)]"
      >
        {/* Animated conic border glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(255,190,120,0.35), rgba(255,220,180,0), rgba(220,180,255,0.3), rgba(255,190,120,0.35))",
            filter: "blur(14px)",
            animation: "spin 14s linear infinite",
          }}
        />

        {/* Cursor spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(280px circle at ${x} ${y}, rgba(255,210,160,0.35), transparent 60%)`
            ),
          }}
        />

        {/* Inner ASCII surface */}
        <div className="relative overflow-hidden rounded-2xl bg-[#fdfaf5]">
          {/* soft top glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(400px 200px at 50% 0%, rgba(255,220,180,0.25), transparent 60%)",
            }}
          />

          {/* Shimmer sweep on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-[1400ms] ease-out group-hover:translate-x-full group-hover:opacity-100"
          />

          <motion.pre
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            className="relative m-0 overflow-hidden whitespace-pre p-3 font-mono text-[3.2px] leading-[3.4px] text-neutral-800 md:text-[3.6px] md:leading-[3.8px] lg:text-[3.25px] lg:leading-[3.45px] xl:text-[3.6px] xl:leading-[3.8px]"
            style={{ letterSpacing: 0, transform: "translateZ(30px)" }}
          >
            {POEM_ASCII_ART}
          </motion.pre>

          {/* vignette overlay for mood */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 50%, rgba(60, 40, 20, 0.15) 100%)",
            }}
          />

          {/* corner ornaments */}
          <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-neutral-400/50" />
          <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-neutral-400/50" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-neutral-400/50" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-neutral-400/50" />
        </div>

        <figcaption
          className="mt-4 flex items-center justify-between px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
            </span>
            Portrait · ASCII
          </span>
          <span className="italic">— of a memory</span>
        </figcaption>
      </motion.div>
    </motion.div>
  );
}
