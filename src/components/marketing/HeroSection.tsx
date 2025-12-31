"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

export default function HeroSection() {
  const router = useRouter();

  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const title = "Custom software solutions just for you";
  const desc =
    "We transform businesses through innovative web development, seamless WhatsApp integrations, and cutting-edge Next.js applications.";

  // Smoother typing animation using requestAnimationFrame-compatible timing
  useEffect(() => {
    let tIdx = 0;
    let dIdx = 0;
    let titleTimer: NodeJS.Timeout;
    let descTimer: NodeJS.Timeout;
    let descDelayTimer: NodeJS.Timeout;

    // Type title with smooth variable speed
    const typeTitle = () => {
      if (tIdx <= title.length) {
        setTypedTitle(title.slice(0, tIdx));
        tIdx++;
        // Slightly variable speed for more natural feel
        const delay = 40 + Math.random() * 20;
        titleTimer = setTimeout(typeTitle, delay);
      } else {
        // Start description after title completes
        descDelayTimer = setTimeout(typeDesc, 200);
      }
    };

    // Type description with faster, smoother pace
    const typeDesc = () => {
      if (dIdx <= desc.length) {
        setTypedDesc(desc.slice(0, dIdx));
        dIdx++;
        const delay = 15 + Math.random() * 10;
        descTimer = setTimeout(typeDesc, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start after a brief delay for page load
    const startDelay = setTimeout(typeTitle, 300);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
      clearTimeout(descDelayTimer);
    };
  }, []);

  // Smooth cursor blinking
  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete]);

  // Button container animation variants
  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.15,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom animation */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dq3wkbgts/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1753885301/saidimu_mcqsnn.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay with fade-in */}
      <motion.div
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Title with typing effect */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-red-600 font-light block">
              {typedTitle}
              <span
                className={`inline-block w-[3px] h-[0.85em] bg-red-600 ml-1 align-middle transition-opacity duration-100 ${
                  showCursor && !isTypingComplete ? "opacity-100" : isTypingComplete && showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </motion.h1>

          {/* Description with smooth appearance */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12 min-h-[4rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: typedDesc.length > 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {typedDesc}
          </motion.p>

          {/* Buttons with staggered animation */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={buttonContainerVariants}
            initial="hidden"
            animate={isTypingComplete ? "visible" : "hidden"}
          >
            <motion.div variants={buttonVariants}>
              <Button
                size="lg"
                className="group relative px-10 py-6 bg-white text-red-700 font-semibold rounded-lg shadow-xl 
                  hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
                  hover:bg-red-600 hover:text-white overflow-hidden"
                onClick={() => router.push("/services")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Our Services
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button
                size="lg"
                className="group relative px-10 py-6 bg-red-600 text-white font-semibold rounded-lg shadow-xl 
                  hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
                  hover:bg-white hover:text-red-700 overflow-hidden border-2 border-transparent hover:border-red-600"
                onClick={() => router.push("/portfolio")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  See Our Work
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isTypingComplete ? 0.6 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-white/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-light tracking-wider">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
