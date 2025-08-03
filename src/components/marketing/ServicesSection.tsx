"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Globe,
  BarChart3,
  Palette,
  MessageCircle,
  Smartphone,
  Code,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";

// Mock data for demonstration
const mockServices = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description:
      "We create stunning, responsive websites that drive business growth and enhance user experience through cutting-edge technologies and modern design principles.",
    short_desc: "Custom web solutions that scale with your business",
    icon: "Globe",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Monitoring",
      "Security Implementation",
      "Content Management",
    ],
    is_featured: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Mobile Development",
    slug: "mobile-development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices, built with performance and scalability in mind.",
    short_desc: "Native mobile apps for iOS and Android",
    icon: "Smartphone",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    features: [
      "Cross-Platform",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
      "App Store Optimization",
    ],
    is_featured: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Data Analytics",
    slug: "data-analytics",
    description:
      "Transform your data into actionable insights with our comprehensive analytics solutions, featuring advanced visualization, predictive modeling, and business intelligence.",
    short_desc: "Data-driven insights for better decisions",
    icon: "BarChart3",
    technologies: ["Python", "R", "Tableau", "Power BI", "Apache Spark"],
    features: [
      "Real-time Analytics",
      "Custom Dashboards",
      "Predictive Modeling",
      "Data Visualization",
      "Business Intelligence",
    ],
    is_featured: false,
    sort_order: 3,
  },
  {
    id: "4",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Create memorable user experiences through thoughtful design that combines aesthetics with functionality, ensuring your product stands out in the market.",
    short_desc: "Beautiful, intuitive user interfaces",
    icon: "Palette",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer"],
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
    is_featured: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Comprehensive digital marketing strategies that amplify your brand presence, drive engagement, and convert leads into loyal customers through multi-channel approaches.",
    short_desc: "Strategic marketing for digital growth",
    icon: "MessageCircle",
    technologies: [
      "Google Ads",
      "Facebook Ads",
      "SEO Tools",
      "Analytics",
      "CRM",
    ],
    features: [
      "SEO/SEM",
      "Social Media Marketing",
      "Content Strategy",
      "Email Marketing",
      "Performance Analytics",
    ],
    is_featured: false,
    sort_order: 5,
  },
  {
    id: "6",
    name: "Custom Software",
    slug: "custom-software",
    description:
      "Tailored software solutions designed specifically for your business needs, from enterprise applications to specialized tools that streamline operations and boost productivity.",
    short_desc: "Bespoke software solutions",
    icon: "Code",
    technologies: ["Python", "Java", "C#", "Docker", "Kubernetes"],
    features: [
      "Custom Development",
      "System Integration",
      "API Development",
      "Cloud Deployment",
      "Maintenance Support",
    ],
    is_featured: true,
    sort_order: 6,
  },
];

