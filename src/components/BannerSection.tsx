// FILE: src/components/BannerSection.tsx
"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

//import all the images
import amdcgLogo from '../../public/images/amdcg-logo2.png'
import iitBhLogo from '../../public/images/iitbh_logo.png'

// Animation variants for the banner elements
const bannerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
      delayChildren: 0.3, // Stagger children appearance
      staggerDirection: -1 // Right to left stagger for logos
    },
  },
};

const logoVariants: Variants = {
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

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
      delay: 0.2 // Appear slightly after banner starts
    },
  },
};


export function BannerSection() {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 py-6 md:py-8 lg:py-10 px-6 flex flex-col md:flex-row items-center justify-between shadow-md relative z-30 border-b border-gray-200 dark:border-gray-700"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Logo - IIT Bhilai */}
      <motion.div variants={logoVariants} className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
        <Image
          src={amdcgLogo} // Placeholder, replace with actual path
          alt="IIT Bhilai Logo"
          width={150}
          height={150}
          // Changed className: added rounded-full, adjusted h- and w- classes for responsiveness
          className="h-24 w-24 object-contain rounded-full md:h-28 md:w-28 lg:h-34 lg:w-34"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/150x150/4A90E2/FFFFFF?text=IIT+Logo";
            e.currentTarget.srcset = "";
          }}
        />
      </motion.div>

      {/* Center Text - Group Name */}
      <motion.div variants={titleVariants} className="flex-grow text-center max-w-2xl">
        <h1 className="
          text-2xl md:text-3xl lg:text-4xl
          font-extrabold
          bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400
          text-transparent bg-clip-text
          leading-tight mb-2
          font-heading-display
        ">
          Advanced Materials Development & Characterization Group
        </h1>
        <p className="
          text-base md:text-lg
          text-gray-700 dark:text-gray-300
          font-body-text /* Changed from font-sans-body for consistency */
          font-semibold /* Added font weight for more presence */
          tracking-wider /* Added letter spacing for better appearance in all-caps */
        ">
          INDIAN INSTITUTE OF TECHNOLOGY BHILAI
        </p>
      </motion.div>

      {/* Right Logo - G20 or similar */}
      <motion.div variants={logoVariants} className="flex-shrink-0 mt-4 md:mt-0 md:ml-8">
        <Image
          src={iitBhLogo} // Placeholder, replace with actual path
          alt="G20 Logo"
          width={150}
          height={150}
          // Changed className: added rounded-full, adjusted h- and w- classes for responsiveness
          className="h-24 w-24 object-contain rounded-full md:h-28 md:w-28 lg:h-34 lg:w-34"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/120x120/E53E3E/FFFFFF?text=G20+Logo";
            e.currentTarget.srcset = "";
          }}
        />
      </motion.div>
    </motion.div>
  );
}