"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Calendar, Clock, Car, User, Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { playSound } from "@/utils/sound";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialCode?: string;
  initialVehicle?: string;
  initialPrice?: string;
  audioEnabled: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "Engine Diagnostics & Repair",
  initialCode,
  initialVehicle = "",
  initialPrice,
  audioEnabled,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: initialService,
    vehicle: initialVehicle,
    date: "",
    time: "ASAP - Next Available 24/7 Slot",
    notes: initialCode ? `Logged OBD DTC Code: ${initialCode}` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
        vehicle: initialVehicle || prev.vehicle,
        notes: initialCode ? `Logged OBD DTC Code: ${initialCode}` : prev.notes,
      }));
    }
  }, [initialService, initialCode, initialVehicle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    if (audioEnabled) playSound("success");

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#06b6d4", "#f59e0b", "#10b981"],
      });
    } catch (err) {
      console.warn("Confetti effect unavailable", err);
    }

    const randomId = "CAR-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmationId(randomId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/20 overflow-hidden bg-slate-900 shadow-2xl">
        
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-neoclassic font-bold text-lg text-primary">
                Schedule Repair Appointment
              </h3>
              <div className="text-xs font-mono-cyber text-secondary">
                Continent Auto Repair Shop · 7415 SE 92nd Ave
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation State */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-sans-swiss text-xs">
            
            {initialPrice && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between font-mono-cyber">
                <span>ESTIMATED PRICE QUOTE:</span>
                <strong className="text-sm font-bold">{initialPrice}</strong>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  FULL NAME *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  PHONE NUMBER *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(503) 555-0199"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Vehicle */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  VEHICLE MAKE / MODEL / YEAR
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    placeholder="e.g. 2020 Honda Civic VTEC"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-1">
              <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                SELECTED SERVICE
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors font-mono-cyber"
              >
                <option value="Engine Diagnostics & Repair">Engine Diagnostics & Repair</option>
                <option value="Brake Inspection & Replacement">Brake Inspection & Replacement</option>
                <option value="Oil Change & Tune-Ups">Oil Change & Tune-Ups</option>
                <option value="Battery Check & Alternator">Battery Check & Alternator</option>
                <option value="General Auto Repair">General Auto Repair & Maintenance</option>
                <option value="24/7 Emergency Roadside Dispatch">24/7 Emergency Roadside Dispatch</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  PREFERRED DATE
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors font-mono-cyber"
                />
              </div>

              {/* Time */}
              <div className="space-y-1">
                <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                  PREFERRED TIME SLOT
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors font-mono-cyber"
                >
                  <option value="ASAP - Next Available 24/7 Slot">ASAP - Next Available 24/7 Slot</option>
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                  <option value="Evening/Night (5:00 PM - 12:00 AM)">Evening/Night (5:00 PM - 12:00 AM)</option>
                  <option value="Late Night Emergency Callout">Late Night Emergency Callout</option>
                </select>
              </div>
            </div>

            {/* Special Notes / Diagnostic Codes */}
            <div className="space-y-1">
              <label className="block text-muted font-mono-cyber text-[11px] uppercase">
                DIAGNOSTIC NOTES / DTC SYMPTOMS
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Describe any check engine light codes, noises, or symptoms..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-sans-swiss text-sm font-bold tracking-wide shadow-xl shadow-red-600/30 transition-all"
            >
              Confirm & Request Appointment
            </button>

          </form>
        ) : (
          /* Confirmation Success Receipt State */
          <div className="p-8 text-center space-y-6 font-sans-swiss animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-serif-neoclassic font-bold text-white">
                Appointment Request Confirmed!
              </h4>
              <p className="text-xs text-secondary max-w-md mx-auto">
                Thank you <strong className="text-white">{formData.fullName}</strong>. Your appointment code is logged into our master technician queue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 text-left text-xs font-mono-cyber space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted">CONFIRMATION ID:</span>
                <span className="text-cyan-400 font-bold">{confirmationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">SERVICE:</span>
                <span className="text-white">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">PHONE CONTACT:</span>
                <span className="text-emerald-400">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">SHOP ADDRESS:</span>
                <span className="text-white">7415 SE 92nd Ave, Portland</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono-cyber text-xs font-semibold transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
