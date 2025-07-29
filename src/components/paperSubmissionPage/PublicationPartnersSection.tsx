"use client";

import { motion } from 'framer-motion';
import { FaBook, FaJournalWhills } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/paperSubmissionPage/submissionPage.json';

export const PublicationPartnersSection = () => {
  return (
    <Section>
      <SectionTitle>Publication Partners</SectionTitle>
      <motion.div
        className="mx-auto mt-12 max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-center text-lg text-gray-600">{pageData.publicationPartners.intro}</p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <FaJournalWhills className="h-7 w-7 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">SCOPUS-Indexed Journals</h3>
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-700">
              {pageData.publicationPartners.journals.map(journal => <li key={journal}>{journal}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <FaBook className="h-7 w-7 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">SCOPUS-Indexed Book Chapters</h3>
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-700">
              {pageData.publicationPartners.bookChapters.map(chapter => <li key={chapter}>{chapter}</li>)}
            </ul>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};