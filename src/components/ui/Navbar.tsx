"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        isMobileMenu &&
        !target.closest(".mobile-menu") &&
        !target.closest('button[aria-label="Open mobile menu"]')
      ) {
        setIsMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenu]);

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    setIsMobileMenu(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-maasai-light-grey)]/90 backdrop-blur-xl shadow-2xl border-b border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/home" className="block">
                <motion.span
                  className={`text-xl sm:text-2xl font-bold tracking-tight ${
                    scrolled ? "text-[var(--color-maasai-red)]" : "text-white"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Jiaminie
                  <span className="text-sm font-normal opacity-80">.inc</span>
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-4 py-2 rounded text-sm font-medium transition-all duration-300 group ${
                      scrolled
                        ? "text-[var(--color-maasai-dark-grey)] hover:text-[var(--color-maasai-red)]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {/* Hover effect background */}
                    <motion.div
                      className={`absolute inset-0 rounded transition-all duration-300 ${
                        scrolled
                          ? "bg-[var(--color-maasai-red)]/0 group-hover:bg-[var(--color-maasai-red)]/10"
                          : "bg-white/0 group-hover:bg-black/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    />

                    {/* Active indicator */}
                    {activeItem === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[var(--color-maasai-red)] rounded"
                        layoutId="activeIndicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ x: "-50%" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenu(true)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-[var(--color-maasai-dark-grey)] hover:text-[var(--color-maasai-red)] hover:bg-[var(--color-maasai-red)]/10"
                    : "text-white hover:text-white hover:bg-white/10"
                }`}
                aria-label="Open mobile menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenu(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[var(--color-maasai-light-grey)]/95 backdrop-blur-xl z-[999] md:hidden border-l border-white/10 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between h-16 sm:h-20 px-6 border-b border-white/10">
                <motion.span
                  className="text-xl font-bold text-[var(--color-maasai-red)]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Menu
                </motion.span>
                <motion.button
                  onClick={() => setIsMobileMenu(false)}
                  className="p-2 rounded-xl text-[var(--color-maasai-dark-grey)] hover:text-[var(--color-maasai-red)] hover:bg-[var(--color-maasai-red)]/10 transition-all duration-200"
                  aria-label="Close mobile menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`block text-lg font-medium py-4 px-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                          activeItem === item.path
                            ? "text-[var(--color-maasai-red)] bg-[var(--color-maasai-red)]/10 border-l-4 border-[var(--color-maasai-red)]"
                            : "text-[var(--color-maasai-dark-grey)] hover:text-[var(--color-maasai-red)] hover:bg-[var(--color-maasai-red)]/5"
                        }`}
                      >
                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 bg-[var(--color-maasai-red)]/5 rounded-xl"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />

                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom decoration */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-[var(--color-maasai-dark-grey)]/60 text-center">
                    © 2024 Jiaminie.inc
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
