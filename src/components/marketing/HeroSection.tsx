"use client";

import { motion } from "framer-motion";
import { Volleyball } from "lucide-react";

export default function HeroSection() {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="text-center text-white px-6 relative z-10 max-w-4xl mx-auto"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          variants={childVariants}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r jiaminie-gradient-text text-transparent">
            Jiaminie.inc
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-200"
          variants={childVariants}
        >
          Make your app the best it can be with our innovative solutions
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={childVariants}
        >
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-sm shadow-xl transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
          <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-sm transition-all duration-300 transform hover:scale-105">
            Watch Demo
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Volleyball className="w-6 h-6 text-white rounded-full" />
      </motion.div>
    </section>
  );
}
