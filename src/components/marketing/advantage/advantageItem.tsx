// components/AdvantageItem.tsx
"use client"; // This component also needs to be a Client Component

import React, { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";

interface AdvantageItemProps {
  advantage: {
    title: string;
    description: string;
  };
  index: number;
  isChecked: boolean;
  onToggle: (index: number) => void;
  // Callback to set the ref in the parent component
  setItemRef: (el: HTMLDivElement | null, index: number) => void;
}

// Framer Motion Variants for this component
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

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};

const descriptionTypingVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: (textLength: number) => ({
    width: "100%",
    opacity: 1,
    transition: {
      width: { duration: textLength * 0.02, ease: "linear" },
      opacity: { duration: 0.1, delay: textLength * 0.02 },
      delay: 0.5,
    },
  }),
};

export default function AdvantageItem({
  advantage,
  index,
  isChecked,
  onToggle,
  setItemRef,
}: AdvantageItemProps) {
  const itemLocalRef = useRef<HTMLDivElement>(null);

  // Use useEffect to pass the local ref to the parent's itemRefs array
  useEffect(() => {
    setItemRef(itemLocalRef.current, index);
  }, [index, setItemRef]); // setItemRef is stable as it's a useCallback in parent or not recreated often.

  return (
    <motion.div
      ref={itemLocalRef} // Assign local ref
      className="flex items-start p-4 md:p-6 bg-gray-900/20 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-red-600/30 transition-all duration-300 hover:bg-gray-900/30"
      variants={listItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Checkbox and its visual representation */}
      <label className="flex items-center cursor-pointer mr-6">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(index)}
          className="sr-only" 
        />
        <div className="w-8 h-8 border-2 border-gray-600 rounded-md flex items-center justify-center flex-shrink-0 bg-transparent relative transition-all duration-200 hover:border-red-500">
          {/* Checkmark icon with animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isChecked
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check size={16} strokeWidth={3} className="text-red-600" />
          </motion.div>
        </div>
      </label>

      {/* Advantage Title and Description */}
      <div className="flex-1 overflow-hidden">
        <motion.h3
          className="text-xl md:text-2xl font-medium mb-2 text-white"
          variants={titleVariants}
        >
          {advantage.title}
        </motion.h3>
        <motion.p
          className="text-gray-300 leading-relaxed text-lg whitespace-nowrap overflow-hidden"
          variants={descriptionTypingVariants}
          custom={advantage.description.length} 
        >
          {advantage.description}
        </motion.p>
      </div>
    </motion.div>
  );
}