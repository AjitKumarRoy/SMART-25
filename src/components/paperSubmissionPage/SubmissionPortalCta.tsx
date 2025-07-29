"use client";

import Link from 'next/link';
import { FaFileUpload, FaFileContract } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { motion, Variants} from 'framer-motion';
import pageData from '@/data/paperSubmissionPage/submissionPage.json';

export const SubmissionPortalsCta = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Section>
      {/* UPDATED: Changed the background gradient */}
      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black p-12 text-center shadow-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <div className="relative z-10">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl"
            variants={itemVariants}
          >
            {pageData.submissionPortals.title}
          </motion.h2>

          <motion.p 
            className="mx-auto mt-4 max-w-xl text-lg text-gray-300"
            variants={itemVariants}
          >
            Choose the appropriate portal to upload your abstract or full research paper. We look forward to your contribution.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link 
              href={pageData.submissionPortals.abstractLink} 
              target="_blank" 
              className="group inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-gray-800 shadow-lg ring-2 ring-transparent ring-offset-4 ring-offset-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:ring-white sm:w-auto"
            >
              <FaFileUpload className="mr-3 text-indigo-500 transition-transform group-hover:-translate-y-1" />
              Submit Abstract
            </Link>

            <Link 
              href={pageData.submissionPortals.fullPaperLink} 
              target="_blank" 
              className="group inline-flex w-full items-center justify-center rounded-lg border-2 border-gray-600 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 sm:w-auto"
            >
              <FaFileContract className="mr-3 transition-transform group-hover:rotate-6" />
              Submit Full Paper
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};