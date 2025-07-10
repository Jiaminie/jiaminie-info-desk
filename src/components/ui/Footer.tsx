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
import Link from "next/link";
export default function Footer() {
  const socialLinks = [
    { icon: Facebook, platform: "Facebook", href: "#" },
    { icon: Twitter, platform: "Twitter", href: "#" },
    { icon: Linkedin, platform: "LinkedIn", href: "#" },
    { icon: Instagram, platform: "Instagram", href: "#" },
  ];
  const quickLinks = [
    { name: "Home", href: "/home" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <footer
      className="relative bg-[var(--color-maasai-black)] text-white py-10 md:py-14 overflow-hidden bottom-0 w-full"
    >
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
 <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="block">
                <motion.span
                  className={`text-xl sm:text-2xl font-bold tracking-tight
                  text-[var(--color-maasai-red)]
                  `}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Jiaminie
                  <span className="text-sm font-normal opacity-80">.inc</span>
                </motion.span>
              </Link>
            </motion.div>            </div>
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
                  href="tel:+ +254-114-102-5756"
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

       <div className="border-t border-[var(--color-maasai-dark-grey)] pt-6 md:pt-8 text-center">
          <p className="text-[var(--color-maasai-light-grey)] flex items-center justify-center gap-2">
            © 2025 Jiaminie.Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}