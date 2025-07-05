// src/components/sections/Collaborators.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHandshake, FaArrowRight } from "react-icons/fa6"; // Icon for collaborators

// Import react-slick components and CSS
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import data
import collaboratorsData from "@/data/collaboratorsData.json";

// Animation variants for the overall section
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

// Animation variants for individual carousel items (logos)
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 150,
    },
  },
};

export default function Collaborators() {
  const sliderSettings = {
    dots: false, // No dots for a clean logo carousel
    infinite: true, // Infinite looping
    speed: 1500, // Slower speed for a smooth, continuous scroll
    slidesToShow: 5, // Show more logos at once on large screens
    slidesToScroll: 1, // Scroll one logo at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 0, // Set to 0 for continuous, non-stop scroll
    cssEase: "linear", // Linear easing for a constant speed scroll
    arrows: false, // No navigation arrows as requested
    pauseOnHover: false, // Keep scrolling even on hover
    pauseOnFocus: false, // Keep scrolling even on focus
    rtl: true, // Right-to-left direction

    responsive: [
      {
        breakpoint: 1200, // xl breakpoint
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // sm breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <motion.section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <FaHandshake className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Our Collaborators
            </h2>
          </div>
          <Link href="/collaborators" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-lg group">
            View All
            <FaArrowRight className="ml-2 -mr-1 text-xl group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Carousel Container */}
        {/* Adjusted padding for the carousel to ensure logos are not clipped */}
        <div className="relative py-4">
          <Slider {...sliderSettings}>
            {collaboratorsData.map((collaborator) => (
              <motion.div
                key={collaborator.id}
                variants={itemVariants}
                className="px-4 py-2" // Padding for spacing between logos
              >
                <Link href={collaborator.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center justify-center h-28 border border-gray-100 dark:border-gray-700 p-4">
                    <Image
                      src={collaborator.logo}
                      alt={collaborator.name}
                      width={200} // Set a max width for the logo
                      height={80} // Set a max height for the logo
                      objectFit="contain" // Ensures the entire logo is visible
                      className="transition-transform duration-300 hover:scale-105 filter grayscale hover:grayscale-0" // Grayscale on hover
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.section>
  );
}
