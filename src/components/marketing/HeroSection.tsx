"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// I think it is almost perfect,  TODO: the typing animations is not smooth later

export default function HeroSection() {
  const router = useRouter();

  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const title = "Custom software solutions just for you";
  const desc =
    "We transform businesses through innovative web development, seamless WhatsApp integrations, and cutting-edge Next.js applications.";

  useEffect(() => {
    let tIdx = 0;
    let dIdx = 0;

    const titleInterval = setInterval(() => {
      setTypedTitle(title.slice(0, tIdx++));
      if (tIdx > title.length) clearInterval(titleInterval);
    }, 50);

    const descDelay = setTimeout(() => {
      const descInterval = setInterval(() => {
        setTypedDesc(desc.slice(0, dIdx++));
        if (dIdx > desc.length) clearInterval(descInterval);
      }, 20);
    }, title.length * 50 + 300);

    return () => {
      clearInterval(titleInterval);
      clearTimeout(descDelay);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dq3wkbgts/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1753885301/saidimu_mcqsnn.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      />
      {/* blur overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-7xl sm:text-6xl md:text-8xl font-light text-white/80 leading-tight mb-6">
            <span className="text-red-600 text-6xl md:text-7xl font-light">
              {typedTitle}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12">
            {typedDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group relative px-10 py-6
               bg-white text-red-700 font-semibold rounded shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:text-white/80 hover:bg-red-700 overflow-hidden"
              onClick={() => router.push("/services")}
            >
              <span className="relative z-10 flex items-center">
                View Our Services
              </span>
            </Button>

            <Button
              size="lg"
              className="group relativepx-10 py-6 bg-red-700 text-white font-semibold rounded shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:text-red-700 hover:bg-white overflow-hidden"
              onClick={() => router.push("/portfolio")}
            >
              <span className="relative z-10">See Our Work</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
