"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { differenceInSeconds } from 'date-fns';
import heroData from '@/data/homePage/hero.json';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaArrowRight, FaTicketAlt } from "react-icons/fa";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection = () => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  // const conferenceDate = new Date(heroData.countdownTarget);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
     const conferenceDate = new Date(heroData.countdownTarget);


    const countdownTimer = setInterval(() => {
      const totalSeconds = differenceInSeconds(conferenceDate, new Date());
      if (totalSeconds <= 0) {
        setCountdown(null);
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

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    // Responsive height
    <section id="hero" className="relative w-full py-20 text-white lg:h-[60vh] lg:min-h-[700px] lg:py-0">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0 hero-embla-carousel" ref={emblaRef}>
        <div className="embla__container">
          {heroData.backgroundImages.map((src, index) => (
            <div className="embla__slide" key={index}>
              <Image src={src} alt="Conference background" fill className="object-cover" priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center p-4 text-center sm:p-8">
        {/* Countdown & Logos */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {countdown && (
            <div className="mb-8">
              <h4 className="mb-4 bg-gradient-to-r from-indigo-300 to-rose-300 bg-clip-text text-center text-lg font-semibold uppercase tracking-widest text-transparent">
                Conference Starts In
              </h4>
              <div className="flex justify-center gap-3 sm:gap-6">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="w-20 text-center sm:w-24">
                    <span className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-indigo-300 to-rose-300 bg-clip-text text-transparent">
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block text-sm uppercase text-white/70">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-8 sm:gap-10">
            {heroData.organizerLogos.map((logo) => (
              <div key={logo.alt} className="relative h-16 w-16 rounded-full bg-white/20 p-2 ring-2 ring-white/30 sm:h-20 sm:w-20">
                <Image src={logo.src} alt={logo.alt} fill className="rounded-full" sizes="(max-width: 640px) 4rem, 5rem" />
              </div>
            ))}
          </div>
        </motion.div>

      {/* --- NEW: Scrolling Marquee Title --- */}
<div className="mt-8 w-full max-w-6xl overflow-hidden">
  <motion.div
    className="whitespace-nowrap"
    initial={{ x: "100%" }}
    animate={{ x: "-100%" }}
    transition={{
      duration: 40, // Adjust duration to control speed
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <p 
      className="inline-block bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text px-8 text-2xl font-bold text-transparent sm:text-3xl"
    >
      {heroData.conferenceTitle}
    </p>
    {/* Duplicate the text for a seamless loop */}
    <p 
      className="inline-block bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text px-8 text-2xl font-bold text-transparent sm:text-3xl"
    >
      {heroData.conferenceTitle}
    </p>
  </motion.div>
</div>
{/* --- END OF NEW SECTION --- */}

                {/* Three Info Sections */}
                <motion.div
          className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } } }}
        >
          {heroData.infoSections.map((section) => (
            <motion.div
              key={section.title}
              className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <h3 className="mb-1 text-xs uppercase tracking-widest text-indigo-300 sm:text-sm">{section.title}</h3>
              <p className="text-lg font-semibold sm:text-xl">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Responsive Buttons */}
        <motion.div
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href={heroData.submitLink}
            className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-105 sm:w-auto"
          >
            Submit Abstract
            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={heroData.registerLink}
            className="group inline-flex w-full items-center justify-center rounded-md border-2 border-gray-300 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto"
          >
            Register Now
            <FaTicketAlt className="ml-2 transition-transform group-hover:rotate-12" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};