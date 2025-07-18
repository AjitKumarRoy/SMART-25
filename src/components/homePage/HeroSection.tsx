// FILE: src/components/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowRight } from "react-icons/fi";

// Import your homepage data (assuming it's accessible or passed as prop)
import homepageData from "@/data/homePage/heroSection.json";

// Animation Variants (could be moved to a central variants file if many components use them)
const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.8 },
  },
};

// Removed heroDescriptionVariants as description is being removed

const heroButtonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.9, duration: 0.8 },
  },
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Settings for the Hero Carousel
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "ease-in-out",
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
        <ul className="flex space-x-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${i === currentSlide ? "bg-white scale-125" : "bg-transparent"}`}></div>
    )
  };

  // Parallax effect for the hero section
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    // Reduced height for smaller devices: h-[50vh] for mobile/tablet, h-screen for larger
    <section className="relative h-[60vh] md:h-[70vh] lg:h-screen w-full overflow-hidden flex items-center justify-center text-white">
      <Slider {...heroSliderSettings} className="absolute inset-0 w-full h-full">
        {homepageData.heroCarousel.map((item, index) => (
          // Adjusted height for the individual slide container
          <div key={item.id} className="relative w-full h-[50vh] md:h-[60vh] lg:h-screen">
            <motion.div
              style={{ y }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </motion.div>
            <div className="absolute inset-0 -top-5 -bottom-5 bg-black/60 z-10 flex flex-col items-center justify-end pb-6  lg:pb-22 p-8 text-center">
              <motion.h1
                variants={heroTitleVariants}
                initial="hidden"
                animate="visible"
                // Smaller text for mobile (2xl), medium for tablets (4xl), original for large screens (6xl)
                className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4  drop-shadow-lg"
              >
                {item.title}
              </motion.h1>
              {/* Removed the description paragraph entirely */}
              {/* <motion.p
                variants={heroDescriptionVariants}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 drop-shadow-md"
              >
                {item.description}
              </motion.p> */}
              {/* <motion.div
                variants={heroButtonVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/about"
                    // Smaller button for mobile (py-1.5 px-4 text-sm)
                    // Slightly larger for tablets (md:py-2 md:px-6 md:text-base)
                    // Original size for large screens (lg:py-3 lg:px-8 lg:text-lg)
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                               py-1.5 px-4 text-sm
                               md:py-2 md:px-6 md:text-base
                               lg:py-3 lg:px-8 lg:text-lg
                               rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
                  >
                    Learn More <FiArrowRight />
                  </Link>
              </motion.div> */}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}