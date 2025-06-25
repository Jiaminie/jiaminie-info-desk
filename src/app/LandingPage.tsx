"use client";


import AboutSection from "@/components/marketing/AboutSection";
import HeroSection from "@/components/marketing/HeroSection";
import MissionVisionSection from "@/components/marketing/MissionVisionSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold">Jiaminie.inc</h2>
          <p className="text-blue-200">Loading amazing experiences...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection/>
      <ServicesSection />
      <MissionVisionSection />
      <Footer />
    </div>
  );
}
