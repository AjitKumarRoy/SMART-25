"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  // Animation variants for staggering each character of the title
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="relative h-64 w-full overflow-hidden md:h-80">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
        
        <motion.h1
          className="text-4xl font-extrabold tracking-tight md:text-6xl"
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent"
              variants={characterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 max-w-2xl text-lg text-gray-200 md:text-2xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};