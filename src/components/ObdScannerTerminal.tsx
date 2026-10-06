"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Play, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { playSound } from "@/utils/sound";

interface ObdScannerTerminalProps {
  onBookCodeFix: (code: string, desc: string) => void;
  audioEnabled: boolean;
}

interface TroubleCodeInfo {
  code: string;
  name: string;
  severity: "CRITICAL" | "MODERATE" | "ATTENTION";
  severityColor: string;
  description: string;
  possibleCauses: string[];
  estimatedCost: string;
  estimatedTime: string;
}

const PRESET_CODES: Record<string, TroubleCodeInfo> = {
  P0300: {
    code: "P0300",
    name: "Random/Multiple Cylinder Misfire Detected",
    severity: "CRITICAL",
    severityColor: "text-red-500 bg-red-500/10 border-red-500/30",
    description: "Engine control unit detected random misfires across multiple cylinders. Driving may damage the catalytic converter.",
    possibleCauses: ["Fouled spark plugs", "Failing ignition coils", "Low fuel pressure", "Vacuum leak"],
    estimatedCost: "$120 – $380",
    estimatedTime: "1 – 2 Hours",
  },
  P0420: {
    code: "P0420",
    name: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "MODERATE",
    severityColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    description: "Catalytic converter operates below minimum efficiency threshold. Often caused by O2 sensor lag or converter wear.",
    possibleCauses: ["Faulty Oxygen (O2) sensor", "Damaged Catalytic Converter", "Exhaust gas leak"],
    estimatedCost: "$150 – $850",
    estimatedTime: "1.5 – 3 Hours",
  },
  P0171: {
    code: "P0171",
    name: "System Too Lean (Bank 1 Fuel Trim)",
    severity: "MODERATE",
    severityColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    description: "Engine running with too much air or insufficient fuel. Can cause sluggish acceleration, engine knock, or rough idle.",
    possibleCauses: ["Dirty Mass Air Flow (MAF) sensor", "Vacuum intake leak", "Clogged fuel injector"],
    estimatedCost: "$90 – $260",
    estimatedTime: "45 – 90 Mins",
  },
  P0455: {
    code: "P0455",
    name: "Evaporative Emission System Leak (Gross Leak)",
    severity: "ATTENTION",
    severityColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    description: "EVAP system detected a major fuel vapor leak or missing gas cap. Check engine light illuminated.",
    possibleCauses: ["Loose or broken gas cap", "Cracked EVAP purge valve line", "Charcoal canister leak"],
    estimatedCost: "$45 – $180",
    estimatedTime: "30 – 60 Mins",
  },
  P0700: {
    code: "P0700",
    name: "Transmission Control System Malfunction",
    severity: "CRITICAL",
    severityColor: "text-red-500 bg-red-500/10 border-red-500/30",
    description: "TCM requested Check Engine light illumination due to transmission slip or solenoid circuit malfunction.",
    possibleCauses: ["Low/dirty transmission fluid", "Faulty transmission solenoid", "Wiring harness short"],
    estimatedCost: "$180 – $650",
    estimatedTime: "2 – 4 Hours",
  },
};

