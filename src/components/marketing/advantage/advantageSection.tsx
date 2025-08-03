
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import AdvantageItem from "./advantageItem";

interface Advantage {
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    title: "Innovation-Driven Solutions",
    description:
      "We leverage cutting-edge technologies to build future-proof digital products that keep you ahead.",
  },
  {
    title: "Client-Centric Partnership",
    description:
      "Your vision is our blueprint. We collaborate closely to deliver tailored solutions that meet your unique goals.",
  },
  {
    title: "Proven Expertise & Quality",
    description:
      "Our experienced team delivers exceptional craftsmanship and measurable results, ensuring your success.",
  },
  {
    title: "Sustainable Impact",
    description:
      "Beyond technology, we build solutions that empower communities and foster positive, lasting change.",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function AdvantagesSection() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(advantages.length).fill(false)
  );
 
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemRefs.current.set(index, el);
    } else {
      itemRefs.current.delete(index);
    }
  }, []);

  useEffect(() => {
    const elementsToObserve = Array.from(itemRefs.current.values());

    const observers = elementsToObserve.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
               setCheckedItems((prev) => {
              if (!prev[index]) {
                const newChecked = [...prev];
                newChecked[index] = true;
                return newChecked;
              }
              return prev;
            });
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
     }, [advantages.length]); 

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  return (
    <section className="relative py-16 md:py-20 min-h-screen w-full bg-black overflow-hidden text-white">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        ></div>
      </div>

      {/* Subtle red gradient overlay*/}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/5"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-white">
            The <span className="text-red-600">Jiaminie</span> Advantage
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Why clients choose us for their most ambitious digital challenges.
          </p>
        </motion.div>

        {/* Advantages List */}
        <div className="space-y-6 max-w-7xl mx-auto">
          {advantages.map((advantage, index) => (
            <AdvantageItem
              key={index}
              advantage={advantage}
              index={index}
              isChecked={checkedItems[index]}
              onToggle={handleCheckboxChange}
              setItemRef={setItemRef} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}