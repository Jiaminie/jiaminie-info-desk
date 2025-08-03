"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { CalendarCheck, ArrowRight, Zap, Target } from "lucide-react";

const sectionVariants:Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const buttonVariants:Variants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
};

const iconVariants:Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function DarkAppointmentSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

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
    <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(220,38,38,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.2) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            transform: `translate(${scrollY * 0.03}px, ${scrollY * 0.015}px)`,
          }}
        />
      </div>

      {/* Dynamic Red Gradients */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)`,
            left: `${10 + mousePosition.x * 0.015}%`,
            top: `${-20 + mousePosition.y * 0.01}%`,
            transform: `translate(-50%, -50%)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)`,
            right: `${20 + mousePosition.x * 0.012}%`,
            bottom: `${-10 + mousePosition.y * 0.008}%`,
            transform: `translate(50%, 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Animated Icon */}
          <motion.div variants={iconVariants} className="relative mb-8">
            <div className="relative inline-block">
              <CalendarCheck className="w-24 h-24 text-red-500 mx-auto drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
          >
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              Disrupt
            </span>
            <br />
            Your Industry?
          </motion.h2>

          {/* Divider Line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto mb-8 rounded-full"
            variants={{
              hidden: { width: 0 },
              visible: { width: 128, transition: { duration: 1, delay: 0.4 } },
            }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.6 },
              },
            }}
          >
            Schedule a free consultation with our{" "}
            <span className="text-red-400 font-medium">visionary experts</span>{" "}
            to discuss your boldest ideas and craft a personalized plan that{" "}
            <span className="text-white font-medium">exceeds expectations</span>
            .
          </motion.p>

          {/* Inspirational Quote */}
          <motion.div
            className="mb-12"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.8 },
              },
            }}
          >
            <p className="text-lg md:text-xl italic text-gray-400 mb-2">
              "Every revolution starts with a single conversation..."
            </p>
            <div className="w-16 h-0.5 bg-red-500 mx-auto rounded-full" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, delay: 1 },
              },
            }}
          >
            <motion.button
              className="group relative inline-flex items-center px-12 py-6 bg-red-600 text-white font-bold text-xl shadow-2xl hover:shadow-red-600/50 rounded transition-all duration-300 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push('/contact')}
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                Book Your Revolution
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 -top-2 -left-2 w-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:w-full group-hover:left-full transition-all duration-700" />
            </motion.button>
          </motion.div>

          {/* Additional CTA Text */}
          <motion.p
            className="text-sm text-gray-500 mt-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.6, delay: 1.2 },
              },
            }}
          >
            No obligations. Just possibilities.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
