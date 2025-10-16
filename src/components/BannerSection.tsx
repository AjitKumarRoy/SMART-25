// FILE: src/components/BannerSection.tsx
"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Import desktop, tablet, and mobile background images
import desktopBanner from '../../public/images/smart-25-banner-desktop.png'; // Replace with your desktop image path
import tabletBanner from '../../public/images/smart-25-banner-tablet.jpg';   // Replace with your tablet image path
import mobileBanner from '../../public/images/smart-25-banner-tablet.jpg';   // Replace with your mobile image path

// Using a custom hook to preload all the images
const usePreloadImages = (srcs: string[]) => {
  useEffect(() => {
    if (srcs && srcs.length > 0) {
      srcs.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [srcs]);
};

export function BannerSection() {
  // Pre-load all three images when the component mounts
  usePreloadImages([desktopBanner.src, tabletBanner.src, mobileBanner.src]);

  return (
    <div className="relative w-full h-[40vh] overflow-hidden">
      
      {/* Desktop Banner (visible on large screens and up) */}
      <div
        className="hidden lg:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${desktopBanner.src})` }}
      ></div>
      
      {/* Tablet Banner (visible on small and medium screens) */}
      <div
        className="hidden sm:block lg:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${tabletBanner.src})` }}
      ></div>

      {/* Mobile Banner (visible only on extra-small screens) */}
      <div
        className="block sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mobileBanner.src})` }}
      ></div>

      {/* Content Layer */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-white p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-lg">
          [Your Conference Title]
        </h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl text-center drop-shadow-md">
          A Modern and Premium Conference
        </p> */}
      </motion.div>
    </div>
  );
}

export default BannerSection;