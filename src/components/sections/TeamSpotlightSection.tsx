// FILE: src/components/sections/TeamSpotlightSection.tsx
"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your data
import homepageData from "@/data/homepage.json";

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

export function TeamSpotlightSection() {
  // Settings for Team Spotlight Carousel
  const teamCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4, // Adjusted for team members
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Meet Our Brilliant Minds
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Dedicated researchers and innovators driving our group success.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <Slider {...teamCarouselSettings}>
          {homepageData.teamMembers.map((member) => (
            <div key={member.id} className="px-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:-translate-y-1 flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-200 dark:border-blue-700">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{member.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
}