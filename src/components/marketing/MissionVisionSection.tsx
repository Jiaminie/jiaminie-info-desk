"use client";
import { motion } from "framer-motion";

export default function MissionVisionSection() {
  return (
    <section
      id="mission"
      className="relative py-20 bg-gray-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Mission & Vision
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-300">
              Our Mission
            </h3>
            <p className="text-lg leading-relaxed text-gray-200">
              To empower communities through sustainable technology solutions
              and impactful digital transformation, fostering self-reliance and
              brighter futures for businesses worldwide.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">
              Our Vision
            </h3>
            <p className="text-lg leading-relaxed text-gray-200">
              A world where every organization, regardless of their size or
              background, has access to cutting-edge technology and the tools
              they need to thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
