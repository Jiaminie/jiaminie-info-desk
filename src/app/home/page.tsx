"use client";

import AdvantageSection from "@/components/marketing/AdvantageSection";
import HeroSection from "@/components/marketing/HeroSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import AppointmentSection from "@/components/marketing/AppointmentSection";
import CatchySection from "@/components/marketing/Catch";
import ProcessSection from "@/components/marketing/ProcessSection";
import TestimonialsSection from "@/components/marketing/TestimonialSection";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const typedText = useTypewriter(
    "Karibu, your custom solution is loading…",
    40
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <motion.div
          className="text-center text-[var(--color-maasai-light-grey)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold text-[var(--color-maasai-light-grey)]">
            Jiaminie.inc
          </h2>
          <p className="text-[var(--color-maasai-light-grey)]">{typedText}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tranparent bg-opacity-90">
      <HeroSection />
      <CatchySection />
      <ServicesSection />
      <AdvantageSection />
      <ProcessSection />
      <AppointmentSection />
      <TestimonialsSection />
      {/* <ContactSection /> */}
    </div>
  );
}
