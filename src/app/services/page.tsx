"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import TextRotator from "@/components/common/TextRotator";
import {
  Globe,
  ChartNoAxesCombined,
  Palette,
  MessageCircle,
  Smartphone,
  Code,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

// Define a type for your Service data for better type safety
interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_desc?: string;
  icon?: string;
  image_url?: string;
  price_range?: string;
  duration?: string;
  features: string[];
  technologies: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  creator?: {
    name: string;
    email: string;
  };
}

// Helper function to map icon names (strings from DB) to Lucide-React components
const getIconComponent = (iconName: string | undefined) => {
  switch (iconName) {
    case "Globe":
      return <Globe className="w-8 h-8" />;
    case "MessageSquare":
    case "MessageCircle":
      return <MessageCircle className="w-8 h-8" />;
    case "Code":
      return <Code className="w-8 h-8" />;
    case "Smartphone":
      return <Smartphone className="w-8 h-8" />;
    case "ChartNoAxesCombined":
      return <ChartNoAxesCombined className="w-8 h-8" />;
    case "Palette":
      return <Palette className="w-8 h-8" />;
    default:
      return <Globe className="w-8 h-8" />;
  }
};

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Service[] = await response.json();
        const parsedData = data.map((service) => ({
          ...service,
          features:
            typeof service.features === "string"
              ? JSON.parse(service.features)
              : service.features,
          technologies:
            typeof service.technologies === "string"
              ? JSON.parse(service.technologies)
              : service.technologies,
        }));
        // Sort services: featured first, then by sort_order
        const sortedData = parsedData.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return a.sort_order - b.sort_order;
        });

        setServices(sortedData);
      } catch (err) {
        console.error("Failed to fetch all services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  // Variants for text reveal in hero
  const heroTextRevealVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variants for hero container stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const serviceItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-white flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-maasai-red)] mx-auto mb-4"></div>
          <p className="text-lg text-[var(--color-maasai-dark-grey)] font-medium">
            Loading services...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-br from-red-50 to-white flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-lg text-red-600 font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="backdrop-blur-md bg-black/80">
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
          <motion.div
            className="text-center text-white max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
                       <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight"
              variants={heroTextRevealVariants}
            >
              Our Core Services
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200 leading-relaxed"
              variants={heroTextRevealVariants}
            >
              We streamline business operations by assessing various parameters
              and offering exceptional{" "}
              <span className="text-[var(--color-maasai-accent)] font-semibold">
                <TextRotator
                  words={["solutions", "analysis", "results", "innovations"]}
                />
              </span>
              .
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={heroTextRevealVariants}
            >
              <Link href="/contact" passHref>
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] text-white font-bold rounded shadow-2xl transition-all duration-300 flex items-center gap-3 text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <div className="flex items-center gap-2 text-gray-300">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">Trusted by 500+ clients</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[var(--color-maasai-red)]/10 px-4 py-2 rounded mb-4"
              variants={heroTextRevealVariants}
            >
              <div className="w-2 h-2 bg-[var(--color-maasai-red)] rounded animate-pulse"></div>
              <span className="text-[var(--color-maasai-red)] font-semibold text-sm tracking-wide">
                WHAT WE OFFER
              </span>
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight"
              variants={heroTextRevealVariants}
            >
              Exceptional Solutions
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-white/70 max-w-2xl mx-auto"
              variants={heroTextRevealVariants}
            >
              Discover our comprehensive range of services designed to elevate
              your business
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`group relative ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-8 lg:py-10`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={serviceItemVariants}
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                >
                  {/* Service Visual */}
                  <div className="lg:w-1/2 relative">
                    <motion.div
                      className="relative overflow-hidden bg-white rounded shadow-2xl"
                      variants={floatingVariants}
                      animate={hoveredService === service.id ? "animate" : ""}
                    >
                      {service.image_url ? (
                        <div className="aspect-[4/3] w-full">
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        </div>
                      ) : (
                        <div className="aspect-[4/3] w-full bg-gradient-to-br from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] flex items-center justify-center">
                          <motion.div
                            className="text-white opacity-20"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            {getIconComponent(service.icon)}
                          </motion.div>
                        </div>
                      )}

                      {/* Floating icon */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] rounded flex items-center justify-center text-white shadow-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-6 h-6">
                          {getIconComponent(service.icon)}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Service Content */}
                  <div className="lg:w-1/2 space-y-4">
                    <div className="flex items-start gap-3">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 leading-tight">
                        {service.name}
                      </h3>

                      <p className="text-base md:text-lg text-white/80 mb-4 leading-relaxed">
                        {service.short_desc ||
                          service.description.substring(0, 200) + "..."}
                      </p>
                    </div>

                    {/* Service Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price & Duration */}
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded border border-gray-200/50 shadow-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium text-sm">
                              Price Range
                            </span>
                            <span className="font-bold text-[var(--color-maasai-red)] text-base">
                              {service.price_range || "Custom"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium text-sm">
                              Duration
                            </span>
                            <span className="font-bold text-[var(--color-maasai-dark-grey)] text-base">
                              {service.duration || "Varies"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded border border-gray-200/50 shadow-lg">
                        <h4 className="font-semibold text-[var(--color-maasai-dark-grey)] mb-2 text-sm">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies &&
                          service.technologies.length > 0 ? (
                            service.technologies
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  className="bg-[var(--color-maasai-red)]/10 text-[var(--color-maasai-red)] border-0 hover:bg-[var(--color-maasai-red)] hover:text-white transition-all duration-200 text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-[var(--color-maasai-dark-grey)]/60 text-xs">
                              Various technologies
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="bg-gradient-to-r from-[var(--color-maasai-red)]/5 to-[var(--color-maasai-accent)]/5 p-4 rounded-xl">
                        <h4 className="font-semibold text-white mb-3 text-sm">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features
                            .slice(0, 4)
                            .map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] rounded mt-1.5 flex-shrink-0"></div>
                                <span className="text-white/80 text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-3">
                      <Link href={`/services/${service.slug}`} passHref>
                        <motion.button
                          className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] text-white font-bold rounded shadow-xl transition-all duration-300 text-base"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore Service
                          <motion.div
                            className="transition-transform duration-300"
                            animate={{
                              x: hoveredService === service.id ? 5 : 0,
                            }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-500 mb-2">
                  No Services Found
                </h3>
                <p className="text-gray-400 text-sm">
                  We're working on adding amazing services for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}