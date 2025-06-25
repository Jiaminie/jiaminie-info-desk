"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, platform: "Facebook", href: "#" },
    { icon: Twitter, platform: "Twitter", href: "#" },
    { icon: Linkedin, platform: "LinkedIn", href: "#" },
    { icon: Instagram, platform: "Instagram", href: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Mission", href: "#mission" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-slate-900 text-white py-16 overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-3xl font-bold text-blue-400">JIAMINIE.Inc</h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Empowering businesses through innovative digital solutions and
              sustainable technology practices.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, platform, href }) => (
                <motion.a
                  key={platform}
                  href={href}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Follow us on ${platform}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-400">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <a
                  href="mailto:info@jiaminie.inc"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  jiaminie.inc@proton.me
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <a
                  href="tel:+1555123456"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  +254-114-102-575
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400 flex items-center justify-center gap-2">
            © 2025 JIAMINIE.Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
