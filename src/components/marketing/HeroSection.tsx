"use client";
import { motion, Variants } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Volleyball, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CompanyInfo {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  logo_url?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  social_links?: { [key: string]: string };
  business_hours?: { [key: string]: string };
  founded_year?: number;
  team_size?: string;
  updated_at: string;
}

export default function HeroSection() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch("/api/data/company-info");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CompanyInfo = await response.json();
        setCompanyInfo(data);
      } catch (err: any) {
        console.error("Failed to fetch company info for Hero Section:", err);
        setError(`Failed to load company information: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black/90 text-white px-6">
        <div className="w-full max-w-4xl space-y-6">
          {/* Message */}
          <div className="text-center mt-10">
            <p className="text-2xl font-bold text-white mb-2">One sec...</p>
            <p className="text-zinc-400">We sure have something for you</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black/90 text-white">
        <p className="text-xl text-red-500">{error}</p>
      </section>
    );
  }

  const displayCompanyInfo = companyInfo || {
    name: "Jiaminie.inc",
    tagline: "Building Digital Excellence",
    description:
      "We transform businesses through innovative web development, seamless WhatsApp integrations, and cutting-edge Next.js applications.",
    logo_url: "/api/placeholder/200/80",
    email: "hello@jiaminie.com",
    phone: "+254 (700) 123-4567",
    address: "Nairobi, Kenya",
    founded_year: 2020,
    team_size: "10-25 employees",
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-maasai-black)] to-[var(--color-maasai-red)]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        />

        <div className="absolute inset-0 bg-black backdrop-blur-0 bg-opacity-60"></div>

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="text-center text-white relative z-10 max-w-4xl mx-auto"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              variants={childVariants}
            >
              {displayCompanyInfo.tagline || "Building Digital Excellence"}{" "}
              <span className="bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-[var(--color-maasai-light-grey)] max-w-3xl mx-auto"
              variants={childVariants}
            >
              {displayCompanyInfo.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={childVariants}
            >
              <Button
                size="lg"
                className="group relative px-8 py-4 bg-white text-[var(--color-maasai-red)] hover:bg-gradient-to-r hover:from-[var(--color-maasai-red)] hover:to-[var(--color-maasai-accent)] hover:text-white font-semibold rounded shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                onClick={() => {
                  router.push("/services");
                }}
              >
                <span className="relative z-10 flex items-center">
                  View Our Services
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                size="lg"
                className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] text-white hover:bg-white hover:text-[var(--color-maasai-red)] font-semibold rounded shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                onClick={() => router.push("/portfolio")}
              >
                <span className="relative z-10">See Our Work</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Volleyball className="w-6 h-6 text-white rounded-full" />
        </motion.div>
      </section>
    </>
  );
}
