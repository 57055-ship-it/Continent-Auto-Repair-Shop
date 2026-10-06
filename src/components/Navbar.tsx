"use client";

import React, { useState, useEffect } from "react";
import { Phone, Sun, Moon, Volume2, VolumeX, ShieldCheck, MapPin, Clock, Calendar } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  audioEnabled,
  setAudioEnabled,
  onOpenBooking,
  onOpenEmergency,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 glass-panel border-b border-white/10 shadow-2xl backdrop-blur-xl"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Top micro-bar for quick contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 hidden md:flex items-center justify-between text-xs font-mono-cyber text-gray-400 border-b border-white/5 pb-2">
        <div className="flex items-center space-x-6">
          <a
            href="https://www.google.com/maps/search/7415+SE+92nd+Ave,+Portland,+Oregon+97266"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>7415 SE 92nd Ave, Portland, OR 97266</span>
          </a>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 beacon-dot" />
            <span>24/7 OPEN · Mon – Sun</span>
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="tel:+15134013101"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Main: (513) 401-3101</span>
          </a>
          <a
            href="tel:+19713867255"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct: (971) 386-7255</span>
          </a>
        </div>
      </div>

      {/* Main Nav Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center border border-red-500/30">
              <span className="font-mono-cyber font-bold text-red-500 text-lg tracking-tighter">
                C
              </span>
              <span className="font-mono-cyber font-bold text-cyan-400 text-sm">
                A
              </span>
            </div>
          </div>
          <div>
            <div className="font-serif-neoclassic font-extrabold text-lg tracking-tight text-primary flex items-center gap-1.5">
              <span>CONTINENT</span>
              <span className="text-red-500 text-xs font-mono-cyber font-normal px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                PRO
              </span>
            </div>
            <div className="text-[10px] font-mono-cyber text-secondary tracking-wider uppercase">
              Auto Repair Shop · Portland
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-sans-swiss font-medium text-secondary">
          <a href="#services" className="hover:text-red-500 transition-colors">
            Services
          </a>
          <a href="#obd-scanner" className="hover:text-red-500 transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            OBD Scanner
          </a>
          <a href="#3d-viewer" className="hover:text-red-500 transition-colors">
            Interactive Engine
          </a>
          <a href="#quote-estimator" className="hover:text-red-500 transition-colors">
            Fee Estimator
          </a>
          <a href="#gallery" className="hover:text-red-500 transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-red-500 transition-colors">
            Location
          </a>
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center space-x-3">
          {/* Audio rev toggle */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 text-secondary hover:text-red-400 transition-all"
            title={audioEnabled ? "Mute Engine Rev SFX" : "Enable Engine Rev SFX"}
            aria-label="Toggle Sound Effects"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-red-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 text-secondary hover:text-cyan-400 transition-all"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Emergency button */}
          <button
            onClick={onOpenEmergency}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 font-mono-cyber text-xs font-semibold hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-900/20"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            24/7 Emergency
          </button>

          {/* Book Appointment CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-sans-swiss text-xs font-semibold tracking-wide shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Repair</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-primary"
            aria-label="Open Navigation Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 glass-panel border-t border-white/10 space-y-3 font-sans-swiss text-sm">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-red-400"
          >
            Services & Repairs
          </a>
          <a
            href="#obd-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-cyan-400 hover:text-cyan-300"
          >
            Cyber OBD-II Scanner
          </a>
          <a
            href="#3d-viewer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-red-400"
          >
            Interactive 3D Engine
          </a>
          <a
            href="#quote-estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-red-400"
          >
            Instant Fee Estimator
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-red-400"
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-red-400"
          >
            Location & Contact
          </a>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full py-2.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 font-mono-cyber text-xs text-center font-bold"
            >
              24/7 Roadside Emergency Dispatch
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-lg bg-red-600 text-white font-sans-swiss text-xs font-semibold text-center"
            >
              Schedule Appointment Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
