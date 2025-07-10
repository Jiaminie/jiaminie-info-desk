"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link"; // For linking to contact page

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
  tap: { scale: 0.95 },
};

export default function AppointmentSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-maasai-red)] text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <CalendarCheck className="w-20 h-20 text-white mx-auto mb-6 drop-shadow-lg" />
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            Schedule a free consultation with our experts to discuss your needs and get a personalized plan.
          </p>
          <Link href="/contact" passHref>
            <motion.button
              className="inline-flex items-center px-10 py-4 bg-white text-[var(--color-maasai-red)] font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Book an Appointment
              <ArrowRight className="ml-3 w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
