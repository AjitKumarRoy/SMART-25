// FILE: src/app/team/page.tsx
"use client";

import { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaUsers } from 'react-icons/fa'; // Main icon for the team page

// Import data
import teamData from '@/data/team.json';

// Import components
import TeamCategorySection from '@/components/team/TeamCategorySection';
import TeamMemberModal from '@/components/team/TeamMemberModal';

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

// Animation variants for the main page section
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.1,
      when: "beforeChildren", // Animate parent first, then children
      staggerChildren: 0.2, // Stagger category sections
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
      postdoctorals: [],
      phd_scholars: [],
      research_staff: [],
      interns: [],
      alumni: [],
    };

    (teamData as TeamMember[]).forEach(member => {
      if (categories[member.category]) {
        categories[member.category].push(member);
      } else {
        // Fallback for any unlisted categories, or add to a generic 'other'
        console.warn(`Member ${member.name} has unlisted category: ${member.category}`);
        // categories.other = categories.other || [];
        // categories.other.push(member);
      }
    });

    return categories;
  }, []); // teamData is a static import, so no dependencies needed here

  return (
    <motion.div
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Page Header */}
        <div className="flex items-center mb-16 justify-center text-center">
          <FaUsers className="text-5xl text-blue-600 dark:text-blue-400 mr-4" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              Meet Our Team
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Our diverse group of dedicated researchers, scholars, and innovators driving the future of technology.
            </p>
          </div>
        </div>

        {/* Professors Section */}
        <TeamCategorySection
          title="Professors"
          members={categorizedMembers.professors}
          onMemberClick={openModal}
        />

        {/* Postdoctoral Researchers Section */}
        <TeamCategorySection
          title="Postdoctoral Researchers"
          members={categorizedMembers.postdoctorals}
          onMemberClick={openModal}
        />

        {/* Ph.D. Scholars Section */}
        <TeamCategorySection
          title="Ph.D. Scholars"
          members={categorizedMembers.phd_scholars}
          onMemberClick={openModal}
        />

        {/* Research Staff Section */}
        <TeamCategorySection
          title="Research Staff"
          members={categorizedMembers.research_staff}
          onMemberClick={openModal}
        />

        {/* Interns Section */}
        <TeamCategorySection
          title="Interns"
          members={categorizedMembers.interns}
          onMemberClick={openModal}
        />

        {/* Alumni Section */}
        <TeamCategorySection
          title="Alumni"
          members={categorizedMembers.alumni}
          onMemberClick={openModal}
        />

        {/* Team Member Modal */}
        <TeamMemberModal
          isOpen={isModalOpen}
          onClose={closeModal}
          member={selectedMember}
        />
      </div>
    </motion.div>
  );
}
