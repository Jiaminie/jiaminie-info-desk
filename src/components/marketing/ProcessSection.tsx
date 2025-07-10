"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Layout, Code, Rocket, CheckCircle } from "lucide-react";

interface Step {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgGradient: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Discovery & Strategy",
    description:
      "We start by understanding your vision, goals, and target audience to craft a tailored digital strategy.",
    color: "#E53935",
    bgGradient: "from-red-500/20 via-red-400/10 to-transparent",
  },
  {
    id: 2,
    icon: Layout,
    title: "Design & Prototyping",
    description:
      "Bringing your ideas to life with intuitive UI/UX design and interactive prototypes for early feedback.",
    color: "#FF7043",
    bgGradient: "from-orange-500/20 via-orange-400/10 to-transparent",
  },
  {
    id: 3,
    icon: Code,
    title: "Development & Integration",
    description:
      "Our expert developers build robust, scalable, and secure solutions using cutting-edge technologies.",
    color: "#2196F3",
    bgGradient: "from-blue-500/20 via-blue-400/10 to-transparent",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Testing & Quality Assurance",
    description:
      "Rigorous testing ensures your application is flawless, performs optimally, and delivers a seamless user experience.",
    color: "#263238",
    bgGradient: "from-gray-600/20 via-gray-500/10 to-transparent",
  },
  {
    id: 5,
    icon: Rocket,
    title: "Deployment & Launch",
    description:
      "We handle the deployment process, ensuring a smooth and successful launch of your digital product.",
    color: "#E53935",
    bgGradient: "from-red-500/20 via-red-400/10 to-transparent",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function ProcessSection() {
  return (
    <section className="relative min-h-screen py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50 text-[var(--color-maasai-dark-grey)] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-red-500/15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 min-w-screen">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Process
            </span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-2xl md:text-3xl text-[var(--color-maasai-dark-grey)]/70 max-w-4xl mx-auto font-light">
            From concept to launch, we guide you every step of the way.
          </p>
        </motion.div>

        {/* Flowing Process Steps */}
        <div className="relative max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`relative mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex flex-col md:flex items-center justify-center`}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Floating Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-1/2 -bottom-10 w-0.5 h-10 bg-gradient-to-b from-red-500/50 to-transparent transform -translate-x-1/2 md:hidden"
                  initial={{ height: 0 }}
                  whileInView={{ height: 40 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              )}

              {/* Icon Section */}
              <motion.div
                className="flex-shrink-0 relative group"
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Morphing Background */}
                <motion.div
                  className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${step.color}20, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Main Icon Container */}
                <motion.div
                  className="relative z-10 w-24 h-24 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}15, ${step.color}30)`,
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    background: `linear-gradient(135deg, ${step.color}30, ${step.color}50)`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon
                    className="w-12 h-12 z-10 relative"
                    style={{ color: step.color }}
                  />
                </motion.div>

                {/* Step Number */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center text-sm font-bold"
                  style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                  initial={{ rotate: -45, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {step.id}
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className={`flex-1 ${
                  index % 2 === 0 ? "md:ml-16" : "md:mr-16"
                } mt-8 md:mt-0 text-center md:text-left max-w-2xl`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Title with Dynamic Underline */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {step.title}
                  <motion.div
                    className="absolute -bottom-2 left-0 md:left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-600 leading-relaxed text-lg font-light relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {step.description}
                </motion.p>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-2 h-2 bg-red-500/30"
                  style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>

              {/* Connecting Flow Lines for Desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <svg width="200" height="100" className="absolute top-16">
                    <motion.path
                      d={`M 0 0 Q 100 ${index % 2 === 0 ? "50" : "-50"} 200 0`}
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                    <defs>
                      <linearGradient
                        id="flowGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#E53935"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="50%"
                          stopColor="#FF7043"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#2196F3"
                          stopOpacity="0.3"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Final Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="relative px-12 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xl font-bold overflow-hidden group"
            style={{
              clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">Start Your Journey</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
