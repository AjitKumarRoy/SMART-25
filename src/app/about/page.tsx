// FILE: src/app/about/page.tsx (or src/pages/about.tsx)
"use client"; // Required for client-side interactivity and Framer Motion

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FiTarget, FiZap, FiUsers, FiGlobe } from "react-icons/fi";
import { CallToActionSection } from "@/components/homePage/CallToActionSection";

// Import react-slick components and styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your team images data
import teamImages from "@/data/aboutPage/team.json"; // Adjusted path based on typical Next.js structure

// --- Animation Variants for consistency ---
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

export default function AboutPage() {


  // react-slick settings for the carousel
  const sliderSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the carousel
    speed: 800, // Transition speed in ms
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 5000, // Time between slides in ms (5 seconds)
    cssEase: "ease-in-out", // CSS easing function for smooth transitions
    fade: true, // Enable fade effect for transitions (instead of slide)
    arrows: true, // Show navigation arrows

    // Responsive settings for min-height and potentially other properties
    responsive: [
      {
        breakpoint: 1280, // xl breakpoint
        settings: {
          // No specific height needed here, as min-h will control it
          // You could add other settings specific to large desktops if needed
        }
      },
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          // No specific height needed here
        }
      },
      {
        breakpoint: 768, // md breakpoint
        settings: {
          // No specific height needed here
        }
      },
      {
        breakpoint: 640, // sm breakpoint
        settings: {
          // No specific height needed here
        }
      },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-jakarta">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100"
          >
            About AMDCG
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 pb-6 text-gray-700 dark:text-gray-300"
          >
            The Advanced Materials and Data Computing Group (AMDCG) is at the forefront of interdisciplinary research,
            merging cutting-edge material science with advanced computational techniques to solve the world&apos;s most pressing challenges.
          </motion.p>
          {/* <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
          >
            The Advanced Materials Development and Characterization Group (AMDCG) at the Indian Institute of Technology Bhilai (IIT Bhilai) is a dynamic research hub dedicated to pushing the boundaries of materials science and engineering. Situated in Chhattisgarh, a state rich in mineral resources and home to significant industrial infrastructure like the Bhilai Steel Plant, our group benefits from a unique environment that seamlessly connects academic excellence with real-world applications.
          </motion.p> */}
        </motion.div>
        {/* Subtle background pattern/shape for premium feel */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width=".7" height=".7" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="currentColor"></circle>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Our Mission & Vision
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
          >
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <FiTarget className="text-5xl text-blue-600 dark:text-blue-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To advance the frontiers of knowledge in advanced materials and computational science,
                developing innovative solutions that address global challenges in energy, health, and sustainability.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <FiZap className="text-5xl text-blue-600 dark:text-blue-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be a world-leading research group recognized for its groundbreaking discoveries,
                fostering a collaborative environment that inspires the next generation of scientific leaders.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Research Focus Areas Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Our Core Research Areas
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <FiZap className="text-4xl text-blue-600 dark:text-blue-400 mb-3 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2">Advanced Materials Design</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Developing novel materials with tailored properties for diverse applications, from energy storage to biomedical devices.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <FiUsers className="text-4xl text-blue-600 dark:text-blue-400 mb-3 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2">Computational Modeling & Simulation</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Utilizing high-performance computing to simulate material behavior at atomic and molecular levels.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <FiGlobe className="text-4xl text-blue-600 dark:text-blue-400 mb-3 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2">Data-Driven Materials Discovery</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Applying machine learning and AI to accelerate the discovery and optimization of new materials.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Our Guiding Principles
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
          >
            {[
              { title: "Innovation", description: "Continuously pushing the boundaries of scientific inquiry." },
              { title: "Collaboration", description: "Fostering interdisciplinary partnerships and open exchange of ideas." },
              { title: "Excellence", description: "Committing to the highest standards in research and education." },
              { title: "Integrity", description: "Conducting all research with honesty, transparency, and ethical rigor." },
              { title: "Impact", description: "Striving for research outcomes that create real-world benefit." },
              { title: "Diversity", description: "Embracing diverse perspectives and backgrounds to enrich our work." },
            ].map((value, index) => (
              <motion.div variants={itemVariants} key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* --- Meet the Team Section (with Slick Carousel) --- */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Meet the Team
          </motion.h2>

          <motion.div
            variants={itemVariants}
            // Responsive min-height for the carousel container
            className="mb-8 relative rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700
                       min-h-[250px] sm:min-h-[300px] lg:min-h-[450px] xl:min-h-[600px]
                       slick-carousel-custom"
          >
            <Slider {...sliderSettings}>
              {teamImages.map((image, index) => (
                <div key={index} className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
            Behind every breakthrough at AMDCG is a dedicated team of brilliant minds. Our diverse group
            of researchers, scientists, and students brings together a wealth of expertise from various
            disciplines, united by a shared passion for discovery and innovation. We believe in a collaborative
            and supportive environment where ideas flourish, challenges are met with creativity, and collective
            efforts lead to transformative results. Each member plays a crucial role in pushing the boundaries
            of materials science and computational research, contributing to a future shaped by scientific excellence.
          </motion.p>
        </motion.div>
      </section>

      {/* Re-use the existing CallToActionSection */}
      <CallToActionSection />
    </div>
  );
}