"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaUserTie, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image imports
import joseSir from "../../../public/images/jose-sir.jpeg";
import techNeckalMedia from "../../../public/images/techneckal-media.png";
import bambooMedia from "../../../public/images/bamboo-media.png";
import smartCityMedia from "../../../public/images/smartCity-media.png";

// Media coverage data
const mediaCoverage = [
  {
    id: "1",
    title: "AIIMS Raipur and IIT Bhilai reserachers recognized for Techneck solution.",
    image: techNeckalMedia,
    link: "https://timesofindia.indiatimes.com/city/raipur/aiims-raipur-and-iit-bhilai-researchers-recognized-for-techneck-solution/articleshow/112608502.cms",
    alt: "Times Of India",
  },
  {
    id: "2",
    title: "Arunachal's Bije Bamboo Shows Exceptional Strength, Say Researchers",
    image: bambooMedia,
    link: "https://www.sentinelassam.com/north-east-india-news/arunachal-news/arunachals-bije-bamboo-shows-exceptional-strength-say-researchers",
    alt: "The Sentinel Assam",
  },
  {
    id: "3",
    title: "AMDCG Team from IIT Bhilai surverys Raipur Smart city for traffic solutions.",
    image: smartCityMedia,
    link: "https://timesofindia.indiatimes.com/city/raipur/iit-bhilai-team-surveys-raipur-smart-city-for-traffic-solutions/articleshow/109208512.cms",
    alt: "Times Of India",
  },
];

// Animation variants
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

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
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

// Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 lg:w-56 h-32 sm:h-48 lg:h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Top Section: Welcome and Director */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {/* Welcome Section */}
          <motion.div
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <FaBookOpen className="text-2xl sm:text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 mr-3 sm:mr-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Welcome to Our Research Group
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
              Greetings and welcome to the AMDCG at IIT Bhilai! This is a dynamic research group focused on shaping the future through advancements in materials science and metallurgical engineering. With a commitment to both global excellence and local relevance, materials are developed and characterized with the potential for real-world impact. You are welcome to join in this endeavor.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
              Through rigorous experimentation, theoretical advancements, and collaborative partnerships, we strive to create groundbreaking solutions that address real-world problems. Explore our work, discover our publications, and learn how you can be a part of our exciting journey.
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base lg:px-8 lg:py-3 lg:text-lg border border-transparent font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Director Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center transform hover:scale-[1.005] transition-transform duration-300"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <FaUserTie className="text-2xl sm:text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 mr-3 sm:mr-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                AMDCG Head
              </h2>
            </div>
            <div className="relative w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-blue-600 dark:border-blue-400 shadow-lg">
              <Image
                src={joseSir}
                alt="Professor Jose Immanuel R"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                onError={() => console.error("Failed to load image: jose-sir.jpeg")}
                onLoad={() => console.log("Loaded image: jose-sir.jpeg")}
              />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Prof. Jose Immanuel R
            </h3>
            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400">
              Assistant Professor, IIT Bhilai
            </p>
          </motion.div>
        </div>

        {/* Media Coverage Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <FaBookOpen className="text-2xl sm:text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 mr-3 sm:mr-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Media Coverage
              </h2>
            </div>
            <Link
              href="/newsletters"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base lg:text-lg flex items-center"
            >
              View All
              <FaArrowRight className="ml-2 text-base sm:text-lg lg:text-xl" />
            </Link>
          </div>
          <motion.div variants={listVariants} initial="hidden" animate="visible">
            <Slider {...carouselSettings}>
              {mediaCoverage.map((item) => (
                <div key={item.id} className="px-2 sm:px-3">
                  <motion.div
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-5 shadow-inner flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative w-full h-32 sm:h-36 lg:h-40 mb-3 sm:mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={() => console.error(`Failed to load image: ${item.alt}`)}
                        onLoad={() => console.log(`Loaded image: ${item.alt}`)}
                      />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm"
                    >
                      View More
                    </Link>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}