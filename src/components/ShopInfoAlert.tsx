"use client";

import React from "react";
import { Info, MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink, AlertTriangle } from "lucide-react";

export default function ShopInfoAlert() {
  return (
    <section className="py-8 bg-slate-950/60 border-y border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verification Banner */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-amber-400 font-mono-cyber text-xs uppercase font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>VERIFIED BUSINESS DETAILS & CONTACT CARD</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif-neoclassic font-bold text-primary">
                Continent Auto Repair Shop — Official Operations Hub
              </h2>

              <p className="text-xs sm:text-sm text-secondary font-sans-swiss leading-relaxed">
                Directly managed by owner <strong className="text-primary font-semibold">Paulin Charly Poumeni</strong>. We operate 24 hours a day, 7 days a week, providing full shop repairs and emergency roadside response within a 25-mile radius of Portland, OR.
              </p>
            </div>

            {/* Direct Dial Badge Buttons */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <a
                href="tel:+15134013101"
                className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-400/50 text-xs font-mono-cyber text-cyan-300 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Main: (513) 401-3101</span>
              </a>

              <a
                href="tel:+19713867255"
                className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 hover:border-red-400/50 text-xs font-mono-cyber text-red-300 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Direct: (971) 386-7255</span>
              </a>
            </div>

          </div>

          {/* Quick verification details bar */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans-swiss text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <a
                href="https://www.google.com/maps/search/7415+SE+92nd+Ave,+Portland,+Oregon+97266"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 underline underline-offset-2 flex items-center gap-1"
              >
                <span>7415 SE 92nd Ave, Portland 97266</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Hours: 24/7 — Monday to Sunday</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a
                href="mailto:Poumenicharly86@gmail.com"
                className="hover:text-cyan-300 underline underline-offset-2"
              >
                Poumenicharly86@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Service Area: 25-Mile Radius</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
