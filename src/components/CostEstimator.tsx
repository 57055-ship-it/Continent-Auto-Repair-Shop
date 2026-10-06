"use client";

import React, { useState } from "react";
import { Calculator, Car, Wrench, Navigation, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import { playSound } from "@/utils/sound";

interface CostEstimatorProps {
  onBookEstimatedService: (details: { vehicle: string; service: string; price: string }) => void;
  audioEnabled: boolean;
}

export default function CostEstimator({ onBookEstimatedService, audioEnabled }: CostEstimatorProps) {
  const [vehicleType, setVehicleType] = useState<string>("sedan");
  const [serviceType, setServiceType] = useState<string>("diagnostic");
  const [distanceRange, setDistanceRange] = useState<string>("near");

  const vehicleRates: Record<string, { label: string; multiplier: number }> = {
    sedan: { label: "Standard Sedan / Hatch", multiplier: 1.0 },
    suv: { label: "SUV / Pickup Truck / Van", multiplier: 1.15 },
    euro: { label: "European / Luxury (BMW, Audi, Merc, Porsche)", multiplier: 1.3 },
    hybrid: { label: "Hybrid / EV High Voltage System", multiplier: 1.2 },
  };

  const serviceBasePrices: Record<string, { label: string; base: number; time: string }> = {
    diagnostic: { label: "Computer Engine Diagnostic & OBD Scan", base: 85, time: "1 Hour" },
    brakes: { label: "Brake Pad & Rotor Replacement", base: 220, time: "1.5 Hours" },
    oil: { label: "Full Synthetic Oil & Filter Service", base: 75, time: "45 Mins" },
    battery: { label: "Battery Load Test & Replacement", base: 140, time: "30 Mins" },
    roadside: { label: "24/7 Emergency Roadside Dispatch", base: 120, time: "Immediate" },
  };

  const distanceFees: Record<string, { label: string; fee: number }> = {
    near: { label: "Within 5 Miles of Shop (7415 SE 92nd Ave)", fee: 0 },
    mid: { label: "5 – 15 Miles (Greater Portland Area)", fee: 25 },
    far: { label: "15 – 25 Miles (Max Radius Boundary)", fee: 45 },
  };

  // Calculation formula
  const currentVehicle = vehicleRates[vehicleType];
  const currentService = serviceBasePrices[serviceType];
  const currentDistance = distanceFees[distanceRange];

  const estimatedLow = Math.round(currentService.base * currentVehicle.multiplier + currentDistance.fee);
  const estimatedHigh = Math.round(estimatedLow * 1.25);
  const priceDisplay = `$${estimatedLow} – $${estimatedHigh}`;

  const handleSelectOption = () => {
    if (audioEnabled) playSound("click");
  };

  return (
    <section id="quote-estimator" className="py-24 relative bg-slate-950 border-t border-white/10">
      
      {/* Background visual glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-cyber text-amber-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING CALCULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
            Instant Service Fee Estimator
          </h2>

          <p className="text-sm sm:text-base font-sans-swiss text-secondary">
            No hidden surcharges. Configure your vehicle model, required service, and location to calculate an upfront estimate backed by our Continent Repair Guarantee.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Form Controls */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 bg-slate-900/80 shadow-2xl">
            
            {/* Step 1: Vehicle Category */}
            <div className="space-y-3">
              <label className="text-xs font-mono-cyber text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Car className="w-4 h-4" />
                <span>1. SELECT VEHICLE TYPE:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(vehicleRates).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleSelectOption();
                      setVehicleType(key);
                    }}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-sans-swiss transition-all ${
                      vehicleType === key
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-md"
                        : "bg-white/5 border-white/10 text-secondary hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono-cyber text-red-400 uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>2. SELECT REQUIRED REPAIR / SERVICE:</span>
              </label>

              <div className="space-y-2">
                {Object.entries(serviceBasePrices).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleSelectOption();
                      setServiceType(key);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs font-sans-swiss flex items-center justify-between transition-all ${
                      serviceType === key
                        ? "bg-red-600/20 border-red-500 text-white shadow-md"
                        : "bg-white/5 border-white/10 text-secondary hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <span className="font-mono-cyber text-muted text-[11px]">{item.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Service Radius */}
            <div className="space-y-3">
              <label className="text-xs font-mono-cyber text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                <span>3. SERVICE LOCATION RADIUS:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono-cyber text-xs">
                {Object.entries(distanceFees).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleSelectOption();
                      setDistanceRange(key);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      distanceRange === key
                        ? "bg-amber-500/20 border-amber-400 text-amber-300"
                        : "bg-white/5 border-white/10 text-secondary hover:text-white"
                    }`}
                  >
                    <div className="font-bold">{item.label.split("(")[0]}</div>
                    <div className="text-[10px] text-muted">+{item.fee > 0 ? `$${item.fee} Travel` : "In-Shop / Free"}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Calculated Quote Summary Card */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-slate-900/90 shadow-2xl relative overflow-hidden">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono-cyber text-muted">OFFICIAL ESTIMATE READOUT</span>
                <span className="text-xs font-mono-cyber text-red-500 uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NO HIDDEN FEES
                </span>
              </div>

              {/* Price Tag Box */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 text-center space-y-1">
                <div className="text-xs font-mono-cyber text-secondary">ESTIMATED COST RANGE</div>
                <div className="text-4xl sm:text-5xl font-serif-neoclassic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400">
                  {priceDisplay}
                </div>
                <div className="text-[11px] font-mono-cyber text-muted">
                  Includes diagnostics, parts & certified shop labor
                </div>
              </div>

              {/* Breakdown details */}
              <div className="space-y-3 text-xs font-sans-swiss text-secondary">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Selected Vehicle:</span>
                  <strong className="text-white">{currentVehicle.label}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Service Package:</span>
                  <strong className="text-white">{currentService.label}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Target Distance:</span>
                  <strong className="text-white">{currentDistance.label}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Shop Turnaround:</span>
                  <strong className="text-emerald-400">{currentService.time}</strong>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  if (audioEnabled) playSound("rev");
                  onBookEstimatedService({
                    vehicle: currentVehicle.label,
                    service: currentService.label,
                    price: priceDisplay,
                  });
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-sans-swiss text-sm font-extrabold tracking-wide shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Lock In Estimate & Schedule</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-[10px] text-center font-mono-cyber text-muted">
                Questions? Call owner Paulin Charly Poumeni directly at (513) 401-3101
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
