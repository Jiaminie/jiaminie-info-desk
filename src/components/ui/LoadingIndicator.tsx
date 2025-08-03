import React from "react";

interface LoadingIndicatorProps {
  message: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  fullScreen = true,
  className = "",
}) => {
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
            backgroundImage: `linear-gradient(rgba(220,38,38,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Red Gradient */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute w-96 h-96 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Loading text */}
        <div className="space-y-3">
          <p className="text-2xl md:text-3xl font-light text-white tracking-wide">
            {message}
          </p>

          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            <div
              className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>

          {/* Subtle tagline */}
          <p className="text-sm text-gray-400 font-light mt-4 italic">
            Crafting excellence...
          </p>
        </div>
      </div>

      {/* Custom CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </section>
  );
};

export default LoadingIndicator;
