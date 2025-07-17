// FILE: src/app/research/page.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import HeroSection from "@/components/HeroSection";

// Import your research projects data
import researchProjects from "@/data/research/research.json";
import { CallToActionSection } from "@/components/homePage/CallToActionSection";

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 10, stiffness: 100, delay: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  let colorClass = "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  switch (status.toLowerCase()) {
    case "active":
    case "ongoing":
      colorClass = "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
      break;
    case "completed":
      colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100";
      break;
    case "upcoming":
      colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
      break;
    case "on hold":
      colorClass = "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
      break;
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
        {/* Hero Section */}
            <HeroSection
              title="Pioneering Research"
              description="At AMDCG, we are at the forefront of interdisciplinary scientific exploration, driving innovation in materials science, data computing, and their profound applications."
              gradientFrom="from-blue-50"
              gradientTo="to-blue-100"
            />

      {/* Research Projects Grid Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Our Key Projects
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true}}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {researchProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700" // Removed cursor-pointer from parent to allow child links to be primary
              >
                {/* Main project link is still available via the image/title/description area */}
                <Link href={project.link || "#"} className="block">
                  <div className="relative w-full h-56 md:h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                            {project.title}
                        </h3>
                        {project.status && getStatusBadge(project.status)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                      {project.description}
                    </p>
                    {(project.startDate || project.endDate) && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {project.startDate && `Start: ${project.startDate}`}
                            {project.startDate && project.endDate && " | "}
                            {project.endDate && `End: ${project.endDate}`}
                        </div>
                    )}
                     {/* Team Members */}
                    {project.teamMembers && project.teamMembers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.teamMembers.map((member, memberIndex) => (
                          <Link
                            key={memberIndex}
                            href={member.profileLink}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 whitespace-nowrap"
                            // Prevent event propagation from inner Link to outer Link
                            onClick={(e) => e.stopPropagation()}
                          >
                            {member.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group">
                      View Project Details
                      <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link> {/* This Link wraps the main project content */}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Optional: Add a general description about research philosophy/approach */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Our Research Philosophy
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            We believe in a dynamic and collaborative research environment that fosters innovation and addresses real-world challenges. Our approach integrates theoretical insights with experimental validation and computational modeling to drive impactful discoveries.
          </motion.p>
        </motion.div>
      </section>

      {/* Call to Action Section (Re-use from your existing components) */}
      <CallToActionSection />
    </div>
  );
}