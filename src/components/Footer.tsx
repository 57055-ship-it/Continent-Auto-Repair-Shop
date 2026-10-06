"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Owner */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center border border-red-500/30">
                  <span className="font-mono-cyber font-bold text-red-500 text-base">C</span>
                  <span className="font-mono-cyber font-bold text-cyan-400 text-xs">A</span>
                </div>
              </div>
              <span className="font-serif-neoclassic font-extrabold text-xl text-primary tracking-tight">
                CONTINENT AUTO REPAIR SHOP
              </span>
            </div>

            <p className="text-xs font-sans-swiss text-secondary leading-relaxed max-w-sm">
              Portland&apos;s leading 24/7 master mechanic facility. Delivering cyber-grade OBD-II computer diagnostics, engine rebuilds, precision brake service, and rapid emergency roadside dispatch within 25 miles.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono-cyber text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Owner & Operator: Paulin Charly Poumeni</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links */}
          <div className="space-y-3 font-sans-swiss text-xs">
            <div className="font-mono-cyber text-red-500 uppercase tracking-widest text-[11px] font-bold">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-secondary">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Repairs</a>
              </li>
              <li>
                <a href="#obd-scanner" className="hover:text-cyan-400 transition-colors">OBD-II Cyber Scanner</a>
              </li>
              <li>
                <a href="#3d-viewer" className="hover:text-white transition-colors">3D Engine Telemetry</a>
              </li>
              <li>
                <a href="#quote-estimator" className="hover:text-white transition-colors">Instant Fee Estimator</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Media Gallery</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Operations */}
          <div className="space-y-3 font-sans-swiss text-xs">
            <div className="font-mono-cyber text-cyan-400 uppercase tracking-widest text-[11px] font-bold">
              HOURS & RADIUS
            </div>
            <ul className="space-y-2 text-secondary">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Working Hours: 24/7</span>
              </li>
              <li className="text-[11px] text-muted pl-5">Monday to Sunday Continuous</li>
              <li className="flex items-center gap-2 pt-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Service Radius: 25 Miles</span>
              </li>
              <li className="text-[11px] text-muted pl-5">Portland & Metro Area</li>
            </ul>
          </div>

          {/* Col 4: Verified Contact */}
          <div className="space-y-3 font-sans-swiss text-xs">
            <div className="font-mono-cyber text-amber-400 uppercase tracking-widest text-[11px] font-bold">
              DIRECT CONTACT
            </div>
            <div className="space-y-2 font-mono-cyber">
              <a href="tel:+15134013101" className="block text-white hover:text-cyan-400">
                Main: (513) 401-3101
              </a>
              <a href="tel:+19713867255" className="block text-white hover:text-cyan-400">
                Direct: (971) 386-7255
              </a>
              <a href="mailto:Poumenicharly86@gmail.com" className="block text-secondary hover:text-cyan-400 truncate">
                Poumenicharly86@gmail.com
              </a>
              <a
                href="https://www.google.com/maps/search/7415+SE+92nd+Ave,+Portland,+Oregon+97266"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-red-400 hover:underline text-[11px] pt-1"
              >
                <span>7415 SE 92nd Ave, OR 97266</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-cyber text-muted gap-4">
          <div>
            © {new Date().getFullYear()} Continent Auto Repair Shop. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Swiss & Neoclassical Precision</span>
            <span>·</span>
            <span>Portland, OR</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
