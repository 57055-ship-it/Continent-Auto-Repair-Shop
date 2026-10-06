"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Cpu, Clock, MapPin, ArrowRight, Activity, Wrench } from "lucide-react";
import { playSound } from "@/utils/sound";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  audioEnabled: boolean;
}

export default function Hero({ onOpenBooking, onOpenEmergency, audioEnabled }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden swiss-grid-lines">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top cyber tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-cyber text-red-400 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 beacon-dot" />
              <span>PORTLAND, OR · 24/7 MASTER MECHANIC SHOP</span>
            </div>

            {/* Main Title - Neoclassical + Swiss typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-neoclassic font-extrabold tracking-tight text-primary leading-[1.1]">
              Precision Engineering. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400">
                Cyber-Grade Diagnostics.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg font-sans-swiss text-secondary max-w-2xl leading-relaxed">
              Continent Auto Repair Shop provides 24/7 master mechanic repairs, advanced computer OBD diagnostics, brake system overhauls, and rapid emergency dispatch within a 25-mile radius of Portland, Oregon.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  if (audioEnabled) playSound("rev");
                  onOpenBooking();
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-sans-swiss text-sm font-semibold tracking-wide shadow-xl shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
              >
                <span>Book Service Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#obd-scanner"
                onClick={() => {
                  if (audioEnabled) playSound("click");
                }}
                className="px-6 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/40 text-primary font-mono-cyber text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-all"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Run OBD Diagnostic Scanner</span>
              </a>
            </div>

            {/* Key Bento Metric Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                <div className="text-xs font-mono-cyber text-secondary flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>AVAILABILITY</span>
                </div>
                <div className="text-lg font-serif-neoclassic font-bold text-primary">24/7 All Days</div>
                <div className="text-[10px] text-muted font-sans-swiss">Mon - Sun Continuous</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                <div className="text-xs font-mono-cyber text-secondary flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>COVERAGE</span>
                </div>
                <div className="text-lg font-serif-neoclassic font-bold text-primary">25-Mile Radius</div>
                <div className="text-[10px] text-muted font-sans-swiss">Greater Portland Area</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                <div className="text-xs font-mono-cyber text-secondary flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DIAGNOSTIC</span>
                </div>
                <div className="text-lg font-serif-neoclassic font-bold text-primary">Master Tech</div>
                <div className="text-[10px] text-muted font-sans-swiss">ASE Computer Scan</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card with Reeded Glass & Telemetry HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl p-2 group">
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-10 animate-scanline pointer-events-none z-20" />

              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src="/images/hero.jpg"
                  alt="Continent Auto Repair Shop Diagnostic Bay"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Cyber Telemetry Overlay Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono-cyber text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    SYSTEM TELEMETRY: ACTIVE
                  </span>
                  <span className="text-muted">7415 SE 92ND AVE</span>
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl reeded-glass border border-white/20 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-600/30 border border-red-500/40 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-mono-cyber text-xs font-semibold text-white">
                        Paulin Charly Poumeni
                      </div>
                      <div className="text-[10px] text-gray-300 font-sans-swiss">
                        Owner & Master Mechanic
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={onOpenEmergency}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono-cyber text-[11px] font-bold shadow-md transition-colors"
                  >
                    24/7 CALL
                  </button>
                </div>

              </div>
            </div>

            {/* Neoclassical Index Tag */}
            <div className="mt-3 text-right font-mono-cyber text-xs text-muted">
              [ REF: SYSTEM_BOOT_PORTLAND // 2026 ]
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