export default function ObdScannerTerminal({ onBookCodeFix, audioEnabled }: ObdScannerTerminalProps) {
  const [selectedCode, setSelectedCode] = useState<string>("P0300");
  const [customInput, setCustomInput] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING CAN-BUS OBD-II INTERFACE...",
    "CONNECTED TO ECU AT 115200 BAUD...",
    "SCANNING PORTLAND DIAGNOSTIC ENGINE...",
    "FAULT CODE LOGGED: P0300 [ACTIVE]",
  ]);

  const currentInfo = PRESET_CODES[selectedCode] || {
    code: selectedCode || "P0999",
    name: "Custom Diagnostic Trouble Code Scan",
    severity: "ATTENTION",
    severityColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    description: `Custom code ${selectedCode || "entered"}. Requires comprehensive Continent Auto Repair computer scan.`,
    possibleCauses: ["Electronic sensor fault", "Circuit continuity break", "Mechanical wear"],
    estimatedCost: "Free Initial Scan",
    estimatedTime: "30 Mins",
  };

  const handleSelectCode = (code: string) => {
    if (audioEnabled) playSound("click");
    setSelectedCode(code);
    triggerScan(code);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const cleanCode = customInput.trim().toUpperCase();
    if (audioEnabled) playSound("click");
    setSelectedCode(cleanCode);
    triggerScan(cleanCode);
    setCustomInput("");
  };

  const triggerScan = (code: string) => {
    setScanning(true);
    setLogs([
      "ESTABLISHING CAN-BUS HIGH-SPEED DATA LINK...",
      `READING ERROR MEMORY FOR CODE ${code}...`,
      "ANALYZING SENSOR WAVEFORMS & FUEL TRIMS...",
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `DIAGNOSTIC COMPLETED: ${code} VERIFIED.`,
        "RECOMMENDATION LOGGED TO MASTER TECHNICIAN QUEUE.",
      ]);
      setScanning(false);
    }, 800);
  };

  return (
    <section id="obd-scanner" className="py-24 relative bg-slate-950/80 border-t border-white/10">
      
      {/* Background cyber grid lines */}
      <div className="absolute inset-0 swiss-grid-lines pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-400">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>CYBER DIAGNOSTIC SUITE v2.6</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
            OBD-II Live Diagnostic Scanner
          </h2>

          <p className="text-sm sm:text-base font-sans-swiss text-secondary">
            Got a Check Engine Light? Click a trouble code below or enter your specific DTC code to decode the diagnostic root cause, severity rating, and instant repair estimate.
          </p>
        </div>

        {/* Scanner Terminal Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls & Code Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Preset Buttons */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="text-xs font-mono-cyber text-secondary flex items-center justify-between">
                <span>SELECT PRESET DTC FAULT CODES</span>
                <span className="text-cyan-400">[ CLICK TO SCAN ]</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono-cyber">
                {Object.keys(PRESET_CODES).map((code) => (
                  <button
                    key={code}
                    onClick={() => handleSelectCode(code)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCode === code
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10"
                        : "bg-white/5 border-white/10 text-secondary hover:text-primary hover:border-white/20"
                    }`}
                  >
                    <span>{code}</span>
                    {selectedCode === code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                  </button>
                ))}
              </div>

              {/* Custom DTC Code Input */}
              <form onSubmit={handleCustomSubmit} className="pt-3 border-t border-white/10 space-y-2">
                <label className="block text-xs font-mono-cyber text-muted">
                  ENTER CUSTOM CHECK ENGINE CODE (e.g. P0456, P0135):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter OBD Code..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs font-mono-cyber text-white uppercase focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono-cyber text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Scan</span>
                  </button>
                </div>
              </form>

            </div>

            {/* Simulated Console Log Box */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 font-mono-cyber text-[11px] space-y-1.5 bg-slate-950/90 text-emerald-400">
              <div className="flex items-center justify-between text-[10px] text-muted border-b border-white/10 pb-2 mb-2">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  CAN-BUS SCANNER CONSOLE
                </span>
                <span>{scanning ? "BUSY" : "READY"}</span>
              </div>

              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-muted shrink-0">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Diagnostic Telemetry Readout */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 space-y-6 relative overflow-hidden bg-slate-900/90 shadow-2xl">
              
              {/* Top readout header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="text-xs font-mono-cyber text-cyan-400 uppercase tracking-widest mb-1">
                    [ DTC DIAGNOSTIC RESULT ]
                  </div>
                  <div className="text-3xl font-mono-cyber font-extrabold text-white flex items-center gap-3">
                    <span>{currentInfo.code}</span>
                    <span className={`text-xs px-3 py-1 rounded-full border ${currentInfo.severityColor}`}>
                      {currentInfo.severity}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono-cyber text-xs">
                  <div className="text-secondary">ESTIMATED REPAIR:</div>
                  <div className="text-xl font-serif-neoclassic font-bold text-amber-400">
                    {currentInfo.estimatedCost}
                  </div>
                </div>
              </div>

              {/* Code Name & Detailed Explanation */}
              <div className="space-y-2">
                <h3 className="text-xl font-serif-neoclassic font-bold text-primary">
                  {currentInfo.name}
                </h3>
                <p className="text-sm font-sans-swiss text-secondary leading-relaxed">
                  {currentInfo.description}
                </p>
              </div>

              {/* Probable Causes Checklist */}
              <div className="space-y-3">
                <div className="text-xs font-mono-cyber text-secondary uppercase tracking-wider">
                  PRIMARY ROOT CAUSES DETECTED:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-cyber text-gray-300">
                  {currentInfo.possibleCauses.map((cause, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Booking Trigger */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono-cyber text-secondary">
                  <span>Shop Diagnostic Time: </span>
                  <strong className="text-white">{currentInfo.estimatedTime}</strong>
                </div>

                <button
                  onClick={() => {
                    if (audioEnabled) playSound("rev");
                    onBookCodeFix(currentInfo.code, currentInfo.name);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-sans-swiss text-xs font-bold tracking-wide shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Schedule Fix for {currentInfo.code}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
