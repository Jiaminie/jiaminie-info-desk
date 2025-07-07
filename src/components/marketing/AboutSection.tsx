"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlayCircle } from "lucide-react"; // Import PlayCircle icon for videos
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

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
  category: 'COMPANY_INTRO' | 'SERVICE_DEMO' | 'CLIENT_TESTIMONIAL' | 'BEHIND_SCENES' | 'TUTORIAL';
  is_featured: boolean;
  is_active: boolean;
  view_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

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
          fetch('/api/data/company-info'),
          fetch('/api/data/team-members'),
          fetch('/api/data/videos'),
        ]);

        if (!companyRes.ok) throw new Error(`HTTP error! Company Info: ${companyRes.status}`);
        if (!teamRes.ok) throw new Error(`HTTP error! Team Members: ${teamRes.status}`);
        if (!videoRes.ok) throw new Error(`HTTP error! Videos: ${videoRes.status}`);

        const companyData: CompanyInfo = await companyRes.json();
        const teamData: TeamMember[] = await teamRes.json();
        const videoData: Video[] = await videoRes.json();

        // Parse JSON fields where applicable
        const parsedTeamData = teamData.map(member => ({
          ...member,
          skills: typeof member.skills === 'string' ? JSON.parse(member.skills) : member.skills,
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
      <section id="about" className="py-20 bg-white/80 flex justify-center items-center h-screen">
        <p className="text-xl text-[var(--color-maasai-dark-grey)]">Loading About Us content...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-20 bg-white/80 flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section id="about" className=" py-20 bg-white/80">
      <div className="container mx-auto px-6">
        {/* Main Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-maasai-dark-grey)] mb-6">
            Who We Are
          </h2>
          <div className="w-24 h-1 bg-[var(--color-maasai-red)] mx-auto mb-8"></div>
          <p className="text-xl text-[var(--color-maasai-dark-grey)] max-w-3xl mx-auto">
            {companyInfo?.tagline || "We are a passionate team of developers and designers committed to delivering exceptional digital experiences."}
          </p>
        </motion.div>

        {/* Company Overview */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6 text-[var(--color-maasai-dark-grey)] leading-relaxed">
              {companyInfo?.description || "At Jiaminie.inc, we are dedicated to making you a professional website and ensuring it reflects your organization's visions and values. We believe in the power of digital transformation to drive meaningful change."}
            </p>
            {/* You can add more company info here if available in the DB and desired */}
            {companyInfo?.founded_year && (
              <p className="text-md text-[var(--color-maasai-dark-grey)]/70">
                Founded: {companyInfo.founded_year} | Team Size: {companyInfo.team_size || 'N/A'}
              </p>
            )}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-80 overflow-hidden shadow-2xl rounded-lg">
              <img
                src={companyInfo?.logo_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
                alt="Company or Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-maasai-black)]/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Team Members */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20" 
        >
          <h3 className="text-3xl font-bold text-[var(--color-maasai-dark-grey)] mb-8 text-center">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 rounded-full overflow-hidden">
                          <AvatarImage
                            src={member.photo_url || `https://placehold.co/100x100/E0E0E0/333333?text=${member.name.split(" ").map((n) => n[0]).join("")}`}
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
                      <CardTitle className="text-xl text-[var(--color-maasai-dark-grey)]">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-[var(--color-maasai-red)] font-medium">
                        {member.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                      <p className="text-sm text-[var(--color-maasai-dark-grey)]/80">
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No team members found.
              </div>
            )}
          </div>
        </motion.section>

        {/* Company Videos */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-[var(--color-maasai-dark-grey)] mb-8 text-center">
            Our Latest Videos
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={video.thumbnail_url || `https://placehold.co/300x200/E0E0E0/333333?text=Video+Thumbnail`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
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
                      <CardTitle className="text-lg font-bold text-[var(--color-maasai-dark-grey)] mb-2">
                        {video.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-[var(--color-maasai-dark-grey)]/80 mb-3">
                        {video.description}
                      </CardDescription>
                      <div className="mt-auto">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-[var(--color-maasai-red)]/10 text-[var(--color-maasai-red)] border-[var(--color-maasai-red)]/20"
                        >
                          {video.category.replace(/_/g, ' ')} {/* Format category name */}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No videos found.
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
