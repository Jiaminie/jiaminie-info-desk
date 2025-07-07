"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight, ArrowUp, MessageCircle, Share2 } from "lucide-react";
import Navbar from "@/components/ui/Navbar";


interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  project: string;
  technologies: string[];
  results: string;
  projectUrl?: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "CEO",
    content:
      "Jiamine.inc transformed our digital presence completely. Their web development expertise helped us increase our online conversions by 300%. The team was professional, responsive, and delivered everything on time.",
    avatar: "SJ",
    project: "E-commerce Platform",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    results: "300% increase in online conversions",
    projectUrl: "https://example.com",
    upvotes: 247,
    comments: 18,
    timeAgo: "2 months ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "GrowthCorp",
    role: "Marketing Director",
    content:
      "The digital strategy they implemented revolutionized our approach to customer engagement. Results exceeded our expectations within 3 months. The WhatsApp bot integration was game-changing for our customer service.",
    avatar: "MC",
    project: "WhatsApp Customer Service Bot",
    technologies: ["WhatsApp API", "Node.js", "AI/ML", "MongoDB"],
    results: "85% reduction in response time",
    projectUrl: "https://example.com",
    upvotes: 189,
    comments: 12,
    timeAgo: "1 month ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "InnovateLab",
    role: "Founder",
    content:
      "Their brand design work elevated our company image and helped us secure major partnerships. The attention to detail was outstanding, and the real estate platform they built exceeded all our expectations.",
    avatar: "ER",
    project: "Real Estate Platform",
    technologies: ["React", "Next.js", "Mapbox", "Supabase"],
    results: "50% increase in property inquiries",
    projectUrl: "https://example.com",
    upvotes: 156,
    comments: 9,
    timeAgo: "3 weeks ago"
  },
  {
    id: 4,
    name: "David Park",
    company: "DigitalWave",
    role: "CTO",
    content:
      "Professional, innovative, and results-driven. Jiamine.inc delivered a cutting-edge solution that streamlined our entire operation. The corporate dashboard became the central hub for all our business operations.",
    avatar: "DP",
    project: "Corporate Dashboard",
    technologies: ["React", "TypeScript", "GraphQL", "AWS"],
    results: "40% improvement in operational efficiency",
    projectUrl: "https://example.com",
    upvotes: 203,
    comments: 15,
    timeAgo: "1 week ago"
  },
];

export default function RedditStyleTestimonialsPortfolio() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      
      {/* Header with Real Background Image */}
      <div className="w-full relative h-80 bg-cover bg-center" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
      }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl font-bold mb-4">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Real testimonials and project showcases from our satisfied clients
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Reddit Style Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column - Portfolio (3/4 width) */}
          <div className="lg:col-span-3 space-y-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center space-y-2">
                        <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                          <ArrowUp className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="text-sm font-bold text-gray-900">
                          {testimonial.upvotes}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {testimonial.project}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {testimonial.company}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          {testimonial.content}
                        </p>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {testimonial.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold text-green-800 mb-1">
                            Results Achieved
                          </h4>
                          <p className="text-green-700">
                            {testimonial.results}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                            <Github className="w-4 h-4" />
                            <span>Case Study</span>
                          </button>
                          <div className="flex items-center space-x-6 text-sm text-gray-500 ml-auto">
                            <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{testimonial.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Testimonials (1/4 width) */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Client Testimonials
              </h3>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={`testimonial-${testimonial.id}`}
                  variants={itemVariants}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors p-4"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{testimonial.timeAgo}</span>
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      <span>{testimonial.upvotes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-6">
              Join our growing list of satisfied clients
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}