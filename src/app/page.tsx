"use client";

import AdvantageSection from "@/components/marketing/advantage/advantageSection";
import HeroSection from "@/components/marketing/HeroSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import AppointmentSection from "@/components/marketing/AppointmentSection";
import ProcessSection from "@/components/marketing/ProcessSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <HeroSection />
      <ServicesSection />
      <AdvantageSection />
      <ProcessSection />
      <AppointmentSection />
    </motion.div>
  );
}
