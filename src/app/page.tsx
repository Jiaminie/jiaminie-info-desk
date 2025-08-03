"use client";

import AdvantageSection from "@/components/marketing/advantage/advantageSection";
import HeroSection from "@/components/marketing/HeroSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import { useState, useEffect } from "react";
import AppointmentSection from "@/components/marketing/AppointmentSection";
import ProcessSection from "@/components/marketing/ProcessSection";
import TestimonialsSection from "@/components/marketing/TestimonialSection";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingIndicator message="Your custom solution is loading" />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <AdvantageSection />
      <ProcessSection />
      <TestimonialsSection />
      <AppointmentSection />
    </div>
  );
}
