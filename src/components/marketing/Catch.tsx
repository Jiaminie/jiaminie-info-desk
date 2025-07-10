"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Zap,
  TrendingUp,
  Target,
  Rocket,
  Code,
  Smartphone,
  Globe,
  Database,
  Shield,
  Users,
} from "lucide-react";

// Variants for the main text blocks (paragraphs, tag spans)
const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1, // Stagger for children elements
    },
  },
};

// New variant for the main heading's pop-in animation
const headerPopInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 }, // Start slightly smaller and invisible
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Variants for the individual icon cards
const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      delay: 0.5, // Delay icon animation slightly
    },
  },
};

export default function CatchySection() {
  return (
    <section className="relative py-20 md:py-28 min-h-screen w-full backdrop-blur-xl bg-black/50 text-white overflow-hidden flex items-center">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20V40zm20 0L40 20V0H0L20 20V40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-none px-8 md:px-16 relative z-10">
        <motion.div
          variants={textVariants} // Apply general text variants for container for staggering
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          {/* Main Heading with specific pop-in animation and gradient */}
          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
           Build bold.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Ship fast
            </span>
          </motion.h3>

          {/* Sub-paragraph */}
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-10 leading-relaxed"
            variants={textVariants} // Uses general text variants (staggered from container)
          >
            Whether you're dreaming up a brand, launching a product, or scaling
            a platform — we turn ideas into seamless, beautiful digital
            experiences.
          </motion.p>

          {/* Highlighted Services Tags */}
          <motion.div
            variants={textVariants} // Uses general text variants (staggered from container)
            className="flex flex-wrap justify-center gap-4 text-md md:text-lg text-white/70" // Adjusted font size
          >
            <span className="px-5 py-2 border border-[var(--color-maasai-red)]/50 rounded-full bg-[var(--color-maasai-red)]/10">
              {" "}
              {/* Adjusted border color */}
              Web Development
            </span>
            <span className="px-5 py-2 border border-[var(--color-maasai-red)]/50 rounded-full bg-[var(--color-maasai-red)]/10">
              {" "}
              {/* Adjusted border color */}
              Mobile Apps
            </span>
            <span className="px-5 py-2 border border-[var(--color-maasai-red)]/50 rounded-full bg-[var(--color-maasai-red)]/10">
              {" "}
              {/* Adjusted border color */}
              Cloud Solutions
            </span>
            <span className="px-5 py-2 border border-[var(--color-maasai-red)]/50 rounded-full bg-[var(--color-maasai-red)]/10">
              {" "}
              {/* Adjusted border color */}
              API Development
            </span>
          </motion.div>
        </motion.div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-20">
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Code className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">
              Custom Development
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Smartphone className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">Mobile First</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Globe className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">Global Scale</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Database className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">Data Solutions</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">
              Secure & Reliable
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-16 h-16 text-[var(--color-maasai-accent)] mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-lg font-semibold text-white">User Focused</p>
          </motion.div>
        </div>

        {/* Closing Call to Action */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12"
            variants={textVariants}
          >
            Join hundreds of satisfied clients who've transformed their
            businesses with our cutting-edge solutions. Your success story
            starts here.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
