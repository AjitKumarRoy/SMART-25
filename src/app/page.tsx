// FILE: src/app/page.tsx
"use client"; // This component needs to be client-side to use state, effects, and Framer Motion

// Import all your new section components
import { HeroSection } from "@/components/sections/HeroSection";
import { Notices } from "@/components/sections/Notices"; // Assuming this is UpcomingEvents/AnnouncementRecruitment
import About from "@/components/sections/About";
import ResearchandInnovations from "@/components/sections/ResearchandInnovations";
import Collaborators from "@/components/sections/Collaborators";
import { ResearchAreasSection } from "@/components/sections/ResearchAreasSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { TeamSpotlightSection } from "@/components/sections/TeamSpotlightSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden font-jakarta">
      {/* Hero Section */}
      <HeroSection />

      {/* Announcements & Recruitment Section */}
      <Notices />

      {/* About Section */}
      <About />

      {/* Research and Innovations Section */}
      <ResearchandInnovations />

      {/* Key Research Areas Section */}
      <ResearchAreasSection />

      {/* Featured Projects Carousel Section */}
      <FeaturedProjectsSection />

      {/* Team Spotlight Carousel Section */}
      <TeamSpotlightSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Collaborators Section */}
      <Collaborators />
    </div>
  );
}