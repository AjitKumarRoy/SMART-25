"use client"; // Required for Framer Motion

import { motion, Variants } from "framer-motion";

// Animation variants for the hero section
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

interface HeroSectionProps {
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function HeroSection({
  title,
  description,
  gradientFrom = "from-teal-50",
  gradientTo = "to-cyan-100",
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-24 md:py-32 bg-gradient-to-br ${gradientFrom} ${gradientTo} dark:from-gray-900 dark:to-gray-800 text-center`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="max-w-5xl mx-auto px-6 relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-gray-700 dark:text-gray-300"
        >
          {description}
        </motion.p>
      </motion.div>
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="pattern-dots"
              x="0"
              y="0"
              width=".5"
              height=".5"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle id="pattern-dot" cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dots)" />
        </svg>
      </div>
    </section>
  );
}