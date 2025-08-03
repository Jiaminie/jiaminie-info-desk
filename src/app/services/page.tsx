"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
  Filter,
  Search,
  Clock,
  DollarSign,
  Users,
  Zap,
  Award,
  Target,
} from "lucide-react";
import ErrorPage from "@/components/ui/error-page";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import StatCounter from "@/components/common/StatCounter";

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

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group h-[600px] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-800"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Background Image or Gradient */}
      <div className="absolute inset-0">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-2/5 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-2/5 bg-gradient-to-br from-red-600 via-red-700 to-red-900" />
        )}
        {/* Dark Overlay on Image */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section with Image */}
        <div className="h-2/5 flex flex-col justify-between p-6">
          {/* Icon and Featured Badge */}
          <div className="flex justify-between items-start">
            {service.is_featured && (
              <Badge className="bg-red-600 text-white border-0 p-2">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Service Title */}
          <h3 className="text-2xl font-bold text-white leading-tight">
            {service.name}
          </h3>
        </div>

        {/* Detail Section */}
        <div className="h-3/5 bg-gray-900 p-6 space-y-4 flex flex-col justify-between">
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed flex-grow">
            {service.description.length > 150
              ? service.description.substring(0, 150) + "..."
              : service.description}
          </p>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Key Features:</h4>
            <div className="space-y-1">
              {service.features?.slice(0, 3).map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-400"
                >
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {service.technologies?.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Price and Duration */}
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1 text-green-400">
              <DollarSign className="w-3 h-3" />
              <span>{service.price_range || "Custom"}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-400">
              <Clock className="w-3 h-3" />
              <span>{service.duration || "Flexible"}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            className="opacity-100 transition-all duration-300"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
          >
            <Link href={`/services/${service.slug}`}>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 text-sm">
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await fetch("/api/data/services");
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

        const sortedData = parsedData.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return a.sort_order - b.sort_order;
        });

        setServices(sortedData);
        setFilteredServices(sortedData);
      } catch (err) {
        console.error("Failed to fetch all services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  // Filter services based on search and category
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      if (selectedCategory === "featured") {
        filtered = filtered.filter((service) => service.is_featured);
      }
      // Add more category filters as needed
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory]);

  if (loading) {
    return <LoadingIndicator message="Loading services..." />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    {
      id: "featured",
      name: "Featured",
      count: services.filter((s) => s.is_featured).length,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-red-900/20 py-20 px-6">
        <div className="w-full h-[300px] md:h-[400px] relative z-10 mx-auto">
          <motion.div
            className="text-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Our <span className="text-red-600">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions designed to transform your
              business. From concept to deployment, we deliver excellence across
              every touchpoint.
            </p>
          </motion.div>

          {/* stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { end: 6, label: "Services Available" },
              { end: 4, label: "Expert Team" },
              { end: 98, label: "Success Rate" },
              { end: 8, label: "B2B served" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 shadow-xl hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.08 }}
              >
                <StatCounter end={stat.end} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="bg-gray-900/30 py-8 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-800/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-red-600 hover:bg-red-700/30 text-white"
                      : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/30 hover:ring-gray-600 hover:ring-1"
                  }`}
                >
                  {category.name} {category.count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No services found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  {selectedCategory === "all"
                    ? "All Services"
                    : "Featured Services"}
                  <span className="text-gray-500 text-2xl ml-2">
                    {filteredServices.length}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Need a <span className="text-red-500">Custom Solution?</span>
          </motion.h2>

          <motion.p
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Don't see exactly what you're looking for? We specialize in creating
            tailored solutions that fit your unique requirements.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                Discuss Your Project
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-red-600 text-white font-semibold rounded-lg transition-all duration-300">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
