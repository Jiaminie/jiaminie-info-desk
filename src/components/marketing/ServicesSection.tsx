"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from 'next/link'; // Keep Link in case you want to link to individual service detail pages later
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Globe, ChartNoAxesCombined, Palette, MessageCircle, Smartphone, Code } from "lucide-react"; // All necessary icons
import StatCounter from "../common/StatCounter";
import TextRotator from "../common/TextRotator";
import { Badge } from "../ui/badge";

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
    case 'Globe':
      return <Globe className="w-6 h-6" />;
    case 'MessageSquare':
    case 'MessageCircle':
      return <MessageCircle className="w-6 h-6" />;
    case 'Code':
      return <Code className="w-6 h-6" />;
    case 'Smartphone':
      return <Smartphone className="w-6 h-6" />;
    case 'ChartNoAxesCombined':
      return <ChartNoAxesCombined className="w-6 h-6" />;
    case 'Palette':
      return <Palette className="w-6 h-6" />;
    default:
      return <Globe className="w-6 h-6" />; // Default icon if not found
  }
};

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        // Fetch all active services
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Service[] = await response.json();
        // Parse JSON fields if they come as strings from the API
        const parsedData = data.map(service => ({
          ...service,
          features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
          technologies: typeof service.technologies === 'string' ? JSON.parse(service.technologies) : service.technologies,
        }));
        setServices(parsedData);
      } catch (err) {
        console.error("Failed to fetch all services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []); // Empty dependency array means this runs once on mount

  const fallingHeaderVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100,
        duration: 1.2,
        bounce: 0.6,
      },
    },
  };

  const serviceCardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-20 bg-white/90 flex justify-center items-center h-screen">
        <p className="text-xl text-[var(--color-maasai-dark-grey)]">Loading services...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white/90 flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white/80">
      <div className="container mx-auto px-6">
        {/* Main Section Header - Adapted from ServicesSection */}
        <motion.div
          className="text-center mb-16"
          variants={fallingHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[var(--color-maasai-dark-grey)] mb-6"
            animate={{
              y: [-2, 2, -2, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 1.2,
              repeat: 1,
              repeatType: "reverse",
              ease: "easeInOut",
              type: "tween",
            }}
          >
            Our Services
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-[var(--color-maasai-red)] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl text-[var(--color-maasai-dark-grey)]/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            We streamline business operations by assessing various parameters
            and offering exceptional{" "}
            <TextRotator
              words={["solutions", "analysis", "results", "innovations"]}
            />
          </motion.p>
        </motion.div>

        {/* Services Grid - Applies FeaturedSection's Card styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                custom={index}
                variants={serviceCardVariants}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white group hover:bg-[var(--color-maasai-light-grey)]/20 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-[var(--color-maasai-red)]/10 rounded-lg text-[var(--color-maasai-red)] group-hover:bg-[var(--color-maasai-red)] group-hover:text-white transition-all duration-300">
                        {getIconComponent(service.icon)}
                      </div>
                      <CardTitle className="text-xl text-[var(--color-maasai-dark-grey)]">
                        {service.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[var(--color-maasai-dark-grey)]/70 text-base">
                      {service.short_desc || service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Price and Duration */}
                      <div className="bg-[var(--color-maasai-light-grey)]/30 p-4 rounded-lg">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium">
                            Price Range:
                          </span>
                          <span className="font-bold text-[var(--color-maasai-red)]">
                            {service.price_range || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium">
                            Duration:
                          </span>
                          <span className="font-bold text-[var(--color-maasai-blue)]">
                            {service.duration || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-maasai-dark-grey)] mb-2">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs bg-[var(--color-maasai-red)]/10 text-[var(--color-maasai-red)] border-[var(--color-maasai-red)]/20 hover:bg-[var(--color-maasai-red)] hover:text-white transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {service.technologies.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs text-[var(--color-maasai-dark-grey)]/60 border-[var(--color-maasai-dark-grey)]/20"
                            >
                              +{service.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-maasai-dark-grey)] mb-2">
                          Key Features:
                        </h4>
                        <ul className="text-sm text-[var(--color-maasai-dark-grey)]/70 space-y-1">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-[var(--color-maasai-red)] rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 mt-auto">
                      {/* You can link this to a dynamic service detail page */}
                      <Link href={`/services/${service.slug}`} passHref>
                        <button className="w-full py-3 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] text-white font-semibold rounded-lg hover:from-[var(--color-maasai-accent)] hover:to-[var(--color-maasai-red)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No services found.
            </div>
          )}
        </div>

        {/* Stat Counter Section */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-black)] rounded-md p-8"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="text-center text-white">
            <StatCounter end={15} label="Countries" />
          </div>
          <div className="text-center text-white">
            <StatCounter end={10} label="Years in Operation" />
          </div>
          <div className="text-center text-white">
            <StatCounter end={50} label="Partners" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
