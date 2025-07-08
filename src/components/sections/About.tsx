// FILE: src/components/sections/About.tsx
"use client";

import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image"; // Using next/image for optimized images
import Link from "next/link";
import { FaBookOpen, FaPlayCircle, FaUserTie, FaArrowRight } from "react-icons/fa"; // Icons for sections

import joseSir from "../../../public/images/jose-sir.jpeg"
import techNeckalMedia from "../../../public/images/techneckal-media.png"
import bambooMedia from "../../../public/images/bamboo-media.png"
import smartCityMedia from "../../../public/images/smartCity-media.png"
import droupadiMurmu from "../../../public/images/droupadi-murmu-iitbh.png"

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
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <FaBookOpen className="text-3xl md:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
              {/* HEADING CHANGE: Made smaller for mobile (text-xl), scaled up for md and lg */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Welcome to Our Research Group
              </h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Greetings and welcome to the AMDCG at IIT Bhilai! This is a dynamic research group focused on shaping the future through advancements in materials science and metallurgical engineering. With a commitment to both global excellence and local relevance, materials are developed and characterized with the potential for real-world impact. You are welcome to join in this endeavor.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Through rigorous experimentation, theoretical advancements, and collaborative partnerships, we strive to create groundbreaking solutions that address real-world problems. Explore our work, discover our publications, and learn how you can be a part of our exciting journey.
            </p>
            {/* BUTTON CHANGE: Made smaller for mobile, scaled up for md and lg */}
            <Link href="/about-us" className="inline-flex items-center
              px-4 py-2 text-sm                   {/* Mobile default */}
              md:px-6 md:py-2.5 md:text-base    {/* Medium screens */}
              lg:px-8 lg:py-3 lg:text-lg        {/* Large screens */}
              border border-transparent font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Director Section */}
          <motion.div
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaUserTie className="text-3xl md:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
              {/* HEADING CHANGE: Made smaller for mobile (text-xl), scaled up for md and lg */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                AMDCG Head
              </h2>
            </div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-blue-600 dark:border-blue-400 shadow-lg">
              <Image
                src={joseSir}
                alt="Professor Jose Immanuel R"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
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
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaBookOpen className="text-3xl md:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
                {/* HEADING CHANGE: Made smaller for mobile (text-xl), scaled up for md and lg */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Media Coverage
                </h2>
              </div>
              <Link href="/newsletters" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-base md:text-lg flex items-center">
                View All
                <FaArrowRight className="ml-2 text-lg md:text-xl" />
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
                    src={techNeckalMedia}
                    alt="Times Of India"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  AIIMS Raipur and IIT Bhilai reserachers recognized for Techneck solution.
                </h3>
                <Link href="https://timesofindia.indiatimes.com/city/raipur/aiims-raipur-and-iit-bhilai-researchers-recognized-for-techneck-solution/articleshow/112608502.cms" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  View More
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src={bambooMedia}
                    alt="The Sentinel Assam"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Arunachal's Bije Bamboo Shows Exceptional Strength, Say Researchers
                </h3>
                <Link href="https://www.sentinelassam.com/north-east-india-news/arunachal-news/arunachals-bije-bamboo-shows-exceptional-strength-say-researchers" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  View More
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src={smartCityMedia}
                    alt="Times Of India"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  AMDCG Team from IIT Bhilai surverys Raipur Smart city for traffic solutions.
                </h3>
                <Link href="https://timesofindia.indiatimes.com/city/raipur/iit-bhilai-team-surveys-raipur-smart-city-for-traffic-solutions/articleshow/109208512.cms" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  View More
                </Link>
              </motion.div>

            </motion.div>
          </motion.div>


          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaPlayCircle className="text-3xl md:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
                {/* HEADING CHANGE: Made smaller for mobile (text-xl), scaled up for md and lg */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  AMDCG Videos
                </h2>
              </div>
              <Link href="/videos" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-base md:text-lg flex items-center">
                View All
                <FaArrowRight className="ml-2 text-lg md:text-xl" />
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
                    src={droupadiMurmu}
                    alt="Video Thumbnail: Visit of Hon'ble President"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Visit of Honourable President Droupadi Murmu
                </h3>
                <Link href="https://www.youtube.com/watch?v=ezZ62pQrOlc" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Watch Video
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src="https://placehold.co/300x160/3182CE/FFFFFF?text=Video+Thumbnail"
                    alt="Video Thumbnail: AMDCG LAb"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                    <FaPlayCircle className="text-4xl md:text-5xl text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Team Operating FESEM at our Lab
                </h3>
                <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
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