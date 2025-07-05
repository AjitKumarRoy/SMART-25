// FILE: src/components/team/TeamCategorySection.tsx
"use client";

import { motion, Variants } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard'; // Adjust path if needed

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

interface TeamCategorySectionProps {
  title: string;
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

// Variants for the overall section container
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      when: "beforeChildren", // Animate parent first, then children
      staggerChildren: 0.1, // Stagger children for a nice reveal
    },
  },
};

// Variants for the grid items (TeamMemberCard)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
    },
  },
};

export default function TeamCategorySection({ title, members, onMemberClick }: TeamCategorySectionProps) {
  return (
    <motion.section
      className="mb-16" // Spacing between categories
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center relative pb-4">
        {title}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
      </h2>
      
      {members.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          // No variants prop here, as sectionVariants handles staggerChildren.
          // Children (TeamMemberCard) will use itemVariants.
        >
          {members.map((member, index) => (
            <motion.div key={member.id} variants={itemVariants}>
              <TeamMemberCard member={member} onClick={onMemberClick} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">No {title.toLowerCase()} currently listed.</p>
      )}
    </motion.section>
  );
}
