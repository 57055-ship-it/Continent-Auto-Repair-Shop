"use client";

import React, { useState } from "react";
import { X, PhoneCall, AlertTriangle, Navigation, MapPin, CheckCircle2 } from "lucide-react";
import { playSound } from "@/utils/sound";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioEnabled: boolean;
}

export default function EmergencyModal({ isOpen, onClose, audioEnabled }: EmergencyModalProps) {
  const [gpsLocated, setGpsLocated] = useState(false);

  if (!isOpen) return null;

  const handleSimulateGPS = () => {
    if (audioEnabled) playSound("beep");
    setGpsLocated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-red-500/50 overflow-hidden bg-slate-950 shadow-2xl space-y-6 p-6 sm:p-8">
        
        {/* Top Header Alert */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/30 border border-red-500/60 text-red-500 flex items-center justify-center animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-cyber text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 beacon-dot" />
                24/7 ROADSIDE EMERGENCY DISPATCH
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-neoclassic font-bold text-white">
                Stranded or Need Towing?
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm font-sans-swiss text-secondary leading-relaxed">
          Continent Auto Repair Shop provides immediate emergency dispatch for flat tires, dead batteries, overheating engines, and roadside breakdowns within a <strong className="text-white">25-mile radius</strong> of Portland, OR.
        </p>

        {/* Direct Call Dials - High Contrast Buttons */}
        <div className="space-y-3">
          <a
            href="tel:+15134013101"
            onClick={() => audioEnabled && playSound("rev")}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono-cyber text-sm font-extrabold flex items-center justify-between shadow-xl shadow-red-600/40 transition-all"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>CALL MAIN HOTLINE: (513) 401-3101</span>
            </span>
            <span className="text-xs font-normal opacity-90">24/7 OPEN</span>
          </a>

          <a
            href="tel:+19713867255"
            onClick={() => audioEnabled && playSound("rev")}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono-cyber text-sm font-bold flex items-center justify-between transition-all"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-cyan-400" />
              <span>CALL DIRECT MOBILE: (971) 386-7255</span>
            </span>
            <span className="text-xs font-normal text-muted">PORTLAND DIRECT</span>
          </a>
        </div>

        {/* GPS Location Simulation */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3 font-mono-cyber text-xs">
          <div className="flex items-center justify-between text-muted text-[11px]">
            <span>ROADSIDE GEOLOCATION DISPATCH</span>
            <span>7415 SE 92ND AVE HUB</span>
          </div>

          {!gpsLocated ? (
            <button
              onClick={handleSimulateGPS}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-secondary hover:text-white text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Transmit GPS Location for Rapid Towing</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>GPS Coordinates Acquired: Portland Metro Area. Call Hotline above to dispatch unit!</span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-center font-mono-cyber text-muted">
          Shop Location: 7415 SE 92nd Ave, Portland, OR 97266 · Owner: Paulin Charly Poumeni
        </div>

      </div>
    </div>
  );
}
