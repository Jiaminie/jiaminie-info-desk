"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"; // Assuming Radix UI Avatar
import { Badge } from "@/components/ui/badge"; // Adjusted import path
import { PlayCircle, Award, TrendingUp, Users, Sparkles } from "lucide-react"; // Added new icons
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Define interfaces for fetched data
interface CompanyInfo {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  logo_url?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  social_links?: { [key: string]: string }; // JSON field
  business_hours?: { [key: string]: string }; // JSON field
  founded_year?: number;
  team_size?: string;
  updated_at: string;
  // Potentially new fields for narrative:
  journey_overview?: string;
  services_evolution_text?: string;
  success_story_summary?: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo_url?: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  skills?: string[]; // JSON field
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: string;
  category:
    | "COMPANY_INTRO"
    | "SERVICE_DEMO"
    | "CLIENT_TESTIMONIAL"
    | "BEHIND_SCENES"
    | "TUTORIAL";
  is_featured: boolean;
  is_active: boolean;
  view_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const contentBlockVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function AboutSection() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, teamRes, videoRes] = await Promise.all([
          fetch("/api/data/company-info"),
          fetch("/api/data/team-members"),
          fetch("/api/data/videos"),
        ]);

        if (!companyRes.ok)
          throw new Error(`HTTP error! Company Info: ${companyRes.status}`);
        if (!teamRes.ok)
          throw new Error(`HTTP error! Team Members: ${teamRes.status}`);
        if (!videoRes.ok)
          throw new Error(`HTTP error! Videos: ${videoRes.status}`);

        const companyData: CompanyInfo = await companyRes.json();
        const teamData: TeamMember[] = await teamRes.json();
        const videoData: Video[] = await videoRes.json();

        // Parse JSON fields where applicable
        const parsedTeamData = teamData.map((member) => ({
          ...member,
          skills:
            typeof member.skills === "string"
              ? JSON.parse(member.skills)
              : member.skills,
        }));

        setCompanyInfo(companyData);
        setTeamMembers(parsedTeamData);
        setVideos(videoData);
      } catch (err: any) {
        console.error("Failed to fetch data for About Section:", err);
        setError(`Failed to load content: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white/80 flex justify-center items-center h-screen">
        <p className="text-xl text-[var(--color-maasai-dark-grey)]">
          Loading About Us content...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white/80 flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  // Filter videos for different sections
  const companyIntroVideo = videos.find(
    (v) => v.category === "COMPANY_INTRO" && v.is_active
  );
  const clientTestimonialVideos = videos
    .filter((v) => v.category === "CLIENT_TESTIMONIAL" && v.is_active)
    .slice(0, 2); // Get up to 2 testimonials
  const otherVideos = videos
    .filter(
      (v) =>
        v.is_active &&
        v.category !== "COMPANY_INTRO" &&
        v.category !== "CLIENT_TESTIMONIAL"
    )
    .slice(0, 3); // Other active videos

  return (
    <div className="min-h-screen ">
      <section className="py-20 backdrop-blur-md bg-black/80">
        <div className="container mx-auto px-6">
          {/* Main Header */}
          <motion.div
            className="text-center mb-16"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-maasai-light-grey)] mb-6">
              Our Story, Our Journey
            </h2>
            <div className="w-24 h-1 bg-[var(--color-maasai-red)] mx-auto mb-8"></div>
            <p className="text-xl text-[var(--color-maasai-light-grey)] max-w-3xl mx-auto">
              {companyInfo?.tagline ||
                "Discover who we are, where we've come from, and where we're headed."}
            </p>
          </motion.div>

          {/* Company Overview & Founding Story */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
            variants={contentBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-4">
                From Vision to Reality
              </h3>
              <p className="text-lg mb-6 text-[var(--color-maasai-light-grey)] leading-relaxed">
                {companyInfo?.description ||
                  "At Jiaminie.inc, our journey began with a simple yet profound vision: to bridge the gap between innovative ideas and tangible digital solutions. Founded in {companyInfo?.founded_year || '2020'}, we set out to create a company that not only builds professional websites but also deeply understands and reflects our clients' organizational visions and values."}
              </p>
              <p className="text-lg text-[var(--color-maasai-light-grey)] leading-relaxed">
                Our growth has been fueled by a relentless commitment to digital
                transformation, driving meaningful change for businesses across
                various sectors. We believe in the power of technology to
                empower, connect, and elevate.
              </p>
            </div>
            <motion.div
              className="relative order-1 md:order-2"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="relative h-80 overflow-hidden shadow-2xl rounded-lg">
                <img
                  src={
                    companyInfo?.logo_url ||
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  }
                  alt="Our Founding Story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-maasai-black)]/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Development Journey & Evolution of Services */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
            variants={contentBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div
              className="relative"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="relative h-80 overflow-hidden shadow-2xl rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dd3474d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Development Journey"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-maasai-black)]/20 to-transparent"></div>
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-4">
                Evolving with Technology
              </h3>
              <p className="text-lg mb-6 text-[var(--color-maasai-light-grey)] leading-relaxed">
                {companyInfo?.services_evolution_text ||
                  "Our development journey is a continuous cycle of learning, adapting, and innovating. We started with core web development, quickly expanding our expertise to include complex WhatsApp integrations, robust Next.js applications, and comprehensive mobile solutions. Each new service is carefully integrated, driven by market needs and our commitment to offering holistic digital transformation."}
              </p>
              <p className="text-lg text-[var(--color-maasai-light-grey)] leading-relaxed">
                We pride ourselves on staying at the forefront of technological
                advancements, ensuring our clients always receive solutions that
                are not just current, but future-ready.
              </p>
            </div>
          </motion.div>

          {/* Meet Our Team (Integrated) */}
          {teamMembers.length > 0 && (
            <motion.div
              className="mb-20"
              variants={contentBlockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-8 text-center">
                The Minds Behind the Magic
              </h3>
              <p className="text-xl text-[var(--color-maasai-light-grey)]/80 max-w-3xl mx-auto text-center mb-10">
                Our diverse team of passionate experts is the heart of
                Jiaminie.inc, bringing creativity and technical prowess to every
                project.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.slice(0, 3).map(
                  (
                    member,
                    index // Limit to 3 for a concise overview
                  ) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white h-full flex flex-col rounded-lg">
                        <CardHeader className="p-6 pb-0">
                          <div className="flex justify-center mb-4">
                            <Avatar className="w-24 h-24 rounded-full overflow-hidden">
                              <AvatarImage
                                src={
                                  member.photo_url ||
                                  `https://placehold.co/100x100/E0E0E0/333333?text=${member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}`
                                }
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                              <AvatarFallback className="bg-[var(--color-maasai-blue)] text-white text-xl font-bold w-full h-full flex items-center justify-center">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <CardTitle className="text-xl text-[var(--color-maasai-light-grey)] font-bold">
                            {member.name}
                          </CardTitle>
                          <CardDescription className="text-[var(--color-maasai-red)] font-medium">
                            {member.title}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-4 space-y-4 flex-grow flex flex-col justify-between">
                          <p className="text-sm text-[var(--color-maasai-light-grey)]/80 leading-relaxed">
                            {member.bio}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center mt-auto">
                            {member.skills && member.skills.length > 0 ? (
                              member.skills.map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="secondary"
                                  className="text-xs bg-[var(--color-maasai-blue)]/10 text-[var(--color-maasai-blue)] border-[var(--color-maasai-blue)]/20"
                                >
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-xs text-gray-500 border-gray-300"
                              >
                                No skills listed
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                )}
              </div>
              {teamMembers.length > 3 && (
                <div className="text-center mt-10">
                  <a
                    href="/team"
                    className="text-[var(--color-maasai-red)] hover:underline font-semibold"
                  >
                    View All Team Members &rarr;
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {/* Success Stories & Impact (Integrated with Videos) */}
          <motion.div
            className="mb-20"
            variants={contentBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-8 text-center">
              Our Impact & Success Stories
            </h3>
            <p className="text-xl text-[var(--color-maasai-light-grey)]/80 max-w-3xl mx-auto text-center mb-10">
              {companyInfo?.success_story_summary ||
                "We measure our success by the growth and transformation of our clients. From empowering local artisans to streamlining global operations, our solutions create tangible value."}
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Block for Success Story Intro */}
              <div className="order-2 md:order-1">
                <h4 className="text-2xl font-bold text-[var(--color-maasai-light-grey)] mb-4 flex items-center">
                  <Award className="w-6 h-6 text-[var(--color-maasai-accent)] mr-2" />
                  Real Results, Real Partnerships
                </h4>
                <p className="text-lg text-[var(--color-maasai-light-grey)] leading-relaxed mb-4">
                  Our commitment extends beyond code; we build lasting
                  partnerships. Each project is a testament to our collaborative
                  spirit and dedication to achieving outstanding outcomes. We
                  thrive on seeing our clients not just succeed, but excel.
                </p>
                {clientTestimonialVideos.length > 0 && (
                  <p className="text-lg text-[var(--color-maasai-light-grey)] leading-relaxed mb-4">
                    Hear directly from our satisfied partners about how
                    Jiaminie.inc has transformed their businesses.
                  </p>
                )}
                <a
                  href="/portfolio"
                  className="text-[var(--color-maasai-red)] hover:underline font-semibold"
                >
                  Explore Our Case Studies &rarr;
                </a>
              </div>

              {/* Client Testimonial Videos (if available) */}
              {clientTestimonialVideos.length > 0 && (
                <motion.div
                  className="order-1 md:order-2 grid grid-cols-1 gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {clientTestimonialVideos.map((video, index) => (
                    <div
                      key={video.id}
                      className="relative rounded-lg overflow-hidden shadow-lg border border-gray-100"
                    >
                      <img
                        src={
                          video.thumbnail_url ||
                          `https://placehold.co/300x180/E0E0E0/333333?text=Client+Story`
                        }
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <a
                          href={video.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-red-400 transition-colors"
                        >
                          <PlayCircle className="w-12 h-12" />
                        </a>
                      </div>
                      <div className="p-3 bg-white text-[var(--color-maasai-light-grey)]">
                        <h5 className="font-semibold text-sm">{video.title}</h5>
                        <p className="text-xs text-gray-500">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* See Our Story in Action (Company Intro Video) */}
          {companyIntroVideo && (
            <motion.div
              className="mb-20 text-center"
              variants={contentBlockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-8">
                See Our Story in Action
              </h3>
              <p className="text-xl text-[var(--color-maasai-light-grey)]/80 max-w-3xl mx-auto mb-10">
                Get a quick overview of Jiaminie.inc's mission, values, and what
                drives us.
              </p>
              <div className="relative w-full max-w-3xl mx-auto h-96 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={
                    companyIntroVideo.thumbnail_url ||
                    `https://placehold.co/800x400/E0E0E0/333333?text=Company+Intro+Video`
                  }
                  alt={companyIntroVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <a
                    href={companyIntroVideo.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    <PlayCircle className="w-20 h-20" />
                  </a>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-3 rounded-md">
                  <h4 className="font-semibold">{companyIntroVideo.title}</h4>
                  <p className="text-sm opacity-80">
                    {companyIntroVideo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Relevant Videos (Smaller Grid) */}
          {otherVideos.length > 0 && (
            <motion.div
              className="mb-10"
              variants={contentBlockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-[var(--color-maasai-light-grey)] mb-8 text-center">
                More Insights
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white h-full flex flex-col rounded-lg overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={
                              video.thumbnail_url ||
                              `https://placehold.co/300x200/E0E0E0/333333?text=Video+Thumbnail`
                            }
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <a
                              href={video.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-red-400 transition-colors"
                            >
                              <PlayCircle className="w-16 h-16" />
                            </a>
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                              {video.duration}
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <CardTitle className="text-lg font-bold text-[var(--color-maasai-light-grey)] mb-2">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-[var(--color-maasai-light-grey)]/80 mb-3 leading-relaxed">
                          {video.description}
                        </CardDescription>
                        <div className="mt-auto">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-[var(--color-maasai-red)]/10 text-[var(--color-maasai-red)] border-[var(--color-maasai-red)]/20"
                          >
                            {video.category.replace(/_/g, " ")}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
