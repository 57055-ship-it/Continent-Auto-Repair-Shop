"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, X, Play, Film } from "lucide-react";

export default function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Hypercar OBD-II Telemetry Bay",
      category: "diagnostics",
      image: "/images/hero.jpg",
      type: "photo",
      tag: "Portland Facility",
    },
    {
      id: 2,
      title: "AMG Twin-Turbo V8 Engine Diagnostic",
      category: "engine",
      image: "/images/engine.jpg",
      type: "photo",
      tag: "Master Tech Overhaul",
    },
    {
      id: 3,
      title: "Brembo Ceramic Brake Assembly",
      category: "brakes",
      image: "/images/brakes.jpg",
      type: "photo",
      tag: "Brake Reprecision",
    },
    {
      id: 4,
      title: "24/7 Portland Roadside Dispatch",
      category: "roadside",
      image: "/images/hero.jpg",
      type: "photo",
      tag: "25-Mile Radius",
    },
    {
      id: 5,
      title: "High-Performance Engine Tuning",
      category: "engine",
      image: "/images/engine.jpg",
      type: "photo",
      tag: "Computer Scan",
    },
    {
      id: 6,
      title: "Shop Hydraulic Lift & Alignment Bay",
      category: "diagnostics",
      image: "/images/brakes.jpg",
      type: "photo",
      tag: "7415 SE 92nd Ave",
    },
  ];

  return (
    <section id="gallery" className="py-24 relative bg-slate-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono-cyber text-red-500 tracking-widest uppercase mb-2">
              [ 03 // MIXED MEDIA GALLERY ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
              Craftsmanship & Shop Showcase
            </h2>
            <p className="mt-3 text-secondary font-sans-swiss text-sm sm:text-base max-w-xl">
              Take a visual tour inside our Portland auto repair workshop, diagnostic equipment, and completed customer vehicle builds.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono-cyber text-xs">
            {["all", "engine", "brakes", "diagnostics", "roadside"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl capitalize border transition-all ${
                  activeCategory === cat
                    ? "bg-red-600/20 border-red-500 text-red-400"
                    : "glass-panel border-white/10 text-secondary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems
            .filter((item) => activeCategory === "all" || item.category === activeCategory)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item.image)}
                className="group relative h-72 rounded-3xl overflow-hidden glass-panel border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Tag & Zoom Button */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono-cyber text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {item.tag}
                  </span>
                  <div className="p-2 rounded-xl bg-black/60 border border-white/10 text-white group-hover:bg-red-600 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                  <div className="text-xs font-mono-cyber text-cyan-400 uppercase">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-serif-neoclassic font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden border border-white/20">
            <Image
              src={selectedMedia}
              alt="Expanded Gallery View"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
