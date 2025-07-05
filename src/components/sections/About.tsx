// src/components/sections/About.tsx
"use client";

import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image"; // Using next/image for optimized images
import Link from "next/link";
import { FaBookOpen, FaPlayCircle, FaUserTie, FaArrowRight } from "react-icons/fa"; // Icons for sections

// Animation variants for sections - explicitly typed
const sectionVariants: Variants = { // Added Variants type
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      // Removed 'duration' and 'delay' from here as they are not valid for 'spring' type transitions.
      // The 'delay' for the section itself will be applied where the section component is used (e.g., in page.tsx).
    },
  },
};

// Animation variants for the overall list container (ul or grid parent) - explicitly typed
const listVariants: Variants = { // Added Variants type
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger individual items within the list
      delayChildren: 0.1,
      // These are valid for default (tween) transition type
    },
  },
};

// Animation variants for individual items (e.g., newsletter cards, video cards) - explicitly typed
const itemVariants: Variants = { // Added Variants type
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
      // No 'duration' or 'delay' here, which is correct for spring type
    },
  },
};

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Top Section: Welcome and Director */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          {/* Welcome Section */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            // The delay for this specific section is applied here, not within the variant definition
            transition={{ delay: 0.1 }} // Applying delay directly to the motion component
          >
            <div className="flex items-center mb-6">
              <FaBookOpen className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Welcome to Our Research Group
              </h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Welcome to the cutting-edge world of our research group, where innovation meets impact. We are dedicated to pushing the boundaries of knowledge in [Your Field/Area of Research, e.g., Artificial Intelligence, Sustainable Energy, Biomedical Engineering].
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Through rigorous experimentation, theoretical advancements, and collaborative partnerships, we strive to create groundbreaking solutions that address real-world problems. Explore our work, discover our publications, and learn how you can be a part of our exciting journey.
            </p>
            <Link href="/about-us" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
              Learn More About Us
            </Link>
          </motion.div>

          {/* Director Section */}
          <motion.div
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }} // Delay applied directly here
          >
            <div className="flex items-center mb-6">
              <FaUserTie className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                AMDCG Head
              </h2>
            </div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-blue-600 dark:border-blue-400 shadow-lg">
              {/* Using a placeholder image for the director */}
              <Image
                src="https://placehold.co/192x192/4A90E2/FFFFFF?text=Director"
                alt="Director Prof. Devendra Jalihal"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Prof. Jose Immanuel R
            </h3>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Assistant Professor, IIT Bhilai
            </p>
          </motion.div>
        </div>

        {/* Bottom Sections: Newsletter and Videos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }} // Delay applied directly here
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaBookOpen className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Research Group Newsletter
                </h2>
              </div>
              <Link href="/newsletters" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg flex items-center">
                View All
                <FaArrowRight className="ml-2 text-xl" />
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src="https://placehold.co/300x160/667EEA/FFFFFF?text=Newsletter+Cover"
                    alt="Newsletter Cover"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Volume VI Issue XI, November 2024
                </h3>
                <Link href="/newsletters/november-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Download PDF
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src="https://placehold.co/300x160/38B2AC/FFFFFF?text=Newsletter+Cover"
                    alt="Newsletter Cover"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Volume V Issue X, October 2024
                </h3>
                <Link href="/newsletters/october-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Download PDF
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>


          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }} // Delay applied directly here
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaPlayCircle className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Research Group Videos
                </h2>
              </div>
              <Link href="/videos" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg flex items-center">
                View All
                <FaArrowRight className="ml-2 text-xl" />
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  {/* Placeholder for YouTube thumbnail or custom video cover */}
                  <Image
                    src="https://placehold.co/300x160/E53E3E/FFFFFF?text=Video+Thumbnail"
                    alt="Video Thumbnail: Visit of Hon'ble President"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                    <FaPlayCircle className="text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Visit of Honourable President Droupadi Murmu
                </h3>
                <Link href="https://www.youtube.com/watch?v=your-video-id-1" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Watch Video
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src="https://placehold.co/300x160/3182CE/FFFFFF?text=Video+Thumbnail"
                    alt="Video Thumbnail: Research Breakthrough"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                    <FaPlayCircle className="text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Our Latest Research Breakthrough
                </h3>
                <Link href="https://www.youtube.com/watch?v=your-video-id-2" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Watch Video
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
