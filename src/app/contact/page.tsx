"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Code,
  Globe,
  MessageSquare,
  Smartphone,
  Star,
  Send,
  Users,
  Award,
  Zap,
  ArrowRight,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ContactForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    scheduledDate: null as Date | null,
    scheduledTime: "",
  });

  const services = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile App Development" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "Digital Marketing" },
    { id: 5, name: "E-commerce Solutions" },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable weekends and past dates
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isDisabled = isDateDisabled(date);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && setSelectedDate(date)}
          disabled={isDisabled}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
            ${
              isSelected
                ? "bg-red-600 text-white shadow-lg"
                : isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-red-100 hover:text-red-600"
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", {
      ...formData,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
    });

    setIsSubmitting(false);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <section className="py-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl font-bold mb-6">
            Start Your <span className="text-red-600">Project</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a call or fill out the form below. We'll get back to you
            within 24 hours with a comprehensive proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Schedule Your Discovery Call
              </h3>
              <p className="text-gray-600">
                Choose a convenient time to discuss your vision, goals, and how
                we can help.
              </p>
            </div>

            {/* Calendar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h4 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h4>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays()}
              </div>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-red-800 mb-2">
                  Selected Date:
                </p>
                <p className="text-red-900 font-semibold">
                  {formatDate(selectedDate)}
                </p>
              </div>
            )}

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-4">
                  Available Times
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          selectedTime === time
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Call-to-action for calendar */}
            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-green-800">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    Discovery call scheduled for {formatDate(selectedDate)} at{" "}
                    {selectedTime}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Request A Quote
              </h3>
              <p className="text-gray-300">
                Complete the form below, and we'll get back within one business
                day.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+254 712 345 678"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Service and Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    I'm Looking For... *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option
                        key={service.id}
                        value={service.name}
                        className="bg-gray-800"
                      >
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,000 - $5,000" className="bg-gray-800">
                      $1,000 - $5,000
                    </option>
                    <option value="$5,000 - $10,000" className="bg-gray-800">
                      $5,000 - $10,000
                    </option>
                    <option value="$10,000 - $25,000" className="bg-gray-800">
                      $10,000 - $25,000
                    </option>
                    <option value="$25,000+" className="bg-gray-800">
                      $25,000+
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none text-white placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>24h Response Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>NDA Available</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "",
    budget: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
    setIsSubmitting(false);
  };

  const companyInfo = {
    name: "Jiaminie.inc",
    tagline: "Building Digital Excellence",
    description:
      "We transform businesses through innovative web development, seamless WhatsApp integrations, and cutting-edge Next.js applications.",
    email: "jiaminie.inc@proton.me",
    phone: "+254 (712) 345-678",
    address: "Nairobi, Kenya",
    foundedYear: 2020,
    teamSize: "10-25 employees",
  };

  const services = [
    {
      id: 1,
      name: "Web Development",
      shortDesc: "Modern, responsive websites built with latest technologies",
      icon: <Globe className="w-6 h-6" />,
      priceRange: "$2,000 - $15,000",
      duration: "2-6 weeks",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading",
        "Mobile-First",
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      isFeatured: true,
    },
    {
      id: 2,
      name: "WhatsApp Integration",
      shortDesc: "Seamless business communication through WhatsApp API",
      icon: <MessageSquare className="w-6 h-6" />,
      priceRange: "$500 - $3,000",
      duration: "1-3 weeks",
      features: [
        "Auto-replies",
        "Customer Support",
        "Broadcasting",
        "Analytics",
      ],
      technologies: ["WhatsApp API", "Node.js", "Express", "MongoDB"],
      isFeatured: true,
    },
    {
      id: 3,
      name: "Next.js Applications",
      shortDesc: "High-performance full-stack applications",
      icon: <Code className="w-6 h-6" />,
      priceRange: "$3,000 - $20,000",
      duration: "3-8 weeks",
      features: [
        "Server-side Rendering",
        "API Routes",
        "Performance Optimized",
        "Scalable",
      ],
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL"],
      isFeatured: true,
    },
    {
      id: 4,
      name: "Mobile Development",
      shortDesc: "Cross-platform mobile apps for iOS and Android",
      icon: <Smartphone className="w-6 h-6" />,
      priceRange: "$5,000 - $25,000",
      duration: "4-12 weeks",
      features: [
        "Cross-platform",
        "Native Performance",
        "Push Notifications",
        "Offline Support",
      ],
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      isFeatured: false,
    },
  ];

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

  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background mouse tracker for the animations to show */}
        <div className="absolute inset-0 opacity-20">
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

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-7xl md:text-8xl font-light mb-8 leading-tight">
            Get In
            <span className="block text-red-600 text-6xl md:text-7xl font-light">
              Touch
            </span>
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project
            and
            <span className="text-red-500 font-medium">
              {" "}
              bring your vision to life
            </span>
            .
          </p>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-3 gap-12 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Email */}
            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600/20 mb-6 group-hover:bg-red-600/20 transition-all duration-300">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <p className="text-gray-400 mb-2">Drop us a line anytime</p>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                {companyInfo.email}
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600/20 mb-6 group-hover:bg-red-600/20 transition-all duration-300">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Call Us</h3>
              <p className="text-gray-400 mb-2">Mon-Fri 9am-6pm</p>
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                {companyInfo.phone}
              </a>
            </motion.div>

            {/* Location */}
            <motion.div className="text-center group" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600/20 mb-6 group-hover:bg-red-600/20 transition-all duration-300">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-gray-400 mb-2">Our headquarters</p>
              <p className="text-red-500">{companyInfo.address}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Final CTA */}
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
            Let's Build Something
            <span className="block text-red-600">Amazing Together</span>
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Every great project starts with a conversation. We're here to
            listen, understand, and transform your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${companyInfo.email}`}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-red-600 border-2 border-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
