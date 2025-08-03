"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  client_company?: string;
  quote: string;
  rating: number; // 1-5
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Random visual elements for each card
const cardEnhancements = [
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop&crop=geometry",
    gradient: "from-red-400/20 via-red-600/10 to-transparent",
    pattern: "geometric",
  },
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=200&h=120&fit=crop&crop=geometry",
    gradient: "from-red-600/20 via-red-600/10 to-transparent",
    pattern: "waves",
  },
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=120&fit=crop&crop=geometry",
    gradient: "from-red-300/20 via-red-600/10 to-transparent",
    pattern: "dots",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const testimonialCardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(255,0,0,0.1)",
    transition: { duration: 0.3 },
  },
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/data/testimonials");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Testimonial[] = await response.json();
        setTestimonials(
          data.filter((t) => t.is_active && t.is_featured).slice(0, 3)
        );
      } catch (err: any) {
        console.error("Failed to fetch testimonials:", err);
        setError(`Failed to load testimonials: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black flex justify-center items-center">
        <p className="text-xl text-gray-300">Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-black flex justify-center items-center">
        <p className="text-xl text-red-500">{error}</p>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-black text-center text-gray-500">
        <p>No testimonials available at the moment.</p>
      </section>
    );
  }

  const GeometricPattern = () => (
    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-10">
      <div className="w-full h-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-red-400"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              top: `${i * 3}px`,
              right: `${i * 3}px`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );

  const WavePattern = () => (
    <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden opacity-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 Q50,0 100,20 T200,20 L200,40 L0,40 Z"
          fill="currentColor"
          className="text-blue-400"
        />
      </svg>
    </div>
  );

  const DotPattern = () => (
    <div className="absolute top-4 left-4 w-24 h-24 opacity-10">
      <div className="grid grid-cols-6 gap-2 w-full h-full">
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-orange-400 rounded-full"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderPattern = (patternType: string) => {
    switch (patternType) {
      case "geometric":
        return <GeometricPattern />;
      case "waves":
        return <WavePattern />;
      case "dots":
        return <DotPattern />;
      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-black text-white overflow-hidden">
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-white tracking-tight">
            What Our <span className="text-red-600">Clients</span> Say
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Hear directly from those who've experienced the Jiaminie difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const enhancement =
              cardEnhancements[index % cardEnhancements.length];

            return (
              <motion.div
                key={testimonial.id}
                className="relative bg-gray-900/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col justify-between h-full border border-gray-800/50 hover:border-red-600/30 transition-all duration-300"
                variants={testimonialCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {/* Background Image */}
                <div
                  className="absolute top-0 right-0 w-32 h-20 opacity-20 rounded-bl-xl"
                  style={{
                    backgroundImage: `url(${enhancement.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${enhancement.gradient} pointer-events-none`}
                />

                {/* Decorative Pattern */}
                {renderPattern(enhancement.pattern)}

                {/* Card Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-red-600 mb-4 relative z-10" />
                    <p className="text-gray-300 leading-relaxed italic text-lg relative z-10">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-start mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-medium text-white text-lg mb-1">
                      {testimonial.client_name}
                    </p>
                    <p className="text-sm text-gray-400 font-light">
                      {testimonial.client_title}
                      {testimonial.client_company
                        ? `, ${testimonial.client_company}`
                        : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
