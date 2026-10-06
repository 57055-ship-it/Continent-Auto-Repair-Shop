"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Disc, ArrowLeftRight, CheckCircle2, AlertOctagon } from "lucide-react";

export default function BeforeAfterBrakes() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 relative bg-slate-950/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono-cyber text-red-400">
            <Disc className="w-3.5 h-3.5" />
            <span>BRAKE REPRECISION COMPARISON</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
            Before & After Precision Service
          </h2>

          <p className="text-sm sm:text-base font-sans-swiss text-secondary">
            Drag the slider below to compare a heavily glazed, rusted brake rotor vs our freshly installed ceramic Brembo precision rotor assembly.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/20 select-none shadow-2xl cursor-ew-resize"
        >
          {/* AFTER Image (Background - Brand New Performance Brakes) */}
          <div className="absolute inset-0">
            <Image
              src="/images/brakes.jpg"
              alt="Brand New Precision Brembo Brake Rotor & Caliper"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-xl text-xs font-mono-cyber text-emerald-400 border border-emerald-500/40 bg-black/60">
              [ AFTER: CONTINENT CERAMIC PRECISION ]
            </div>
          </div>

          {/* BEFORE Image (Clipped Overlay - Worn Rotor Look) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full">
              {/* Filter effect to simulate worn, rusted rotor */}
              <Image
                src="/images/brakes.jpg"
                alt="Worn Glazed Brake Rotor"
                fill
                className="object-cover filter sepia brightness-50 contrast-125 saturate-200"
              />
              <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-xl text-xs font-mono-cyber text-red-400 border border-red-500/40 bg-black/60">
                [ BEFORE: WORN GLAZED ROTOR & PADS ]
              </div>
            </div>
          </div>

          {/* Divider Handle Bar */}
          <div
            className="absolute inset-y-0 w-1 bg-gradient-to-b from-red-500 via-white to-cyan-400 cursor-ew-resize shadow-2xl z-30"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center text-white shadow-xl">
              <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

        </div>

        {/* Feature comparison labels below */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans-swiss text-xs sm:text-sm">
          <div className="glass-panel p-5 rounded-2xl border border-red-500/20 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono-cyber font-bold">
              <AlertOctagon className="w-4 h-4" />
              <span>SIGNS YOU NEED IMMEDIATE BRAKE SERVICE:</span>
            </div>
            <ul className="space-y-1 text-secondary list-disc list-inside">
              <li>Squealing or high-pitched metallic grinding noise when stopping</li>
              <li>Spongy or low brake pedal feel requiring extra pressure</li>
              <li>Steering wheel vibration or pulsation during high-speed braking</li>
            </ul>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono-cyber font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>THE CONTINENT REPAIR GUARANTEE:</span>
            </div>
            <ul className="space-y-1 text-secondary list-disc list-inside">
              <li>High-durability ceramic pads for dust-free, silent performance</li>
              <li>Precision rotor resurfacing or OEM replacement</li>
              <li>12-Month / 12,000-Mile comprehensive labor & parts warranty</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
