"use client";

import Link from 'next/link';
// STEP 1: Import the 'Variants' type
import { motion, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const CtaSection = () => {
  // STEP 2: Add the ': Variants' type to your animation objects
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
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
    <Section className="bg-indigo-50">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={itemVariants}>
            <SectionTitle>Ready to Submit?</SectionTitle>
        </motion.div>
        
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          variants={itemVariants}
        >
         The submission portal is now open. We look forward to receiving your valuable contributions.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link
            href="/paper-submission"
            className="group inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-105 sm:w-auto"
          >
            Submit Your Paper
            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
};