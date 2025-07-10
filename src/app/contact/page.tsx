"use client";
import Navbar from "@/components/ui/Navbar";
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
} from "lucide-react";
import React, { useState } from "react";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
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

  return (
    
    <div className="flex-grow flex flex-col backdrop-blur-md bg-black/80 pt-16 pb-16 md:pt-20 md:pb-20">
    
      <div className="flex flex-col lg:flex-row flex-grow w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-2xl">
        {/* Left Side - Hero Section */}
        <div className="lg:w-1/2 bg-black relative flex items-center justify-center p-8 lg:p-12 text-white/90">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/90"></div>

          {/* Hero Image Placeholder */}
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Team working"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-sm lg:max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Ready to transform your digital presence? Let's discuss your
              project and bring your vision to life.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 lg:mb-8 text-sm md:text-base">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">50+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">24h</div>
                <div className="text-sm text-gray-400">Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">5★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 lg:space-y-4 text-xs lg:text-sm">
              <div className="flex items-center justify-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-red-400" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-red-400" />
                {/* Added `whitespace-nowrap` to prevent phone number wrapping */}
                <span className="whitespace-nowrap">{companyInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="lg:w-1/2 flex bg-[var(--color-maasai-red)] items-center justify-center p-6 sm:p-8 lg:p-12 flex-grow">
          <div className="w-full max-w-xl lg:max-w-full">
            <div className="bg-white rounded shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Start Your Project
                </h2>
                <p className="text-gray-600">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </div>

              <div className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Your company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>24h Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free Quote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
