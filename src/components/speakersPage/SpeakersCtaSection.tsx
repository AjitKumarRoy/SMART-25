"use client";

import Link from 'next/link';
import { FaArrowRight, FaBrain } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import pageData from '@/data/speakersPage/speakersPage.json';

export const SpeakersCtaSection = () => {
  return (
    <Section className="relative overflow-hidden bg-slate-50">
      {/* Decorative background element */}
      <FaBrain className="absolute -bottom-1/4 -right-16 text-slate-200/50 text-[20rem] -z-0 rotate-12" />
      
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-between gap-8 rounded-xl bg-white p-12 shadow-lg border border-gray-100 lg:flex-row"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {pageData.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 lg:mx-0">
            {pageData.cta.subtitle}
          </p>
        </div>
        
        {/* Button */}
        <div className="flex-shrink-0">
          <Link 
            href={pageData.cta.link} 
            className="group inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-500 lg:w-auto"
          >
            {pageData.cta.buttonText}
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </Section>
  );
};