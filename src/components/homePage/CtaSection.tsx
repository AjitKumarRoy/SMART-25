"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import ctaData from '@/data/homePage/cta.json';

export const CtaSection = () => {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    // Using the Section component for a consistent background and padding
    <Section className="bg-indigo-50">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Using the SectionTitle component */}
        <SectionTitle>Ready to attend SMART&apos;25?</SectionTitle>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          variants={itemVariants}
        >
          Secure your spot to gain invaluable insights, connect with global experts, and contribute to the future of sustainable technology.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          {/* Primary Button */}
          <Link
            href={ctaData.registerLink}
            className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-105 sm:w-auto"
          >
            Register Now
            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary Button - Adjusted for light background */}
          <Link
            href={ctaData.contactLink}
            className="group inline-flex w-full items-center justify-center rounded-md border-2 border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-50 sm:w-auto"
          >
            <FaPhone className="mr-2 text-gray-500 transition-transform group-hover:text-indigo-600 group-hover:rotate-12" />
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
};