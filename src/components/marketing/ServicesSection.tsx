"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Globe, BarChart3, Palette, MessageCircle, Smartphone, Code, ArrowRight, ExternalLink } from "lucide-react";

// Mock data for demonstration
const mockServices = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "We create stunning, responsive websites that drive business growth and enhance user experience through cutting-edge technologies and modern design principles.",
    short_desc: "Custom web solutions that scale with your business",
    icon: "Globe",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    features: ["Responsive Design", "SEO Optimization", "Performance Monitoring", "Security Implementation", "Content Management"],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "2",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices, built with performance and scalability in mind.",
    short_desc: "Native mobile apps for iOS and Android",
    icon: "Smartphone",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    features: ["Cross-Platform", "Native Performance", "Push Notifications", "Offline Support", "App Store Optimization"],
    is_featured: true,
    sort_order: 2
  },
  {
    id: "3",
    name: "Data Analytics",
    slug: "data-analytics",
    description: "Transform your data into actionable insights with our comprehensive analytics solutions, featuring advanced visualization, predictive modeling, and business intelligence.",
    short_desc: "Data-driven insights for better decisions",
    icon: "BarChart3",
    technologies: ["Python", "R", "Tableau", "Power BI", "Apache Spark"],
    features: ["Real-time Analytics", "Custom Dashboards", "Predictive Modeling", "Data Visualization", "Business Intelligence"],
    is_featured: false,
    sort_order: 3
  },
  {
    id: "4",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Create memorable user experiences through thoughtful design that combines aesthetics with functionality, ensuring your product stands out in the market.",
    short_desc: "Beautiful, intuitive user interfaces",
    icon: "Palette",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer"],
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
    is_featured: true,
    sort_order: 4
  },
  {
    id: "5",
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital marketing strategies that amplify your brand presence, drive engagement, and convert leads into loyal customers through multi-channel approaches.",
    short_desc: "Strategic marketing for digital growth",
    icon: "MessageCircle",
    technologies: ["Google Ads", "Facebook Ads", "SEO Tools", "Analytics", "CRM"],
    features: ["SEO/SEM", "Social Media Marketing", "Content Strategy", "Email Marketing", "Performance Analytics"],
    is_featured: false,
    sort_order: 5
  },
  {
    id: "6",
    name: "Custom Software",
    slug: "custom-software",
    description: "Tailored software solutions designed specifically for your business needs, from enterprise applications to specialized tools that streamline operations and boost productivity.",
    short_desc: "Bespoke software solutions",
    icon: "Code",
    technologies: ["Python", "Java", "C#", "Docker", "Kubernetes"],
    features: ["Custom Development", "System Integration", "API Development", "Cloud Deployment", "Maintenance Support"],
    is_featured: true,
    sort_order: 6
  }
];

const getIconComponent = (iconName: string) => {
  const iconProps = { className: "w-8 h-8" };
  switch (iconName) {
    case 'Globe': return <Globe {...iconProps} />;
    case 'MessageCircle': return <MessageCircle {...iconProps} />;
    case 'Code': return <Code {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'ChartNoAxesCombined':
    case 'BarChart3':
      return <BarChart3 {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    default: return <Globe {...iconProps} />;
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

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const headerVariants:Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const activeServiceVariants:Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_var(--color-maasai-red)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_var(--color-maasai-blue)_0%,_transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
            <motion.h2 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-8"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Services</span>
                    </motion.h2>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Transforming businesses through innovative technology solutions that drive growth, enhance efficiency, and create exceptional user experiences.
          </motion.p>
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
                  transition: { duration: 0.3 }
                }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeService === index ? 'z-10' : 'z-0'
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`
                  relative p-8 rounded-2xl transition-all duration-500 h-64
                  ${activeService === index 
                    ? 'bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm text-slate-800 shadow-lg hover:shadow-xl'
                  }
                  ${hoveredCard === index ? 'transform -translate-y-2' : ''}
                `}>
                  
                  {/* Icon */}
                  <div className={`
                    inline-flex p-4 rounded-xl mb-4 transition-all duration-300
                    ${activeService === index 
                      ? 'bg-white/20 text-white' 
                      : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                    }
                  `}>
                    {getIconComponent(service.icon)}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className={`
                    text-sm leading-relaxed transition-colors duration-300
                    ${activeService === index ? 'text-white/90' : 'text-slate-600'}
                  `}>
                    {service.short_desc}
                  </p>

                  {/* Active Indicator */}
                  {activeService === index && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-3 h-3 bg-red-600 rounded-full" />
                    </motion.div>
                  )}

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-opacity duration-300
                    ${hoveredCard === index ? 'bg-gradient-to-br from-red-600/10 to-orange-500/10' : 'opacity-0'}
                  `} />
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
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-50 rounded-xl text-red-600">
                    {getIconComponent(services[activeService].icon)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {services[activeService].name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mt-2" />
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {services[activeService].description}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[activeService].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <motion.div
                  className="flex items-center gap-4 pt-6 border-t border-slate-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group flex items-center gap-2 text-red-600 font-semibold cursor-pointer">
                    <span>Explore Details</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="group flex items-center gap-2 text-slate-600 cursor-pointer">
                    <span>View Portfolio</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
                    ${index === activeService 
                      ? 'bg-red-600 w-8' 
                      : 'bg-slate-300 hover:bg-slate-400'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { number: "150+", label: "Projects Completed", color: "from-red-600 to-orange-500" },
            { number: "50+", label: "Happy Clients", color: "from-blue-600 to-purple-500" },
            { number: "10+", label: "Years Experience", color: "from-green-600 to-teal-500" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
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