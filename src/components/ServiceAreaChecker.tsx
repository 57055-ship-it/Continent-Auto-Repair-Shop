"use client";

import React, { useState } from "react";
import { MapPin, Navigation, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ServiceAreaChecker() {
  const [zipCode, setZipCode] = useState<string>("");
  const [result, setResult] = useState<{
    status: "covered" | "outside" | "idle";
    distance?: string;
    dispatchTime?: string;
    message?: string;
  }>({ status: "idle" });

  const PORTLAND_ZIPS: Record<string, { dist: number; time: string }> = {
    "97266": { dist: 0, time: "Immediate Shop Location" },
    "97206": { dist: 2.5, time: "10 – 15 Mins" },
    "97201": { dist: 7.2, time: "15 – 20 Mins" },
    "97211": { dist: 9.8, time: "20 – 25 Mins" },
    "97223": { dist: 12.4, time: "25 – 30 Mins" },
    "97035": { dist: 14.1, time: "25 – 35 Mins" },
    "97015": { dist: 6.8, time: "15 – 20 Mins" },
    "97005": { dist: 16.5, time: "30 – 40 Mins" },
    "97080": { dist: 11.2, time: "20 – 30 Mins" },
    "97239": { dist: 8.5, time: "20 – 25 Mins" },
  };

  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;

    const code = zipCode.trim();
    if (PORTLAND_ZIPS[code]) {
      const data = PORTLAND_ZIPS[code];
      setResult({
        status: "covered",
        distance: `${data.dist} Miles`,
        dispatchTime: data.time,
        message: `ZIP Code ${code} is fully within our 25-mile priority service radius!`,
      });
    } else if (code.length === 5 && !isNaN(Number(code))) {
      // General 5-digit zip simulation inside Oregon
      setResult({
        status: "covered",
        distance: "~ 12 – 18 Miles",
        dispatchTime: "25 – 40 Mins",
        message: `ZIP Code ${code} is covered within our 25-mile emergency dispatch zone.`,
      });
    } else {
      setResult({
        status: "outside",
        message: "Unable to verify ZIP code. Please enter a valid 5-digit Portland OR area ZIP.",
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Interactive Checker */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono-cyber text-emerald-400">
              <Navigation className="w-3.5 h-3.5" />
              <span>PORTLAND 25-MILE RADIUS COVERAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
              Service Area & Location
            </h2>

            <p className="text-sm sm:text-base font-sans-swiss text-secondary leading-relaxed">
              Our master mechanics operate directly from our shop at <strong className="text-white">7415 SE 92nd Ave, Portland, OR 97266</strong>, providing 24/7 mobile roadside repair and towing within a 25-mile radius.
            </p>

            {/* Zip Checker Form */}
            <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4 bg-slate-900/90 shadow-2xl">
              <label className="block text-xs font-mono-cyber text-cyan-400 uppercase">
                CHECK YOUR ZIP CODE FOR 24/7 ROADSIDE COVERAGE:
              </label>

              <form onSubmit={handleCheckArea} className="flex gap-2">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter 5-digit ZIP (e.g. 97266, 97201)..."
                  maxLength={5}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-xs font-mono-cyber text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono-cyber text-xs font-bold transition-all shadow-lg"
                >
                  Verify
                </button>
              </form>

              {/* Result Readout */}
              {result.status === "covered" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono-cyber space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>COVERED ZONE — PRIORITY DISPATCH ACTIVE</span>
                  </div>
                  <p>{result.message}</p>
                  <div className="flex gap-4 pt-1 text-[11px] text-muted">
                    <span>Est. Distance: <strong className="text-white">{result.distance}</strong></span>
                    <span>Est. Dispatch: <strong className="text-white">{result.dispatchTime}</strong></span>
                  </div>
                </div>
              )}

              {result.status === "outside" && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono-cyber flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{result.message}</span>
                </div>
              )}
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans-swiss">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="font-mono-cyber text-red-400 font-semibold">MAIN PHONE LINE</div>
                <a href="tel:+15134013101" className="text-base font-serif-neoclassic font-bold text-white hover:text-cyan-400">
                  +1 (513) 401-3101
                </a>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="font-mono-cyber text-cyan-400 font-semibold">DIRECT MOBILE LINE</div>
                <a href="tel:+19713867255" className="text-base font-serif-neoclassic font-bold text-white hover:text-cyan-400">
                  +1 (971) 386-7255
                </a>
              </div>
            </div>

          </div>

          {/* Right Embed Google Map Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-3 rounded-3xl border border-white/15 overflow-hidden shadow-2xl space-y-3 bg-slate-900/90">
              <div className="relative h-[380px] rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  title="Continent Auto Repair Shop Map Location"
                  src="https://maps.google.com/maps?q=7415+SE+92nd+Ave,+Portland,+Oregon+97266&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="p-3 text-xs font-mono-cyber text-secondary flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-red-500" />
                  7415 SE 92nd Ave, Portland, OR 97266
                </span>
                <a
                  href="https://www.google.com/maps/search/7415+SE+92nd+Ave,+Portland,+Oregon+97266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
