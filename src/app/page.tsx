// FILE: src/app/page.tsx
"use client"; // This component needs to be client-side to use state, effects, and Framer Motion

// Import all your new section components
import { HeroSection } from "@/components/homePage/HeroSection";
import { Notices } from "@/components/homePage/Notices"; // Assuming this is UpcomingEvents/AnnouncementRecruitment
import About from "@/components/homePage/About";
import ResearchandInnovations from "@/components/homePage/ResearchandInnovations";
import Collaborators from "@/components/homePage/Collaborators";
import { ResearchAreasSection } from "@/components/homePage/ResearchAreasSection";
import { FeaturedProjectsSection } from "@/components/homePage/FeaturedProjectsSection";
import { TeamSpotlightSection } from "@/components/homePage/TeamSpotlightSection";
import { CallToActionSection } from "@/components/homePage/CallToActionSection";

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