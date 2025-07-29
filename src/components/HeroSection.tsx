"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { differenceInSeconds } from 'date-fns';
import heroData from '@/data/homePage/heroSection.json';

// --- Helper Types & Data ---
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const SLIDE_DURATION_SECONDS = 5;

// --- Main Component ---
export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    // This timer controls the background image slideshow
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.heroImages.length);
    }, SLIDE_DURATION_SECONDS * 1000);

    // This timer updates the countdown
    const countdownTimer = setInterval(() => {
      const deadline = new Date('2025-07-31T23:59:59');
      const totalSeconds = differenceInSeconds(deadline, new Date());
      if (totalSeconds <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(countdownTimer);
        return;
      }
      setCountdown({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(slideTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeIn' } }}
          >
            <Image
              src={heroData.heroImages[currentSlide]}
              alt={`Conference background ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex h-full flex-col justify-center p-8 md:p-16 lg:p-24">
        <div className="max-w-3xl">
          {/* We use a key here to force re-animation on slide change */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 1.0 } }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {heroData.name}
            </h1>
            <p className="mt-4 text-lg text-indigo-200/90 md:text-xl">
              {heroData.hosting}, {heroData.venue}
            </p>
          </motion.div>

          {/* Countdown Timer */}
          {countdown && (
            <motion.div
              className="mt-8 flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.0, duration: 0.8 } }}
            >
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="text-center bg-white/10 p-3 rounded-lg w-20">
                  <span className="text-3xl font-bold">{String(value).padStart(2, '0')}</span>
                  <span className="block text-xs uppercase opacity-70">{unit}</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.8 } }}
          >
            <Link
              href={heroData.cmtLink}
              target="_blank"
              className="group inline-flex items-center rounded-md bg-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-105"
            >
              Submit Abstract
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Progress Bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 z-20 flex space-x-2">
        {heroData.heroImages.map((_, index) => (
          <div key={index} className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
            {index === currentSlide && (
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION_SECONDS, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};