// src/components/sections/ResearchandInnovations.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa6"; // Chevron icons are now unused but kept for reference

// Import react-slick components and CSS
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import data
import researchInnovationsData from "@/data/researchInnovationsData.json";

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

// Animation variants for individual carousel items (applied to the content inside slick-slide)
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
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

// Custom Next Arrow component for react-slick (This component is now unused)
// const NextArrow = (props: any) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !block !right-0 z-10`} // Override default positioning
//       style={{ ...style, display: "block" }} // Ensure it's visible
//       onClick={onClick}
//     >
//       <button className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
//         <FaChevronRight className="text-xl" />
//       </button>
//     </div>
//   );
// };

// Custom Prev Arrow component for react-slick (This component is now unused)
// const PrevArrow = (props: any) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !block !left-0 z-10`} // Override default positioning
//       style={{ ...style, display: "block" }} // Ensure it's visible
//       onClick={onClick}
//     >
//       <button className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
//         <FaChevronLeft className="text-xl" />
//       </button>
//     </div>
//   );
// };

export default function ResearchandInnovations() {
  const sliderSettings = {
    dots: false, // No dots as per image
    infinite: true, // Infinite looping
    speed: 800, // Animation speed in ms
    slidesToShow: 2, // Default to 2 items visible
    slidesToScroll: 1, // Scroll one item at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 4000, // Time between slides in ms (4 seconds)
    cssEase: "ease-in-out", // For smoother animation
    // nextArrow: <NextArrow />, // Removed to hide next button
    // prevArrow: <PrevArrow />, // Removed to hide previous button
    responsive: [
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <motion.section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <FaFolderOpen className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Research and Innovations
            </h2>
          </div>
          <Link href="/research" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-lg group">
            View All
            <FaArrowRight className="ml-2 -mr-1 text-xl group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Carousel Container */}
        {/* Removed horizontal margins as arrows are no longer present */}
        <div className="relative py-4">
          <Slider {...sliderSettings}>
            {researchInnovationsData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700">
                  <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-3">
                      {item.title}
                    </h3>
                    <div className="mt-auto">
                      <Link href={item.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 group">
                        View Details
                        <FaArrowRight className="ml-2 text-md group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.section>
  );
}
