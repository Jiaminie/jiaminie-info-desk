"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react"; // Quote icon for testimonials

// Define interface for Testimonial data
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
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
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
        const response = await fetch('/api/data/testimonials'); // Fetch testimonials from your API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Testimonial[] = await response.json();
        // Filter for active and featured testimonials, or just active if you want more
        setTestimonials(data.filter(t => t.is_active && t.is_featured).slice(0, 3)); // Limit to 3 for homepage
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
      <section className="py-20 bg-white/90 flex justify-center items-center">
        <p className="text-xl text-[var(--color-maasai-dark-grey)]">Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white/90 flex justify-center items-center">
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-white/90 text-center text-gray-500">
        <p>No testimonials available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 bg-white/90 text-[var(--color-maasai-dark-grey)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-maasai-dark-grey)]/80 max-w-3xl mx-auto">
            Hear directly from those who've experienced the Jiaminie difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full border border-gray-100"
              variants={testimonialCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[var(--color-maasai-red)] mb-4" />
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div>
                <div className="flex items-center justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-semibold text-[var(--color-maasai-dark-grey)]">
                  {testimonial.client_name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.client_title}{testimonial.client_company ? `, ${testimonial.client_company}` : ''}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
