"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import ErrorPage from "@/components/ui/error-page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";

interface ProjectImageProps {
  id: string;
  icon?: React.ReactNode;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}
interface ProjectData {
  id: string;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ArtCarouselProps {
  projects: ProjectData[];
}

const ProjectImage = ({
  icon,
  imageSrc,
  altText,
  title,
  description,
}: ProjectImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertDiaologOpen, setIsAlertDailogOpen] = useState(false);

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] cursor-pointer group">
      <div
        className="relative w-full h-full rounded-xl overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Dark Overlay Behind Image */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        {/* Image */}
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 z-0 rounded-xl"
        />

        {/* Blur & Title Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full bg-black/50 flex items-center justify-center">
            <div className="text-white text-center space-y-1">
              <div className="text-3xl">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          </div>
        </div>
      </div>

      {!isOpen && (
        <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-2 text-white">
          <AlertDialog
            open={isAlertDiaologOpen}
            onOpenChange={setIsAlertDailogOpen}
          >
            {!isAlertDiaologOpen && (
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-500 bg-red-600/10 border-red-500 hover:text-white hover:bg-red-600/10 border px-4 py-2 rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.4)] hover:shadow-[0_0_15px_4px_rgba(239,68,68,0.7)] transition duration-300 ease-in-out"
                >
                  Read More
                </Button>
              </AlertDialogTrigger>
            )}
            <AlertDialogContent className="z-[1000] p-6">
              <AlertDialogHeader className="bg-red/60 backdrop-blur-sm text-left">
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-600/10 border-red-500 hover:text-white hover:bg-red-600/10 border px-4 py-2 rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.4)] hover:shadow-[0_0_15px_4px_rgba(239,68,68,0.7)] transition duration-300 ease-in-out">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

const ArtCarousel = ({ projects }: ArtCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const total = projects.length;

  // Handle carousel API events
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const handleScroll = () => {
      const progress = Math.max(0, Math.min(1, api.scrollProgress()));
      setScrollProgress(progress);
    };

    api.on("select", handleSelect);
    api.on("scroll", handleScroll);

    // Initialize values
    handleSelect();
    handleScroll();

    return () => {
      api.off("select", handleSelect);
      api.off("scroll", handleScroll);
    };
  }, [api]);

  // Autoplay functionality
  useEffect(() => {
    if (!api || isDragging) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api, isDragging]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!api) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }

      setIsDragging(false);
    },
    [api]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default scrolling behavior during horizontal swipes
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = Math.abs(touchStartX.current - touchX);
    const deltaY = Math.abs(touchStartY.current - touchY);

    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }, []);

  // Mouse drag handlers for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!api) return;

      const mouseEndX = e.clientX;
      const deltaX = touchStartX.current - mouseEndX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }

      setIsDragging(false);
    },
    [api]
  );

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Progress bar - shows overall scroll progress */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => api?.scrollPrev()}
        className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <button
        onClick={() => api?.scrollNext()}
        className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Next slide"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>

      {/* Carousel with touch/drag support */}
      <Carousel
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        setApi={setApi}
        className="w-full h-[70vh] overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <CarouselContent className="basis-full md:basis-1/2 lg:basis-1/3">
          {projects.map((project) => (
            <CarouselItem
              key={project.id}
              className="overflow-visible relative z-10 select-none"
            >
              <ProjectImage {...project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const FounderSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-[70vh] bg-black text-white px-4 sm:px-6 md:px-12 lg:px-20 flex items-center py-8 sm:py-12"
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left Side - Description */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-red-600">
            Meet the Visionaries
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our founders didn’t just build a business—they sparked a movement.
            Driven by purpose, powered by passion, and guided by timeless
            values, their vision reshapes how we think, live, and thrive.
          </p>
          <blockquote className="italic text-gray-400 border-l-4 border-gray-700 pl-4">
            “We are not building for today—we are chiseling a legacy for
            tomorrow.”
          </blockquote>
          <div className="text-sm text-gray-500">— The Founders</div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 relative group">
          <div className="overflow-hidden rounded-2xl shadow-lg grayscale group-hover:grayscale-0 transition duration-700 ease-in-out">
            <img
              src="https://res.cloudinary.com/dq3wkbgts/image/upload/v1735653360/cld-sample.jpg"
              alt="Founders looking timeless"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
const JiaminiePortfolio = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/data/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Expected array but got: " + typeof data);
        }

        setProjects(data);

        const imageUrls = data
          .map((project) => project.imageSrc)
          .filter(Boolean);

        setProjectImages(imageUrls);
      } catch (error: any) {
        console.error("Failed to fetch projects:", error);
        setError(error.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <LoadingIndicator message="Loading.." />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section with Background Images */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Background Images */}
        <div className="absolute inset-0 opacity-20">
          {projectImages.map((img, i) => (
            <div
              key={img}
              className={cn(
                "absolute rounded-lg overflow-hidden transition-all duration-1000 ease-out",
                "w-[90vw] h-[30vh]",
                "sm:w-[60vw] sm:h-[35vh]", // small screens
                "md:w-[40vw] md:h-[35vh]", // medium screens
                "lg:w-[30vw] lg:h-[40vh]" // large screens
              )}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                transform: `translate(${mousePosition.x * 0.02 * (i + 1)}px, ${
                  mousePosition.y * 0.02 * (i + 1)
                }px) rotate(${-5 + i * 2}deg)`,
                zIndex: 1,
              }}
            >
              <img
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ zIndex: 0 }}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "120px 120px",
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-6 leading-tight tracking-tight">
              <span className="block text-red-600 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider">
                Jiaminie.inc
              </span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light">
              We don't just build products—we craft digital experiences that
              <span className="text-red-500 font-medium">
                {" "}
                literary we have this on our back
              </span>{" "}
              .
            </p>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="w-full bg-black flex flex-col lg:flex-row items-center justify-center gap-6 px-6 py-12 md:p overflow-hidden">
        {/* Heading */}
        <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-start px-4 md:px-8 lg:px-12 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Success <span className="text-red-600">Speaks</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="w-full lg:w-2/3">
          <ArtCarousel projects={projects} />
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

      {/* yearn section  */}
      <section className="w-full bg-black text-white py-24 px-6 flex items-center justify-center">
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-xl md:text-2xl italic text-gray-300 animate-fade-in">
            “Every great move begins with a bold step into the unknown...”
          </p>
          <span className="block h-1 w-20 bg-orange-500 mx-auto rounded-full"></span>
          <p className="text-md text-gray-500">Are you ready for the leap?</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, red 0%, transparent 50%), radial-gradient(circle at 75% 75%, red 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8">
            Ready to <span className="text-red-500">Disrupt?</span>
          </h2>
          <p className="text-2xl mb-12 text-gray-300">
            Let's build something extraordinary together.
          </p>

          <button
            className="group relative inline-flex bg-red-600  rounded hover:bg-red-700 hover:text-white hover:shadow-lg hover:shadow-red-600/30 items-center justify-center px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-bold"
            onClick={() => (window.location.href = "/contact")}
          >
            <span className="relative z-10">Start Your Project</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default JiaminiePortfolio;
