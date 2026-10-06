"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, ShieldCheck, Zap, Disc, Gauge, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

interface BentoServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function BentoServices({ onSelectService }: BentoServicesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const servicesList = [
    {
      id: "engine-diagnostics",
      title: "Engine Diagnostics & Repair",
      category: "diagnostic",
      icon: Cpu,
      color: "from-red-500 to-amber-500",
      accent: "text-red-500",
      border: "hover:border-red-500/50",
      description: "Full OBD-II sensor analysis, misfire troubleshooting, check engine code clearing, and precision engine overhaul.",
      features: ["Live Telemetry Scan", "Fuel System Diagnostics", "Timing Belt & Water Pump", "ECU Firmware Calibration"],
      span: "lg:col-span-8",
      image: "/images/engine.jpg",
      estimatedTime: "1 – 3 Hours",
    },
    {
      id: "brake-inspection",
      title: "Brake Inspection & Replacement",
      category: "mechanical",
      icon: Disc,
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-400",
      border: "hover:border-cyan-500/50",
      description: "Ceramic & metallic brake pad replacement, high-precision rotor machining, ABS module service, and hydraulic fluid flush.",
      features: ["Ceramic Pad Installation", "Rotor Resurfacing", "Brake Fluid Flush", "ABS Diagnostic Scan"],
      span: "lg:col-span-4",
      image: "/images/brakes.jpg",
      estimatedTime: "45 – 90 Mins",
    },
    {
      id: "oil-tuneups",
      title: "Oil Change & Engine Tune-Ups",
      category: "maintenance",
      icon: Gauge,
      color: "from-amber-500 to-yellow-500",
      accent: "text-amber-400",
      border: "hover:border-amber-500/50",
      description: "Full synthetic oil replacement, OEM filter changes, iridium spark plug replacement, intake cleaning, and multi-point vehicle health check.",
      features: ["Full Synthetic 5W30/0W20", "OEM Filter Replacement", "Spark Plug Replacement", "21-Point Digital Inspection"],
      span: "lg:col-span-4",
      estimatedTime: "30 – 45 Mins",
    },
    {
      id: "battery-electrical",
      title: "Battery Check & Alternator Service",
      category: "electrical",
      icon: Zap,
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400",
      border: "hover:border-emerald-500/50",
      description: "Automotive battery load testing, terminal corrosion cleaning, high-output alternator replacement, and starter motor diagnostics.",
      features: ["Cold Cranking Amps Test", "Alternator Output Test", "Terminal Corrosion Clean", "AGM Battery Replacement"],
      span: "lg:col-span-4",
      estimatedTime: "30 Mins",
    },
    {
      id: "general-repair",
      title: "General Auto Repair & Maintenance",
      category: "mechanical",
      icon: ShieldCheck,
      color: "from-purple-500 to-indigo-500",
      accent: "text-purple-400",
      border: "hover:border-purple-500/50",
      description: "Suspension shocks & struts, steering rack alignment, radiator cooling system repair, AC recharge, and exhaust system fixes.",
      features: ["Suspension & Struts", "Cooling & Radiator Service", "HVAC AC Recharge", "Transmission Flush"],
      span: "lg:col-span-4",
      estimatedTime: "Custom Quote",
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950/40">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Swiss Neoclassical Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono-cyber text-red-500 tracking-widest uppercase mb-2">
              [ 01 // CORE SERVICES ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary tracking-tight">
              Master Automotive Solutions
            </h2>
            <p className="mt-3 text-secondary font-sans-swiss text-sm sm:text-base max-w-xl">
              Engineered with Swiss precision and high-tech diagnostics. Built to handle domestic, import, euro, and light commercial vehicles.
            </p>
          </div>

          {/* Service Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono-cyber text-xs">
            {["all", "diagnostic", "mechanical", "maintenance", "electrical"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl transition-all capitalize whitespace-nowrap border ${
                  activeTab === tab
                    ? "bg-red-600/20 border-red-500/50 text-red-400 shadow-md"
                    : "glass-panel border-white/10 text-secondary hover:text-primary hover:border-white/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {servicesList
            .filter((s) => activeTab === "all" || s.category === activeTab)
            .map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`group glass-panel rounded-3xl border border-white/10 p-6 lg:p-8 transition-all duration-300 ${service.border} hover:shadow-2xl relative overflow-hidden flex flex-col justify-between ${service.span}`}
                >
                  {/* Subtle specular sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Top row */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${service.accent}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono-cyber text-muted uppercase">
                          {service.category}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectService(service.title)}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-red-600 group-hover:text-white transition-all text-secondary"
                        title="Book this service"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif-neoclassic font-bold text-primary group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm font-sans-swiss text-secondary leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-mono-cyber text-gray-300">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Image for large card */}
                  {service.image && (
                    <div className="mt-6 relative h-44 rounded-2xl overflow-hidden border border-white/10 group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-[11px] font-mono-cyber text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md">
                        Est. Time: {service.estimatedTime}
                      </div>
                    </div>
                  )}

                  {/* Card Footer action button */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono-cyber text-secondary">
                      Shop & Mobile Dispatch
                    </span>
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="text-xs font-sans-swiss font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <span>Get Instant Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}
