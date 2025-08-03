import React, { useState, useEffect } from "react";
import { AlertTriangle, Zap, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  message: string;
  fullScreen?: boolean;
  className?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message,
  fullScreen = true,
  className = "",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerClass = fullScreen
    ? "py-20 bg-black flex justify-center items-center h-screen relative overflow-hidden"
    : "py-8 flex justify-center items-center bg-black relative";

  return (
    <section className={`${containerClass} ${className}`}>
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            animation: "gridGlitch 3s ease-in-out infinite",
          }}
        />
      </div>

      <div className="text-center relative z-10">
        <div className="p-8 max-w-2xl mx-auto ">
          {/* Error Icon with Animation */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              <AlertTriangle className="w-20 h-20 text-red-500 mx-auto drop-shadow-2xl animate-pulse" />
            </div>
          </div>

          {/* Error Message */}
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed font-light mb-8">
            {message}
          </p>

          {/* Action Button */}
          <button
            onClick={() => window.location.reload()}
            className="group relative inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded shadow-2xl hover:shadow-red-600/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Button content */}
            <span className="relative z-10 flex items-center">
              <RefreshCw className="w-5 h-5 mr-3 group-hover:animate-spin" />
              Try Again
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
