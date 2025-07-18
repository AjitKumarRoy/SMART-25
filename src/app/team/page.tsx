"use client";

import { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import HeroSection from "@/components/HeroSection";

// Import data
import teamData from '@/data/teamPage/team.json';

// Import components
import TeamCategorySection from '@/components/teamPage/TeamCategorySection';
import TeamMemberModal from '@/components/teamPage/TeamMemberModal';

// Define the shape of a single team member (matching team.json)
interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  bio: string;
  socialLinks: {
    website?: string | null;
    researchGate?: string | null;
    googleScholar?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
  };
  contributions: Array<{
    project: string;
    role: string;
    years: string;
    description: string;
  }>;
  workingStatus: string;
  yearsWorked: string;
}

// Animation variants to match HeroSection and other pages
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};


export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Memoize filtered and categorized team members for performance
  const categorizedMembers = useMemo(() => {
    const categories: { [key: string]: TeamMember[] } = {
      professors: [],
      collaborators: [],
      postdoctorals: [],
      phd_scholars: [],
      mtech_scholars: [],
      research_staff: [],
      interns: [],
      alumni: [],
    };

    (teamData as TeamMember[]).forEach(member => {
      if (categories[member.category]) {
        categories[member.category].push(member);
      } else {
        console.warn(`Member ${member.name} has unlisted category: ${member.category}`);
      }
    });

    return categories;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
      {/* Hero Section */}
      <HeroSection
        title="Meet Our Team"
        description="Our diverse group of dedicated researchers, scholars, and innovators driving the future of technology."
        gradientFrom="from-blue-50"
        gradientTo="to-blue-100"
      />

      {/* Team Sections */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto z-10 relative">
          <TeamCategorySection
            title="AMDCG Head"
            members={categorizedMembers.professors}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Collaborators"
            members={categorizedMembers.collaborators}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Postdoctoral Researchers"
            members={categorizedMembers.postdoctorals}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Ph.D. Scholars"
            members={categorizedMembers.phd_scholars}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="M.Tech Scholars"
            members={categorizedMembers.mtech_scholars}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Research Staff"
            members={categorizedMembers.research_staff}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Interns"
            members={categorizedMembers.interns}
            onMemberClick={openModal}
          />
          <TeamCategorySection
            title="Alumni"
            members={categorizedMembers.alumni}
            onMemberClick={openModal}
          />
          <TeamMemberModal
            isOpen={isModalOpen}
            onClose={closeModal}
            member={selectedMember}
          />
        </div>
      </motion.section>
    </div>
  );
}