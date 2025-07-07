"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Code,
  Globe,
  MessageCircle,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
shortDesc?: string;
  icon?: string;
 imageUrl?: string;
  priceRange?: string;
  duration?: string;
  features: string[];
  technologies: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  creator?: {
    name: string;
    email: string;
  };
}

const getIconComponent = (iconName: string | undefined) => {
  switch (iconName) {
    case "Globe":
      return <Globe className="w-6 h-6" />;
    case "MessageSquare":
    case "MessageCircle":
      return <MessageCircle className="w-6 h-6" />;
    case "Code":
      return <Code className="w-6 h-6" />;
    case "Smartphone":
      return <Smartphone className="w-6 h-6" />;

    default:
      return null;
  }
};
export default function FeaturedSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("api/featured-services");
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
        setServices(parsedData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Failed to load services. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white/90 flex justify-center items-center h-screen">
        <p className="text-xl text-[var(--color-maasai-dark-grey)]">
          Loading featured services...
        </p>
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
    <section className="py-20 bg-white/90">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-maasai-dark-grey)] mb-6">
            Featured Services
          </h2>
          <div className="w-24 h-1 bg-[var(--color-maasai-red)] mx-auto mb-8"></div>
          <p className="text-xl text-[var(--color-maasai-dark-grey)]/70 max-w-2xl mx-auto">
            Discover our most popular solutions that help businesses thrive in
            the digital landscape
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services
            .filter((service) => service.isFeatured)
            .map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white group hover:bg-[var(--color-maasai-light-grey)]/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-[var(--color-maasai-red)]/10 rounded-lg text-[var(--color-maasai-red)] group-hover:bg-[var(--color-maasai-red)] group-hover:text-white transition-all duration-300">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl text-[var(--color-maasai-dark-grey)]">
                        {service.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[var(--color-maasai-dark-grey)]/70 text-base">
                      {service.shortDesc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Price and Duration */}
                      <div className="bg-[var(--color-maasai-light-grey)]/30 p-4 rounded-lg">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium">
                            Price Range:
                          </span>
                          <span className="font-bold text-[var(--color-maasai-red)]">
                            {service.priceRange}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--color-maasai-dark-grey)]/60 font-medium">
                            Duration:
                          </span>
                          <span className="font-bold text-[var(--color-maasai-blue)]">
                            {service.duration}
                          </span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-maasai-dark-grey)] mb-2">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies
                            .slice(0, 3)
                            .map((tech, techIndex) => (
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
                          {service.features
                            .slice(0, 3)
                            .map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center"
                              >
                                <span className="w-1.5 h-1.5 bg-[var(--color-maasai-red)] rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <button className="w-full py-3 bg-gradient-to-r from-[var(--color-maasai-red)] to-[var(--color-maasai-accent)] text-white font-semibold rounded-lg hover:from-[var(--color-maasai-accent)] hover:to-[var(--color-maasai-red)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* View All Services Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
            <Link href="/services" passHref>
            <button className="px-8 py-3 border-2 border-[var(--color-maasai-red)] text-[var(--color-maasai-red)] hover:bg-[var(--color-maasai-red)] hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              View All Services
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
