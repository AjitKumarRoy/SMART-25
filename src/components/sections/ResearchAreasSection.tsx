// FILE: src/components/sections/ResearchAreasSection.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiCpu, FiZap, FiLayers, FiBarChart2, FiGlobe, FiTool, FiArrowRight } from "react-icons/fi";

// Import your data
import homepageData from "@/data/homepage.json";

// Dynamic icon mapping
const researchIcons: { [key: string]: React.ElementType } = {
  FiCpu,
  FiZap,
  FiLayers,
  FiBarChart2,
  FiGlobe,
  FiTool,
};

// Animation Variants (from original page.tsx)
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 10, stiffness: 100 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 120 },
  },
};

export function ResearchAreasSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Our Core Research Areas
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Exploring diverse fields to create impactful advancements and foster a culture of scientific inquiry.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homepageData.researchAreas.map((area, index) => {
          const IconComponent = researchIcons[area.icon];
          return (
            <motion.div
              key={area.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2"
            >
              {IconComponent && <IconComponent className="text-blue-600 dark:text-blue-400 text-5xl mb-4" />}
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{area.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5 flex-grow">{area.description}</p>
              <Link href={area.link} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold inline-flex items-center gap-2 group">
                Learn More
                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}