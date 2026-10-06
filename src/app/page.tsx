"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShopInfoAlert from "@/components/ShopInfoAlert";
import BentoServices from "@/components/BentoServices";
import ObdScannerTerminal from "@/components/ObdScannerTerminal";
import Interactive3DEngine from "@/components/Interactive3DEngine";
import BeforeAfterBrakes from "@/components/BeforeAfterBrakes";
import CostEstimator from "@/components/CostEstimator";
import MediaGallery from "@/components/MediaGallery";
import ServiceAreaChecker from "@/components/ServiceAreaChecker";
import ReviewsAndFAQ from "@/components/ReviewsAndFAQ";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import EmergencyModal from "@/components/EmergencyModal";

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Booking Modal Pre-fill States
  const [selectedService, setSelectedService] = useState<string>("Engine Diagnostics & Repair");
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // Sync dark mode class on HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll Progress Bar Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers for modal triggers
  const handleOpenBookingWithService = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedCode("");
    setSelectedPrice("");
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithCode = (code: string, desc: string) => {
    setSelectedService(`OBD Code Fix: ${code} - ${desc}`);
    setSelectedCode(code);
    setSelectedPrice("");
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithEstimate = (details: { vehicle: string; service: string; price: string }) => {
    setSelectedService(details.service);
    setSelectedVehicle(details.vehicle);
    setSelectedPrice(details.price);
    setSelectedCode("");
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-red-500 selection:text-white transition-colors duration-400">
      
      {/* Top Animated Scroll-Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-cyan-400 z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        onOpenBooking={() => {
          setSelectedService("General Auto Repair");
          setSelectedCode("");
          setSelectedPrice("");
          setBookingModalOpen(true);
        }}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => {
          setSelectedService("Engine Diagnostics & Repair");
          setSelectedCode("");
          setSelectedPrice("");
          setBookingModalOpen(true);
        }}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
        audioEnabled={audioEnabled}
      />

      {/* Verified Business Details & Discrepancies Alert */}
      <ShopInfoAlert />

      {/* Bento Grid Core Services */}
      <BentoServices onSelectService={handleOpenBookingWithService} />

      {/* Cyber OBD-II Diagnostic Terminal Scanner */}
      <ObdScannerTerminal
        onBookCodeFix={handleOpenBookingWithCode}
        audioEnabled={audioEnabled}
      />

      {/* Interactive WebGL 3D Powertrain Telemetry */}
      <Interactive3DEngine audioEnabled={audioEnabled} />

      {/* Before & After Precision Brake Slider */}
      <BeforeAfterBrakes />

      {/* Instant Fee Estimator & Price Calculator */}
      <CostEstimator
        onBookEstimatedService={handleOpenBookingWithEstimate}
        audioEnabled={audioEnabled}
      />

      {/* Mixed Media Showcase Gallery */}
      <MediaGallery />

      {/* Portland 25-Mile Radius Service Area Checker */}
      <ServiceAreaChecker />

      {/* Customer Reviews & Schema FAQ Accordion */}
      <ReviewsAndFAQ />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={selectedService}
        initialCode={selectedCode}
        initialVehicle={selectedVehicle}
        initialPrice={selectedPrice}
        audioEnabled={audioEnabled}
      />

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        audioEnabled={audioEnabled}
      />

    </div>
  );
}
