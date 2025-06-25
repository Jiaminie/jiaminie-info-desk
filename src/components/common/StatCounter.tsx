"use client";

import { useEffect, useState } from "react";

interface StatProps {
  end: number;
  label: string;
}

export default function StatCounter({ end, label }: StatProps) {
  const [count, setCount] = useState<number>(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);
  }, [inView, label]);

  useEffect(() => {
    if (inView) {
      const duration = 2500;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }
  }, [inView, end]);

  return (
    <div id={`stat-${label}`} className="text-center p-6">
      <div className="text-5xl font-bold text-blue-600 mb-2">
        {count.toLocaleString()}+
      </div>
      <p className="text-xl text-gray-700">{label}</p>
    </div>
  );
}
