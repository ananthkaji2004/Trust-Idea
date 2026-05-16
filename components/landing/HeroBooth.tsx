"use client";

import { type CSSProperties } from "react";

type HeroBoothProps = {
  style?: CSSProperties;
  className?: string;
};

export function HeroBooth({ style, className = "" }: HeroBoothProps) {
  return (
    <div className={`relative w-full max-w-md mx-auto animate-float preserve-3d ${className}`}>
      <div className="preserve-3d" style={style}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[110%] h-[110%] rounded-full border border-violet-500/30 animate-glow-pulse" />
          <div
            className="absolute w-[95%] h-[95%] rounded-full border border-blue-500/20 animate-glow-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div className="absolute w-[80%] h-[80%] rounded-full border border-violet-400/15" />
        </div>

        <div className="perspective-hero relative h-[320px] sm:h-[380px] md:h-[420px] preserve-3d">
          <div
            className="absolute inset-0 flex items-center justify-center preserve-3d"
            style={{ transform: "rotateX(8deg) rotateY(-12deg)" }}
          >
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-violet-900/40 to-transparent border border-violet-500/20 rounded-lg"
              style={{ transform: "rotateX(75deg) translateZ(-20px)" }}
            />

            <div
              className="absolute w-56 h-48 sm:w-64 sm:h-52 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black border border-white/10 shadow-[inset_0_0_60px_rgba(168,85,247,0.15)]"
              style={{ transform: "translateZ(-40px)" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-violet-400/80 mb-2">
                  Brand Booth
                </p>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight neon-text text-center">
                  TRUST IDEA
                </h3>
                <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
              </div>
            </div>

            <div
              className="absolute left-4 sm:left-8 w-8 h-40 bg-gradient-to-r from-violet-600/30 to-transparent border-l border-violet-500/30 rounded-l-lg"
              style={{ transform: "rotateY(45deg) translateZ(20px)" }}
            />

            <div
              className="absolute right-4 sm:right-8 w-8 h-40 bg-gradient-to-l from-blue-600/30 to-transparent border-r border-blue-500/30 rounded-r-lg"
              style={{ transform: "rotateY(-45deg) translateZ(20px)" }}
            />

            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              style={{ transform: "translateZ(30px)" }}
            />

            <div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-20 rounded-lg bg-gradient-to-br from-violet-500/40 to-blue-600/40 border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-white/20 to-white/5 border border-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
