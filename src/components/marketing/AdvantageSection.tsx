"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Users, Award, Leaf, Check } from "lucide-react";

interface Advantage {
  icon: React.ElementType;
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    icon: Lightbulb,
    title: "Innovation-Driven Solutions",
    description: "We leverage cutting-edge technologies to build future-proof digital products that keep you ahead.",
  },
  {
    icon: Users,
    title: "Client-Centric Partnership",
    description: "Your vision is our blueprint. We collaborate closely to deliver tailored solutions that meet your unique goals.",
  },
  {
    icon: Award,
    title: "Proven Expertise & Quality",
    description: "Our experienced team delivers exceptional craftsmanship and measurable results, ensuring your success.",
  },
  {
    icon: Leaf,
    title: "Sustainable Impact",
    description: "Beyond technology, we build solutions that empower communities and foster positive, lasting change.",
  },
];

// Variants for the main section header
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Variants for each individual list item container
const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// Variants for the select box (starts as empty box, gets ticked)
const selectBoxVariants: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 }
  },
};

// Variants for the CheckCircle icon (the tick)
const checkmarkIconVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.4, 
      delay: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    } 
  },
};

// Variants for the title text
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};

// Variants for the description text, simulating a typing effect
const descriptionTypingVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: (textLength: number) => ({
    width: '100%',
    opacity: 1,
    transition: {
      width: { duration: textLength * 0.02, ease: "linear" },
      opacity: { duration: 0.1, delay: textLength * 0.02 },
      delay: 0.5
    }
  }),
};

export default function AdvantagesSection() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(advantages.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCheckedItems(prev => {
              const newChecked = [...prev];
              newChecked[index] = true;
              return newChecked;
            });
          }
        },
        { threshold: 0.6 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems(prev => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };
  return (
    <section className="relative py-16 md:py-20 bg-black/80 backdrop-blur-sm text-white overflow-hidden">
      {/* Optional: Subtle background pattern or gradient for personality */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            The <span className="gradient-text">Jiaminie</span> Advantage
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Why clients choose us for their most ambitious digital challenges.
          </p>
        </motion.div>

        {/* Advantages List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="flex items-start p-3 md:p-4"
              variants={listItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Actual Checkbox */}
              <label className="flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="sr-only" // Hide the default checkbox
                />
                <div className="w-8 h-8 border-2 border-white/40 rounded-md flex items-center justify-center flex-shrink-0 bg-transparent relative transition-all duration-200 hover:border-white/60">
                  {/* Checkmark Icon that appears when checked */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={checkedItems[index] ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.3
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check 
                      size={16} 
                      strokeWidth={3} 
                      className="text-[var(--color-maasai-red)]" 
                    />
                  </motion.div>
                </div>
              </label>
              
              <div className="flex-1 overflow-hidden">
                {/* Title */}
                <motion.h3
                  className="text-lg font-bold mb-1 text-white"
                  variants={titleVariants}
                >
                  {advantage.title}
                </motion.h3>
                {/* Description with Typing Effect */}
                <motion.p
                  className="text-white/70 leading-relaxed text-sm whitespace-nowrap overflow-hidden"
                  variants={descriptionTypingVariants}
                  custom={advantage.description.length}
                >
                  {advantage.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}