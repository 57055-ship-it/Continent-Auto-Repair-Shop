"use client";

import React, { useState } from "react";
import { Star, ChevronDown, MessageSquare, HelpCircle, ShieldCheck } from "lucide-react";

export default function ReviewsAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const reviews = [
    {
      name: "Marcus Vance",
      car: "2021 BMW M4 Competition",
      rating: 5,
      date: "2 weeks ago",
      text: "Paulin diagnosed a complex cylinder misfire (Code P0300) in under 45 minutes using their advanced computer telemetry. Flawless work, quick turn-around, and fair pricing!",
    },
    {
      name: "Elena Rostova",
      car: "2019 Audi Q7",
      rating: 5,
      date: "1 month ago",
      text: "Stranded on I-205 at 2:30 AM with a dead alternator. Called Continent Auto Repair Shop and Paulin dispatched emergency roadside help in under 25 minutes. 24/7 lifesaver!",
    },
    {
      name: "David Sterling",
      car: "2018 Ford F-150 SuperCrew",
      rating: 5,
      date: "3 weeks ago",
      text: "Full brake pad and ceramic rotor replacement on my work truck. Smooth, silent stopping power. The best mechanic in Southeast Portland.",
    },
  ];

  const faqs = [
    {
      q: "Are you open 24 hours a day, 7 days a week?",
      a: "Yes. Continent Auto Repair Shop operates 24/7, Monday through Sunday. Whether you need late-night emergency repairs or weekend diagnostics, our master mechanics are on call.",
    },
    {
      q: "Where is Continent Auto Repair Shop located in Portland?",
      a: "We are conveniently located at 7415 SE 92nd Ave, Portland, Oregon 97266.",
    },
    {
      q: "How far does your emergency roadside service area extend?",
      a: "We serve clients within a 25-mile radius of our shop, covering Greater Portland, Happy Valley, Milwaukie, Gresham, Beaverton, and surrounding communities.",
    },
    {
      q: "What types of computer engine diagnostics do you offer?",
      a: "We perform full OBD-II computer scans, live sensor telemetry analysis, fuel trim adjustments, timing diagnostics, ignition circuit testing, and check engine light clearance.",
    },
    {
      q: "What phone numbers can I call to reach owner Paulin Charly Poumeni directly?",
      a: "You can reach our shop main line at +1 (513) 401-3101 or our direct mobile line at +1 (971) 386-7255.",
    },
  ];

  return (
    <section className="py-24 relative bg-slate-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Customer Reviews Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-cyber text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>5.0 STAR VERIFIED CUSTOMER REVIEWS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
              Trusted Across Portland
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm font-sans-swiss text-secondary leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-cyber">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <span>{rev.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-muted text-[10px]">{rev.car}</div>
                  </div>
                  <span className="text-muted text-[10px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h3 className="text-3xl font-serif-neoclassic font-bold text-primary">
              Have Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif-neoclassic font-bold text-base text-primary flex items-center justify-between gap-4 hover:text-red-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 font-sans-swiss text-sm text-secondary leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
