// FILE: src/components/sections/ResearchandInnovations.tsx
"use client";

import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image";
import Link from "next/link";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa6";

// Import react-slick components and CSS
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import data
import researchInnovationsData from "@/data/researchInnovationsData.json";

// Animation variants for the overall section - explicitly typed
const sectionVariants: Variants = {
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

// Animation variants for individual carousel items (applied to the content inside slick-slide) - explicitly typed
const itemVariants: Variants = {
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

export default function ResearchandInnovations() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
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
      transition={{ delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            {/* Icon size: text-3xl for mobile, md:text-4xl for tablet/desktop */}
            <FaFolderOpen className="text-3xl md:text-4xl text-blue-600 dark:text-blue-400 mr-4" />
            {/* Heading size: text-xl for mobile, md:text-2xl for tablet, lg:text-3xl for desktop */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Research and Innovations
            </h2>
          </div>
          {/* View All button: Smaller for mobile, scales up for md and lg */}
          <Link href="/research" className="inline-flex items-center
            px-4 py-2 text-sm                   {/* Mobile default */}
            md:px-6 md:py-2.5 md:text-base    {/* Medium screens */}
            lg:px-8 lg:py-2 lg:text-lg        {/* Large screens */}
            border border-transparent font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 group"
          >
            View All
            {/* Arrow icon: text-lg for mobile, md:text-xl for tablet/desktop */}
            <FaArrowRight className="ml-2 -mr-1 text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative py-4">
          <Slider {...sliderSettings}>
            {researchInnovationsData.map((item) => (
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
                    {/* Item title: text-base for mobile, md:text-lg for tablet/desktop */}
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-3">
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