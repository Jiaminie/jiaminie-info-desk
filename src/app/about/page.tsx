"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Users,
  Code,
  Smartphone,
  Globe,
  Zap,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with cutting-edge technologies",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Solutions",
      description:
        "Native and cross-platform mobile applications for iOS and Android",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "WhatsApp Integration",
      description: "Seamless WhatsApp business solutions and automation",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Transformation",
      description: "End-to-end digital solutions that modernize your business",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ];

  const values = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Innovation",
      description:
        "We stay ahead of technology trends to deliver cutting-edge solutions",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Quality",
      description:
        "Every line of code is crafted with precision and attention to detail",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reliability",
      description: "We build robust, scalable solutions you can depend on",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Partnership",
      description:
        "We work alongside our clients as trusted technology partners",
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "120px 120px",
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-600 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 8}%`,
                transform: `translate(${mousePosition.x * 0.03 * (i + 1)}px, ${
                  mousePosition.y * 0.03 * (i + 1)
                }px)`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-7xl md:text-8xl font-light mb-8 leading-tight">
            About
            <span className="block text-red-600 text-6xl md:text-7xl font-light">
              Jiaminie.inc
            </span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
            We craft digital experiences that transform businesses and
            <span className="text-red-500 font-medium"> shape the future</span>.
          </p>
        </motion.div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl font-bold mb-8">
                Our <span className="text-red-600">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Jiaminie Tech is a dynamic, Kenya-based automation and systems 
                  integration company on a mission to build scalable digital 
                  infrastructure for African businesses. We position ourselves as 
                  the vital "automation layer" enabling SMEs and enterprises across 
                  East Africa to overcome operational fragmentation.
                </p>
                <p>
                  We address a critical market pain point: the significant time and 
                  money lost by businesses due to manual processes and disconnected 
                  systems. Jiaminie Tech distinguishes itself by developing solutions 
                  tailored to local realities, with a deep, specialized understanding 
                  of WhatsApp-centric commerce and communication patterns prevalent 
                  in the region.
                </p>
                <p>
                  Today, we stand as a testament to the power of innovation,
                  driven by our commitment to excellence and our passion for
                  creating digital experiences that matter.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeInUp}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885301/saidimu_mcqsnn.jpg"
                  alt="Our Journey"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl font-bold mb-6">
              What We <span className="text-red-600">Do</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We specialize in creating comprehensive digital solutions that
              drive growth and transform businesses across industries.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group p-8 rounded-2xl bg-black/50 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl font-bold mb-6">
              Our <span className="text-red-600">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we
              approach every project and partnership.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600/20 mb-6">
                  <div className="text-red-600">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-red-600 mr-4" />
                    <h3 className="text-3xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To simplify complex operations by connecting systems, 
                    automating workflows, and enabling businesses to focus on 
                    growth instead of manual processes.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-8 h-8 text-red-600 mr-4" />
                    <h3 className="text-3xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To become East Africa's leading automation layer for SMEs 
                    and enterprises, empowering them to operate faster, smarter, 
                    and at scale through intelligent integrations.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeInUp}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1735653353/samples/cloudinary-group.jpg"
                  alt="Our Vision"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-900/20 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, red 0%, transparent 50%), radial-gradient(circle at 75% 75%, red 0%, transparent 50%)`,
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to <span className="text-red-600">Transform</span>?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with innovative
            digital solutions tailored to your business needs.
          </p>

          <button className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-red-600 rounded hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50" onClick={() => window.location.href = "/contact"}>
            <span className="relative z-10">Get In Touch</span>
          </button>
        </motion.div>
      </section>
    </div>
  );
}
