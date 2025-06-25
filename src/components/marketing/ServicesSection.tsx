'use client';
import { motion } from 'framer-motion';
import StatCounter from '../common/StatCounter';
import TextRotator from '../common/TextRotator';

export default function ServicesSection() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      icon: '🌐',
    },
    {
      title: 'Digital Strategy',
      description: 'Comprehensive digital transformation strategies for your business',
      icon: '📊',
    },
    {
      title: 'Brand Design',
      description: 'Creative branding solutions that make your business stand out',
      icon: '🎨',
    },
  ];

  const fallingHeaderVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 100,
        duration: 1.2,
        bounce: 0.6,
      },
    },
  };

  const serviceCardVariants = {
    hidden: {
      opacity: 0,
      y: -80,
      rotateX: -45,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
        duration: 0.8,
        delay: index * 0.15,
        bounce: 0.4,
      },
    }),
    hover: {
      y: [-2, -8, -2, -5, -2],
      x: [-1, 1, -1, 1, 0],
      scale: [1, 1.02, 1, 1.01, 1],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
        type: 'tween',
      },
    },
  };

  return (
    // Changed section background to a dark blue/slate color
    <section id="services" className="py-20 bg-slate-900 text-white"> 
      <div className="container mx-auto px-6">
        {/* Main Header with Falling Effect */}
        <motion.div
          className="text-center mb-16"
          variants={fallingHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6" // Changed text color to white
            animate={{
              y: [-2, 2, -2, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 1.2,
              repeat: 1,
              repeatType: 'reverse',
              ease: 'easeInOut',
              type: 'tween',
            }}
          >
            Our Services
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto" // Changed text color to a lighter gray
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            We streamline business operations by assessing various parameters
            and offering exceptional{' '}
            <TextRotator
              words={['solutions', 'analysis', 'results', 'innovations']}
            />
          </motion.p>
        </motion.div>

        {/* Service Cards with Enhanced Falling Effect */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              // Changed card background to a slightly lighter dark blue or gray-800 for contrast
              className="p-8 bg-slate-800 rounded-sm hover:shadow-xl transition-all duration-300 group hover:bg-blue-700" 
              custom={index}
              variants={serviceCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="text-4xl mb-4 group-hover:scale-110 transition-transform text-blue-400" // Icon color adjusted
              >
                {service.icon}
              </motion.div>

              <motion.h3
                className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors" // Changed text color to white, hover to lighter blue
                animate={{
                  y: [-1, 1, -1, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15 + 0.6,
                  repeat: 1,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  type: 'tween',
                }}
              >
                {service.title}
              </motion.h3>

              <motion.p
                className="text-gray-300 leading-relaxed" // Changed text color to lighter gray
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15 + 0.4,
                }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section (already has dark background and light text) */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8 bg-gradient-to-r from-blue-800 to-slate-900 rounded-2xl p-8" // Kept rounded-2xl
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            duration: 0.8,
            bounce: 0.3,
          }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{
            y: [-3, 3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="text-center text-white">
            <StatCounter end={15} label="Countries" />
          </div>
          <div className="text-center text-white">
            <StatCounter end={10} label="Years in Operation" />
          </div>
          <div className="text-center text-white">
            <StatCounter end={50} label="Partners" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}