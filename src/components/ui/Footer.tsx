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
      className="relative bg-[var(--color-maasai-black)] text-white py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-3xl font-bold text-[var(--color-maasai-accent)]">JIAMINIE.Inc</h3>
            </div>
            <p className="text-[var(--color-maasai-light-grey)] leading-relaxed mb-6 max-w-md">
              Empowering businesses through innovative digital solutions and
              sustainable technology practices.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, platform, href }) => (
                <motion.a
                  key={platform}
                  href={href}
                  className="w-10 h-10 bg-[var(--color-maasai-red)] hover:bg-[var(--color-maasai-accent)] rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-maasai-red)]/25"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Follow us on ${platform}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-[var(--color-maasai-accent)]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-[var(--color-maasai-light-grey)] hover:text-[var(--color-maasai-accent)] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-[var(--color-maasai-accent)]">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[var(--color-maasai-light-grey)]">
                <div className="w-8 h-8 bg-[var(--color-maasai-red)]/20 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-[var(--color-maasai-accent)]" />
                </div>
                <a
                  href="mailto:info@jiaminie.inc"
                  className="hover:text-[var(--color-maasai-accent)] transition-colors duration-300"
                >
                  jiaminie.inc@proton.me
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-maasai-light-grey)]">
                <div className="w-8 h-8 bg-[var(--color-maasai-red)]/20 rounded-lg flex items-center justify-center">
                  <Phone size={16} className="text-[var(--color-maasai-accent)]" />
                </div>
                <a
                  href="tel:+1555123456"
                  className="hover:text-[var(--color-maasai-accent)] transition-colors duration-300"
                >
                  +254-114-102-575
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-maasai-light-grey)]">
                <div className="w-8 h-8 bg-[var(--color-maasai-red)]/20 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-[var(--color-maasai-accent)]" />
                </div>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-maasai-dark-grey)] pt-8 text-center">
          <p className="text-[var(--color-maasai-light-grey)] flex items-center justify-center gap-2">
            © 2025 JIAMINIE.Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}