// src/components/sections/Notices.tsx (or wherever you prefer)
"use client";

import { motion } from "framer-motion";
import { AnnouncementRecruitment } from "./AnnouncementRecruitment"; // Adjust path as necessary
import { UpcomingEvents } from "./UpcomingEvents"; // Adjust path as necessary

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

export function Notices() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="py-8 relative overflow-hidden" // Main section padding and overflow
    >
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-12 lg:space-y-0 justify-center items-start">
          {/* Announcement & Recruitment Section */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-xl p-8">
            <AnnouncementRecruitment />
          </div>

          {/* Upcoming Events Section */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-xl p-8">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </motion.section>
  );
}