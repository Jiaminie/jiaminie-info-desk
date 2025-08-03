"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Target,
  Palette,
  Database,
  Bug,
  Cloud,
  CheckCircle,
  Award,
  Users,
  Layout,
  Monitor,
  Code,
  Shield,
  Rocket,
  Zap,
} from "lucide-react";

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  detailedPoints: string[];
  deliverables: string[];
  duration: string;
  color: string;
  bgGradient: string;
  imageUrl: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Strategy",
    subtitle: "Understanding Your Vision",
    description:
      "We dive deep into your business goals, target audience, and market landscape to craft a comprehensive digital strategy that aligns with your objectives and drives measurable results.",
    detailedPoints: [
      "In-depth stakeholder interviews and requirements gathering",
      "Comprehensive market research and competitor analysis",
      "User persona development and journey mapping",
      "Technical feasibility assessment and technology stack recommendation",
      "Project scope definition and milestone planning",
    ],
    deliverables: [
      "Project Requirements Document (PRD)",
      "Technical Architecture Blueprint",
      "User Persona Profiles",
      "Competitive Analysis Report",
      "Project Timeline & Milestones",
    ],
    duration: "1-2 weeks",
    color: "#DC2626",
    bgGradient: "from-red-600/20 via-red-500/10 to-transparent",
    imageUrl:
      "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/unsplash-city_aeqmxi.avif",
  },
  {
    id: 2,
    title: "Design & Prototyping",
    subtitle: "Crafting Exceptional Experiences",
    description:
      "Our design team creates intuitive, accessible, and visually stunning interfaces that not only look great but provide seamless user experiences across all devices and platforms.",
    detailedPoints: [
      "Information architecture and user flow optimization",
      "High-fidelity wireframes and interactive prototypes",
      "Brand-aligned visual design system creation",
      "Responsive design for all screen sizes and devices",
      "Accessibility compliance (WCAG 2.1 AA standards)",
    ],
    deliverables: [
      "Interactive Prototypes (Figma/Adobe XD)",
      "Design System & Style Guide",
      "Responsive Design Mockups",
      "User Flow Diagrams",
      "Accessibility Audit Report",
    ],
    duration: "2-3 weeks",
    color: "#DC2626",
    bgGradient: "from-red-600/20 via-red-500/10 to-transparent",
    imageUrl:
      "https://res.cloudinary.com/dq3wkbgts/image/upload/v1751987789/maa-princess_nepjxk.jpg",
  },
  {
    id: 3,
    title: "Development & Integration",
    subtitle: "Building Robust Solutions",
    description:
      "Our expert developers transform designs into powerful, scalable applications using cutting-edge technologies, best practices, and clean, maintainable code architecture.",
    detailedPoints: [
      "Clean, scalable code architecture using modern frameworks",
      "API development and third-party service integrations",
      "Database design and optimization for peak performance",
      "Security implementation and data protection measures",
      "Progressive web app features and offline functionality",
    ],
    deliverables: [
      "Production-Ready Application",
      "API Documentation",
      "Database Schema & Migration Scripts",
      "Security Implementation Report",
      "Code Repository with Documentation",
    ],
    duration: "4-8 weeks",
    color: "#DC2626",
    bgGradient: "from-red-600/20 via-red-500/10 to-transparent",
    imageUrl:
      "https://res.cloudinary.com/dq3wkbgts/image/upload/v1735653360/cld-sample-2.jpg",
  },
  {
    id: 4,
    title: "Testing & Quality Assurance",
    subtitle: "Ensuring Excellence",
    description:
      "Rigorous testing across multiple dimensions ensures your application performs flawlessly, meets all requirements, and delivers an exceptional user experience under all conditions.",
    detailedPoints: [
      "Automated unit, integration, and end-to-end testing",
      "Cross-browser and device compatibility testing",
      "Performance optimization and load testing",
      "Security vulnerability assessment and penetration testing",
      "User acceptance testing (UAT) with real user scenarios",
    ],
    deliverables: [
      "Comprehensive Test Suite",
      "Performance Optimization Report",
      "Security Audit Results",
      "Cross-Platform Compatibility Report",
      "User Acceptance Testing Documentation",
    ],
    duration: "1-2 weeks",
    color: "#DC2626",
    bgGradient: "from-red-600/20 via-red-500/10 to-transparent",
    imageUrl:
      "https://res.cloudinary.com/dq3wkbgts/image/upload/v1735653360/samples/cup-on-a-table.jpg",
  },
  {
    id: 5,
    title: "Deployment & Launch",
    subtitle: "Going Live with Confidence",
    description:
      "We handle the complete deployment process with zero-downtime strategies, comprehensive monitoring, and ongoing support to ensure a successful launch and optimal performance.",
    detailedPoints: [
      "Production environment setup and configuration",
      "CI/CD pipeline implementation for seamless updates",
      "Performance monitoring and analytics integration",
      "SEO optimization and search engine submission",
      "24/7 monitoring and alert system setup",
    ],
    deliverables: [
      "Live Production Application",
      "CI/CD Pipeline Configuration",
      "Monitoring Dashboard Setup",
      "SEO Optimization Report",
      "Launch Support & Documentation",
    ],
    duration: "1 week",
    color: "#DC2626",
    bgGradient: "from-red-600/20 via-red-500/10 to-transparent",
    imageUrl:
      "https://res.cloudinary.com/dq3wkbgts/image/upload/v1735653360/samples/upscale-face-1.jpg",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function DarkProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        ></div>
      </div>

      {/* Subtle red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/5"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          variants={headerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light leading-tight mb-4 text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Proven{" "}
            <span className="text-red-600 block md:inline">Process</span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-6xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We don't guess. We deliver{" "}
            <span className="text-red-500 font-medium">premium software</span>{" "}
            through a meticulously crafted process that ensures every project
            exceeds expectations and drives business success.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="max-w-7xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`relative overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-500 cursor-pointer rounded-2xl bg-gray-900/50 backdrop-blur-sm group-hover:bg-gray-900/70 ${
                  activeStep === step.id
                    ? "ring-2 ring-red-500/50 border-red-500/50"
                    : ""
                }`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                {/* Card Header */}
                <div className="p-0">
                  <div className="flex flex-col lg:flex-row h-full w-full">
                    {/* Image Section */}
                    <div className="relative w-full lg:w-1/3 min-h-[200px] lg:min-h-[300px] overflow-hidden">
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/60 z-10" />

                      <img
                        src={step.imageUrl}
                        alt={step.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 lg:w-2/3 p-6 sm:p-8">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-xl font-light text-red-400 mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-gray-300 leading-relaxed text-lg font-light">
                        {step.description}
                      </p>

                      {/* Duration badge */}
                      <div className="mt-6 inline-flex items-center px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-full text-red-400 text-sm font-medium">
                        {step.duration}
                      </div>

                      {/* Expand/Collapse Indicator */}
                      <motion.div
                        className="mt-6 flex items-center gap-2 text-red-500 font-medium cursor-pointer hover:text-red-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-lg">
                          {activeStep === step.id
                            ? "Show Less"
                            : "Show Details"}
                        </span>
                        <motion.div
                          animate={{ rotate: activeStep === step.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xl"
                        >
                          ▼
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeStep === step.id ? "auto" : 0,
                    opacity: activeStep === step.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-0 pb-8 px-6 sm:px-8 border-t border-gray-800">
                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      {/* Detailed Points */}
                      <div>
                        <h4 className="text-xl font-light text-white mb-6 flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-red-500" />
                          What We Do
                        </h4>
                        <ul className="space-y-4">
                          {step.detailedPoints.map((point, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 text-gray-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0" />
                              <span className="leading-relaxed">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-xl font-light text-white mb-6 flex items-center gap-3">
                          <Award className="w-6 h-6 text-red-500" />
                          Deliverables
                        </h4>
                        <ul className="space-y-4">
                          {step.deliverables.map((deliverable, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 text-gray-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: i * 0.1 + 0.2,
                              }}
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0" />
                              <span className="font-medium leading-relaxed">
                                {deliverable}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
