"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFileDownload, FaBookOpen, FaCheckCircle } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/paperSubmissionPage/submissionPage.json';

export const GuidelinesSection = () => {
    
  return (
    <Section className="bg-indigo-50">
      <SectionTitle>Submission Guidelines</SectionTitle>
      <motion.div
        className="mx-auto mt-12 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-center text-lg text-gray-600">{pageData.guidelines.intro}</p>
        <div className="mt-10 rounded-lg border border-gray-200 bg-white p-8">
          <h3 className="text-2xl font-bold text-gray-900">{pageData.guidelines.abstractTitle}</h3>
          <ul className="mt-6 space-y-4">
            {pageData.guidelines.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 h-5 w-5 flex-none text-indigo-500" />
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={pageData.guidelines.templateLink} target="_blank" className="group inline-flex items-center justify-center rounded-md bg-indigo-100 px-5 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-200">
              <FaFileDownload className="mr-2" /> Download Abstract Template
            </Link>
            <Link href={pageData.guidelines.lastYearAbstractsLink} target="_blank" className="group inline-flex items-center justify-center rounded-md bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200">
              <FaBookOpen className="mr-2" /> View Last Year&apos;s Abstracts
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};