const getIconComponent = (iconName: string) => {
  const iconProps = { className: "w-8 h-8" };
  switch (iconName) {
    case "Globe":
      return <Globe {...iconProps} />;
    case "MessageCircle":
      return <MessageCircle {...iconProps} />;
    case "Code":
      return <Code {...iconProps} />;
    case "Smartphone":
      return <Smartphone {...iconProps} />;
    case "ChartNoAxesCombined":
    case "BarChart3":
      return <BarChart3 {...iconProps} />;
    case "Palette":
      return <Palette {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
};

export default function ServicesOverview() {
  const [services] = useState(mockServices);
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Auto-rotate active service
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
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

  const activeServiceVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="min-h-screen w-full bg-black text-white">
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

      <div className="container mx-auto px-6 pt-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light leading-tight text-white tracking-tight mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Explore the Rich Catalogue of{" "}
            <span className="text-transparent font-light leading-tight bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Jiaminie Services
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="flex flex-col items-start justify-between gap-8 lg:gap-10 md:flex-row md:items-center">
            {/* Left Text Content */}
            <div className="flex-1 md:pr-8">
              <motion.p
                className="text-lg md:text-xl lg:text-xl text-gray-300 text-left max-w-3xl md:max-w-none leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                We know it's not just software, it's the first impression of
                you. Your vibe. Your brand. Your values. That's why Jiaminie
                crafts apps that speak your language, represent your culture,
                and leave a mark.
              </motion.p>
            </div>

            {/* Right Button */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex justify-center md:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <Button
                    size="lg"
                    className="group relative px-8 md:px-12 py-4 md:py-6 text-base md:text-lg bg-red-600/20 text-red-400 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-white hover:bg-red-600 border border-red-600/30 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={() => {
                      window.location.href = "/services";
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      View Our Services
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Services Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeService === index ? "z-10" : "z-0"
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ease-in-out h-64 ${
                    activeService === index
                      ? "bg-gradient-to-br from-red-600 to-red-700 text-white border-red-500 shadow-xl"
                      : "bg-gray-900/30 backdrop-blur-md text-white border-gray-700/40 hover:border-red-500/40 hover:shadow-lg"
                  }  ${
                    hoveredCard === index ? "transform -translate-y-2" : ""
                  } `}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 mb-4 transition-all duration-300
                    ${
                      activeService === index
                        ? " text-white"
                        : " text-red-400 group-hover:"
                    }
                  `}
                  >
                    {getIconComponent(service.icon)}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 transition-colors duration-300">
                    {service.name}
                  </h3>

                  <p
                    className={`
                    text-sm leading-relaxed transition-colors duration-300
                    ${
                      activeService === index
                        ? "text-white/90"
                        : "text-gray-300"
                    }
                  `}
                  >
                    {service.short_desc}
                  </p>

                  {/* Active Indicator */}
                  {activeService === index && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full shadow-lg flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-3 h-3 bg-black rounded-full" />
                    </motion.div>
                  )}
                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none transition duration-300 ${
                      hoveredCard === index
                        ? "shadow-[0_0_20px_5px_rgba(239,68,68,0.5)]"
                        : ""
                    }`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Service Details Panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                variants={activeServiceVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gray-900/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-800/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-600/20 rounded-xl text-red-400">
                    {getIconComponent(services[activeService].icon)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      {services[activeService].name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-2" />
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {services[activeService].description}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {services[activeService].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-medium border border-red-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Key Features
                  </h4>
                  <div className="space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <motion.div
                  className="flex items-center gap-4 pt-6 border-t border-gray-700"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-red-400 font-semibold cursor-pointer">
                    <span className="hover:[text-shadow:_0_0_20px_rgba(248,113,113,0.9)] transition duration-300">
                      Explore Details
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-1" />
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <span className="hover:[text-shadow:_0_0_20px_rgba(156,163,175,0.7)] transition duration-300">
                      View Portfolio
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${
                      index === activeService
                        ? "bg-red-600 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="my-20 text-center">
          <h3 className="text-3xl md:text-4xl font-light leading-tight text-red-600 mb-4">
            Write Your Success Story With Us
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
            We believe in results that speak louder than words. Here's a
            snapshot of what we've achieved with our partners so far.
          </p>
        </div>

        {/* Stats Section */}
        <motion.div
          className="my-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            {
              number: "15+",
              label: "Projects Completed",
              color: "from-red-600 to-red-400",
            },
            {
              number: "5+",
              label: "Content B2B Clients",
              color: "from-red-500 to-red-300",
            },
            {
              number: "3+",
              label: "Years Experience",
              color: "from-red-600 to-red-400",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-900/30 backdrop-blur-md rounded-xl ring-1 ring-red-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <div
                className={`text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]`}
              >
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-transparent py-8">
          <div className="max-w-7xl mx-auto px-6 text-white text-center">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {" "}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <h3 className="text-2xl md:text-base text-red-500 font-bold tracking-widest uppercase leading-tight">
                  Together with our partners, we build what's next
                </h3>
              </div>
              {/* Logos Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                  <Image
                    alt="Brand 1"
                    src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1751641327/logo_v51aad.png"
                    width={160}
                    height={80}
                    className="object-contain max-h-20 w-auto"
                  />
                  <Image
                    alt="Brand 2"
                    src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1753970074/jiaminie_logo_transparent_rk48wz.png"
                    width={160}
                    height={80}
                    className="object-contain max-h-20 w-auto"
                  />
                  <Image
                    alt="Brand 3"
                    src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1753971283/rongai-movers_mcvlde.png"
                    width={160}
                    height={80}
                    className="object-contain max-h-20 w-auto"
                  />
                  <Image
                    alt="Brand 4"
                    src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1753949267/waruiru_logo_vi0llw.png"
                    width={160}
                    height={80}
                    className="object-contain max-h-20 w-auto"
                  />
                  {/* Add more Image components as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom variables */}
      <style jsx global>{`
        :root {
          --color-maasai-red: #dc2626;
          --color-maasai-blue: #2563eb;
          --color-maasai-accent: #ea580c;
          --color-maasai-dark-grey: #1f2937;
          --color-maasai-light-grey: #f3f4f6;
          --color-maasai-black: #111827;
        }
      `}</style>
    </section>
  );
}
